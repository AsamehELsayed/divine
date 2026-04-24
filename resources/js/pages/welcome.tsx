import { Head } from '@inertiajs/react';
import { useRef, useMemo, useState } from "react";
import { CinematicSection } from "@/components/CinematicSection";
import { ScrollNav } from "@/components/ScrollNav";
import { BrandMark } from "@/components/BrandMark";
import { CursorGlow } from "@/components/CursorGlow";
import { VideoScrubBackground } from "@/components/VideoScrubBackground";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LoadingProvider } from "@/hooks/useLoading";
import { LoadingScreen } from "@/components/LoadingScreen";
import { DecorativeElements } from "@/components/DecorativeElements";
import { useLenis } from "@/hooks/useLenis";

export default function Welcome({ config }: { config: any }) {
  const activeSections = useMemo(() => {
    if (!config?.sections) return [];
    return config.sections.filter((s: any) => s.visible);
  }, [config]);

  const theme = config?.theme || {
    primaryColor: '#D4AF37',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    accentColor: '#E5C185'
  };

  return (
    <LoadingProvider>
      <Head title="Divine Management Group — Where Luxury Finds Its Voice" />
      <LoadingScreen />
      <Index sections={activeSections} theme={theme} />
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --gold: ${theme.primaryColor};
          --accent: ${theme.accentColor};
          --background: ${theme.backgroundColor};
          --text: ${theme.textColor};
        }
        body {
          background-color: var(--background);
          color: var(--text);
        }
      `}} />
    </LoadingProvider>
  );
}

function Index({ sections, theme }: { sections: any[], theme: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const lenis = useLenis({ 
    wrapper: containerRef,
    enabled: true 
  });

  const scrollToNext = (idx: number) => {
    const sectionHeight = containerRef.current?.clientHeight || window.innerHeight;
    if (lenis) {
      lenis.scrollTo(idx * sectionHeight);
    } else if (containerRef.current) {
      containerRef.current.scrollTo({
        top: idx * sectionHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="relative text-white" style={{ backgroundColor: theme.backgroundColor }}>
      <CursorGlow />

      <header 
        className={`fixed left-4 top-4 z-50 transition-all duration-700 md:left-10 md:top-8 ${
          activeSection > 0 ? "opacity-0 pointer-events-none -translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <BrandMark />
      </header>

      <ScrollNav containerRef={containerRef} sections={sections} onActiveChange={setActiveSection} />

      <div ref={containerRef} className="snap-cinematic">
        <VideoScrubBackground containerRef={containerRef} />

        {sections.map((section, idx) => {
          const displayNumber = String(idx).padStart(2, '0');

          if (section.type === 'hero') {
            return (
              <CinematicSection key={section.id} id={section.id} disableVideo overlay="dark">
                <DecorativeElements variant="minimal" />

                <div className="mx-auto w-full max-w-6xl px-6 md:px-24 lg:px-40 text-center">
                  <ScrollReveal delay="delay-100">
                    <p className="font-sans text-[10px] tracking-luxe uppercase" style={{ color: `${theme.primaryColor}E6` }}>
                      {section.content.badge}
                    </p>
                  </ScrollReveal>
                  
                  <ScrollReveal delay="delay-300" animation="reveal-up">
                    <h1 
                      className="mt-8 font-heading text-balance text-4xl font-normal leading-[1.05] text-white md:text-7xl lg:text-[7.5rem]"
                      dangerouslySetInnerHTML={{ __html: section.content.title }}
                    />
                  </ScrollReveal>

                  <ScrollReveal delay="delay-500">
                    <p className="mx-auto mt-10 max-w-xl font-sans text-base font-light leading-relaxed text-white/75 md:text-lg">
                      {section.content.description}
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay="delay-700">
                    <button
                      onClick={() => scrollToNext(idx + 1)}
                      className="group mt-14 inline-flex items-center gap-4 border px-8 py-3 md:px-10 md:py-4 font-sans text-[11px] tracking-luxe uppercase transition-all duration-700 hover:text-black"
                      style={{ 
                        borderColor: `${theme.primaryColor}80`,
                        color: theme.primaryColor,
                      } as any}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.primaryColor;
                        e.currentTarget.style.borderColor = theme.primaryColor;
                        e.currentTarget.style.color = '#000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = `${theme.primaryColor}80`;
                        e.currentTarget.style.color = theme.primaryColor;
                      }}
                    >
                      {section.content.buttonText}
                      <span className="inline-block h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
                    </button>
                  </ScrollReveal>
                </div>

                <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-glow">
                  <div className="h-12 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${theme.primaryColor}B3)` }} />
                </div>
              </CinematicSection>
            );
          }

          if (section.type === 'about') {
            return (
              <CinematicSection key={section.id} id={section.id} disableVideo overlay="darker">
                <DecorativeElements number={displayNumber} variant="editorial" />

                <div className="mx-auto grid w-full max-w-7xl px-6 md:px-24 lg:px-40 md:grid-cols-12 gap-12 md:gap-0 items-center">
                  <div className="md:col-span-5 relative z-10">
                    <ScrollReveal delay="delay-100" animation="reveal-right">
                      <div className="flex items-center gap-6 mb-12">
                         <span className="font-sans text-[11px] tracking-[0.5em] uppercase" style={{ color: theme.primaryColor }}>{section.label}</span>
                         <div className="h-px w-24" style={{ background: `linear-gradient(to right, ${theme.primaryColor}, transparent)` }} />
                      </div>
                    </ScrollReveal>

                    <ScrollReveal delay="delay-200" animation="reveal-skew">
                      <h2 
                        className="font-heading text-4xl md:text-5xl lg:text-[5.5rem] font-normal leading-[1] text-white"
                        dangerouslySetInnerHTML={{ __html: section.content.title }}
                      />
                    </ScrollReveal>
                    
                    <ScrollReveal delay="delay-400" className="mt-12 max-w-sm">
                      <p className="font-sans text-sm tracking-widest uppercase text-white/40 leading-relaxed">
                        {section.content.subtitle}
                      </p>
                    </ScrollReveal>
                  </div>

                  <div className="md:col-span-6 md:col-start-7 relative">
                    <ScrollReveal delay="delay-300" animation="reveal-scale">
                      <div className="relative p-6 md:p-16 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-sm shadow-luxe overflow-hidden group">
                        <div className="absolute -right-20 -top-20 h-64 w-64 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" style={{ backgroundColor: `${theme.primaryColor}1A` }} />
                        
                        <div className="relative z-10">
                          <p className="font-sans text-lg font-light leading-relaxed text-white/90 md:text-xl">
                            {section.content.body1}
                          </p>
                          
                          <p className="mt-8 font-sans text-base font-light leading-relaxed text-white/60">
                            {section.content.body2}
                          </p>

                          <div className="mt-16 pt-12 border-t border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="space-y-4">
                              <span className="block font-sans text-[10px] tracking-widest uppercase" style={{ color: `${theme.primaryColor}99` }}>Founder — Profile</span>
                              <h4 className="font-heading text-2xl text-white">{section.content.founderName}</h4>
                              <p className="max-w-[240px] font-sans text-[11px] leading-relaxed text-white/40 uppercase tracking-[0.2em]">
                                {section.content.founderRole}
                              </p>
                            </div>
                            
                            <div className="flex flex-col items-end">
                               <div className="font-serif italic text-2xl mb-2 select-none" style={{ color: `${theme.primaryColor}4D` }}>{section.content.founderSignature}</div>
                               <div className="h-px w-16" style={{ backgroundColor: `${theme.primaryColor}66` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </CinematicSection>
            );
          }

          if (section.type === 'service') {
            return (
              <ServiceSection
                key={section.id}
                id={section.id}
                number={displayNumber}
                division={section.content.division}

                title={section.content.title}
                focus={section.content.focus}
                body={section.content.body}
                services={section.content.services}
                sectors={section.content.sectors}
                align={section.content.align}
                accentColor={section.content.accentColor}
                layout={section.content.layout}
                disableVideo
              />
            );
          }

          if (section.type === 'contact') {
            return (
              <CinematicSection key={section.id} id={section.id} disableVideo overlay="darker" contentClassName="items-center">
                <DecorativeElements variant="glow" number={displayNumber} accentColor={theme.primaryColor} />
                
                <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-6 py-20 md:px-24 md:py-24 lg:px-40">
                  <ScrollReveal delay="delay-100">
                    <div className="flex items-center gap-4">
                      <span className="font-sans text-[10px] tracking-luxe uppercase" style={{ color: theme.primaryColor }}>{displayNumber}</span>

                      <span className="h-px w-8 bg-white/20" />
                      <span className="font-sans text-[10px] tracking-luxe uppercase text-white/60">Connection</span>
                    </div>
                  </ScrollReveal>

                  <div className="mt-12 text-center md:text-left">
                    <ScrollReveal delay="delay-300" animation="reveal-up">
                      <h2 
                        className="font-heading text-balance text-4xl font-normal leading-[1.05] text-white md:text-7xl lg:text-8xl"
                        dangerouslySetInnerHTML={{ __html: section.content.title }}
                      />
                    </ScrollReveal>
                  </div>

                  <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
                    <ScrollReveal delay="delay-500" animation="reveal-up" className="bg-black/40 backdrop-blur-md group">
                      <div className="p-6 md:p-12 transition-all duration-500 hover:bg-white/[0.03]">
                        <span className="font-sans text-[8px] tracking-widest uppercase text-white/30 block mb-4">Email Inquiry</span>
                        <a href={`mailto:${section.content.email}`} className="font-heading text-lg md:text-xl text-white hover:text-primary transition-colors block break-all">
                          {section.content.email}
                        </a>
                        <div className="mt-6 h-px w-0 bg-primary/50 transition-all duration-700 group-hover:w-full" />
                      </div>
                    </ScrollReveal>
                    
                    <ScrollReveal delay="delay-600" animation="reveal-up" className="bg-black/40 backdrop-blur-md group">
                      <div className="p-6 md:p-12 transition-all duration-500 hover:bg-white/[0.03]">
                        <span className="font-sans text-[8px] tracking-widest uppercase text-white/30 block mb-4">Direct Contact</span>
                        <a href={`tel:${section.content.phone?.replace(/\s+/g, '')}`} className="font-heading text-lg md:text-xl text-white hover:text-primary transition-colors block">
                          {section.content.phone}
                        </a>
                        <div className="mt-6 h-px w-0 bg-primary/50 transition-all duration-700 group-hover:w-full" />
                      </div>
                    </ScrollReveal>
                    
                    <ScrollReveal delay="delay-700" animation="reveal-up" className="bg-black/40 backdrop-blur-md group">
                      <div className="p-6 md:p-12 transition-all duration-500 hover:bg-white/[0.03]">
                        <span className="font-sans text-[8px] tracking-widest uppercase text-white/30 block mb-4">Digital Presence</span>
                        <a href={section.content.instagramUrl} target="_blank" rel="noreferrer" className="font-heading text-lg md:text-xl text-white hover:text-primary transition-colors block">
                          {section.content.instagram}
                        </a>
                        <div className="mt-6 h-px w-0 bg-primary/50 transition-all duration-700 group-hover:w-full" />
                      </div>
                    </ScrollReveal>
                  </div>

                  <ScrollReveal delay="delay-1000">
                    <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-12 md:flex-row md:items-end">
                      <div className="flex flex-col gap-2 font-sans text-[10px] tracking-luxe uppercase text-white/40">
                        <span>Divine Management Group</span>
                        <span className="text-white/20">Dubai · GCC · MENA</span>
                      </div>
                      <div className="font-sans text-[9px] tracking-widest uppercase text-white/20">
                        © {new Date().getFullYear()} — All rights reserved
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </CinematicSection>
            );
          }

          return null;
        })}
      </div>
    </main>
  );
}

