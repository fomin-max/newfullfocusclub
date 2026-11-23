import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/p/', // внутренний портал проектов для подрядчиков
    },
    sitemap: 'https://fullfocusclub.ru/sitemap.xml',
  }
}
