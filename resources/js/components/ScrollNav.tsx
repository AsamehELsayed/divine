import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";

interface ScrollNavProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  sections: { id: string; label: string }[];
  onActiveChange?: (index: number) => void;
}

export function ScrollNav({ containerRef, sections, onActiveChange }: ScrollNavProps) {
  const [active, setActive] = useState(0);
  const lenis = useLenis({ wrapper: containerRef, enabled: true });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = () => {
      const sectionHeight = container.clientHeight || window.innerHeight;
      const idx = Math.round(container.scrollTop / sectionHeight);
      const newActive = Math.min(idx, sections.length - 1);
      setActive(newActive);
      onActiveChange?.(newActive);
    };
    container.addEventListener("scroll", handler, { passive: true });
    return () => container.removeEventListener("scroll", handler);
  }, [containerRef, sections.length]);

  const goTo = (i: number) => {
    const sectionHeight = containerRef.current?.clientHeight || window.innerHeight;
    if (lenis) {
      lenis.scrollTo(i * sectionHeight);
    } else if (containerRef.current) {
      containerRef.current.scrollTo({
        top: i * sectionHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-3 top-1/2 z-50 -translate-y-1/2 md:right-10"
    >
      <ul className="flex flex-col items-end gap-5">
        {sections.map((s, i) => (
          <li key={s.id} className="group flex items-center gap-3">
            <span
              className={`hidden md:block font-sans text-[10px] tracking-luxe uppercase transition-all duration-500 ${
                active === i
                  ? "opacity-100 text-gold"
                  : "opacity-0 group-hover:opacity-60 text-white"
              }`}
            >
              {s.label}
            </span>
            <button
              type="button"
              aria-label={`Go to ${s.label}`}
              onClick={() => goTo(i)}
              className={`relative h-[1px] transition-all duration-700 ${
                active === i
                  ? "w-10 bg-gold"
                  : "w-5 bg-white/40 hover:bg-white/80"
              }`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
