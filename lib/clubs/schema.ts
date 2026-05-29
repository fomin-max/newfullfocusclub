import type { Metadata } from 'next'
import type { ClubData } from './types'

export function buildClubSchema(d: ClubData) {
  const minPrice = Math.min(...d.CLUB_ZONES.map(z => z.priceFrom))
  const baseUrl  = `https://fullfocusclub.ru/clubs/${d.CLUB.SLUG}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['GameStore', 'LocalBusiness'],
        '@id': `${baseUrl}#business`,
        name: `Full Focus · ${d.CLUB.NAME}`,
        url: baseUrl,
        telephone: d.CLUB.PHONE.replace(/[^+\d]/g, ''),
        address: {
          '@type': 'PostalAddress',
          streetAddress: d.CLUB.ADDRESS,
          addressLocality: 'Санкт-Петербург',
          addressRegion: 'Санкт-Петербург',
          addressCountry: 'RU',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: d.CLUB.GEO.lat,
          longitude: d.CLUB.GEO.lng,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: d.CLUB.REVIEWS_COUNT_NUM,
          bestRating: '5',
          worstRating: '1',
        },
        priceRange: `от ${minPrice}₽/час`,
        currenciesAccepted: 'RUB',
        amenityFeature: d.FEATURES.map(f => ({
          '@type': 'LocationFeatureSpecification',
          name: f.name,
          value: true,
        })),
        sameAs: [
          'https://vk.com/fullfocusclub',
          `https://t.me/${d.CLUB.TELEGRAM.replace('@', '')}`,
        ],
        hasMap: d.CLUB.MAPS_URL,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Full Focus Club', item: 'https://fullfocusclub.ru' },
          { '@type': 'ListItem', position: 2, name: 'Клубы', item: 'https://fullfocusclub.ru/#find' },
          { '@type': 'ListItem', position: 3, name: d.CLUB.NAME, item: baseUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: d.FAQ.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  }
}

export function buildClubMetadata(d: ClubData): Metadata {
  const minPrice = Math.min(...d.CLUB_ZONES.map(z => z.priceFrom))
  const title       = `Full Focus · ${d.CLUB.NAME} — ${d.CLUB.ADDRESS} · Круглосуточно`
  const description = `Киберспортивный клуб Full Focus на ${d.CLUB.METRO}: ${d.CLUB_ZONES.length} зон, RTX 4090, своя кухня. От ${minPrice}₽/час. ${d.CLUB.HOURS}. ${d.CLUB.ADDRESS}, СПб.`

  return {
    title,
    description,
    metadataBase: new URL('https://fullfocusclub.ru'),
    alternates: { canonical: `/clubs/${d.CLUB.SLUG}` },
    openGraph: {
      title,
      description,
      url: `https://fullfocusclub.ru/clubs/${d.CLUB.SLUG}`,
      siteName: 'Full Focus Club',
      locale: 'ru_RU',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}
