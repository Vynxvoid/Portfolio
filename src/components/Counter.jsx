import { useEffect, useRef, useState } from 'react'

function Counter({ value, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return undefined
    }

    let frameId = 0
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) {
          return
        }

        started = true
        const start = performance.now()

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - (1 - progress) ** 3
          setCount(Math.floor(value * eased))

          if (progress < 1) {
            frameId = requestAnimationFrame(tick)
          }
        }

        frameId = requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.45 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [duration, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default Counter
