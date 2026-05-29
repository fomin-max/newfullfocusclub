import type { Metadata } from 'next'
import Link from 'next/link'
import ProgressBar from '@/components/ui/ProgressBar'
import Ticker from '@/components/ui/Ticker'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { ALL_CLUBS } from '@/lib/clubs/shared'

export const metadata: Metadata = {
  title: 'Клубы Full Focus — 7 локаций в СПб и Махачкале',
  description: 'Full Focus Club: 7 киберспортивных клубов в Санкт-Петербурге и Махачкале. RTX 4090, зоны VR и PS5, своя кухня. Круглосуточно. Выберите ближайший клуб.',
  metadataBase: new URL('https://fullfocusclub.ru'),
  alternates: { canonical: '/clubs' },
  openGraph: {
    title: 'Клубы Full Focus — 7 локаций в СПб и Махачкале',
    description: 'Full Focus Club: 7 киберспортивных клубов в Санкт-Петербурге и Махачкале. RTX 4090, зоны VR и PS5, своя кухня. Круглосуточно.',
    url: 'https://fullfocusclub.ru/clubs',
    siteName: 'Full Focus Club',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const BASE = 'https://fullfocusclub.ru'

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Full Focus Club', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Клубы', item: `${BASE}/clubs` },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Клубы Full Focus',
      description: '7 киберспортивных клубов Full Focus в Санкт-Петербурге и Махачкале',
      url: `${BASE}/clubs`,
      numberOfItems: ALL_CLUBS.length,
      itemListElement: ALL_CLUBS.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Full Focus · ${c.name}`,
        url: `${BASE}/clubs/${c.slug}`,
        item: {
          '@type': 'LocalBusiness',
          '@id': `${BASE}/clubs/${c.slug}#business`,
          name: `Full Focus · ${c.name}`,
          url: `${BASE}/clubs/${c.slug}`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: c.addr,
            addressLocality: c.slug === 'makhachkala' ? 'Махачкала' : 'Санкт-Петербург',
            addressCountry: 'RU',
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
            opens: '00:00',
            closes: '23:59',
          },
        },
      })),
    },
  ],
}

const CITY_LABELS: Record<string, string> = {
  makhachkala: 'Махачкала',
}

export default function ClubsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <ProgressBar />
      <Ticker />
      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="cl-list-hero">
          <div className="cl-list-hero__mesh" aria-hidden="true" />
          <div className="cl-list-hero__inner">
            <nav className="cl-list-hero__crumbs" aria-label="Хлебные крошки">
              <Link href="/">Full Focus Club</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">Клубы</span>
            </nav>
            <span className="ff-tag">— все локации</span>
            <h1 className="cl-list-hero__title">
              <span className="ff-gradient-text">7 клубов</span>
              <br />в двух городах
            </h1>
            <p className="cl-list-hero__sub">
              Санкт-Петербург и Махачкала · RTX&nbsp;4090 · PS5 · VR · Круглосуточно
            </p>
          </div>
        </section>

        {/* ── Club grid ── */}
        <section className="ff-section" aria-labelledby="clubs-heading">
          <div className="ff-section__inner">
            <h2 id="clubs-heading" className="sr-only">Список клубов</h2>
            <ul className="cl-list-grid" role="list">
              {ALL_CLUBS.map((club, i) => (
                <li key={club.slug}>
                  <Link
                    href={`/clubs/${club.slug}`}
                    className="cl-list-card ff-card ff-card--brackets"
                    aria-label={`Full Focus ${club.name} — ${club.addr}`}
                  >
                    <div className="ff-card__glow" aria-hidden="true" />

                    <div className="cl-list-card__top">
                      <span
                        className="cl-list-card__num"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="cl-list-card__dot"
                        style={{ background: club.color, boxShadow: `0 0 12px ${club.color}88` }}
                        aria-hidden="true"
                      />
                    </div>

                    <h2 className="cl-list-card__name">
                      Full Focus&nbsp;·&nbsp;{club.name}
                    </h2>

                    <div className="cl-list-card__metro">
                      <span
                        className="ff-club__metro-dot"
                        style={{ '--metro-color': club.color } as React.CSSProperties}
                        aria-hidden="true"
                      />
                      <span>м.&nbsp;{club.metro}</span>
                      {CITY_LABELS[club.slug] && (
                        <span className="cl-list-card__city">{CITY_LABELS[club.slug]}</span>
                      )}
                    </div>

                    <address className="cl-list-card__addr">{club.addr}</address>

                    <div className="cl-list-card__footer">
                      <span className="cl-list-card__cta">Подробнее</span>
                      <span className="cl-list-card__arrow" aria-hidden="true">→</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="ff-section" style={{ paddingTop: 0 }}>
          <div className="ff-section__inner">
            <hr className="ff-divider" />
            <div className="cl-list-cta">
              <p className="cl-list-cta__text">
                Не знаете какой клуб выбрать?<br />
                Напишите нам — подберём ближайший и забронируем место.
              </p>
              <div className="cl-list-cta__btns">
                <a
                  href="https://t.me/fullfocusclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ff-btn ff-btn--primary"
                >
                  Написать в Telegram
                </a>
                <Link href="/" className="ff-btn ff-btn--secondary">
                  На главную
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
