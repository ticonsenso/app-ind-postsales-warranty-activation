import '@testing-library/jest-dom/vitest';

import { cleanup, configure } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { server } from './msw/server';

// The first render of a lazy route also pays for loading its chunk.
configure({ asyncUtilTimeout: 5000 });

// jsdom cannot run the WebAssembly barcode reader, and its download would hit the network.
vi.mock('@/shared/barcode/zxing', () => ({
  preloadBarcodeReader: () => undefined,
  loadBarcodeReader: () => Promise.reject(new Error('The barcode reader does not run in jsdom.')),
}));

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

// jsdom does not implement scrolling (the router scrolls to top on navigation).
window.scrollTo = () => undefined;
Element.prototype.scrollIntoView = () => undefined;

// jsdom does not implement the modal <dialog> API.
if (typeof HTMLDialogElement !== 'undefined' && !HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
}
