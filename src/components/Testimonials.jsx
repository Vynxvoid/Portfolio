import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const ease = [0.25, 0.1, 0.25, 1]

function Testimonials({ testimonials }) {
  const scrollContainerRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScrollEnabled) return

    const scrollTimer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const maxScroll = container.scrollWidth - container.clientWidth
        let newPosition = scrollPosition + 400
        
        // If we've reached the end, loop back to the beginning
        if (newPosition >= maxScroll) {
          newPosition = 0
          container.scrollTo({
            left: 0,
            behavior: 'auto',
          })
          setScrollPosition(0)
        } else {
          container.scrollTo({
            left: newPosition,
            behavior: 'smooth',
          })
          setScrollPosition(newPosition)
        }
      }
    }, 5000)

    return () => clearTimeout(scrollTimer)
  }, [scrollPosition, autoScrollEnabled])

  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollLeft)
    setAutoScrollEnabled(false)
    // Re-enable auto-scroll after 3 seconds of inactivity
    const inactivityTimer = setTimeout(() => setAutoScrollEnabled(true), 3000)
    return () => clearTimeout(inactivityTimer)
  }

  // Generate particle stream
  const particles = Array.from({ length: 12 }, (_, i) => i)

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

        <div className="relative mt-12 pb-16">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="scrollbar-hide flex gap-5 overflow-x-scroll pb-4"
          >
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={`${testimonial.name}-${index}`}
                className={`flex-shrink-0 w-[500px] rounded-[28px] p-6 md:p-8 ${
                  testimonial.variant === 'dark'
                    ? 'bg-[var(--color-black)] text-white'
                    : 'border border-black/10 bg-[var(--color-off-white)] text-[var(--color-black)]'
                }`}
                data-cursor-zone={testimonial.variant === 'dark' ? 'lime' : undefined}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.08, ease }}
              >
                <p className="font-editorial text-[clamp(1.5rem,2.2vw,2.3rem)] italic leading-[1.08]">
                  "{testimonial.quote}"
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

          {/* Particle Stream at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3">
            {particles.map((particle) => (
              <motion.div
                key={particle}
                className="h-2 w-2 rounded-full bg-[var(--color-black)]"
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.6,
                  delay: particle * 0.05,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

export default Testimonials
