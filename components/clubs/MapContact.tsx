'use client'

import { useRef, useEffect } from 'react'
import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'
import { useClubData } from './ClubDataContext'

const CLUB_PAGES: Record<string, string> = {
  vasilyeostrovsky: '/clubs/vasilyeostrovsky',
  elektrosila:      '/clubs/elektrosila',
  komendantsky:     '/clubs/komendantsky',
  prosvescheniya:   '/clubs/prosvescheniya',
  sadovaya:         '/clubs/sadovaya',
  tekhnologichesky: '/clubs/tekhnologichesky',
  makhachkala:      '/clubs/makhachkala',
}

const CLUB_ZONES: Record<string, string[]> = {
  vasilyeostrovsky: ['PRO', 'DUO', 'BOOTCAMP', 'ARENA', 'SOLO', 'LOUNGE'],
  elektrosila:      ['PRO', 'MAX', 'DUO', 'LOUNGE'],
  komendantsky:     ['PRO', 'MAX', 'BOOTCAMP', 'LOUNGE'],
  prosvescheniya:   ['PRO', 'MAX', 'BOOTCAMP', 'DUO', 'SOLO', 'LOUNGE'],
  sadovaya:         ['PRO', 'MAX', 'BOOTCAMP', 'DUO', 'LOUNGE'],
  tekhnologichesky: ['PRO', 'MAX', 'BOOTCAMP', 'LOUNGE'],
  makhachkala:      ['BOOTCAMP', 'QUADRO', 'TRIO', 'DUO', 'SOLO', 'LOUNGE'],
}

export default function MapContact() {
  const { CLUB, ALL_CLUBS } = useClubData()
  const { MAP } = CLUB
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const onWheel = (e: WheelEvent) => {
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

  const otherClubs = ALL_CLUBS
    .filter(c => c.slug !== CLUB.SLUG)
    .map(c => ({ ...c, href: CLUB_PAGES[c.slug] ?? '/#find', zones: CLUB_ZONES[c.slug] ?? [] }))

  return (
    <section id="contacts" className="ff-section" data-screen-label="10 · КОНТАКТЫ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-section-head">
            <span className="ff-tag">как добраться</span>
            <h2 className="ff-section-head__title">КАРТА И КОНТАКТЫ</h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="cl-map__wrap">
            <div className="cl-map__canvas">
              <span className="cl-map__placeholder">▸ Яндекс.Карты · превью</span>
              {MAP.river && <span className="cl-map__river" />}
              <span className="cl-map__coords">{CLUB.COORDS}</span>

              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                   viewBox="0 0 400 280" preserveAspectRatio="none">
                {MAP.roads.map((r, i) =>
                  r.type === 'path'
                    ? <path key={i} d={r.d} stroke={r.color} strokeWidth={r.w} fill="none" />
                    : <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={r.color} strokeWidth={r.w} />
                )}
                {MAP.labels.map((l, i) => (
                  <text key={i} x={l.x} y={l.y} fill={l.color}
                        style={{ font: '600 9px "Magistral", monospace', letterSpacing: 1.5 }}>
                    {l.text}
                  </text>
                ))}
              </svg>

              <div className="cl-map__pin" style={{ top: MAP.pin.top, left: MAP.pin.left }}>
                <span className="cl-map__pin-dot" />
                <span className="cl-map__pin-label">FF · {CLUB.NAME.toUpperCase()}</span>
              </div>
            </div>

            <aside className="cl-contact-card">
              <div className="cl-contact-row">
                <Icon name="pin" size={18} />
                <dd><strong>Адрес</strong><p>{CLUB.ADDRESS}</p></dd>
              </div>
              <div className="cl-contact-row">
                <span className="cl-metro-pill__dot" style={{ background: CLUB.METRO_COLOR, marginTop: 0 }}>М</span>
                <dd><strong>Метро</strong><p>{CLUB.METRO} · {CLUB.METRO_TIME}</p></dd>
              </div>
              <div className="cl-contact-row">
                <Icon name="clock" size={18} />
                <dd><strong>Режим работы</strong><p><span className="cl-status-dot" />{CLUB.HOURS}</p></dd>
              </div>
              <div className="cl-contact-row">
                <Icon name="phone" size={18} />
                <dd><strong>Телефон</strong>
                  <p><a href={`tel:${CLUB.PHONE.replace(/[^+\d]/g, '')}`}>{CLUB.PHONE}</a></p></dd>
              </div>
              <div className="cl-contact-row">
                <Icon name="telegram" size={18} />
                <dd><strong>Telegram клуба</strong>
                  <p><a href={`https://t.me/${CLUB.TELEGRAM.replace('@', '')}`} target="_blank" rel="noopener">{CLUB.TELEGRAM}</a></p></dd>
              </div>
              <div className="cl-contact-row">
                <Icon name="vk" size={18} />
                <dd><strong>VK</strong>
                  <p><a href="https://vk.com/fullfocusclub" target="_blank" rel="noopener">vk.com/fullfocusclub</a></p></dd>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
                <a href={CLUB.ROUTE_URL} target="_blank" rel="noopener" className="ff-btn ff-btn--primary ff-btn--sm">
                  <Icon name="route" size={14} /> ПОСТРОИТЬ МАРШРУТ
                </a>
                <a href={CLUB.MAPS_URL} target="_blank" rel="noopener" className="ff-btn ff-btn--secondary ff-btn--sm">
                  ОТКРЫТЬ В КАРТАХ →
                </a>
              </div>
            </aside>
          </div>
        </Reveal>

        <div className="cl-other-clubs">
          <Reveal>
            <div className="cl-other-clubs__head">
              <h3 className="cl-other-clubs__title">— Другие клубы сети</h3>
              <a href="/#find" style={{ fontFamily: 'var(--ff-font-heading)', fontWeight: 700, fontSize: 11,
                letterSpacing: 'var(--ff-track-button)', color: 'var(--ff-neon-bloom)', textTransform: 'uppercase' }}>
                ВСЕ КЛУБЫ НА КАРТЕ →
              </a>
            </div>
          </Reveal>

          <div className="ff-find__row" ref={rowRef}>
            {otherClubs.map(c => (
              <div key={c.slug} className="ff-find__row-cell">
                <Card brackets className="ff-club">
                  <div className="ff-club__name">{c.name}</div>
                  <div className="ff-club__metro">
                    <span className="ff-club__metro-dot" style={{ '--metro-color': c.color } as React.CSSProperties}>М</span>
                    {c.metro}
                  </div>
                  {c.zones.length > 0 && (
                    <div className="ff-club__zones">
                      {c.zones.map(z => <span key={z} className="ff-club__zone">{z}</span>)}
                    </div>
                  )}
                  <a href={c.href} className="ff-club__more" role="button">Подробнее</a>
                </Card>
              </div>
            ))}
          </div>
          <p className="ff-find__hint" aria-hidden="true">
            <Icon name="arrowRight" size={14} /> Листай вбок — колесом или свайпом
          </p>
        </div>
      </div>
    </section>
  )
}
