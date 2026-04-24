import { useSectionVisibility } from "./CinematicSection";

interface DecorativeElementsProps {
  number?: string;
  accentColor?: string;
  variant?: "lines" | "glow" | "minimal" | "editorial";
}

export function DecorativeElements({ 
  number, 
  accentColor = "var(--gold)", 
  variant = "lines" 
}: DecorativeElementsProps) {
  const { visible } = useSectionVisibility();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Large Background Number */}
      {number && (
        <div 
          className={`absolute -left-10 top-1/2 -translate-y-1/2 font-heading text-[25rem] font-bold leading-none transition-all duration-[2500ms] ease-out select-none hidden md:block
            ${visible ? "opacity-[0.03] translate-x-0 blur-none" : "opacity-0 -translate-x-40 blur-2xl"}
          `}
          style={{ color: accentColor }}
        >
          {number}
        </div>
      )}

      {/* Vertical Side Text (Editorial) */}
      {variant === "editorial" && (
        <div 
          className={`absolute right-10 top-1/2 -translate-y-1/2 font-sans text-[10px] tracking-[1em] uppercase text-white/10 [writing-mode:vertical-lr] transition-all duration-[2000ms] hidden md:block
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
          `}
        >
          Divine Management Group — Dubai
        </div>
      )}

      {/* Animated Lines */}
      {(variant === "lines" || variant === "editorial") && (
        <>
          <div 
            className={`absolute right-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent transition-all duration-[2500ms] delay-300
              ${visible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}
            `}
          />
          <div 
            className={`absolute left-[10%] bottom-0 h-[40%] w-px bg-gradient-to-t from-transparent via-white/5 to-transparent transition-all duration-[3000ms] delay-500
              ${visible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}
            `}
          />
          {variant === "editorial" && (
            <div 
              className={`absolute left-1/2 top-0 h-32 w-px bg-gradient-to-b from-gold/40 to-transparent transition-all duration-[2000ms]
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"}
              `}
            />
          )}
        </>
      )}

      {/* Floating Glow Spot */}
      {(variant === "glow" || variant === "lines" || variant === "editorial") && (
        <div 
          className={`absolute top-1/4 -right-20 h-[500px] w-[500px] rounded-full blur-[150px] transition-all duration-[3500ms]
            ${visible ? "opacity-[0.15] scale-100" : "opacity-0 scale-50"}
          `}
          style={{ backgroundColor: accentColor }}
        />
      )}
      
      {/* Minimal Accent */}
      {variant === "minimal" && (
        <div 
          className={`absolute left-1/2 top-10 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000
            ${visible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
          `}
        />
      )}
    </div>
  );
}
