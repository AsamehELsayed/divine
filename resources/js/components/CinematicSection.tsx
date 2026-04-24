import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

const SectionContext = createContext<{ visible: boolean }>({ visible: false });

export const useSectionVisibility = () => useContext(SectionContext);

interface CinematicSectionProps {
  videoSrc?: string;
  poster?: string;
  children: ReactNode;
  overlay?: "dark" | "darker" | "vignette";
  id?: string;
  disableVideo?: boolean;
  contentClassName?: string;
}

export function CinematicSection({
  videoSrc,
  poster,
  children,
  overlay = "dark",
  id,
  disableVideo = false,
  contentClassName = "items-center",
}: CinematicSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const isIn = entry.intersectionRatio > 0.4;
        setVisible(isIn);
        if (videoRef.current) {
          if (isIn) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: [0, 0.4, 0.7, 1] }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const overlayClass =
    overlay === "darker"
      ? "bg-black/60"
      : overlay === "vignette"
        ? "bg-black/30"
        : "bg-black/45";

  return (
    <section
      ref={ref}
      id={id}
      className="relative z-[2] h-[100dvh] w-full overflow-hidden grain"
      style={{ backgroundColor: "transparent" }}
    >
      <SectionContext.Provider value={{ visible }}>
        {!disableVideo && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[2000ms] ease-out ${
              visible ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-md"
            }`}
            src={videoSrc}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
        <div className={`absolute inset-0 ${overlayClass}`} />
        <div className="absolute inset-0 vignette" />
        <div
          className={`relative z-10 flex h-full w-full transition-all duration-1000 ${contentClassName} ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {children}
        </div>
      </SectionContext.Provider>
    </section>
  );
}
