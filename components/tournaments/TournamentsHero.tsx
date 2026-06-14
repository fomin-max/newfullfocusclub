'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { supabase, type Tournament } from '@/lib/supabase'

export default function TournamentsHero() {
  const heroRef   = useRef<HTMLElement>(null)
  const magnetRef = useRef<HTMLSpanElement>(null)
  const [nearest, setNearest] = useState<Tournament | null>(null)

  useEffect(() => {
    supabase
      .from('tournaments')
      .select('*')
      .in('status', ['registration_open', 'upcoming'])
      .order('date', { ascending: true })
      .limit(1)
      .single()
      .then(({ data }) => setNearest(data))
  }, [])

  const regUrl = nearest ? `/tournaments/${nearest.slug}#registration` : 'https://t.me/fullfocusclubru?direct'

  const facts = nearest ? [
    { icon: 'trophy'    as const, val: nearest.prize_pool ? `${nearest.prize_pool.toLocaleString('ru')} ₽` : '—', lbl: 'Призовой фонд' },
    { icon: 'users'     as const, val: `до ${nearest.max_participants} участников`,       lbl: 'Слотов' },
    { icon: 'broadcast' as const, val: 'twitch · fullfocusclub',                          lbl: 'Прямой эфир' },
  ] : [
    { icon: 'trophy'    as const, val: '—', lbl: 'Призовой фонд' },
    { icon: 'users'     as const, val: '—', lbl: 'Слотов' },
    { icon: 'broadcast' as const, val: 'twitch · fullfocusclub', lbl: 'Прямой эфир' },
  ]

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

  useEffect(() => {
    const el = magnetRef.current
    if (!el || window.matchMedia('(max-width: 1023px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v))
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const mx = e.clientX - (r.left + r.width / 2)
      const my = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${clamp(mx * 0.4, 40)}px, ${clamp(my * 0.5, 24)}px)`
    }
    const onLeave = () => { el.style.transform = 'translate(0,0)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="tn-hero" ref={heroRef} id="hero">
      <div className="tn-hero__bg" />
      <div className="tn-hero__overlay" />
      <div className="tn-hero__mesh" />
      <div className="tn-hero__glow" />
      <div className="tn-hero__scan" />
      <span className="tn-hero__hash">//// ТУРНИРЫ · FULL FOCUS</span>

      <div className="tn-hero__inner">
        <Reveal>
          <span className="ff-tag">ТУРНИРЫ</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="tn-hero__title">
            ДОКАЖИ,<br />
            ЧТО ТЫ<br />
            <span className="tn-hero__brand">ЛУЧШИЙ</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="tn-hero__sub">
            Регулярные турниры по CS2, Dota 2, Valorant. Призовые,
            мерч и эфир на Twitch.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="tn-hero__ctas">
            <span className="tn-hero__magnet" ref={magnetRef}>
              <a className="ff-btn ff-btn--primary is-pulse" href={regUrl}
                 {...(!nearest ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                ЗАРЕГИСТРИРОВАТЬСЯ <Icon name="arrowRight" size={14} />
              </a>
            </span>
            {nearest && (
              <button className="ff-btn ff-btn--secondary"
                      onClick={() => scrollTo('next')}>
                БЛИЖАЙШИЙ ТУРНИР <Icon name="arrowDown" size={14} />
              </button>
            )}
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="tn-hero__facts">
            {facts.map((f, i) => (
              <div className="tn-fact" key={i}>
                <span className="tn-fact__icon"><Icon name={f.icon} size={20} /></span>
                <span className="tn-fact__val">{f.val}</span>
                <span className="tn-fact__lbl">{f.lbl}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
