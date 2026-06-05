'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/ui/Reveal'

const STEPS = [
  { num: '01', name: 'ЗАЯВКА',      desc: 'Оставь заявку с деталями — формат, дата, количество гостей, клуб.' },
  { num: '02', name: 'ОБСУЖДЕНИЕ',  desc: 'Свяжемся в течение 15 минут. Обсудим сценарий и детали.' },
  { num: '03', name: 'ПОДГОТОВКА',  desc: 'Берём организацию на себя — оборудование, кейтеринг, ведущий.' },
  { num: '04', name: 'МЕРОПРИЯТИЕ', desc: 'Ты просто приходишь и наслаждаешься. Мы делаем всё остальное.' },
]

const THRESHOLDS = [0.001, 0.33, 0.66, 0.95]

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function EventsHowSection() {
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
    <section id="how" className="ff-section" style={{ paddingTop: 0 }}>
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">как это работает</span>
          <h2 className="ff-section-head__title">КАК ЭТО РАБОТАЕТ</h2>
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
                <span className="ev-how__num">{s.num} / {String(STEPS.length).padStart(2, '0')}</span>
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
