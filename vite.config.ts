import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Local certificate (see .local/certs). Safari on iPhone only grants camera access over HTTPS.
const CERT_DIR = fileURLToPath(new URL('./.local/certs', import.meta.url));
const hasLocalCert = existsSync(`${CERT_DIR}/server.crt`) && existsSync(`${CERT_DIR}/server.key`);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Listens on the LAN so a phone on the same Wi-Fi can open the app.
    host: true,
    https: hasLocalCert
      ? {
          cert: readFileSync(`${CERT_DIR}/server.crt`),
          key: readFileSync(`${CERT_DIR}/server.key`),
        }
      : undefined,
    proxy: {
      '/v1': { target: 'http://localhost:3000' },
    },
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    // Bundle budget. Baseline measured on 2026-09-21: entry chunk 555 kB (170 kB gzip), which is
    // React + React Router; warranty chunk 191 kB (57 kB gzip). Lower it as the baseline improves.
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: 'jsdom',
    // Same origin as VITE_API_BASE_URL in .env.test, so the fake API calls are not cross-origin.
    environmentOptions: { jsdom: { url: 'http://localhost:3000' } },
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    restoreMocks: true,
    testTimeout: 20000,
  },
});
