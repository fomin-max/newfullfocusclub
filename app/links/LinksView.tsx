import '../book/book.css'
import LogoMark from '@/components/ui/LogoMark'
import Icon from '@/components/ui/Icon'
import { SPB_SOCIALS, type SocialLink } from '@/lib/socials'

export type { SocialLink }

export interface LinksCity {
  slug:    'spb' | 'makhachkala'
  name:    string
  path:    string
  bookHref: string
  socials: SocialLink[]
}

export const FULLFOCUSPAY: SocialLink = {
  href: 'https://fullfocuspay.ru/', icon: 'ruble', img: '/logo-pay-mark.svg', title: 'FullFocusPay', meta: 'Пополнение Steam',
}

export const CITIES: LinksCity[] = [
  {
    slug: 'spb', name: 'Петербург', path: '/links', bookHref: '/book',
    socials: SPB_SOCIALS,
  },
  {
    slug: 'makhachkala', name: 'Махачкала', path: '/links/makhachkala', bookHref: '/book/makhachkala',
    socials: [
      { href: 'https://t.me/fullfocusclub_makhachkala',              icon: 'telegram',  title: 'Telegram',  meta: '@fullfocusclub_makhachkala' },
      { href: 'https://vk.ru/fullfocusclub_makhachkala',             icon: 'vk',        title: 'VK',        meta: 'vk.ru/fullfocusclub_makhachkala' },
      { href: 'https://www.instagram.com/fullfocusclub_makhachkala', icon: 'instagram', title: 'Instagram', meta: '@fullfocusclub_makhachkala', extremist: true },
    ],
  },
]

function LinkItem({ l, primary }: { l: SocialLink; primary?: boolean }) {
  return (
    <li>
      <a className={`bk-item${primary ? ' bk-item--primary' : ''}`} href={l.href} target="_blank" rel="noopener noreferrer">
        {l.img
          ? <img className="bk-item__logo" src={l.img} width={44} height={44} alt="" />
          : <span className="bk-item__icon"><Icon name={l.icon} size={22} /></span>}
        <span className="bk-item__body">
          <span className="bk-item__title">{l.title}{l.extremist && '*'}</span>
          <span className="bk-item__meta">{l.meta}</span>
        </span>
        <span className="bk-item__arrow"><Icon name="arrowRight" size={18} /></span>
      </a>
    </li>
  )
}

export default function LinksView({ city }: { city: LinksCity }) {
  const hasExtremist = city.socials.some(l => l.extremist)
  return (
    <main className="bk">
      <div className="bk-wrap">
        <div className="bk-top">
          <a className="bk-logo" href="/" aria-label="Full Focus — на главную">
            <LogoMark size={20} />
            FULL FOCUS
          </a>
          <nav className="bk-cities" aria-label="Город">
            {CITIES.map(c => (
              <a key={c.slug} href={c.path} aria-current={c.slug === city.slug ? 'page' : undefined}>{c.name}</a>
            ))}
          </nav>
        </div>

        <div className="bk-tag">{city.name}</div>
        <h1>Мы в соцсетях</h1>
        <p className="bk-sub">Новости, турниры и акции клубов Full Focus.</p>

        <ul className="bk-list">
          {city.socials.map(l => <LinkItem key={l.href} l={l} />)}
        </ul>

        <div className="bk-group bk-group--gap">Ещё</div>
        <ul className="bk-list">
          <li>
            <a className="bk-item bk-item--primary" href={city.bookHref}>
              <span className="bk-item__icon"><Icon name="calendar" size={22} /></span>
              <span className="bk-item__body">
                <span className="bk-item__title">Забронировать место</span>
                <span className="bk-item__meta">На сайте, по телефону или в мессенджере</span>
              </span>
              <span className="bk-item__arrow"><Icon name="arrowRight" size={18} /></span>
            </a>
          </li>
          <LinkItem l={FULLFOCUSPAY} />
        </ul>

        {hasExtremist && (
          <p className="bk-note">
            * Instagram принадлежит компании Meta Platforms Inc., деятельность которой
            признана экстремистской и запрещена на территории Российской Федерации.
          </p>
        )}
      </div>
    </main>
  )
}