function ServiceSection({
  id,
  number,
  division,
  title,
  focus,
  body,
  services,
  sectors,
  videoSrc,
  align,
  accentColor,
  layout = "split",
  disableVideo = false,
}: {
  id: string;
  number: string;
  division: string;
  title: string;
  focus?: string;
  body: string;
  services?: string[];
  sectors?: string[];
  videoSrc?: string;
  align: "left" | "right";
  accentColor?: string;
  layout?: "split" | "center-grid" | "heroic";
  disableVideo?: boolean;
}) {
  return (
    <CinematicSection
      id={id}
      videoSrc={videoSrc}
      overlay="darker"
      disableVideo={disableVideo}
    >
      <DecorativeElements number={number} accentColor={accentColor} variant={layout === "heroic" ? "glow" : "lines"} />
      
      <div className="mx-auto w-full max-w-7xl px-6 md:px-24 lg:px-40">
        {layout === "split" && (
          <div
            className={`max-w-2xl ${align === "right" ? "ml-auto text-right" : "text-left"}`}
          >
            <ScrollReveal delay="delay-100">
              <div
                className={`flex items-center gap-4 ${align === "right" ? "justify-end" : ""}`}
              >
                <span className="font-sans text-[10px] tracking-luxe uppercase" style={{ color: accentColor || "var(--gold)" }}>
                  {number}
                </span>
                <span className="h-px w-10 bg-white/20" />
                <span className="font-sans text-[10px] tracking-luxe uppercase text-white/60">
                  {division}
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay="delay-200" animation="reveal-up">
              <h3 className="mt-8 font-heading text-balance text-4xl font-normal leading-[1.1] text-white md:text-5xl lg:text-6xl">
                {title}
              </h3>
            </ScrollReveal>

            {focus && (
              <ScrollReveal delay="delay-300">
                <p className="mt-6 font-sans text-[11px] tracking-widest uppercase" style={{ color: accentColor || "var(--gold)" }}>
                  Focus: {focus}
                </p>
              </ScrollReveal>
            )}

            <ScrollReveal delay="delay-400">
              <p className="mt-8 font-sans text-base font-light leading-[1.9] text-white/75 md:text-lg">
                {body}
              </p>
            </ScrollReveal>

            {services && (
              <ScrollReveal delay="delay-500">
                <ul
                  className={`mt-10 grid grid-cols-1 gap-y-4 font-sans text-[10px] tracking-luxe uppercase text-white/50 sm:grid-cols-2 md:gap-x-12 ${align === "right" ? "justify-items-end" : ""}`}
                >
                  {services.map((s, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {align === "left" && <span className="h-px w-4" style={{ backgroundColor: accentColor || "var(--gold)", opacity: 0.3 }} />}
                      {s}
                      {align === "right" && <span className="h-px w-4" style={{ backgroundColor: accentColor || "var(--gold)", opacity: 0.3 }} />}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {sectors && (
              <ScrollReveal delay="delay-700">
                <div className={`mt-12 pt-8 border-t border-white/10 ${align === "right" ? "text-right" : "text-left"}`}>
                  <p className="font-sans text-[9px] tracking-luxe uppercase text-white/40 mb-4">Sectors Supported</p>
                  <div className={`flex flex-wrap gap-x-4 gap-y-2 ${align === "right" ? "justify-end" : "justify-start"}`}>
                    {sectors.map((s, i) => (
                      <span key={i} className="font-sans text-[10px] text-white/60">
                        {s}{i < sectors.length - 1 && <span className="ml-4 opacity-30" style={{ color: accentColor || "var(--gold)" }}>/</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        )}

        {layout === "center-grid" && (
          <div className="text-center max-w-4xl mx-auto">
            <ScrollReveal delay="delay-100">
              <div className="flex flex-col items-center gap-4">
                <span className="font-sans text-[10px] tracking-luxe uppercase" style={{ color: accentColor || "var(--gold)" }}>
                  {number} — {division}
                </span>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay="delay-200" animation="reveal-up">
              <h3 className="mt-8 font-heading text-balance text-4xl font-normal leading-[1.1] text-white md:text-6xl lg:text-7xl">
                {title}
              </h3>
            </ScrollReveal>

            <ScrollReveal delay="delay-400">
              <p className="mt-10 font-sans text-lg font-light leading-relaxed text-white/70">
                {body}
              </p>
            </ScrollReveal>

            {services && (
              <ScrollReveal delay="delay-600">
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {services.map((s, i) => (
                    <div key={i} className="p-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all hover:bg-white/[0.05]">
                      <span className="font-sans text-[10px] tracking-luxe uppercase text-white/40">{s}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        )}

        {layout === "heroic" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <ScrollReveal delay="delay-100">
                <p className="font-sans text-[10px] tracking-luxe uppercase" style={{ color: accentColor || "var(--gold)" }}>
                  {number} — {division}
                </p>
              </ScrollReveal>
              <ScrollReveal delay="delay-200" animation="reveal-up">
                <h3 className="mt-8 font-heading text-balance text-5xl font-normal leading-[0.95] text-white md:text-8xl">
                  {title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? "italic text-gold block" : "block"}>{word} </span>
                  ))}
                </h3>
              </ScrollReveal>
            </div>
            <div className="bg-white/[0.03] p-8 md:p-12 backdrop-blur-md border-l border-gold/20">
              <ScrollReveal delay="delay-400">
                <p className="font-sans text-xl font-light leading-relaxed text-white/80 italic">
                  "{focus}"
                </p>
              </ScrollReveal>
              <ScrollReveal delay="delay-500">
                <p className="mt-8 font-sans text-base font-light leading-relaxed text-white/60">
                  {body}
                </p>
              </ScrollReveal>
              {services && (
                <div className="mt-10 flex flex-col gap-4">
                  {services.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="h-px w-6 bg-gold/30 group-hover:w-10 transition-all" />
                      <span className="font-sans text-[11px] tracking-widest uppercase text-white/40 group-hover:text-gold transition-colors">{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </CinematicSection>
  );
}
