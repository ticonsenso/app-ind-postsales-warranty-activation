import { vi } from 'vitest';

const fakeStream = () => ({ getTracks: () => [{ stop: vi.fn() }] }) as unknown as MediaStream;

/**
 * Fakes the camera, its video frames and the canvas that turns a frame into a photo or into
 * pixels. Undo it with `vi.restoreAllMocks()` and by deleting `navigator.mediaDevices`.
 */
export function mockCamera() {
  const getUserMedia = vi
    .fn<(constraints: MediaStreamConstraints) => Promise<MediaStream>>()
    .mockResolvedValue(fakeStream());
  Object.defineProperty(navigator, 'mediaDevices', { value: { getUserMedia }, configurable: true });
  vi.spyOn(HTMLVideoElement.prototype, 'videoWidth', 'get').mockReturnValue(640);
  vi.spyOn(HTMLVideoElement.prototype, 'videoHeight', 'get').mockReturnValue(480);
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    drawImage: vi.fn(),
    getImageData: vi.fn((_x: number, _y: number, width: number, height: number) => ({
      width,
      height,
      data: new Uint8ClampedArray(width * height * 4),
    })),
  } as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (callback) {
    callback(new Blob(['photo'], { type: 'image/jpeg' }));
  });
  return getUserMedia;
}
