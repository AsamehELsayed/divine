import { useEffect, useRef, useCallback } from "react";
import { useLoading } from "@/hooks/useLoading";

const TOTAL_FRAMES = 1200;

// Build frame URL: /frames/frame_0001.webp … /frames/frame_1200.webp
function frameUrl(index: number): string {
  const n = Math.min(Math.max(index, 1), TOTAL_FRAMES);
  return `/frames/frame_${String(n).padStart(4, "0")}.webp`;
}

interface FrameScrubBackgroundProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function VideoScrubBackground({ containerRef }: FrameScrubBackgroundProps) {
  const loading = useLoading(false);
  // Safe extraction to avoid crashes if context is missing
  const reportProgress = loading?.reportProgress || (() => {});
  const registerAsset = loading?.registerAsset || (() => {});
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Cache loaded Image objects so we never reload the same frame
  const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  // Track the currently displayed frame index
  const currentFrameRef = useRef(1);
  // Track the target frame (from scroll)
  const targetFrameRef = useRef(1);
  // Animation loop handle
  const rafRef = useRef(0);
  // Track last drawn frame to skip redundant draws
  const lastDrawnRef = useRef(0);

  // Draw a given Image onto the canvas with object-cover
  const drawImage = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // object-cover math
    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;
    let dw: number, dh: number, dx: number, dy: number;

    if (canvasRatio > imgRatio) {
      dw = cw;
      dh = cw / imgRatio;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dw = ch * imgRatio;
      dh = ch;
      dx = (cw - dw) / 2;
      dy = 0;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Load a single frame, return from cache if available
  const loadFrame = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      const cached = cacheRef.current.get(index);
      if (cached) return Promise.resolve(cached);

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          cacheRef.current.set(index, img);
          resolve(img);
        };
        img.onerror = () => {
          reject(new Error(`Failed to load frame ${index}`));
        };
        img.src = frameUrl(index);
      });
    },
    []
  );

  // Preload a range of frames around a given index
  const preloadAround = useCallback(
    (center: number, range: number = 40) => {
      for (let i = center - range; i <= center + range; i++) {
        if (i >= 1 && i <= TOTAL_FRAMES && !cacheRef.current.has(i)) {
          loadFrame(i).catch(() => {});
        }
      }
    },
    [loadFrame]
  );

  // Main animation loop: smoothly approach the target frame
  useEffect(() => {
    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      // Lerp toward target for smooth interpolation
      const next = current + (target - current) * 0.03;
      const frameIndex = Math.round(next);

      // Only draw if we moved to a new frame
      if (frameIndex !== lastDrawnRef.current && frameIndex >= 1 && frameIndex <= TOTAL_FRAMES) {
        const img = cacheRef.current.get(frameIndex);
        if (img) {
          drawImage(img);
          lastDrawnRef.current = frameIndex;
        } else {
          // Try to show the nearest cached frame while this one loads
          const nearestCached = findNearestCached(frameIndex);
          if (nearestCached) {
            drawImage(nearestCached);
          }
          loadFrame(frameIndex)
            .then((loadedImg) => {
              if (Math.abs(targetFrameRef.current - frameIndex) < 30) {
                drawImage(loadedImg);
                lastDrawnRef.current = frameIndex;
              }
            })
            .catch(() => {});
        }
      }

      currentFrameRef.current = next;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawImage, loadFrame]);

  // Find the nearest cached frame to a given index
  function findNearestCached(index: number): HTMLImageElement | null {
    for (let d = 1; d < 20; d++) {
      const before = cacheRef.current.get(index - d);
      if (before) return before;
      const after = cacheRef.current.get(index + d);
      if (after) return after;
    }
    return null;
  }

  // Listen to scroll and compute target frame
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Redraw current frame after resize
      const img = cacheRef.current.get(Math.round(currentFrameRef.current));
      if (img) drawImage(img);
    };

    const onScroll = () => {
      const scrollPos = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(Math.max(scrollPos / maxScroll, 0), 1);
      const frameIndex = Math.round(1 + progress * (TOTAL_FRAMES - 1));
      targetFrameRef.current = frameIndex;

      // Preload frames around the target
      preloadAround(frameIndex);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    resize();

    // Critical Loading Logic
    const criticalFrames = new Set<number>();
    for (let i = 1; i <= 60; i++) criticalFrames.add(i);
    for (let i = 1; i <= TOTAL_FRAMES; i += 20) criticalFrames.add(i);

    criticalFrames.forEach((idx) => {
      if (loading) registerAsset();
      loadFrame(idx)
        .then(() => {
          if (loading) reportProgress();
          if (idx === 1) {
            const img = cacheRef.current.get(1);
            if (img) drawImage(img);
          }
        })
        .catch(() => {
          if (loading) reportProgress();
        });
    });

    // Listen to scroll and compute target frame
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, [containerRef, drawImage, loadFrame, preloadAround, registerAsset, reportProgress]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
