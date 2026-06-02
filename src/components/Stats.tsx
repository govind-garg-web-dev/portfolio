import { motion, type Variants } from "framer-motion";
import { type Stat } from "../store";

const inView: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              variants={inView}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-7xl md:text-8xl font-display italic text-text-primary mb-3 leading-none">
                {stat.value}
              </div>
              <div className="text-muted text-sm uppercase tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
