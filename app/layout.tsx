import type { Metadata } from 'next'
import { Audiowide } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-audiowide',
  display: 'swap',
})

const grandisExtended = localFont({
  src: [
    { path: '../public/fonts/GrandisExtended-Regular.woff2', weight: '400' },
    { path: '../public/fonts/GrandisExtended-Medium.woff2',  weight: '500' },
    { path: '../public/fonts/GrandisExtended-Bold.woff2',    weight: '700' },
  ],
  variable: '--font-grandis',
  display: 'swap',
})

const magistral = localFont({
  src: [
    { path: '../public/fonts/Magistral-Book.woff2',      weight: '400' },
    { path: '../public/fonts/Magistral-Medium.woff2',    weight: '500' },
    { path: '../public/fonts/Magistral-Bold.woff2',      weight: '700' },
    { path: '../public/fonts/Magistral-ExtraBold.woff2', weight: '800' },
  ],
  variable: '--font-magistral',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Full Focus — Сеть киберспортивных клубов СПб | 7 клубов 24/7',
  description:
    'Сеть киберспортивных клубов Full Focus в Санкт-Петербурге — 6 клубов и Махачкала. Мощные ПК, PlayStation 5, турниры, корпоративы. Работаем 24/7. Первый визит — 500₽ в подарок.',
  metadataBase: new URL('https://fullfocusclub.ru'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Full Focus — Сеть киберспортивных клубов СПб | 7 клубов 24/7',
    description: 'Киберспортивные клубы в СПб: мощные ПК, PS5, турниры, корпоративы. 7 клубов, работаем 24/7.',
    url: 'https://fullfocusclub.ru',
    siteName: 'Full Focus Club',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${audiowide.variable} ${grandisExtended.variable} ${magistral.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
