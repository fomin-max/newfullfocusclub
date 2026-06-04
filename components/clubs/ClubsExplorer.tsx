'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import Card from '@/components/ui/Card'
import Icon from '@/components/ui/Icon'
import { AGG_CLUBS, CITY_META, ZONE_FILTERS, type AggClub } from '@/lib/clubs/aggregatorData'

const TELEGRAM = 'https://t.me/fullfocusclub'

function ClubCard({
  c, activeZone, isActive, onEnter, onLeave,
}: {
  c: AggClub
  activeZone: string | null
  isActive: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const href = c.slug ? `/clubs/${c.slug}` : TELEGRAM
  const isExternal = !c.slug

  return (
    <Card
      className={`cla-card ${isActive ? 'is-active' : ''}`}
      brackets
      id={`club-${c.id}`}
      role="listitem"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="cla-card__head">
        <span className="cla-card__name">{c.name}</span>
        <span className="cla-card__city">{c.cityLabel}</span>
      </div>

      <div className="cla-card__metro">
        <span
          className="cla-card__metro-dot"
          style={{ '--metro-color': c.color } as React.CSSProperties}
        >М</span>
        {c.metro}
      </div>

      <div className="cla-card__zones">
        {c.zones.map(z => (
          <span key={z} className={`cla-card__zone ${activeZone === z ? 'is-match' : ''}`}>{z}</span>
        ))}
      </div>

      <div className="cla-card__feats">
        <span><Icon name="bolt" size={14} /> 24/7</span>
        <span><Icon name="cpu" size={14} /> RTX 4090</span>
        <span><Icon name="gamepad" size={14} /> PS5</span>
      </div>

      <div className="cla-card__actions">
        {isExternal ? (
          <a className="ff-btn ff-btn--primary ff-btn--sm" href={href} target="_blank" rel="noopener noreferrer">
            ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={13} />
          </a>
        ) : (
          <a className="ff-btn ff-btn--primary ff-btn--sm" href={href}>
            ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={13} />
          </a>
        )}
        {!isExternal && (
          <Link className="cla-card__more" href={href}>
            Подробнее <Icon name="arrowRight" size={14} />
          </Link>
        )}
      </div>
    </Card>
  )
}

export default function ClubsExplorer() {
  const [city, setCity] = useState<string>('all')
  const [zone, setZone] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onCity = (e: Event) => setCity((e as CustomEvent).detail || 'all')
    const onZone = (e: Event) => setZone((e as CustomEvent).detail || null)
    window.addEventListener('cla-set-city', onCity)
    window.addEventListener('cla-set-zone', onZone)
    return () => {
      window.removeEventListener('cla-set-city', onCity)
      window.removeEventListener('cla-set-zone', onZone)
    }
  }, [])

  const counts = AGG_CLUBS.reduce<Record<string, number>>((acc, c) => {
    acc[c.city] = (acc[c.city] || 0) + 1
    return acc
  }, {})

  const isVisible = (c: AggClub) => {
    const cityOk = city === 'all' || c.city === city
    const zoneOk = !zone || c.zones.includes(zone)
    return cityOk && zoneOk
  }

  const visibleCount = AGG_CLUBS.filter(isVisible).length

  const jumpToCard = (id: string) => {
    setActive(id)
    document.getElementById(`club-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const cities = [
    { key: 'all', label: 'Все',             cnt: AGG_CLUBS.length },
    { key: 'spb', label: 'Санкт-Петербург', cnt: counts.spb || 0 },
    { key: 'mkh', label: 'Махачкала',       cnt: counts.mkh || 0 },
  ]

  return (
    <section id="explorer" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Карта клубов</span>
          <h2 className="ff-section-head__title">Найди свой клуб</h2>
          <p className="ff-section-head__sub">
            7 локаций в шаговой доступности от метро. Фильтруй по городу и зонам — карта и карточки обновятся.
          </p>
        </Reveal>

        {/* Filter */}
        <Reveal>
          <div className="cla-filter">
            <span className="cla-filter__label">Город</span>
            <div className="cla-seg" role="tablist" aria-label="Фильтр по городу">
              {cities.map(ct => (
                <button
                  key={ct.key} type="button" role="tab"
                  aria-selected={city === ct.key}
                  className={`cla-seg__btn ${city === ct.key ? 'is-active' : ''}`}
                  onClick={() => setCity(ct.key)}
                >
                  {ct.label} <span className="cnt">{ct.cnt}</span>
                </button>
              ))}
            </div>
            <span className="cla-filter__label" style={{ marginLeft: 'auto' }}>Зоны</span>
            <div className="cla-chips" role="group" aria-label="Фильтр по зонам">
              {ZONE_FILTERS.map(z => (
                <button
                  key={z} type="button"
                  className={`cla-chip ${zone === z ? 'is-active' : ''}`}
                  aria-pressed={zone === z}
                  onClick={() => setZone(zone === z ? null : z)}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Map */}
        <Reveal>
          <div className="cla-map" role="img" aria-label="Карта клубов Full Focus">
            <span className="cla-map__label">Санкт-Петербург · Махачкала</span>
            <svg className="cla-map__river" viewBox="0 0 100 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="claNeva" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#6632FA" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#6632FA" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#00FFB6" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path d="M 0 28 C 18 22, 26 30, 40 32 S 60 40, 78 36 L 100 34"
                    stroke="url(#claNeva)" strokeWidth="1.4" fill="none" />
              <path d="M 30 32 C 38 38, 42 48, 48 52" stroke="rgba(102,50,250,0.3)" strokeWidth="0.6" fill="none" />
              <path d="M 50 36 C 56 44, 58 50, 62 56" stroke="rgba(102,50,250,0.3)" strokeWidth="0.6" fill="none" />
              <ellipse cx="40" cy="42" rx="36" ry="28" stroke="rgba(102,50,250,0.18)" strokeWidth="0.4"
                       strokeDasharray="1.5 1.5" fill="none" />
              <line x1="74" y1="6" x2="74" y2="58" stroke="rgba(102,50,250,0.25)" strokeWidth="0.4"
                    strokeDasharray="0.8 0.8" />
              <text x="80" y="14" fill="rgba(157,157,156,0.5)" fontSize="2.4" letterSpacing="0.5"
                    style={{ textTransform: 'uppercase', fontFamily: 'var(--ff-font-heading)' }}>МАХАЧКАЛА</text>
              <text x="6" y="10" fill="rgba(157,157,156,0.5)" fontSize="2.4" letterSpacing="0.5"
                    style={{ textTransform: 'uppercase', fontFamily: 'var(--ff-font-heading)' }}>САНКТ-ПЕТЕРБУРГ</text>
            </svg>

            {AGG_CLUBS.map((c, i) => (
              <button
                key={c.id} type="button"
                className={`ff-pin ${active === c.id ? 'is-active' : ''} ${isVisible(c) ? '' : 'is-dim'}`}
                style={{ left: `${c.x}%`, top: `${c.y}%`, '--pin-delay': `${i * 0.3}s` } as React.CSSProperties}
                onMouseEnter={() => setActive(c.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(c.id)}
                onClick={() => isVisible(c) && jumpToCard(c.id)}
                aria-label={`Клуб ${c.name}`}
              >
                <span className="ff-pin__pulse" />
                <span className="ff-pin__dot" />
                <span className="ff-pin__label">{c.name}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cards */}
        <div className="cla-grid" role="list">
          {AGG_CLUBS.map(c => (
            <div key={c.id} className={isVisible(c) ? '' : 'cla-card--hidden'} style={isVisible(c) ? {} : { display: 'none' }}>
              <ClubCard
                c={c}
                activeZone={zone}
                isActive={active === c.id}
                onEnter={() => setActive(c.id)}
                onLeave={() => setActive(null)}
              />
            </div>
          ))}
          {visibleCount === 0 && (
            <p className="cla-empty">По выбранным фильтрам клубов нет. Сбрось зону или выбери другой город.</p>
          )}
        </div>
      </div>
    </section>
  )
}
