'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useTilt } from '@/lib/hooks'
import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import ClubsMap from '@/components/clubs/ClubsMap'
import { AGG_CLUBS } from '@/lib/clubs/aggregatorData'

const CLUBS = AGG_CLUBS.map(c => ({
  id: c.id,
  name: c.name,
  metro: c.metro,
  hasMetro: c.hasMetro,
  address: c.address,
  color: c.color,
  zones: c.zones,
  href: c.slug ? `/clubs/${c.slug}` : 'https://t.me/fullfocusclub',
}))

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
      onClick={() => window.location.href = c.href}
      style={{ cursor: 'pointer' }}
    >
      <div className="ff-club__name">{c.name}</div>
      {c.hasMetro !== false && (
        <div className="ff-club__metro">
          <span className="ff-club__metro-dot" style={{ '--metro-color': c.color } as React.CSSProperties}>М</span>
          {c.metro}
        </div>
      )}
      <div className="ff-club__address">{c.address}</div>
      <div className="ff-club__zones">
        {c.zones.map(z => <span key={z} className="ff-club__zone">{z}</span>)}
      </div>
      <a href={c.href} className="ff-club__more" role="button" onClick={e => e.stopPropagation()}>Подробнее</a>
    </Card>
  )
}

const CITIES = [
  { key: 'spb', label: 'Санкт-Петербург', cnt: AGG_CLUBS.filter(c => c.city === 'spb').length },
  { key: 'mkh', label: 'Махачкала',       cnt: AGG_CLUBS.filter(c => c.city === 'mkh').length },
]

export default function FindClub() {
  const [active, setActive] = useState<string | null>(null)
  const [city,   setCity]   = useState<'spb' | 'mkh'>('spb')
  const rowRef = useRef<HTMLDivElement>(null)

  const visibleIds = useMemo(
    () => new Set(AGG_CLUBS.filter(c => c.city === city).map(c => c.id)),
    [city]
  )

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
          <p className="ff-section-head__sub">7 локаций в шаговой доступности от метро. Открыто 24/7.</p>
        </Reveal>

        <Reveal>
          <div className="ff-find__city-switch">
            {CITIES.map(ct => (
              <button
                key={ct.key} type="button"
                className={`ff-find__city-btn ${city === ct.key ? 'is-active' : ''}`}
                onClick={() => setCity(ct.key as 'spb' | 'mkh')}
              >
                {ct.label} <span>{ct.cnt}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <ClubsMap
            clubs={AGG_CLUBS}
            activeId={active}
            visibleIds={visibleIds}
            city={city}
            onMarkerEnter={id => setActive(id)}
            onMarkerLeave={() => setActive(null)}
            onMarkerClick={id => {
              const el = document.getElementById(`club-${id}`)
              const row = el?.parentElement
              if (el && row) row.scrollTo({ left: el.offsetLeft - 24, behavior: 'smooth' })
            }}
          />
        </Reveal>

        <div className="ff-find__row" role="list" ref={rowRef}>
          {CLUBS.filter(c => AGG_CLUBS.find(a => a.id === c.id)?.city === city).map((c, i) => (
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
