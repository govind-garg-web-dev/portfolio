import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { gsap } from "gsap";
import { loadData, type SiteData } from "../store";
import { type NavSettings } from "../store";
import { loadFromSupabase } from "../lib/db";

function Navbar({ nav }: { nav: NavSettings }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${scrolled ? "shadow-md shadow-black/10" : ""}`}>
        <Link to="/" className="relative w-9 h-9 rounded-full flex items-center justify-center group transition-transform duration-200 hover:scale-110">
          <span className="absolute inset-0 rounded-full accent-gradient" />
          <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary leading-none">{nav.logoText}</span>
          </span>
        </Link>
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />
        <Link to="/" className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-all duration-200">
          ← Back home
        </Link>
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />
        <Link to="/#journal" className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-all duration-200">
          Journal
        </Link>
      </div>
    </nav>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<SiteData>(loadData);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFromSupabase().then(setData).catch(() => {});
  }, []);

  const post = data.blog.find((p) => p.slug === slug && p.published);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".post-hero",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".post-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
      );
    }, contentRef);
    return () => ctx.revert();
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4 text-center px-6">
        <Navbar nav={data.nav} />
        <p className="text-6xl font-display italic text-text-primary/20">404</p>
        <p className="text-muted">Post not found or not published.</p>
        <Link to="/" className="text-sm text-text-primary underline underline-offset-4">Go home</Link>
      </div>
    );
  }

  return (
    <div ref={contentRef} className="min-h-screen bg-bg text-text-primary">
      <Navbar nav={data.nav} />

      {/* Hero */}
      <div className="post-hero pt-28 md:pt-36 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((t) => (
                <span key={t} className="text-xs text-muted bg-stroke/50 rounded-full px-3 py-1 uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-display italic text-text-primary leading-[1.05] tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-muted mb-8 max-w-xl leading-relaxed">{post.excerpt}</p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted border-t border-stroke pt-6">
            {post.date && <span>{post.date}</span>}
            {post.date && post.readTime && <span className="w-px h-4 bg-stroke" />}
            {post.readTime && <span>{post.readTime}</span>}
          </div>
        </div>
      </div>

      {/* Cover image */}
      {post.coverImg && (
        <div className="post-hero max-w-5xl mx-auto px-6 mb-14">
          <img
            src={post.coverImg}
            alt={post.title}
            className="w-full rounded-3xl object-cover max-h-[480px]"
          />
        </div>
      )}

      {/* Markdown content */}
      <div className="post-content max-w-3xl mx-auto px-6 pb-24">
        <div className="blog-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-stroke flex items-center justify-between flex-wrap gap-4">
          <Link to="/" className="text-sm text-muted hover:text-text-primary transition-colors">← Back home</Link>
          <Link to="/#journal" className="relative inline-flex text-sm font-medium rounded-full px-6 py-2.5 border border-stroke text-text-primary transition-all duration-200 group hover:scale-105">
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="relative z-10">More posts</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
