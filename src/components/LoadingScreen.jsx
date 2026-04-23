import { motion, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const ease = [0.25, 0.1, 0.25, 1]

function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: 'easeInOut',
      onUpdate: (value) => {
        setProgress(Math.round(value))
      }
    })
    return () => controls.stop()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const particles = []
    const numParticles = 400

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: Math.random() * 2 + 0.5,
      })
    }

    let animationFrameId

    const render = () => {
      // Trail effect
      ctx.fillStyle = 'rgba(13, 13, 13, 0.25)'
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2

      particles.forEach(p => {
        // Intense vibration
        p.x += (Math.random() - 0.5) * 6
        p.y += (Math.random() - 0.5) * 6

        // Gravitational pull to center
        const dx = centerX - p.x
        const dy = centerY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist > 3) {
          p.vx += (dx / dist) * 0.45
          p.vy += (dy / dist) * 0.45
        }

        // Friction
        p.vx *= 0.93
        p.vy *= 0.93

        p.x += p.vx
        p.y += p.vy
        
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-end justify-between bg-[var(--color-black)] px-4 py-5 text-[var(--color-white)] md:px-8 md:py-7 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease } }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      
      <div className="space-y-2 z-10">
        <motion.p
          className="font-display text-[clamp(4rem,12vw,8rem)] uppercase leading-none tracking-[0.03em]"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
        >
          Loading
        </motion.p>
        <motion.p
          className="label text-white/60"
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          AI-ML / FullStack / Mathematics
        </motion.p>
      </div>

      <div className="flex min-w-[7rem] flex-col items-end gap-3 z-10">
        <motion.div
          className="h-px w-28 origin-left bg-[var(--color-accent)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.35, ease }}
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
