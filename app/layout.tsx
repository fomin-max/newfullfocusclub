import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Orbitron } from 'next/font/google'
import './globals.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import PageLoader from '@/components/ui/PageLoader'
import NavigationProgress from '@/components/ui/NavigationProgress'
import CookieConsent from '@/components/ui/CookieConsent'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-orbitron',
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
    'Full Focus — компьютерный клуб нового поколения в Санкт-Петербурге и Махачкале. 7 киберспортивных клубов: мощные ПК RTX 4090, PlayStation 5, турниры, корпоративы. 24/7. Первый визит — 500₽ в подарок.',
  metadataBase: new URL('https://fullfocusclub.ru'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Full Focus — Сеть киберспортивных клубов СПб | 7 клубов 24/7',
    description: 'Компьютерный клуб нового поколения в СПб и Махачкале: мощные ПК RTX 4090, PS5, турниры, корпоративы. 7 клубов, 24/7.',
    url: 'https://fullfocusclub.ru',
    siteName: 'Full Focus Club',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${grandisExtended.variable} ${magistral.variable} ${orbitron.variable}`}
    >
      <body className="antialiased">
        {/* Runs synchronously before first paint — hides loader for returning visitors */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem('ff_loader_seen')==='1'){document.documentElement.setAttribute('data-loader-skip','1')}}catch(e){}` }} />
        <NavigationProgress />
        <PageLoader />
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
