import { motion } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

function Testimonials({ testimonials }) {
  return (
    <section className="bg-[var(--color-white)] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <motion.p
          className="label mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          Testimonials
        </motion.p>
        <motion.h2
          className="font-display text-[var(--text-heading)] uppercase leading-[0.92] tracking-[0.02em]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          Nice Words
        </motion.h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-[1fr_0.9fr_1.1fr]">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className={`rounded-[28px] p-6 md:p-8 ${
                testimonial.variant === 'dark'
                  ? 'bg-[var(--color-black)] text-white'
                  : 'border border-black/10 bg-[var(--color-off-white)] text-[var(--color-black)]'
              } ${index === 1 ? 'md:translate-y-12' : ''} ${index === 2 ? 'xl:translate-y-24' : ''}`}
              data-cursor-zone={testimonial.variant === 'dark' ? 'lime' : undefined}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease }}
            >
              <p className="font-editorial text-[clamp(1.5rem,2.2vw,2.3rem)] italic leading-[1.08]">
                “{testimonial.quote}”
              </p>
              <p
                className={`mt-8 font-mono text-[11px] uppercase tracking-[0.18em] ${
                  testimonial.variant === 'dark' ? 'text-white/60' : 'text-[var(--color-text-muted)]'
                }`}
              >
                {testimonial.name}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
