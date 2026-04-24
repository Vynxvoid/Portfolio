import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About Me', href: '/#about' },
  { label: 'Projects', href: '/projects' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{
          paddingTop: scrolled ? 12 : 20,
          paddingBottom: scrolled ? 12 : 20,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className={`mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8 ${scrolled ? 'border-b border-black/10' : ''
            } bg-[rgba(250,250,248,0.78)] backdrop-blur-md`}
        >
          {/* GitHub button — left end */}
          <div className="hidden lg:flex" data-cursor-zone="footer-default">
            <a
              href="https://github.com/vynxvoid"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button group flex items-center gap-2"
              aria-label="GitHub Profile"
            >
              {/* GitHub SVG icon */}
              <svg
                className="h-[14px] w-[14px] transition-transform duration-300 group-hover:rotate-12"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>

          <nav className="hidden items-center justify-center gap-8 lg:flex" data-cursor-zone="footer-default">
            {links.map((link) => (
              link.href.includes('#') ? (
                <a key={link.label} href={link.href} className="nav-link text-sm uppercase tracking-[0.18em]">
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} to={link.href} className="nav-link text-sm uppercase tracking-[0.18em]">
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden justify-self-end lg:flex" data-cursor-zone="footer-default">
            <a href="/#contact" className="pill-button">
              Get In Touch <span aria-hidden="true">→</span>
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="col-start-3 flex h-12 w-12 items-center justify-self-end lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            data-cursor-zone="footer-default"
          >
            <span className={`hamburger-line ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex min-h-screen flex-col bg-[var(--color-black)] px-6 pb-8 pt-28 text-[var(--color-white)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-1 flex-col justify-center gap-4">
              {links.map((link, index) => (
                link.href.includes('#') ? (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="font-display text-[clamp(3.5rem,13vw,7rem)] uppercase leading-none"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.06,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ) : (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.06,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <Link
                      to={link.href}
                      className="font-display text-[clamp(3.5rem,13vw,7rem)] uppercase leading-none"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              ))}
            </div>
            <motion.a
              href="#footer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setMenuOpen(false)}
            >
              Get In Touch <span aria-hidden="true">→</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
