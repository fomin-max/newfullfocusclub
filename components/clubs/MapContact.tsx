'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'
import ClubMapSingle from './ClubMapSingle'
import { useClubData } from './ClubDataContext'

const GIS_FIRMS: Record<string, { id: string; city: string; point: string }> = {
  vasilyeostrovsky: { id: '70000001043506490', city: 'spb',          point: '30.285553,59.938401' },
  elektrosila:      { id: '70000001103997896', city: 'spb',          point: '30.317769,59.874029' },
  komendantsky:     { id: '70000001074540116', city: 'spb',          point: '30.265302,60.008029' },
  prosvescheniya:   { id: '70000001042218416', city: 'spb',          point: '30.364851,60.045858' },
  tekhnologichesky: { id: '70000001082667324', city: 'spb',          point: '30.313841,59.914375' },
  sadovaya:         { id: '70000001090366257', city: 'spb',          point: '30.311634,59.929743' },
  makhachkala:      { id: '70000001112442496', city: 'makhachkala',  point: '47.519868,42.976506' },
}

function gis2RouteUrl(slug: string): string {
  const f = GIS_FIRMS[slug]
  if (!f) return 'https://2gis.ru/'
  return `https://2gis.ru/${f.city}/directions/points/%7C${f.point.replace(',', '%2C')}%3B${f.id}`
}

function gis2MapsUrl(slug: string): string {
  const f = GIS_FIRMS[slug]
  if (!f) return 'https://2gis.ru/'
  return `https://2gis.ru/${f.city}/firm/${f.id}/${f.point}`
}

const GOOGLE_MAPS_URLS: Record<string, string> = {
  vasilyeostrovsky: 'https://www.google.com/maps/search/Full+Focus/@59.938389,30.285601,17z',
  elektrosila:      'https://www.google.com/maps/search/Full+Focus/@59.874116,30.317797,17z',
  komendantsky:     'https://www.google.com/maps/search/Full+Focus/@60.008051,30.265316,17z',
  prosvescheniya:   'https://www.google.com/maps/search/Full+Focus/@60.045799,30.365117,17z',
}

function MapsDropdown({ yandexUrl, slug }: { yandexUrl: string; slug: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const options = [
    { label: 'Яндекс Карты', href: yandexUrl,           logo: '/assets/icon-yandex-maps.svg' },
    { label: '2ГИС',         href: gis2MapsUrl(slug),   logo: '/assets/icon-2gis.svg' },
    ...(GOOGLE_MAPS_URLS[slug] ? [{ label: 'Google Maps', href: GOOGLE_MAPS_URLS[slug], logo: '/assets/icon-googlemaps.svg' }] : []),
  ]

  return (
    <div className="cl-route-dropdown" ref={ref}>
      <button
        type="button"
        className="ff-btn ff-btn--secondary ff-btn--sm"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        ОТКРЫТЬ В КАРТАХ →
      </button>
      {open && (
        <ul className="cl-route-dropdown__menu" role="listbox">
          {options.map(o => (
            <li key={o.label} role="option">
              <a href={o.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                <Image src={o.logo} alt={o.label} width={18} height={18} className="cl-route-dropdown__logo" unoptimized />
                {o.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

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

function RouteDropdown({ lat, lng, yandexUrl, slug }: { lat: number; lng: number; yandexUrl: string; slug: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const options = [
    {
      label: 'Яндекс Карты',
      href: yandexUrl,
      logo: '/assets/icon-yandex-maps.svg',
    },
    {
      label: '2ГИС',
      href: gis2RouteUrl(slug),
      logo: '/assets/icon-2gis.svg',
    },
    {
      label: 'Google Maps',
      href: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      logo: '/assets/icon-googlemaps.svg',
    },
  ]

  return (
    <div className="cl-route-dropdown" ref={ref}>
      <button
        type="button"
        className="ff-btn ff-btn--primary ff-btn--sm"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Icon name="route" size={14} /> ПОСТРОИТЬ МАРШРУТ
      </button>
      {open && (
        <ul className="cl-route-dropdown__menu" role="listbox">
          {options.map(o => (
            <li key={o.label} role="option">
              <a href={o.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                <Image src={o.logo} alt={o.label} width={18} height={18} className="cl-route-dropdown__logo" unoptimized />
                {o.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
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
            <ClubMapSingle lat={CLUB.GEO.lat} lng={CLUB.GEO.lng} name={CLUB.NAME} bookUrl="#live" />

            <aside className="cl-contact-card">
              <div className="cl-contact-row">
                <Icon name="pin" size={18} />
                <dd><strong>Адрес</strong><p>{CLUB.ADDRESS}</p></dd>
              </div>
              {CLUB.HAS_METRO !== false && (
                <div className="cl-contact-row">
                  <span className="cl-metro-pill__dot" style={{ background: CLUB.METRO_COLOR, marginTop: 0 }}>М</span>
                  <dd><strong>Метро</strong><p>{CLUB.METRO} · {CLUB.METRO_TIME}</p></dd>
                </div>
              )}
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
                  <p><a href={CLUB.VK} target="_blank" rel="noopener">{CLUB.VK.replace('https://', '')}</a></p></dd>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
                <RouteDropdown
                  lat={CLUB.GEO.lat}
                  lng={CLUB.GEO.lng}
                  yandexUrl={CLUB.ROUTE_URL}
                  slug={CLUB.SLUG}
                />
                <MapsDropdown yandexUrl={CLUB.MAPS_URL} slug={CLUB.SLUG} />
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
