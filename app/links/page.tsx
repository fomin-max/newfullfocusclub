import type { Metadata } from 'next'
import LinksView, { CITIES } from './LinksView'

// Служебная страница для ссылок из постов — в поиск не отдаём
export const metadata: Metadata = {
  title: 'Соцсети — Full Focus',
  description: 'Telegram, VK, TikTok, YouTube и Instagram сети клубов Full Focus в Петербурге.',
  alternates: { canonical: '/links' },
  robots: { index: false, follow: true },
}

export default function LinksPage() {
  return <LinksView city={CITIES[0]} />
}
