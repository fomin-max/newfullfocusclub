'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/ui/Reveal'

const STEPS = [
  {
    num: '01',
    name: 'Выбери клуб и зону',
    desc: 'Найди ближайший клуб, выбери формат — PRO, DUO, SOLO, Lounge или командную зону.',
  },
  {
    num: '02',
    name: 'Зарегистрируйся на месте',
    desc: 'Быстрая регистрация за 2 минуты. Администратор проведёт экскурсию и поможет выбрать.',
    promo: 'При первой регистрации введи промокод SITE500 — получишь 500₽ на баланс.',
  },
  {
    num: '03',
    name: 'Садись и играй',
    desc: 'Игры уже установлены, аккаунты настроены — просто нажми Play и погружайся.',
  },
]

const THRESHOLDS = [0.001, 0.5, 0.92]

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function HowItWorks() {
  const listRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    if (prefersReducedMotion()) { setProgress(1); return }

    let raf = 0
    const measure = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const p = (vh * 0.62 - r.top) / Math.max(1, r.height * 0.72)
      setProgress(Math.max(0, Math.min(1, p)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure) }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="how" className="ff-section ff-how">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">С чего начать</span>
          <h2 className="ff-section-head__title">Как начать играть</h2>
          <p className="ff-section-head__sub">
            Три шага от метро до твоего любимого героя. Никаких очередей и предзагрузок.
          </p>
        </Reveal>

        <div className="ff-how__list" ref={listRef}>
          <div className="ff-how__line" aria-hidden="true">
            <div
              className="ff-how__line-fill"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>

          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className={`ff-how__step${progress >= THRESHOLDS[i] ? ' is-reached' : ''}`}
            >
              <span className="ff-how__num">{s.num} / 03</span>
              <h3 className="ff-how__name">{s.name}</h3>
              <p className="ff-how__desc">{s.desc}</p>
              {s.promo && <p className="ff-how__promo">{s.promo}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
