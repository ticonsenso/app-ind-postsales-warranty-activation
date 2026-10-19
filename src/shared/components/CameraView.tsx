import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { capturePhoto, grabFrame, openCamera, stopCamera } from '@/shared/device/camera';
import { usePageTakeover } from '@/shared/hooks/use-page-takeover';

const CAPTURE_ERROR_MESSAGE = 'No pudimos tomar la foto. Intenta nuevamente.';
const DEFAULT_FRAME_INTERVAL_MS = 250;
/** Shows under the browser toolbars while the camera is open, matching its own background. */
const PAGE_BACKGROUND = 'var(--color-night-950)';

interface CameraViewProps {
  /** Accessible name of the camera dialog, e.g. "Tomar foto de la factura". */
  label: string;
  /** Base name of the photo file. */
  fileName?: string;
  /** Shown when the camera cannot be opened; should point to the alternative. */
  cameraErrorMessage: string;
  /** Shows the "Tomar foto" button and receives the photo taken. */
  onPhoto?: (photo: File) => void;
  /**
   * Receives a frame of the video every `frameIntervalMs`. The next frame is grabbed only once
   * the returned promise settles, so frames never pile up behind a slow handler.
   */
  onFrame?: (frame: ImageData) => Promise<void>;
  frameIntervalMs?: number;
  onCancel: () => void;
  /** Laid over the video, below the buttons (e.g. a framing guide). */
  children?: ReactNode;
}

/** Full-screen in-page camera that hands over a photo, the video frames, or both. */
export function CameraView({
  label,
  fileName = 'foto',
  cameraErrorMessage,
  onPhoto,
  onFrame,
  frameIntervalMs = DEFAULT_FRAME_INTERVAL_MS,
  onCancel,
  children,
}: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const onFrameRef = useRef(onFrame);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onFrameRef.current = onFrame;
  });

  const host = usePageTakeover(PAGE_BACKGROUND);

  useEffect(() => {
    let active = true;
    openCamera().then(
      (stream) => {
        if (!active) {
          stopCamera(stream);
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      },
      () => {
        if (active) setError(cameraErrorMessage);
      },
    );

    return () => {
      active = false;
      if (streamRef.current) stopCamera(streamRef.current);
      streamRef.current = null;
    };
  }, [cameraErrorMessage]);

  const hasFrameHandler = onFrame !== undefined;
  useEffect(() => {
    if (!hasFrameHandler) return;
    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const canvas = document.createElement('canvas');

    const readNextFrame = async () => {
      try {
        const video = videoRef.current;
        const frame = video ? grabFrame(video, canvas) : null;
        if (frame) await onFrameRef.current?.(frame);
      } catch {
        active = false;
        setError(cameraErrorMessage);
      }
      if (active) timer = setTimeout(() => void readNextFrame(), frameIntervalMs);
    };
    timer = setTimeout(() => void readNextFrame(), frameIntervalMs);

    return () => {
      active = false;
      clearTimeout(timer);
      // Safari keeps a canvas' memory until it is shrunk, and caps the total per page.
      canvas.width = 0;
      canvas.height = 0;
    };
  }, [hasFrameHandler, frameIntervalMs, cameraErrorMessage]);

  const handleCapture = async () => {
    if (!videoRef.current || !onPhoto) return;
    try {
      const photo = await capturePhoto(videoRef.current, fileName);
      if (streamRef.current) stopCamera(streamRef.current);
      streamRef.current = null;
      onPhoto(photo);
    } catch {
      setError(CAPTURE_ERROR_MESSAGE);
    }
  };

  return createPortal(
    // `h-lvh` reaches as far under the browser toolbars as the browser allows; `inset-0` is the
    // fallback where `lvh` is unknown. Whatever it cannot reach shows the page background, which
    // `usePageTakeover` paints dark while the rest of the page is hidden.
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-50 h-lvh bg-night-950"
    >
      {/* `object-cover` crops instead of letterboxing, so the feed always fills the screen:
          the stream's aspect ratio rarely matches the viewport's. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        aria-label="Vista de la cámara"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* The visible part of the screen (`h-dvh`), so the overlay and the buttons stay clear of
          the toolbars. */}
      <div className="absolute inset-x-0 top-0 bottom-0 h-dvh">
        {children}

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-night-950/90 to-transparent p-4 pt-10">
          {error && <Alert tone="error">{error}</Alert>}
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={onCancel}>
              Cancelar
            </Button>
            {onPhoto && (
              <Button
                className="flex-1"
                onClick={() => void handleCapture()}
                disabled={error !== null}
              >
                Tomar foto
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    host,
  );
}
