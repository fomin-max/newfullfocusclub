'use client'

import { useScrolled, useActiveSection } from '@/lib/hooks'
import Link from 'next/link'
import LogoFull from '@/components/ui/LogoFull'
import LogoMark from '@/components/ui/LogoMark'
import Icon from '@/components/ui/Icon'

const NAV_LINKS = [
  { id: 'explorer', name: 'Все клубы' },
  { id: 'choose',   name: 'Как выбрать' },
  { id: 'promos',   name: 'Акции' },
  { id: 'faq',      name: 'Вопросы' },
]

const ALL_IDS = ['hero', ...NAV_LINKS.map(l => l.id)]

export default function ClubsNavbar() {
  const scrolled = useScrolled(60)
  const active = useActiveSection(ALL_IDS)

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <header className={`ff-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="ff-header__inner">
        <Link className="ff-logo" href="/" aria-label="Full Focus — на главную">
          <LogoFull className="ff-logo__full" height={34} />
          <LogoMark className="ff-logo__mark" size={32} />
        </Link>
        <ul className="ff-nav">
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={active === l.id ? 'is-active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(l.id) }}
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="ff-btn ff-btn--primary ff-btn--sm is-pulse"
          onClick={() => scrollTo('explorer')}
        >
          ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
        </button>
      </div>
    </header>
  )
}
