import type { Metadata } from 'next'
import './portal.css'

// Внутренний раздел: не индексируется и не попадает в sitemap.
export const metadata: Metadata = {
  title: 'Full Focus — материалы проекта',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="ffp">{children}</div>
}
