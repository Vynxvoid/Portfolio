import { motion } from 'framer-motion'
import Counter from './Counter'

const ease = [0.25, 0.1, 0.25, 1]

const stats = [
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 8, suffix: '', label: 'Awards' },
  { value: 4, suffix: '', label: 'Years' },
]

function About() {
  return (
    <section
      id="about"
      className="bg-[var(--color-dark)] px-4 py-20 text-white md:px-8 md:py-28"
      data-cursor-zone="lime"
    >
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
        >
          <img
            src="/assets/images/studio.jpg"
            alt="Portrait"
            className="h-[480px] w-full rounded-[32px] object-cover md:h-[620px]"
          />
        </motion.div>

        <div>
          <motion.p
            className="label mb-4 text-white/70"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
          >
            About
          </motion.p>

          <motion.h2
            className="font-display text-[clamp(4.5rem,10vw,10rem)] uppercase leading-[0.88] tracking-[0.02em]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
          >
            About Me
          </motion.h2>

          <motion.p
            className="mt-6 max-w-2xl font-editorial text-[clamp(1.45rem,2.2vw,2.2rem)] italic leading-[1.08] text-white/86"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            I am a designer focused on digital products, motion, and visual systems. My work is rooted in
            editorial composition, clear structure, and building interfaces that feel precise, expressive,
            and easy to use.
          </motion.p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: 0.12 + index * 0.08, ease }}
              >
                <div className="font-display text-[clamp(4rem,7vw,6.5rem)] uppercase leading-none text-[var(--color-accent)]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
