'use client'

import { useState, useEffect } from 'react'

export default function ProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="ff-progress" aria-hidden="true">
      <div className="ff-progress__fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
