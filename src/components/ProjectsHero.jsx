import { motion } from "framer-motion";
import ParticleSphere from "./ParticleSphere";

const ease = [0.25, 0.1, 0.25, 1];
const lineOne = ["SELECTED"];
const lineTwo = ["PROJECTS"];
const sideReveal = {
  hiddenLeft: { opacity: 0, x: -72 },
  hiddenRight: { opacity: 0, x: 72 },
  hiddenDown: { opacity: 0, y: 32 },
  hiddenScale: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, x: 0, y: 0, scale: 1 },
};

function CircularBadge() {
  return (
    <motion.div
      className="relative flex h-28 w-28 items-center justify-center md:h-36 md:w-36"
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <path
            id="badge-circle"
            d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
          />
        </defs>
        <text className="fill-[var(--color-black)] font-mono text-[15px] uppercase tracking-[0.24em]">
          <textPath href="#badge-circle">
            Scroll Down ✦ Scroll Down ✦ Scroll Down ✦
          </textPath>
        </text>
      </svg>
      <div className="absolute h-3 w-3 rounded-full bg-[var(--color-accent)]" />
    </motion.div>
  );
}

function AnimatedLine({ words, accentWord, revealReady }) {
  return (
    <div className="overflow-hidden">
      {/* justify-end so words appear right-aligned */}
      <div className="flex flex-wrap justify-end gap-x-[0.12em] leading-[0.88]">
        {words.map((word, index) => (
          <span key={word} className="overflow-hidden">
            <motion.span
              className={`inline-block ${word === accentWord ? "text-[var(--color-accent)]" : ""}`}
              initial={{ y: "110%" }}
              animate={revealReady ? { y: 0 } : { y: "110%" }}
              transition={{ duration: 0.9, delay: index * 0.06, ease }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectsHero({ revealReady }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--color-white)] px-4 pb-6 pt-28 md:px-8 md:pb-8 md:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,13,13,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between">
        {/* ── Top: all content on the RIGHT ── */}
        <div className="relative grid gap-10 lg:grid-cols-[minmax(420px,1fr)_minmax(0,0.9fr)] lg:items-start lg:pt-6">
          {/* Empty left spacer */}
          <div className="hidden lg:block" />

          {/* Right column — text right-aligned, everything slides in from right */}
          <div className="flex flex-col items-end text-right">
            {/* Big animated heading */}
            <h1 className="font-display text-[var(--text-hero)] uppercase tracking-[0.02em] w-full">
              <AnimatedLine words={lineOne} revealReady={revealReady} />
              <AnimatedLine
                words={lineTwo}
                accentWord="PROJECTS"
                revealReady={revealReady}
              />
            </h1>

            {/* "My Projects" subtitle */}
            <motion.h2
              className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[0.9] tracking-[0.03em]"
              initial="hiddenRight"
              animate={revealReady ? "visible" : "hiddenRight"}
              variants={sideReveal}
              transition={{ duration: 0.95, delay: 0.18, ease }}
            >
              My <span className="text-[var(--color-accent)]">Projects</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mt-6 max-w-[38rem] font-editorial text-[clamp(1.5rem,2.6vw,2.6rem)] italic leading-[1.02]"
              initial="hiddenRight"
              animate={revealReady ? "visible" : "hiddenRight"}
              variants={sideReveal}
              transition={{ duration: 0.95, delay: 0.32, ease }}
            >
              A collection of ML systems, full-stack applications, and
              intelligent products driven by data and impact.
            </motion.p>

            {/* Circular badge — slides in from right */}
            <motion.div
              className="mt-8"
              initial="hiddenRight"
              animate={revealReady ? "visible" : "hiddenRight"}
              variants={sideReveal}
              transition={{ duration: 0.85, delay: 0.48, ease }}
            >
              <CircularBadge />
            </motion.div>
          </div>
        </div>

        {/* ── Bottom-left area: ParticleSphere nudged up & right ── */}
        <div className="flex items-end">
          <motion.div
            className="relative hidden min-h-[340px] w-[340px] -translate-y-12 translate-x-16 lg:block"
            initial="hiddenScale"
            animate={revealReady ? "visible" : "hiddenScale"}
            variants={sideReveal}
            transition={{ duration: 1.15, delay: 0.2, ease }}
            data-cursor-zone="footer-default"
          >
            <ParticleSphere />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsHero;
