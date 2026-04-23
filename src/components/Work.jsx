import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const ease = [0.25, 0.1, 0.25, 1]

function Work({ projects }) {
  const [activeProject, setActiveProject] = useState(projects[0])

  return (
    <section id="projects" className="bg-[var(--color-off-white)] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <motion.p
          className="label mb-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          Selected Projects
        </motion.p>

        <motion.div
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="font-display text-[var(--text-heading)] uppercase leading-[0.92] tracking-[0.02em]">
            Projects
          </h2>
          <p className="max-w-md font-mono text-sm uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            Case studies across product, motion, editorial, and interactive web experiments.
          </p>
        </motion.div>

        <div className="relative hidden gap-0 lg:grid lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
          <div>
            {projects.map((project, index) => (
              <motion.a
                key={project.number}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex w-full items-center justify-between gap-6 border-b border-black/15 py-8 text-left"
                onHoverStart={() => setActiveProject(project)}
                onFocus={() => setActiveProject(project)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: index * 0.07, ease }}
                data-cursor-zone="footer-default"
              >
                <div className="flex items-start gap-6">
                  <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {project.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(3.5rem,6vw,6rem)] uppercase leading-none tracking-[0.02em] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                      {project.title}
                    </h3>
                    <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {project.category}
                    </p>
                  </div>
                </div>
                <div className="h-px w-16 origin-left bg-[var(--color-black)] transition-transform duration-300 ease-out group-hover:scale-x-[2.4]" />
              </motion.a>
            ))}
          </div>

          <div className="sticky top-28 flex h-[520px] items-center justify-center overflow-hidden rounded-[28px] border border-black/10 bg-white p-5">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeProject.image}
                src={activeProject.image}
                alt={activeProject.title}
                className="h-full w-full object-cover"
                initial={{ opacity: 0, x: 80, rotate: -3 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -60, rotate: 2 }}
                transition={{ duration: 0.55, ease }}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="grid gap-5 lg:hidden">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              className="group rounded-[28px] border border-black/10 bg-white p-5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: index * 0.07, ease }}
            >
              <img src={project.image} alt={project.title} className="mb-5 h-60 w-full rounded-[20px] object-cover" />
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {project.number}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {project.category}
                </span>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[var(--color-accent)]"
                data-cursor-zone="footer-default"
              >
                <h3 className="font-display text-[3.25rem] uppercase leading-none">{project.title}</h3>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
