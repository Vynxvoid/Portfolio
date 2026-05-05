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
                    <div className="mt-3 flex items-center gap-3">
                      <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        {project.category}
                      </p>
                      {project.condition && (
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                            project.condition === 'Live'
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : project.condition === 'Working and Deployed'
                              ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                              : 'bg-red-100 text-red-700 border border-red-200'
                          }`}
                        >
                          {project.condition}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 transition-all duration-300 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]"
                    title="View on GitHub"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <div className="h-px w-16 origin-left bg-[var(--color-black)] transition-transform duration-300 ease-out group-hover:scale-x-[2.4]" />
                </div>
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
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {project.number}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {project.category}
                  </span>
                  {project.condition && (
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                        project.condition === 'Live'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : project.condition === 'Working and Deployed'
                          ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}
                    >
                      {project.condition}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-[var(--color-accent)]"
                  data-cursor-zone="footer-default"
                >
                  <h3 className="font-display text-[3.25rem] uppercase leading-none">{project.title}</h3>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-black/20 transition-all duration-300 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]"
                  title="View on GitHub"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
