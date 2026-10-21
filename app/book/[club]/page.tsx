import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../book.css'
import LogoMark from '@/components/ui/LogoMark'
import Icon, { type IconName } from '@/components/ui/Icon'
import { CLUB_CONTACTS, getClubContacts } from '@/lib/clubs/contacts'

type Props = { params: Promise<{ club: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return CLUB_CONTACTS.map(c => ({ club: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getClubContacts((await params).club)
  if (!c) return {}
  return {
    title: `Забронировать место — Full Focus ${c.name}`,
    description: `Бронь в Full Focus ${c.name} (${c.addr}): на сайте, по телефону ${c.phone}, в Telegram или VK.`,
    alternates: { canonical: `/book/${c.slug}` },
    robots: { index: false, follow: true },
  }
}

export default async function BookClubPage({ params }: Props) {
  const c = getClubContacts((await params).club)
  if (!c) notFound()

  const methods: { href: string; icon: IconName; title: string; meta: string; primary?: boolean; external?: boolean }[] = [
    { href: c.siteHref,     icon: 'monitor',  title: 'На сайте',           meta: 'Выбрать место на карте клуба', primary: true },
    { href: c.phoneHref,    icon: 'phone',    title: 'Позвонить',          meta: c.phone },
    { href: c.telegramHref, icon: 'telegram', title: 'Написать в Telegram', meta: c.telegram, external: true },
    { href: c.vk,           icon: 'vk',       title: 'Написать в VK',      meta: c.vk.replace('https://', ''), external: true },
  ]

  return (
    <main className="bk">
      <div className="bk-wrap">
        <div className="bk-top">
          <a className="bk-logo" href="/" aria-label="Full Focus — на главную">
            <LogoMark size={20} />
            FULL FOCUS
          </a>
          <a className="bk-back" href="/book">← Другой клуб</a>
        </div>

        <div className="bk-tag">
          <span className="bk-metro" style={{ '--metro-color': c.color } as React.CSSProperties} />
          {c.name}
        </div>
        <h1>Как удобнее забронировать?</h1>
        <p className="bk-sub">{c.addr} · 24/7</p>

        <ul className="bk-list">
          {methods.map(m => (
            <li key={m.title}>
              <a
                className={`bk-item${m.primary ? ' bk-item--primary' : ''}`}
                href={m.href}
                {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="bk-item__icon"><Icon name={m.icon} size={22} /></span>
                <span className="bk-item__body">
                  <span className="bk-item__title">{m.title}</span>
                  <span className="bk-item__meta">{m.meta}</span>
                </span>
                <span className="bk-item__arrow"><Icon name="arrowRight" size={18} /></span>
              </a>
            </li>
          ))}
        </ul>

        <p className="bk-foot"><a href={`/clubs/${c.slug}`}>Подробнее о клубе</a></p>
      </div>
    </main>
  )
}
