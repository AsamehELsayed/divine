import { useSectionVisibility } from "./CinematicSection";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "reveal-up" | "reveal-down" | "reveal-right" | "reveal-scale" | "reveal-skew";
  delay?: "delay-100" | "delay-200" | "delay-300" | "delay-400" | "delay-500" | "delay-700" | "delay-1000";
  className?: string;
}

export function ScrollReveal({
  children,
  animation = "reveal-up",
  delay,
  className,
}: ScrollRevealProps) {
  const { visible } = useSectionVisibility();

  return (
    <div
      className={cn(
        "transition-all duration-1000",
        animation,
        visible && "revealed",
        delay,
        className
      )}
    >
      {children}
    </div>
  );
}
