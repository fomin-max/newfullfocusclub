'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useClubData } from './ClubDataContext'

const scrollToLive = () =>
  document.getElementById('live')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function ClubZones() {
  const { CLUB_ZONES } = useClubData()
  const [openGames, setOpenGames] = useState<string | null>(null)

  return (
    <section id="zones" className="cl-zones" data-screen-label="03 · ZONES">
      <div className="cl-zones__head">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className="ff-tag">{CLUB_ZONES.length} форматов</span>
          <h2>ВЫБЕРИ СВОЙ ФОРМАТ</h2>
        </div>
      </div>

      <div className="cl-zones__grid">
        {CLUB_ZONES.map((z, i) => {
          const isWide    = z.wide || z.flagship
          const gamesOpen = openGames === z.id
          return (
            <article key={z.id}
                     className={['cl-zonecard', z.flagship && 'cl-zonecard--flagship', z.wide && 'cl-zonecard--wide'].filter(Boolean).join(' ')}
                     style={{ '--zone-accent': z.accent } as React.CSSProperties}>
              <div className="cl-zonecard__media">
                <Image src={z.image} alt={z.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <span className="cl-zonecard__idx">0{i + 1} / 0{CLUB_ZONES.length}</span>
              </div>
              {z.badge && <span className="cl-zonecard__badge">{z.flagship ? '★ ' : ''}{z.badge}</span>}
              <div className="cl-zonecard__body">
                <h3 className="cl-zonecard__name">{z.name}</h3>
                <div className="cl-zonecard__meta">
                  <span><strong>{z.seats}</strong> мест</span>
                  {z.priceFrom > 0 && <span>от <em>{z.priceFrom} ₽</em>/{z.priceUnit ?? 'час'}</span>}
                </div>
                <p className="cl-zonecard__desc">{z.desc}</p>
                <div className="cl-zonecard__spec">▸ {z.specShort}</div>

                {z.games && z.games.length > 0 && (
                  <div className={`cl-zonecard__games ${gamesOpen ? 'is-open' : ''}`}>
                    <button className="cl-games-toggle"
                            aria-expanded={gamesOpen}
                            onClick={() => setOpenGames(gamesOpen ? null : z.id)}>
                      ВСЕ ИГРЫ ({z.games.length})
                      <span className="cl-games-toggle__sign">{gamesOpen ? '×' : '+'}</span>
                    </button>
                    <div className="cl-games-panel">
                      <div className="cl-games-panel__inner">
                        {z.games.map((g, gi) => (
                          <span className="cl-game-pill" key={gi}
                                style={{ '--pill-delay': `${gi * 0.04}s` } as React.CSSProperties}>{g}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="cl-zonecard__cta">
                  {z.ctaHref ? (
                    <a href={z.ctaHref} target="_blank" rel="noopener noreferrer"
                       className={`ff-btn ${isWide ? 'ff-btn--primary' : 'ff-btn--secondary'}`}>
                      {z.cta} →
                    </a>
                  ) : (
                    <button className={`ff-btn ${isWide ? 'ff-btn--primary' : 'ff-btn--secondary'}`}
                            onClick={scrollToLive}>
                      {z.cta} →
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
