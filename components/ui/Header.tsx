'use client'

import { useScrolled, useActiveSection } from '@/lib/hooks'
import Icon from './Icon'

const NAV_LINKS = [
  { id: 'find',       name: 'Клубы' },
  { id: 'how',        name: 'Как начать' },
  { id: 'zones',      name: 'Зоны' },
  { id: 'promos',     name: 'Акции' },
  { id: 'loyalty',    name: 'Уровни' },
  { id: 'tournament', name: 'Турниры' },
  { id: 'events',     name: 'Мероприятия' },
  { id: 'franchise',  name: 'Франшиза' },
]

const ALL_IDS = ['hero', ...NAV_LINKS.map(l => l.id)]

export default function Header() {
  const scrolled = useScrolled(60)
  const active = useActiveSection(ALL_IDS)

  return (
    <header className={`ff-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="ff-header__inner">
        <a className="ff-logo" href="#hero">
          <span className="ff-logo__dot" />
          FULL FOCUS
        </a>
        <ul className="ff-nav">
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>
                {l.name}
              </a>
            </li>
          ))}
        </ul>
        <a href="#find" className="ff-btn ff-btn--primary ff-btn--sm is-pulse">
          ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
        </a>
      </div>
    </header>
  )
}
