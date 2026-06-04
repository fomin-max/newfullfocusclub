import type { Metadata } from 'next'
import ProgressBar from '@/components/ui/ProgressBar'
import Ticker from '@/components/ui/Ticker'
import Footer from '@/components/ui/Footer'
import MobileStickyBar from '@/components/ui/MobileStickyBar'
import ClubsNavbar from '@/components/clubs/ClubsNavbar'
import ClubsHero from '@/components/clubs/ClubsHero'
import ClubsExplorer from '@/components/clubs/ClubsExplorer'
import ClubsChoose from '@/components/clubs/ClubsChoose'
import ClubsFAQ from '@/components/clubs/ClubsFAQ'
import Promos from '@/components/home/Promos'
import { ALL_CLUBS } from '@/lib/clubs/shared'
import './clubs-agg.css'

export const metadata: Metadata = {
  title: 'Клубы Full Focus — 7 киберспортивных клубов в СПб и Махачкале',
  description: 'Все клубы сети Full Focus: 7 локаций в Санкт-Петербурге и Махачкале. RTX 4090, PS5, круглосуточно. Карта, метро, зоны и онлайн-бронирование.',
  keywords: 'компьютерный клуб Санкт-Петербург, киберспортивный клуб СПб, игровой клуб рядом с метро',
  metadataBase: new URL('https://fullfocusclub.ru'),
  alternates: { canonical: '/clubs' },
  openGraph: {
    title: 'Клубы Full Focus — 7 локаций в СПб и Махачкале',
    description: 'Full Focus — компьютерные клубы и киберспортивные арены в СПб и Махачкале. RTX 4090, PS5, 24/7.',
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
      name: 'Клубы сети Full Focus',
      description: '7 компьютерных клубов Full Focus в Санкт-Петербурге и Махачкале',
      url: `${BASE}/clubs`,
      numberOfItems: ALL_CLUBS.length,
      itemListElement: ALL_CLUBS.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'LocalBusiness',
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

export default function ClubsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <ProgressBar />
      <Ticker />
      <ClubsNavbar />

      <main>
        <ClubsHero />
        <ClubsExplorer />
        <ClubsChoose />
        <Promos />
        <ClubsFAQ />
      </main>

      <Footer />
      <MobileStickyBar />
    </>
  )
}
