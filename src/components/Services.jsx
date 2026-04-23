import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

function Services({ services }) {
  return (
    <section id="experiences" className="bg-[var(--color-white)] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <motion.div
          className="lg:sticky lg:top-28 lg:self-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="label mb-4">Experience</p>
          <h2 className="font-display text-[var(--text-heading)] uppercase leading-[0.92] tracking-[0.02em]">
            Experiences
          </h2>
          <p className="mt-6 max-w-lg font-editorial text-[clamp(1.35rem,2.1vw,2rem)] italic leading-[1.1] text-black/78">
            A mix of in-house roles, freelance work, and self-initiated projects across product, visuals,
            interaction, and systems thinking.
          </p>
        </motion.div>

        <div className="border-t border-black/15">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group flex items-start justify-between gap-6 border-b border-black/15 py-7"
              data-cursor="interactive"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: index * 0.06, ease }}
            >
              <div>
                <h3 className="font-display text-[clamp(2.8rem,4vw,4.5rem)] uppercase leading-none transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-xl font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                  {service.description}
                </p>
              </div>
              <span className="mt-3 text-2xl transition-transform duration-300 group-hover:translate-x-2">↗</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
