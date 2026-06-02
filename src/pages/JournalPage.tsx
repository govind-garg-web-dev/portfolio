import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { loadData, type SiteData } from "../store";
import { loadFromSupabase } from "../lib/db";

const inView: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function JournalPage() {
  const [data, setData] = useState<SiteData>(loadData);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    loadFromSupabase().then(setData).catch(() => {});
  }, []);

  const posts = (data.blog ?? []).filter((p) => p.published);
  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];
  const filtered = activeTag === "All" ? posts : posts.filter((p) => p.tags.includes(activeTag));

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".journal-hero-text", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
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
          <Link to="/work" className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-all">Work</Link>
        </div>
      </nav>

      {/* Hero */}
      <div ref={heroRef} className="pt-36 pb-16 px-6 max-w-[1200px] mx-auto md:px-10 lg:px-16">
        <p className="journal-hero-text text-xs text-muted uppercase tracking-[0.3em] mb-4">Journal</p>
        <h1 className="journal-hero-text text-5xl md:text-7xl font-display italic text-text-primary leading-[1.0] mb-6">
          All <em style={{ fontStyle: "italic" }}>thoughts</em>
        </h1>
        <p className="journal-hero-text text-muted text-base max-w-md">
          {posts.length} post{posts.length !== 1 ? "s" : ""} on design, development, and everything in between.
        </p>
      </div>

      {/* Tag filter */}
      {allTags.length > 1 && (
        <div className="px-6 md:px-10 lg:px-16 max-w-[1200px] mx-auto mb-10">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`relative text-xs rounded-full px-4 py-1.5 transition-all duration-200 ${
                  activeTag === tag ? "text-bg font-medium" : "text-muted border border-stroke hover:text-text-primary"
                }`}
              >
                {activeTag === tag && <span className="absolute inset-0 rounded-full accent-gradient -z-10" />}
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Post list */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        {filtered.length === 0 ? (
          <p className="text-muted text-sm py-20 text-center">No posts in this category.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((post, i) => (
              <motion.a
                key={post.id}
                href={`/blog/${post.slug}`}
                variants={inView}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-5 p-5 bg-surface/30 hover:bg-surface border border-stroke rounded-3xl transition-all duration-300 group"
              >
                {post.coverImg ? (
                  <img src={post.coverImg} alt={post.title} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <span className="w-16 h-16 rounded-2xl bg-stroke/40 flex items-center justify-center text-muted/30 text-2xl flex-shrink-0 font-display italic">✦</span>
                )}

                <div className="flex-1 min-w-0">
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {post.tags.map((t) => (
                        <span key={t} className="text-[10px] text-muted bg-stroke/40 rounded px-1.5 py-0.5 uppercase tracking-wide">{t}</span>
                      ))}
                    </div>
                  )}
                  <p className="text-base font-medium text-text-primary truncate group-hover:translate-x-1 transition-transform duration-200">{post.title}</p>
                  {post.excerpt && <p className="text-sm text-muted mt-0.5 line-clamp-1">{post.excerpt}</p>}
                </div>

                <div className="hidden md:flex flex-col items-end gap-1 text-xs text-muted flex-shrink-0">
                  {post.date && <span>{post.date}</span>}
                  {post.readTime && <span>{post.readTime}</span>}
                </div>

                <span className="text-muted group-hover:text-text-primary transition-colors flex-shrink-0 text-lg">→</span>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
