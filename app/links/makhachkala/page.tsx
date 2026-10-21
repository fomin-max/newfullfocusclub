import type { Metadata } from 'next'
import LinksView, { CITIES } from '../LinksView'

// Служебная страница для ссылок из постов — в поиск не отдаём
export const metadata: Metadata = {
  title: 'Соцсети — Full Focus Махачкала',
  description: 'Telegram, VK и Instagram клуба Full Focus в Махачкале.',
  alternates: { canonical: '/links/makhachkala' },
  robots: { index: false, follow: true },
}

export default function LinksMakhachkalaPage() {
  return <LinksView city={CITIES[1]} />
}
