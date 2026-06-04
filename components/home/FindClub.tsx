'use client'

import { useState, useRef, useEffect } from 'react'
import { useTilt } from '@/lib/hooks'
import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const CLUBS = [
  { id: 'vasil',   name: 'Василеостровская',         metro: 'м. Василеостровская',         color: '#bf9e4d', x: 32, y: 38, zones: ['PRO', 'DUO', 'BOOTCAMP', 'ARENA', 'SOLO', 'LOUNGE'], href: '/clubs/vasilyeostrovsky' },
  { id: 'electro', name: 'Электросила',               metro: 'м. Электросила',               color: '#0066b3', x: 55, y: 80, zones: ['PRO', 'MAX', 'DUO', 'LOUNGE'],                         href: '/clubs/elektrosila' },
  { id: 'komen',   name: 'Комендантский',             metro: 'м. Комендантский проспект',    color: '#8bc34a', x: 22, y: 18, zones: ['PRO', 'MAX', 'BOOTCAMP', 'LOUNGE'],                     href: '/clubs/komendantsky' },
  { id: 'prosv',   name: 'Просвещения',               metro: 'м. Пр. Просвещения',           color: '#c12a2c', x: 48, y: 12, zones: ['PRO', 'MAX', 'BOOTCAMP', 'DUO', 'SOLO', 'LOUNGE'],      href: '/clubs/prosvescheniya' },
  { id: 'sadov',   name: 'Садовая',                   metro: 'м. Садовая',                   color: '#b14385', x: 52, y: 50, zones: ['PRO', 'MAX', 'BOOTCAMP', 'DUO', 'LOUNGE'],               href: '/clubs/sadovaya' },
  { id: 'tech',    name: 'Технологический институт',  metro: 'м. Технологический институт',  color: '#0066b3', x: 50, y: 64, zones: ['PRO', 'MAX', 'BOOTCAMP', 'LOUNGE'],                     href: '/clubs/tekhnologichesky' },
  { id: 'makha',   name: 'Махачкала',                 metro: 'Центр города',                 color: '#6632FA', x: 84, y: 58, zones: ['BOOTCAMP', 'QUADRO', 'TRIO', 'DUO', 'SOLO', 'LOUNGE'],   href: '/clubs/makhachkala' },
]

function ClubCard({ c, setActive }: { c: typeof CLUBS[0]; setActive: (id: string | null) => void }) {
  const tiltRef = useTilt({ max: 8 })
  return (
    <Card
      ref={tiltRef as React.RefObject<HTMLDivElement>}
      className="ff-club"
      brackets
      id={`club-${c.id}`}
      role="listitem"
      onMouseEnter={() => setActive(c.id)}
    >
      <div className="ff-club__name">{c.name}</div>
      <div className="ff-club__metro">
        <span className="ff-club__metro-dot" style={{ '--metro-color': c.color } as React.CSSProperties}>М</span>
        {c.metro}
      </div>
      <div className="ff-club__zones">
        {c.zones.map(z => <span key={z} className="ff-club__zone">{z}</span>)}
      </div>
      <a href={c.href} className="ff-club__more" role="button">Подробнее</a>
    </Card>
  )
}

export default function FindClub() {
  const [active, setActive] = useState<string | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return

    const onWheel = (e: WheelEvent) => {
      // пропускаем горизонтальный скролл трекпада (он уже работает нативно)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      if (row.scrollWidth <= row.clientWidth + 1) return
      const atStart = row.scrollLeft <= 0
      const atEnd = row.scrollLeft >= row.scrollWidth - row.clientWidth - 1
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return
      e.preventDefault()
      row.scrollLeft += e.deltaY
    }

    row.addEventListener('wheel', onWheel, { passive: false })
    return () => row.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <section id="find" className="ff-section ff-find">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Карта клубов</span>
          <h2 className="ff-section-head__title">Найди свой клуб</h2>
          <p className="ff-section-head__sub">8 локаций в шаговой доступности от метро. Открыто 24/7.</p>
        </Reveal>

        <Reveal>
          <div className="ff-find__map" role="img" aria-label="Карта клубов Full Focus">
            <span className="ff-find__map-label">Санкт-Петербург · Махачкала</span>
            <svg className="ff-find__river" viewBox="0 0 100 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="neva" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#6632FA" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#6632FA" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#00FFB6" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path d="M 0 28 C 18 22, 26 30, 40 32 S 60 40, 78 36 L 100 34" stroke="url(#neva)" strokeWidth="1.4" fill="none" />
              <path d="M 30 32 C 38 38, 42 48, 48 52" stroke="rgba(102,50,250,0.3)" strokeWidth="0.6" fill="none" />
              <path d="M 50 36 C 56 44, 58 50, 62 56" stroke="rgba(102,50,250,0.3)" strokeWidth="0.6" fill="none" />
              <ellipse cx="40" cy="42" rx="36" ry="28" stroke="rgba(102,50,250,0.18)" strokeWidth="0.4" strokeDasharray="1.5 1.5" fill="none" />
              <line x1="74" y1="6" x2="74" y2="58" stroke="rgba(102,50,250,0.25)" strokeWidth="0.4" strokeDasharray="0.8 0.8" />
              <text x="80" y="14" fill="rgba(157,157,156,0.5)" fontSize="2.4" fontFamily="Magistral" letterSpacing="0.5" style={{ textTransform: 'uppercase' }}>МАХАЧКАЛА</text>
              <text x="6" y="10" fill="rgba(157,157,156,0.5)" fontSize="2.4" fontFamily="Magistral" letterSpacing="0.5" style={{ textTransform: 'uppercase' }}>САНКТ-ПЕТЕРБУРГ</text>
            </svg>
            {CLUBS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`ff-pin ${active === c.id ? 'is-active' : ''}`}
                style={{ left: `${c.x}%`, top: `${c.y}%`, '--pin-delay': `${i * 0.3}s` } as React.CSSProperties}
                onMouseEnter={() => setActive(c.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(c.id)}
                onBlur={() => setActive(null)}
                onClick={() => {
                  const el = document.getElementById(`club-${c.id}`)
                  const row = el?.parentElement
                  if (el && row) row.scrollTo({ left: el.offsetLeft - 24, behavior: 'smooth' })
                }}
                aria-label={`Клуб ${c.name}`}
              >
                <span className="ff-pin__pulse" />
                <span className="ff-pin__dot" />
                <span className="ff-pin__label">{c.name}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="ff-find__row" role="list" ref={rowRef}>
          {CLUBS.map((c, i) => (
            <Reveal key={c.id} delay={i * 100} className="ff-find__row-cell">
              <ClubCard c={c} setActive={setActive} />
            </Reveal>
          ))}
        </div>
        <p className="ff-find__hint" aria-hidden="true">
          <Icon name="arrowRight" size={14} /> Листай вбок — колесом или свайпом
        </p>
      </div>
    </section>
  )
}
