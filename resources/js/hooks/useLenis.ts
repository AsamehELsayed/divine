import Lenis from 'lenis';
import * as SnapModule from 'lenis/snap';
import { useEffect, useRef } from 'react';

// Handle different module formats (ESM/CJS)
const Snap = (SnapModule as any).Snap || (SnapModule as any).default || SnapModule;

interface LenisOptions {
  wrapper?: React.RefObject<HTMLElement | null>;
  content?: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
}

export function useLenis({ wrapper, content, enabled = true }: LenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      wrapper: wrapper?.current || undefined,
      content: content?.current || undefined,
      lerp: 0.05,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Initialize Snapping
    let snap: any = null;
    try {
      snap = new Snap(lenis, {
        type: 'mandatory',
        velocityThreshold: 0.1,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const updateSnap = () => {
        if (!snap) return;
        snap.elements.clear();
        const sections = wrapper?.current?.querySelectorAll('section') || [];
        sections.forEach((section) => {
          snap.addElement(section as HTMLElement);
        });
      };

      updateSnap();
      window.addEventListener('resize', updateSnap);

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      const rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', updateSnap);
        snap?.destroy();
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch (err) {
      console.error('Lenis Snap initialization failed:', err);
      
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      const rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
      };
    }
  }, [enabled, wrapper, content]);

  return lenisRef.current;
}
