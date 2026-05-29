'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function useScramble(text: string, { duration = 800, delay = 300 } = {}) {
  const [out, setOut] = useState(text)
  useEffect(() => {
    if (prefersReducedMotion() || window.innerWidth < 768) { setOut(text); return }
    const chars = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const rnd = () => chars[Math.floor(Math.random() * chars.length)]
    let raf = 0, t0 = 0
    const timer = setTimeout(() => {
      t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration)
        const reveal = Math.floor(p * text.length)
        let s = ''
        for (let i = 0; i < text.length; i++) {
          const ch = text[i]
          s += (i < reveal || ch === ' ' || ch === '\n') ? ch : rnd()
        }
        setOut(s)
        if (p < 1) raf = requestAnimationFrame(tick)
        else setOut(text)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timer); if (raf) cancelAnimationFrame(raf) }
  }, [text, duration, delay])
  return out
}

export function useCountUp(target: number, { duration = 1600, decimals = 0 } = {}) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      if (prefersReducedMotion()) { setVal(target); return }
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(target * eased)
        if (p < 1) requestAnimationFrame(tick)
        else setVal(target)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  const formatted = decimals === 0 ? Math.round(val).toString() : val.toFixed(decimals)
  return [formatted, ref] as const
}

export function useCountFromTo(from: number, to: number, { duration = 1600 } = {}) {
  const [val, setVal] = useState(from)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (prefersReducedMotion()) { setVal(to); return }
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(from + (to - from) * eased)
        if (p < 1) requestAnimationFrame(tick)
        else setVal(to)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [from, to, duration])
  return [Math.round(val), ref] as const
}

export function useTilt({ max = 8 } = {}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      const rx = (0.5 - y) * 2 * max
      const ry = (x - 0.5) * 2 * max
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.willChange = 'transform'
        el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
      })
    }
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
      setTimeout(() => { el.style.willChange = 'auto' }, 400)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [max])
  return ref
}

export function useReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setShown(true), delay)
        io.disconnect()
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [delay])
  return [ref, shown] as const
}

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

export function useCardGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
  return [ref, onMove] as const
}
