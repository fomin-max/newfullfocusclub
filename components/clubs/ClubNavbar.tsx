'use client'

import { useScrolled, useActiveSection } from '@/lib/hooks'
import Icon from '@/components/ui/Icon'
import LogoFull from '@/components/ui/LogoFull'
import { useClubData } from './ClubDataContext'
import { useBooking } from './BookingContext'

const CLUB_NAV = [
  { id: 'zones',    name: 'Зоны' },
  { id: 'tariffs',  name: 'Тарифы' },
  { id: 'hardware', name: 'Железо' },
  { id: 'features', name: 'Особенности' },
  { id: 'events',   name: 'Мероприятия' },
  { id: 'contacts', name: 'Контакты' },
]

const ALL_IDS = ['hero', ...CLUB_NAV.map(l => l.id)]

export function ClubNavbar() {
  const scrolled       = useScrolled(60)
  const active         = useActiveSection(ALL_IDS)
  const { openBooking } = useBooking()

  return (
    <header className={`ff-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="ff-header__inner">
        <a className="ff-logo" href="/" aria-label="Full Focus — на главную">
          <LogoFull className="ff-logo__full" height={34} />
        </a>
        <ul className="ff-nav">
          {CLUB_NAV.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>{l.name}</a>
            </li>
          ))}
        </ul>
        <button className="ff-btn ff-btn--primary ff-btn--sm is-pulse" onClick={() => openBooking()}>
          ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
        </button>
      </div>
    </header>
  )
}

export function ClubCrumbs() {
  const { CLUB } = useClubData()
  return (
    <nav className="cl-crumbs" aria-label="breadcrumb">
      <div className="cl-crumbs__inner">
        <a href="/">← Все клубы</a>
        <span className="cl-crumbs__sep">/</span>
        <span>FULL FOCUS</span>
        <span className="cl-crumbs__sep">/</span>
        <span className="cl-crumbs__pill">{CLUB.NAME.toUpperCase()}</span>
      </div>
    </nav>
  )
}
