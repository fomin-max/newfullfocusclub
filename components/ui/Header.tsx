'use client'

import { usePathname } from 'next/navigation'
import { useScrolled, useActiveSection } from '@/lib/hooks'
import Icon from './Icon'
import LogoFull from './LogoFull'
import LogoMark from './LogoMark'

const NAV_LINKS = [
  { id: 'find',       name: 'Клубы',        page: '/clubs' },
  { id: 'how',        name: 'Как начать',   page: null },
  { id: 'zones',      name: 'Зоны',         page: null },
  { id: 'promos',     name: 'Акции',        page: null },
  { id: 'loyalty',    name: 'Уровни',       page: null },
  { id: 'tournament', name: 'Турниры',      page: '/tournaments' },
  { id: 'franchise',  name: 'Франшиза',     page: '/franchise' },
  { id: 'events',     name: 'Мероприятия',  page: '/events' },
]

const ALL_IDS = ['hero', ...NAV_LINKS.map(l => l.id)]

export default function Header() {
  const scrolled = useScrolled(60)
  const active = useActiveSection(ALL_IDS)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const logoHref = isHome ? '#hero' : '/'

  return (
    <header className={`ff-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="ff-header__inner">
        <a className="ff-logo" href={logoHref} aria-label="Full Focus — киберспортивный клуб, на главную">
          <LogoFull className="ff-logo__full" height={34} />
          <LogoMark className="ff-logo__mark" size={32} />
        </a>
        <ul className="ff-nav">
          {NAV_LINKS.map(l => {
            const href = isHome
              ? `#${l.id}`
              : l.page ? l.page : `/#${l.id}`
            const isActive = isHome
              ? active === l.id
              : l.page ? pathname.startsWith(l.page) : false
            return (
              <li key={l.id}>
                <a href={href} className={isActive ? 'is-active' : ''}>
                  {l.name}
                </a>
              </li>
            )
          })}
        </ul>
        <a href={isHome ? '#find' : '/clubs'} className="ff-btn ff-btn--primary ff-btn--sm is-pulse">
          ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
        </a>
      </div>
    </header>
  )
}
