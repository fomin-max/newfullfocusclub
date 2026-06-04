'use client'

import { useEffect, useRef } from 'react'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const FACTS = [
  { icon: 'users'   as const, val: 'До 80 человек',   lbl: 'Вместимость флагмана' },
  { icon: 'trophy'  as const, val: '7 клубов сети',   lbl: 'Площадки в СПб и Махачкале' },
  { icon: 'bolt'    as const, val: 'Под ключ',         lbl: 'Берём всю организацию на себя' },
]

export default function EventsHero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el || window.innerWidth < 1024) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--gx', `${e.clientX - r.left}px`)
      el.style.setProperty('--gy', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="ev-hero" ref={heroRef} id="hero">
      <div className="ev-hero__bg" />
      <div className="ev-hero__overlay" />
      <div className="ev-hero__mesh" />
      <div className="ev-hero__glow" />
      <div className="ev-hero__scan" />
      <span className="ev-hero__hash">//// МЕРОПРИЯТИЯ · FULL FOCUS</span>

      <div className="ev-hero__inner">
        <Reveal>
          <span className="ff-tag">организуем под ключ</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="ev-hero__title">
            ТВОЁ МЕРОПРИЯТИЕ В<br />
            <span className="ev-hero__brand">FULL FOCUS</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="ev-hero__sub">
            Корпоратив, день рождения или закрытый турнир — организуем
            под ключ. Кейтеринг, ведущий, трансляция и призы.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="ev-hero__ctas">
            <button
              className="ff-btn ff-btn--primary is-pulse"
              onClick={() => scrollTo('form')}
            >
              ОСТАВИТЬ ЗАЯВКУ <Icon name="arrowRight" size={14} />
            </button>
            <button
              className="ff-btn ff-btn--secondary"
              onClick={() => scrollTo('formats')}
            >
              УЗНАТЬ ПОДРОБНЕЕ <Icon name="arrowDown" size={14} />
            </button>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="ev-hero__facts">
            {FACTS.map((f, i) => (
              <div className="ev-fact" key={i}>
                <span className="ev-fact__icon"><Icon name={f.icon} size={20} /></span>
                <span className="ev-fact__val">{f.val}</span>
                <span className="ev-fact__lbl">{f.lbl}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
