// Set NEXT_PUBLIC_CDN_BASE in .env when Yandex CDN is ready
// Example: NEXT_PUBLIC_CDN_BASE=https://cdn.fullfocusclub.ru
// Without CDN — files are served from public/clubs/{slug}/
const BASE = (process.env.NEXT_PUBLIC_CDN_BASE ?? '').replace(/\/$/, '')

// local: true — всегда отдавать из public/, даже если CDN задан (когда файла на CDN нет)
export function clubMedia(slug: string, { local = false } = {}) {
  const prefix = BASE && !local ? `${BASE}/clubs/${slug}` : `/clubs/${slug}`
  return {
    video:          `${prefix}/hero.mp4`,
    videoDesktop:   `${prefix}/hero-desktop.mp4`,
    poster:         `${prefix}/hero-poster.jpg`,
    gallery: (i: number) => `${prefix}/gallery/${String(i).padStart(2, '0')}.jpg`,
    path: (rel: string) => `${prefix}/${rel}`,
  }
}

export function tournamentMedia() {
  const prefix = BASE ? `${BASE}/tournaments` : '/tournaments'
  return {
    gallery: (i: number) => `${prefix}/gallery/${String(i).padStart(2, '0')}.jpg`,
  }
}

export function eventsProofMedia({ local = false } = {}) {
  const prefix = BASE && !local ? `${BASE}/events/proof` : '/events/proof'
  return {
    photo: (i: number) => `${prefix}/${String(i).padStart(2, '0')}.jpg`,
  }
}
