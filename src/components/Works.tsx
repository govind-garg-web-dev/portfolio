import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { type Project } from "../store";

const inView = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Works({ projects }: { projects: Project[] }) {
  return (
    <section id="works" className="bg-bg py-12 md:py-16">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-text-primary leading-tight mb-2">
              Featured <em style={{ fontStyle: "italic" }}>projects</em>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <Link
            to="/work"
            className="hidden md:inline-flex relative items-center gap-2 text-sm text-muted hover:text-text-primary rounded-full px-5 py-2.5 border border-stroke transition-all duration-200 group"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="relative z-10 flex items-center gap-2">View all work <span>→</span></span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={inView}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={`${project.span} ${project.aspect} relative overflow-hidden rounded-3xl bg-surface border border-stroke group cursor-pointer`}
            onClick={() => project.href && project.href !== "#" && window.open(project.href, "_blank", "noopener,noreferrer")}
            >
              {project.img && (
                <img
                  src={project.img}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg flex items-end p-6">
                <div className="relative inline-flex">
                  <span className="absolute inset-[-2px] rounded-full accent-gradient" />
                  <span className="relative bg-white text-black text-sm font-medium rounded-full px-4 py-2 z-10 flex items-center gap-1.5">
                    {project.href && project.href !== "#" ? "Open ↗" : "View"} —{" "}
                    <em style={{ fontStyle: "italic" }} className="font-display">{project.title}</em>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
