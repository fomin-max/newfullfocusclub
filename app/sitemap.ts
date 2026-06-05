import type { MetadataRoute } from 'next'
import { getTournaments } from '@/lib/supabase'

const BASE     = 'https://fullfocusclub.ru'
const LAST_MOD = '2026-05-30'

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                        lastModified: LAST_MOD, changeFrequency: 'weekly',  priority: 1.0  },
  { url: `${BASE}/clubs`,             lastModified: LAST_MOD, changeFrequency: 'weekly',  priority: 0.9  },
  { url: `${BASE}/clubs/vasilyeostrovsky`, lastModified: LAST_MOD, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE}/clubs/elektrosila`, lastModified: LAST_MOD, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE}/events`,            lastModified: LAST_MOD, changeFrequency: 'weekly',  priority: 0.85 },
  { url: `${BASE}/tournaments`,       lastModified: LAST_MOD, changeFrequency: 'weekly',  priority: 0.85 },
  { url: `${BASE}/franchise`,         lastModified: LAST_MOD, changeFrequency: 'monthly', priority: 0.80 },
  { url: `${BASE}/privacy`,           lastModified: LAST_MOD, changeFrequency: 'yearly',  priority: 0.30 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tournaments = await getTournaments()

  const tournamentRoutes: MetadataRoute.Sitemap = tournaments.map(t => ({
    url:             `${BASE}/tournaments/${t.slug}`,
    lastModified:    t.created_at,
    changeFrequency: t.status === 'registration_open' ? 'hourly' : 'weekly',
    priority:        t.status === 'registration_open' ? 0.95 : 0.80,
  }))

  return [...STATIC_ROUTES, ...tournamentRoutes]
}
