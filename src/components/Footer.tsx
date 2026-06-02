import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HlsVideo from "./HlsVideo";
import { type FooterSettings, type SocialLink } from "../store";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Footer({
  footer,
  socials,
}: {
  footer: FooterSettings;
  socials: SocialLink[];
}) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, [footer.marqueeText]);

  const headlineLines = footer.headline.split("\n");

  return (
    <footer id="contact" className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background video (flipped) */}
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo
          src={HLS_SRC}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translate(-50%, -50%) scaleY(-1)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden mb-16 md:mb-24">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {Array(20).fill(footer.marqueeText).map((t, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/10 uppercase tracking-tight pr-4"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center px-6 mb-16 md:mb-24">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">Get in touch</p>
          <h2 className="text-5xl md:text-7xl font-display italic text-text-primary mb-10 leading-tight">
            {headlineLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <a
            href={`mailto:${footer.email}`}
            className="relative inline-flex text-sm font-medium rounded-full px-8 py-4 border border-stroke text-text-primary transition-all duration-200 group hover:scale-105"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="relative z-10 flex items-center gap-2 bg-bg/10 backdrop-blur-sm rounded-full px-4 py-1">
              {footer.email} ↗
            </span>
          </a>
        </div>

        {/* Footer bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-stroke/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted">{footer.availableText}</span>
          </div>

          <div className="flex items-center gap-1">
            {socials.map((s, i) => (
              <span key={s.id} className="flex items-center">
                <a
                  href={s.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-text-primary transition-colors duration-200 px-2"
                >
                  {s.label}
                </a>
                {i < socials.length - 1 && <span className="w-px h-3 bg-stroke" />}
              </span>
            ))}
          </div>

          <p className="text-xs text-muted">© 2026 Michael Smith. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
