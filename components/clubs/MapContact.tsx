'use client'

import Icon from '@/components/ui/Icon'
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

export default function MapContact() {
  const { CLUB, ALL_CLUBS } = useClubData()
  const { MAP } = CLUB
  const otherClubs = ALL_CLUBS
    .filter(c => c.slug !== CLUB.SLUG)
    .map(c => ({ ...c, href: CLUB_PAGES[c.slug] ?? '/#find' }))

  return (
    <section id="contacts" className="ff-section" data-screen-label="10 · КОНТАКТЫ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-section-head">
            <span className="ff-tag">— как добраться</span>
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
          <Reveal delay={80}>
            <div className="cl-other-clubs__row">
              {otherClubs.map(c => (
                <a key={c.slug} className="cl-otherclub" href={c.href}>
                  <span className="cl-otherclub__metro" style={{ '--metro-color': c.color } as React.CSSProperties}>{c.metro}</span>
                  <span className="cl-otherclub__name">FF · {c.name}</span>
                  <span className="cl-otherclub__addr">{c.addr}</span>
                  <span className="cl-otherclub__cta">К клубу</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
