import type { Metadata } from 'next'
import './book.css'
import LogoMark from '@/components/ui/LogoMark'
import Icon from '@/components/ui/Icon'
import { CLUB_CONTACTS, type ClubContacts } from '@/lib/clubs/contacts'

// Служебная страница для ссылок из постов — в поиск не отдаём
export const metadata: Metadata = {
  title: 'Забронировать место — Full Focus',
  description: 'Выберите клуб Full Focus и удобный способ брони: на сайте, по телефону, в Telegram или VK.',
  alternates: { canonical: '/book' },
  robots: { index: false, follow: true },
}

const SPB = CLUB_CONTACTS.filter(c => c.slug !== 'makhachkala')
const MHK = CLUB_CONTACTS.filter(c => c.slug === 'makhachkala')

function ClubLink({ c }: { c: ClubContacts }) {
  return (
    <li>
      <a className="bk-item" href={`/book/${c.slug}`}>
        <span className="bk-metro" style={{ '--metro-color': c.color } as React.CSSProperties} />
        <span className="bk-item__body">
          <span className="bk-item__title">{c.name}</span>
          <span className="bk-item__meta">{c.addr}</span>
        </span>
        <span className="bk-item__arrow"><Icon name="arrowRight" size={18} /></span>
      </a>
    </li>
  )
}

export default function BookPage() {
  return (
    <main className="bk">
      <div className="bk-wrap">
        <div className="bk-top">
          <a className="bk-logo" href="/" aria-label="Full Focus — на главную">
            <LogoMark size={20} />
            FULL FOCUS
          </a>
        </div>

        <div className="bk-tag">Бронь · шаг 1 из 2</div>
        <h1>Выберите клуб</h1>
        <p className="bk-sub">Дальше покажем, как забронировать место: на сайте, по телефону, в Telegram или VK.</p>

        <div className="bk-group">Санкт-Петербург</div>
        <ul className="bk-list">{SPB.map(c => <ClubLink key={c.slug} c={c} />)}</ul>

        <div className="bk-group">Махачкала</div>
        <ul className="bk-list">{MHK.map(c => <ClubLink key={c.slug} c={c} />)}</ul>

        <p className="bk-foot"><a href="/">fullfocusclub.ru</a> · все клубы 24/7</p>
      </div>
    </main>
  )
}
