import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HlsVideo from "./HlsVideo";
import { type HeroSettings } from "../store";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Hero({ hero }: { hero: HeroSettings }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hero.roles.length) return;
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % hero.roles.length);
    }, 2000);
    return () => clearInterval(id);
  }, [hero.roles]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1, delay: 0.3 },
        "<0.2"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handlePrimary = () => {
    const href = hero.ctaPrimaryHref;
    if (href.startsWith("#")) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col">
      <div className="absolute inset-0">
        <HlsVideo
          src={HLS_SRC}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6">
        {hero.eyebrow && (
          <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
            {hero.eyebrow}
          </p>
        )}

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          {hero.name}
        </h1>

        {hero.roles.length > 0 && (
          <p className="blur-in text-sm md:text-base text-muted mb-4">
            A{" "}
            <span
              key={roleIndex}
              className="font-display italic text-text-primary animate-role-fade-in inline-block"
            >
              {hero.roles[roleIndex]}
            </span>{" "}
            lives in {hero.city}.
          </p>
        )}

        {hero.description && (
          <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
            {hero.description}
          </p>
        )}

        <div className="blur-in inline-flex gap-4 flex-wrap justify-center">
          <button
            onClick={handlePrimary}
            className="relative rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg font-medium transition-all duration-200 hover:scale-105 group overflow-visible"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-0" />
            <span className="relative z-10 flex items-center gap-1 bg-text-primary group-hover:bg-bg group-hover:text-text-primary rounded-full px-4 py-2 transition-all duration-200">
              {hero.ctaPrimaryLabel}
            </span>
          </button>

          <a
            href={hero.ctaSecondaryHref}
            className="relative rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary font-medium transition-all duration-200 hover:scale-105 group overflow-visible"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-0" />
            <span className="relative z-10 flex items-center gap-1 bg-bg rounded-full px-4 py-2">
              {hero.ctaSecondaryLabel}
            </span>
          </a>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 pb-10">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute inset-x-0 h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
