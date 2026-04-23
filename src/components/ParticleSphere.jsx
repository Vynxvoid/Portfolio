import { useEffect, useRef } from 'react'

function ParticleSphere() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const streamCanvasRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0, localX: 0, localY: 0, active: false })
  const scrollRef = useRef(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const streamCanvas = streamCanvasRef.current
    if (!wrap || !canvas || !streamCanvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    const streamContext = streamCanvas.getContext('2d')
    if (!context || !streamContext) {
      return undefined
    }

    const particleCount = 5500
    const streamParticleCount = 950
    const particles = []
    const streamParticles = []
    let width = 0
    let height = 0
    let viewportWidth = 0
    let viewportHeight = 0
    let radius = 0
    let animationFrame = 0
    let rotation = 0

    for (let index = 0; index < particleCount; index += 1) {
      // Fibonacci sphere distribution gives a cleaner, more even dotted globe.
      const t = index / (particleCount - 1)
      const y = 1 - t * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = Math.PI * (3 - Math.sqrt(5)) * index

      particles.push({
        x: Math.cos(theta) * radiusAtY,
        y,
        z: Math.sin(theta) * radiusAtY,
        jitter: Math.random() * 0.035,
        size: Math.random() * 0.9 + 0.35,
        phase: Math.random() * Math.PI * 2,
        wobble: Math.random() * 0.7 + 0.35,
      })
    }

    for (let index = 0; index < streamParticleCount; index += 1) {
      streamParticles.push({
        offset: Math.random(),
        drift: (Math.random() - 0.5) * 120,
        wave: Math.random() * 26 + 8,
        speed: Math.random() * 0.75 + 0.45,
        size: Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.35 + 0.18,
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight
      radius = Math.min(width, height) * 0.468
      canvas.width = width * dpr
      canvas.height = height * dpr
      streamCanvas.width = viewportWidth * dpr
      streamCanvas.height = viewportHeight * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      streamContext.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const handleMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
        localX: event.clientX - rect.left,
        localY: event.clientY - rect.top,
        active: true,
      }
    }

    const handleLeave = () => {
      pointerRef.current = { x: 0, y: 0, localX: width * 0.5, localY: height * 0.5, active: false }
    }

    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      scrollRef.current = window.scrollY / maxScroll
    }

    const render = () => {
      rotation += 0.0014
      context.clearRect(0, 0, width, height)
      streamContext.clearRect(0, 0, viewportWidth, viewportHeight)

      const centerX = width * 0.5
      const centerY = height * 0.5
      const pointerX = pointerRef.current.x * 0.24
      const pointerY = pointerRef.current.y * 0.14
      const projected = []

      particles.forEach((particle) => {
        const angleY = rotation + pointerX
        const angleX = pointerY + Math.sin(rotation * 0.9) * 0.04
        const vibrationX = Math.cos(rotation * (2.2 + particle.wobble) + particle.phase) * 0.012
        const vibrationY = Math.sin(rotation * (2.8 + particle.wobble) + particle.phase) * 0.012
        const vibrationZ = Math.sin(rotation * (2.4 + particle.wobble) + particle.phase) * 0.01

        const cosY = Math.cos(angleY)
        const sinY = Math.sin(angleY)
        const cosX = Math.cos(angleX)
        const sinX = Math.sin(angleX)

        const baseX = particle.x + vibrationX
        const baseY = particle.y + vibrationY
        const baseZ = particle.z + vibrationZ

        const x1 = baseX * cosY - baseZ * sinY
        const z1 = baseX * sinY + baseZ * cosY
        const y1 = baseY * cosX - z1 * sinX
        const z2 = baseY * sinX + z1 * cosX

        const perspective = 1.04 / (1.58 - z2)
        const edgeFactor = Math.min(1.25, Math.max(0.82, 1 - Math.abs(z2) * 0.22))
        let screenX = centerX + x1 * radius * perspective
        let screenY = centerY + y1 * radius * perspective

        if (pointerRef.current.active) {
          const dx = screenX - pointerRef.current.localX
          const dy = screenY - pointerRef.current.localY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const influenceRadius = radius * 0.32

          if (distance < influenceRadius) {
            const force = (1 - distance / influenceRadius) ** 1.65
            const safeDistance = Math.max(distance, 0.001)
            const repel = force * 78 * perspective
            screenX += (dx / safeDistance) * repel
            screenY += (dy / safeDistance) * repel
          }
        }

        projected.push({
          x: screenX,
          y: screenY,
          z: z2,
          alpha: Math.max(0.12, 0.34 + (z2 + 1) * 0.22),
          size: (particle.size + particle.jitter) * perspective * edgeFactor,
        })
      })

      projected
        .sort((a, b) => a.z - b.z)
        .forEach((point) => {
          context.beginPath()
          context.fillStyle = `rgba(13,13,13,${Math.min(0.78, point.alpha)})`
          context.arc(point.x, point.y, point.size, 0, Math.PI * 2)
          context.fill()
        })

      const wrapRect = wrap.getBoundingClientRect()
      const streamStartX = wrapRect.left + wrapRect.width * 0.5
      const streamStartY = wrapRect.top + wrapRect.height * 0.5
      const streamProgress = scrollRef.current
      const streamLength = viewportHeight * 0.2 + streamProgress * viewportHeight * 2.6

      if (streamProgress > 0.01) {
        streamParticles.forEach((particle, index) => {
          const lifePosition = particle.offset * streamLength

          if (lifePosition > streamLength) {
            return
          }

          const travel = (rotation * 150 * particle.speed + index * 7) % Math.max(streamLength, 1)
          const y = streamStartY + ((lifePosition + travel) % streamLength)

          if (y < -40 || y > viewportHeight + 40) {
            return
          }

          const taper = 1 - Math.min(1, lifePosition / Math.max(streamLength, 1))
          const x =
            streamStartX +
            particle.drift * (1 - taper) * 0.16 +
            Math.sin(rotation * 4 + particle.phase + y * 0.006) * particle.wave * (0.2 + streamProgress * 0.4)

          streamContext.beginPath()
          streamContext.fillStyle = `rgba(13,13,13,${particle.alpha * (0.35 + streamProgress * 0.5)})`
          streamContext.arc(x, y, particle.size + streamProgress * 0.45, 0, Math.PI * 2)
          streamContext.fill()
        })
      }

      animationFrame = window.requestAnimationFrame(render)
    }

    resize()
    handleLeave()
    handleScroll()
    render()

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    canvas.addEventListener('mousemove', handleMove)
    canvas.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      canvas.removeEventListener('mousemove', handleMove)
      canvas.removeEventListener('mouseleave', handleLeave)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div ref={wrapRef} className="particle-sphere-wrap">
      <canvas ref={streamCanvasRef} className="particle-stream-canvas" aria-hidden="true" />
      <canvas ref={canvasRef} className="particle-sphere-canvas" aria-hidden="true" />
    </div>
  )
}

export default ParticleSphere
