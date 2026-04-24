import { motion } from 'framer-motion'
import ParticleSphere from './ParticleSphere'

const ease = [0.25, 0.1, 0.25, 1]
// const lineOne = ['I', 'MAKE']
// const lineTwo = ['THINGS', 'MOVE']
const sideReveal = {
  hiddenLeft: { opacity: 0, x: -72 },
  hiddenDown: { opacity: 0, y: 32 },
  hiddenScale: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, x: 0, y: 0, scale: 1 },
}

function CircularBadge() {
  return (
    <motion.div
      className="relative flex h-28 w-28 items-center justify-center md:h-36 md:w-36"
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
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
  )
}

// function AnimatedLine({ words, accentWord, revealReady }) {
//   return (
//     <div className="overflow-hidden">
//       <div className="flex flex-wrap gap-x-[0.12em] leading-[0.88]">
//         {words.map((word, index) => (
//           <span key={word} className="overflow-hidden">
//             <motion.span
//               className={`inline-block ${word === accentWord ? 'text-[var(--color-accent)]' : ''}`}
//               initial={{ y: '110%' }}
//               animate={revealReady ? { y: 0 } : { y: '110%' }}
//               transition={{ duration: 0.9, delay: index * 0.06, ease }}
//             >
//               {word}
//             </motion.span>
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }

function Hero({ revealReady }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--color-white)] px-4 pb-6 pt-28 md:px-8 md:pb-8 md:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(13,13,13,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between">
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)] lg:items-center">
          <div className="max-w-[52rem]">
            {/* <h1 className="font-display text-[var(--text-hero)] uppercase tracking-[0.02em]">
              <AnimatedLine words={lineOne} revealReady={revealReady} />
              <AnimatedLine words={lineTwo} accentWord="MOVE" revealReady={revealReady} />
            </h1> */}

            <motion.h2
              className="mt-8 font-display text-[clamp(3.5rem,8vw,7.5rem)] uppercase leading-[0.9] tracking-[0.03em]"
              initial="hiddenLeft"
              animate={revealReady ? 'visible' : 'hiddenLeft'}
              variants={sideReveal}
              transition={{ duration: 0.95, delay: 0.2, ease }}
            >
              Vinayak
            </motion.h2>
            <motion.h2
              className="mt-8 font-display text-[clamp(3.5rem,8vw,7.5rem)] uppercase leading-[0.9] tracking-[0.03em]"
              initial="hiddenLeft"
              animate={revealReady ? 'visible' : 'hiddenLeft'}
              variants={sideReveal}
              transition={{ duration: 0.95, delay: 0.2, ease }}
            >
              Mohakud
            </motion.h2>

            <motion.h5
              className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] hover:text-black transition duration-300 ease-in-out no-stroke"
              initial="hiddenLeft"
              animate={revealReady ? 'visible' : 'hiddenLeft'}
              variants={sideReveal}
              transition={{ duration: 0.85, delay: 0.3, ease }}
            >
              @vynxvoid
            </motion.h5>

            <motion.p
              className="mt-6 max-w-[38rem] font-editorial text-[clamp(1.5rem,2.6vw,2.6rem)] italic leading-[1.02] text-left"
              initial="hiddenLeft"
              animate={revealReady ? 'visible' : 'hiddenLeft'}
              variants={sideReveal}
              transition={{ duration: 0.95, delay: 0.32, ease }}
            >
              I design digital experiences, motion studies, and visual systems with an editorial eye and a
              strong focus on clarity, rhythm, and interaction.
            </motion.p>
          </div>

          <motion.div
            className="relative hidden min-h-[420px] lg:block"
            initial="hiddenScale"
            animate={revealReady ? 'visible' : 'hiddenScale'}
            variants={sideReveal}
            transition={{ duration: 1.15, delay: 0.2, ease }}
            data-cursor-zone="footer-default"
          >
            <ParticleSphere />
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-end">
          <motion.div
            className="order-2 justify-self-start md:order-1"
            initial="hiddenScale"
            animate={revealReady ? 'visible' : 'hiddenScale'}
            variants={sideReveal}
            transition={{ duration: 0.85, delay: 0.45, ease }}
          >
            <CircularBadge />
          </motion.div>
        </div>

        <div className="mt-10 flex items-end justify-start gap-6">
          <motion.p
            className="label"
            initial="hiddenDown"
            animate={revealReady ? 'visible' : 'hiddenDown'}
            variants={sideReveal}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            Based In Mumbai
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default Hero
