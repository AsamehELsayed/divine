import { useEffect, useState } from "react";
import { useLoading } from "@/hooks/useLoading";
import { BrandMark } from "./BrandMark";

export function LoadingScreen() {
  const { progress, isLoaded } = useLoading();
  const [shouldRender, setShouldRender] = useState(true);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    if (isLoaded && fontsReady) {
      setExitAnimation(true);
      const timer = setTimeout(() => setShouldRender(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, fontsReady]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink transition-all duration-1000 ease-in-out ${
        exitAnimation ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background grain effect */}
      <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* Brand Logo / Mark */}
        <div className={`mb-12 transition-all duration-1000 ${exitAnimation ? "translate-y-[-20px] opacity-0" : "translate-y-0 opacity-100"}`}>
          <BrandMark />
        </div>

        {/* Progress Bar Container */}
        <div className="relative h-px w-64 overflow-hidden bg-white/10 md:w-80">
          <div
            className="absolute inset-0 bg-gold transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/60">
            Initializing Experience
          </span>
          <span className="font-heading text-2xl font-light text-white tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Decorative text */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end opacity-30">
        <div className="flex flex-col gap-1">
          <span className="font-sans text-[8px] tracking-widest uppercase">System Status</span>
          <span className="font-sans text-[9px] tracking-widest uppercase text-gold">Synchronizing Frames</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span className="font-sans text-[8px] tracking-widest uppercase">Location</span>
          <span className="font-sans text-[9px] tracking-widest uppercase text-gold">Dubai · UAE</span>
        </div>
      </div>
    </div>
  );
}
