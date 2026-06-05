'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/ui/Reveal'

const STEPS = [
  { num: '01', name: 'Заявка',   desc: 'Оставляешь контакты. Получаешь пакет документов.' },
  { num: '02', name: 'Встреча',  desc: 'Звонок с основателем. Разбор города и формата.' },
  { num: '03', name: 'Договор',  desc: 'Подписываем договор. Закрепляем территорию.' },
  { num: '04', name: 'Запуск',   desc: 'Помещение, ремонт, оборудование, IT-инфраструктура.' },
  { num: '05', name: 'Открытие', desc: 'Маркетинг, обучение команды, гранд-опенинг.' },
]

const THRESHOLDS = [0.001, 0.25, 0.5, 0.75, 0.95]

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function FranchiseRoadmap() {
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
    <section className="ff-section ff-steps" id="steps">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-section-head">
            <span className="ff-tag">Дорожная карта</span>
            <h2 className="ff-section-head__title">5 шагов до открытия</h2>
          </div>
        </Reveal>

        <div className="ev-how fr-roadmap" ref={listRef}>
          <div className="ev-how__line">
            <div
              className="ev-how__line-fill"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <div className="ev-how__list fr-roadmap__list">
            {STEPS.map((s, i) => (
              <div key={s.num} className={`ev-how__step${progress >= THRESHOLDS[i] ? ' is-reached' : ''}`}>
                <span className="ev-how__dot" />
                <span className="ev-how__num">{s.num} / 05</span>
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
