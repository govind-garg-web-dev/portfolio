import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { type BlogPost } from "../store";

const inView = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Journal({ blogPosts }: { blogPosts: BlogPost[] }) {
  const published = blogPosts.filter((p) => p.published);

  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          variants={inView}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-end justify-between mb-10 md:mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-text-primary leading-tight mb-2">
              Recent <em style={{ fontStyle: "italic" }}>thoughts</em>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-sm">
              Musings on design, development, and the creative process.
            </p>
          </div>

          <Link
            to="/journal"
            className="hidden md:inline-flex relative items-center gap-2 text-sm text-muted hover:text-text-primary rounded-full px-5 py-2.5 border border-stroke transition-all duration-200 group"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="relative z-10 flex items-center gap-2">View all <span>→</span></span>
          </Link>
        </motion.div>

        <div className="flex flex-col gap-4">
          {published.slice(0, 4).map((post, i) => (
            <motion.a
              key={post.id}
              href={`/blog/${post.slug}`}
              variants={inView}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-all duration-300 group"
            >
              {post.coverImg ? (
                <img src={post.coverImg} alt={post.title} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              ) : (
                <span className="w-12 h-12 rounded-full bg-stroke/40 flex items-center justify-center text-muted/30 text-lg flex-shrink-0 font-display italic">✦</span>
              )}

              <div className="flex-1 min-w-0">
                <span className="block text-sm md:text-base text-text-primary font-medium group-hover:translate-x-1 transition-transform duration-200 truncate">
                  {post.title}
                </span>
                {post.tags.length > 0 && (
                  <div className="flex gap-1.5 mt-1 flex-wrap">
                    {post.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] text-muted bg-stroke/40 rounded px-1.5 py-0.5 uppercase tracking-wide">{t}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-4 text-xs text-muted flex-shrink-0">
                {post.readTime && <span>{post.readTime}</span>}
                {post.readTime && post.date && <span className="w-px h-4 bg-stroke" />}
                {post.date && <span>{post.date}</span>}
              </div>

              <span className="text-muted group-hover:text-text-primary transition-colors duration-200 flex-shrink-0">→</span>
            </motion.a>
          ))}

          {published.length === 0 && (
            <p className="text-center text-muted py-10 text-sm">No posts published yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
