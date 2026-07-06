'use client'

import { useEffect, useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    document.body.classList.add('ff-no-scroll')
    return () => document.body.classList.remove('ff-no-scroll')
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const ctaConfig = (() => {
    if (/^\/tournaments\/.+/.test(pathname)) return { label: 'ЗАРЕГИСТРИРОВАТЬСЯ', href: '#tp-form' }
    if (pathname === '/tournaments') return { label: 'ЗАРЕГИСТРИРОВАТЬСЯ', href: '#next' }
    if (pathname === '/franchise') return { label: 'ОСТАВИТЬ ЗАЯВКУ', href: '#contacts' }
    if (pathname === '/events') return { label: 'ЗАБРОНИРОВАТЬ', href: '#form' }
    return { label: 'ЗАБРОНИРОВАТЬ', href: isHome ? '#find' : '/clubs' }
  })()

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
        <a href={ctaConfig.href} className="ff-btn ff-btn--primary ff-btn--sm is-pulse ff-header__cta">
          {ctaConfig.label} <Icon name="arrowRight" size={14} />
        </a>
        <button
          type="button"
          className={`ff-burger ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`ff-mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <ul className="ff-mobile-menu__list">
          {NAV_LINKS.map(l => {
            const href = isHome
              ? `#${l.id}`
              : l.page ? l.page : `/#${l.id}`
            const isActive = isHome
              ? active === l.id
              : l.page ? pathname.startsWith(l.page) : false
            return (
              <li key={l.id}>
                <a href={href} className={isActive ? 'is-active' : ''} onClick={() => setMenuOpen(false)}>
                  {l.name}
                </a>
              </li>
            )
          })}
        </ul>
        <a
          href={ctaConfig.href}
          className="ff-btn ff-btn--primary is-pulse ff-mobile-menu__cta"
          onClick={() => setMenuOpen(false)}
        >
          {ctaConfig.label} <Icon name="arrowRight" size={14} />
        </a>
      </div>
    </header>
  )
}
