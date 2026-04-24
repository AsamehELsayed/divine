export function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`flex flex-col items-start leading-none ${small ? "" : "gap-1"}`}
    >
      <span
        className={`font-heading italic text-gold ${
          small ? "text-base" : "text-lg"
        }`}
      >
        Divine
      </span>
      <span
        className={`font-sans tracking-luxe uppercase text-white/80 ${
          small ? "text-[9px]" : "text-[10px]"
        }`}
      >
        Management Group
      </span>
    </div>
  );
}
