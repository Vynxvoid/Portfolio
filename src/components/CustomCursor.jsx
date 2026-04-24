import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const springConfig = {
  damping: 42,
  stiffness: 190,
  mass: 0.8,
}

function parseChannels(colorValue) {
  const matches = colorValue?.match(/\d+(\.\d+)?/g)
  if (!matches || matches.length < 3) {
    return null
  }

  return matches.slice(0, 3).map(Number)
}

function isNearBlack(colorValue) {
  const channels = parseChannels(colorValue)
  if (!channels) {
    return false
  }

  return channels[0] < 40 && channels[1] < 40 && channels[2] < 40
}

function isTextLikeTarget(node) {
  if (!(node instanceof HTMLElement)) {
    return false
  }

  const textTags = new Set([
    'A',
    'BUTTON',
    'SPAN',
    'P',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'LABEL',
    'LI',
    'STRONG',
    'EM',
    'SMALL',
  ])

  return textTags.has(node.tagName) || node.childElementCount === 0
}

function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [darkZone, setDarkZone] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, springConfig)
  const ringY = useSpring(y, springConfig)

  // Trailing shadow circles with different delays, opacity, and sizes
  const shadowConfigs = Array.from({ length: 12 }, (_, i) => {
    const progress = (i + 1) / 12
    return {
      delay: 0.08 + i * 0.05,
      opacity: 0.4 * (1 - progress),
      size: 15 * (1 - progress),
    }
  })

  const shadowTrails = shadowConfigs.map((config) =>
    useSpring(x, { ...springConfig, damping: springConfig.damping + config.delay * 50 })
  )
  const shadowTrailsY = shadowConfigs.map((config) =>
    useSpring(y, { ...springConfig, damping: springConfig.damping + config.delay * 50 })
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(pointer: fine)')
    const updateState = () => setEnabled(mediaQuery.matches)
    updateState()

    // Keep the cursor responsive on desktop, but disable it entirely for touch-first devices.
    const handleMove = (event) => {
      const target = event.target
      const footerOverride = target.closest('[data-cursor-zone="footer-default"]')
      const explicitLimeZone = target.closest('[data-cursor-zone="lime"]')
      const computed = window.getComputedStyle(target)
      const overBlackText = isTextLikeTarget(target) && isNearBlack(computed.color)
      const useLimeCursor =
        !footerOverride && (Boolean(explicitLimeZone) || overBlackText)

      x.set(event.clientX)
      y.set(event.clientY)
      setHovered(Boolean(target.closest('a, button, [data-cursor="interactive"]')))
      setDarkZone(useLimeCursor)
    }

    const handleMouseLeave = () => {
      x.set(-100)
      y.set(-100)
      setDarkZone(false)
    }

    mediaQuery.addEventListener('change', updateState)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      mediaQuery.removeEventListener('change', updateState)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [x, y])

  if (!enabled) {
    return null
  }

  return (
    <>
      {/* Trailing shadows */}
      {shadowTrails.map((shadowX, index) => (
        <motion.div
          key={`shadow-${index}`}
          className="pointer-events-none fixed left-0 top-0 z-[87] rounded-full"
          animate={{
            backgroundColor: darkZone
              ? `rgba(157,255,0,${shadowConfigs[index].opacity})`
              : `rgba(13,13,13,${shadowConfigs[index].opacity})`,
            width: shadowConfigs[index].size,
            height: shadowConfigs[index].size,
          }}
          transition={{ duration: 0.22, ease: [0.25, 0.5, 0.75, 1] }}
          style={{
            x: shadowX,
            y: shadowTrailsY[index],
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] h-[5px] w-[5px] rounded-full"
        animate={{
          backgroundColor: darkZone ? 'rgba(157,255,0,1)' : 'rgba(13,13,13,1)',
        }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[89] rounded-full border"
        animate={{
          width: hovered ? 48 : 28,
          height: hovered ? 48 : 28,
          backgroundColor: hovered ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0)',
          borderColor: darkZone
            ? hovered
              ? 'rgba(157,255,0,1)'
              : 'rgba(157,255,0,0.7)'
            : hovered
              ? 'rgba(13,13,13,0.9)'
              : 'rgba(13,13,13,0.55)',
        }}
        transition={{ duration: 0.34, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}

export default CustomCursor
