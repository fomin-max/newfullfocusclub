import type { MetadataRoute } from 'next'

const BASE = 'https://fullfocusclub.ru'
const LAST_MOD = '2026-05-30'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: LAST_MOD,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/clubs`,
      lastModified: LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/clubs/vasilyeostrovsky`,
      lastModified: LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/clubs/elektrosila`,
      lastModified: LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/events`,
      lastModified: LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/tournaments`,
      lastModified: LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/franchise`,
      lastModified: LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: LAST_MOD,
      changeFrequency: 'yearly',
      priority: 0.30,
    },
  ]
}
