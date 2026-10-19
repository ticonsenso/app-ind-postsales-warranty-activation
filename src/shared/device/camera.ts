const CAMERA_CONSTRAINTS: MediaStreamConstraints = {
  audio: false,
  video: {
    facingMode: { ideal: 'environment' },
    width: { ideal: 1920 },
    height: { ideal: 1080 },
  },
};
const PHOTO_MIME_TYPE = 'image/jpeg';
const PHOTO_QUALITY = 0.92;

/** Opens the rear camera when there is one, otherwise the default camera. Rejects when access is denied. */
export function openCamera(): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia(CAMERA_CONSTRAINTS);
}

export function stopCamera(stream: MediaStream): void {
  for (const track of stream.getTracks()) track.stop();
}

/** Draws the current frame of the video into a JPEG file named `<fileName>-<timestamp>.jpg`. */
export async function capturePhoto(video: HTMLVideoElement, fileName: string): Promise<File> {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D context is not available.');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, PHOTO_MIME_TYPE, PHOTO_QUALITY);
  });
  if (!blob) throw new Error('The photo could not be encoded.');
  return new File([blob], `${fileName}-${Date.now()}.jpg`, { type: PHOTO_MIME_TYPE });
}

/**
 * Pixels of the current frame of the video, drawn into `canvas` (reused between frames). `null`
 * while the video has no frame yet.
 */
export function grabFrame(video: HTMLVideoElement, canvas: HTMLCanvasElement): ImageData | null {
  const { videoWidth: width, videoHeight: height } = video;
  if (width === 0 || height === 0) return null;

  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('Canvas 2D context is not available.');
  context.drawImage(video, 0, 0, width, height);
  return context.getImageData(0, 0, width, height);
}
