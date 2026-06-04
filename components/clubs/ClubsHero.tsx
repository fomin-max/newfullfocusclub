'use client'

import { useEffect, useRef } from 'react'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { AGG_CLUBS, CITY_META, HERO_FACTS } from '@/lib/clubs/aggregatorData'

export default function ClubsHero() {
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

  const counts = AGG_CLUBS.reduce<Record<string, number>>((acc, c) => {
    acc[c.city] = (acc[c.city] || 0) + 1
    return acc
  }, {})

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const filterCity = (city: string) => {
    window.dispatchEvent(new CustomEvent('cla-set-city', { detail: city }))
    scrollTo('explorer')
  }

  return (
    <section id="hero" className="cla-hero" ref={heroRef}>
      <video
        className="cla-hero__video"
        autoPlay muted loop playsInline
        poster="/assets/club-interior.jpg"
        src="/assets/hero-video.mp4"
        preload="none"
      />
      <div className="cla-hero__overlay" />
      <div className="cla-hero__mesh" />
      <div className="cla-hero__glow" />
      <div className="cla-hero__scan" />
      <span className="cla-hero__hash" aria-hidden="true">//// КЛУБЫ · FULL FOCUS · 2026</span>

      <div className="cla-hero__inner">
        <Reveal>
          <span className="ff-tag">ВСЕ ЛОКАЦИИ</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="cla-hero__title">
            7 КЛУБОВ<br />В ДВУХ <span className="brand">ГОРОДАХ</span>
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="cla-hero__sub">
            Санкт-Петербург и&nbsp;Махачкала. RTX&nbsp;4090 и&nbsp;PS5
            в&nbsp;шаге от&nbsp;метро. Открыто круглосуточно.
          </p>
        </Reveal>

        <Reveal delay={210}>
          <div className="cla-hero__cities" role="list">
            {(Object.keys(CITY_META) as Array<keyof typeof CITY_META>).map(key => (
              <button
                key={key}
                type="button"
                className="cla-citychip"
                role="listitem"
                onClick={() => filterCity(key)}
                aria-label={`Показать клубы — ${CITY_META[key].label}`}
              >
                <span className="cla-citychip__count">{counts[key] || 0}</span>
                <span className="cla-citychip__name">{CITY_META[key].label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={270}>
          <div className="cla-hero__ctas">
            <button className="ff-btn ff-btn--primary is-pulse" onClick={() => scrollTo('explorer')}>
              НАЙТИ КЛУБ НА КАРТЕ <Icon name="arrowDown" size={14} />
            </button>
            <button className="ff-btn ff-btn--secondary" onClick={() => scrollTo('explorer')}>
              ЗАБРОНИРОВАТЬ МЕСТО <Icon name="arrowRight" size={14} />
            </button>
          </div>
        </Reveal>

        <Reveal delay={330}>
          <div className="cla-hero__facts" role="list">
            {HERO_FACTS.map((f, i) => (
              <div className="cla-fact" key={i} role="listitem">
                <span className="cla-fact__icon"><Icon name={f.icon} size={20} /></span>
                <span className="cla-fact__val">{f.val}</span>
                <span className="cla-fact__lbl">{f.lbl}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
