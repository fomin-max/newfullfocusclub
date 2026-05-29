'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import { useClubData } from './ClubDataContext'
import { useBooking } from './BookingContext'

export default function ClubZones() {
  const { CLUB_ZONES }  = useClubData()
  const { openBooking } = useBooking()
  const wrapRef  = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [openGames, setOpenGames] = useState<string | null>(null)

  useEffect(() => {
    const mq     = window.matchMedia('(max-width: 1024px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync   = () => setIsMobile(mq.matches || reduce.matches)
    sync()
    mq.addEventListener('change', sync); reduce.addEventListener('change', sync)
    return () => { mq.removeEventListener('change', sync); reduce.removeEventListener('change', sync) }
  }, [])

  useEffect(() => {
    if (isMobile) return
    const wrap = wrapRef.current; const track = trackRef.current
    if (!wrap || !track) return
    const update = () => {
      const overflow = Math.max(0, track.scrollWidth - window.innerWidth + 80)
      wrap.style.height = `${window.innerHeight + overflow}px`
      const scrolled = Math.min(Math.max(-wrap.getBoundingClientRect().top, 0), overflow)
      setProgress(overflow > 0 ? scrolled / overflow : 0)
      track.style.transform = `translate3d(${-scrolled}px, 0, 0)`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [isMobile])

  return (
    <section id="zones" className="cl-zones" ref={wrapRef as React.RefObject<HTMLElement>} data-screen-label="03 · ZONES">
      <div className="cl-zones__sticky">
        <div className="cl-zones__head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="ff-tag">— {CLUB_ZONES.length} форматов</span>
            <h2>ВЫБЕРИ СВОЙ ФОРМАТ</h2>
          </div>
          <div className="cl-zones__progress">▸ <strong>{Math.round(progress * 100)}%</strong> / 100</div>
        </div>

        <div className={`cl-zones__track ${isMobile ? 'cl-zones__track--mobile' : ''}`} ref={trackRef}>
          {CLUB_ZONES.map((z, i) => {
            const isWide    = z.wide || z.flagship
            const gamesOpen = openGames === z.id
            return (
              <article key={z.id}
                       className={['cl-zonecard', z.flagship && 'cl-zonecard--flagship', z.wide && 'cl-zonecard--wide'].filter(Boolean).join(' ')}
                       style={{ '--zone-accent': z.accent } as React.CSSProperties}>
                <div className="cl-zonecard__media">
                  <img src={z.image} alt={z.name} loading="lazy" />
                  {z.badge && <span className="cl-zonecard__badge">{z.flagship ? '★ ' : ''}{z.badge}</span>}
                  <span className="cl-zonecard__idx">0{i + 1} / 0{CLUB_ZONES.length}</span>
                </div>
                <div className="cl-zonecard__body">
                  <h3 className="cl-zonecard__name">{z.name}</h3>
                  <div className="cl-zonecard__meta">
                    <span><strong>{z.seats}</strong> мест</span>
                    <span>от <em>{z.priceFrom} ₽</em>/час</span>
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
                    <button className={`ff-btn ${isWide ? 'ff-btn--primary' : 'ff-btn--secondary'}`}
                            onClick={() => openBooking(z.id)}>
                      {z.cta} →
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {!isMobile && <div className="cl-zones__hint">прокручивай вниз — листает вбок</div>}
      </div>
    </section>
  )
}
