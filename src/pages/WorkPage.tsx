import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { loadData, type SiteData } from "../store";
import { loadFromSupabase } from "../lib/db";

const inView = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function WorkPage() {
  const [data, setData] = useState<SiteData>(loadData);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFromSupabase().then(setData).catch(() => {});
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".work-hero-text", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div className="inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2">
          <Link to="/" className="relative w-9 h-9 rounded-full flex items-center justify-center group hover:scale-110 transition-transform">
            <span className="absolute inset-0 rounded-full accent-gradient" />
            <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary leading-none">{data.nav.logoText}</span>
            </span>
          </Link>
          <span className="w-px h-5 bg-stroke mx-1" />
          <Link to="/" className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-all">← Home</Link>
          <Link to="/journal" className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-all">Journal</Link>
        </div>
      </nav>

      {/* Hero */}
      <div ref={heroRef} className="pt-36 pb-16 px-6 max-w-[1200px] mx-auto md:px-10 lg:px-16">
        <p className="work-hero-text text-xs text-muted uppercase tracking-[0.3em] mb-4">Selected Work</p>
        <h1 className="work-hero-text text-5xl md:text-7xl font-display italic text-text-primary leading-[1.0] mb-6">
          All <em style={{ fontStyle: "italic" }}>projects</em>
        </h1>
        <p className="work-hero-text text-muted text-base max-w-md">
          {data.projects.length} project{data.projects.length !== 1 ? "s" : ""} — from concept to launch.
        </p>
      </div>

      {/* Bento grid */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {data.projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={inView}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className={`${project.span} ${project.aspect} relative overflow-hidden rounded-3xl bg-surface border border-stroke group cursor-pointer`}
              onClick={() =>
                project.href && project.href !== "#"
                  ? window.open(project.href, "_blank", "noopener,noreferrer")
                  : undefined
              }
            >
              {project.img && (
                <img
                  src={project.img}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Halftone */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg flex items-end p-6">
                <div className="flex items-end justify-between w-full gap-3">
                  <div className="relative inline-flex">
                    <span className="absolute inset-[-2px] rounded-full accent-gradient" />
                    <span className="relative bg-white text-black text-sm font-medium rounded-full px-4 py-2 z-10 flex items-center gap-1.5">
                      {project.href && project.href !== "#" ? "Open ↗" : "View"} —{" "}
                      <em style={{ fontStyle: "italic" }} className="font-display">{project.title}</em>
                    </span>
                  </div>
                  {project.href && project.href !== "#" && (
                    <span className="text-xs text-text-primary/60 font-mono break-all max-w-[140px] truncate">{project.href.replace(/^https?:\/\//, "")}</span>
                  )}
                </div>
              </div>

              {/* Default label (bottom-left, always visible) */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-sm font-medium text-white">{project.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {data.projects.length === 0 && (
          <p className="text-center text-muted py-20 text-sm">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
