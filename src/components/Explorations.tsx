import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { type ExplorationItem } from "../store";

gsap.registerPlugin(ScrollTrigger);

interface LightboxProps {
  src: string;
  label: string;
  onClose: () => void;
}

function Lightbox({ src, label, onClose }: LightboxProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={label} className="w-full rounded-2xl object-cover" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg/80 flex items-center justify-center text-text-primary text-sm"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Explorations({ items }: { items: ExplorationItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col0Ref = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  const col0 = items.filter((i) => i.col === 0);
  const col1 = items.filter((i) => i.col === 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      gsap.to(col0Ref.current, {
        y: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(col1Ref.current, {
        y: "-25%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="explorations" className="relative min-h-[300vh] bg-bg overflow-hidden">
        <div ref={contentRef} className="relative z-10 h-screen flex items-center justify-center pointer-events-none">
          <div className="text-center px-6 pointer-events-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
              <div className="w-8 h-px bg-stroke" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-text-primary leading-tight mb-4">
              Visual <em style={{ fontStyle: "italic" }}>playground</em>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-sm mx-auto mb-6">
              A collection of experiments in visual design and photography.
            </p>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary rounded-full px-5 py-2.5 border border-stroke transition-all duration-200 group"
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="relative z-10 flex items-center gap-2">View on Dribbble ↗</span>
            </a>
          </div>
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none flex items-start justify-center pt-[10vh]">
          <div className="w-full max-w-[1400px] px-6 grid grid-cols-2 gap-12 md:gap-40">
            <div ref={col0Ref} className="flex flex-col gap-8 pt-[30vh]">
              {col0.map((item) => (
                <div
                  key={item.id}
                  className="aspect-square max-w-[320px] rounded-2xl overflow-hidden cursor-pointer pointer-events-auto transition-transform duration-300 hover:scale-105"
                  style={{ transform: `rotate(${item.rotation}deg)` }}
                  onClick={() => setLightbox({ src: item.img, label: item.label })}
                >
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div ref={col1Ref} className="flex flex-col gap-8 pt-[60vh]">
              {col1.map((item) => (
                <div
                  key={item.id}
                  className="aspect-square max-w-[320px] ml-auto rounded-2xl overflow-hidden cursor-pointer pointer-events-auto transition-transform duration-300 hover:scale-105"
                  style={{ transform: `rotate(${item.rotation}deg)` }}
                  onClick={() => setLightbox({ src: item.img, label: item.label })}
                >
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <Lightbox src={lightbox.src} label={lightbox.label} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
