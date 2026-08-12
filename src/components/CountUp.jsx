import { useEffect, useRef, useState } from 'react'

const FINALS = {
  13: '13+',
  1400: '1,400+',
  92: '92%',
  1: '1',
}

export function CountUp({ to, suffixClass }) {
  const ref = useRef(null)
  const [text, setText] = useState('0')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return undefined
    const duration = 1400
    const start = performance.now()
    let frame
    function tick(now) {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const val = Math.round(to * eased)
      if (t === 1) setText(FINALS[to] || String(to))
      else setText(to >= 1000 ? val.toLocaleString() : String(val))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, to])

  return (
    <div className={suffixClass} ref={ref}>
      {text}
    </div>
  )
}
