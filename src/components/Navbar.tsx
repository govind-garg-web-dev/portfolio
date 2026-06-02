import { useEffect, useState } from "react";
import { type NavSettings } from "../store";

export default function Navbar({ nav }: { nav: NavSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(nav.links[0]?.label ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo(nav.links[0]?.sectionId ?? "hero")}
          className="relative w-9 h-9 rounded-full flex items-center justify-center group transition-transform duration-200 hover:scale-110"
        >
          <span className="absolute inset-0 rounded-full accent-gradient group-hover:[background:linear-gradient(270deg,#89AACC_0%,#4E85BF_100%)] transition-all duration-300" />
          <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary leading-none">
              {nav.logoText}
            </span>
          </span>
        </button>

        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {nav.links.map((link) => (
          <button
            key={link.label}
            onClick={() => {
              setActive(link.label);
              scrollTo(link.sectionId);
            }}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 ${
              active === link.label
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {link.label}
          </button>
        ))}

        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        <a
          href="mailto:hello@michaelsmith.com"
          className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary transition-all duration-200 group"
        >
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <span className="relative z-10 flex items-center gap-1 bg-surface rounded-full px-3 py-1.5 backdrop-blur-md">
            Say hi ↗
          </span>
        </a>
      </div>
    </nav>
  );
}
