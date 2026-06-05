'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/ui/Reveal'

const STEPS = [
  { num: '01', name: 'РЕГИСТРАЦИЯ',   desc: 'Заполни форму команды. Укажи ники всех 5 игроков и Telegram капитана.' },
  { num: '02', name: 'ПОДТВЕРЖДЕНИЕ', desc: 'Свяжемся с капитаном в течение 15 минут. Подтвердим слот в турнире.' },
  { num: '03', name: 'ОПЛАТА',        desc: 'В день турнира оплати взнос на месте — 500 ₽ с каждого игрока.' },
  { num: '04', name: 'ТУРНИР',        desc: 'Приходи в 13:30 на чек-ин. Старт в 14:00 на ARENA 5×5.' },
]

const THRESHOLDS = [0.001, 0.33, 0.66, 0.95]

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function TournamentHowSection() {
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
    <section id="how" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">4 ШАГА</span>
          <h2 className="ff-section-head__title">КАК ПРИНЯТЬ<br />УЧАСТИЕ</h2>
          <p className="ff-section-head__sub">
            От заявки до старта — без лишней суеты.
          </p>
        </Reveal>

        <div className="ev-how" ref={listRef}>
          <div className="ev-how__line">
            <div
              className="ev-how__line-fill"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <div className="ev-how__list">
            {STEPS.map((s, i) => (
              <div key={s.num} className={`ev-how__step${progress >= THRESHOLDS[i] ? ' is-reached' : ''}`}>
                <span className="ev-how__dot" />
                <span className="ev-how__num">{s.num} /</span>
                <h3 className="ev-how__name">{s.name}</h3>
                <p className="ev-how__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
