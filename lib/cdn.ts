// Set NEXT_PUBLIC_CDN_BASE in .env when Yandex CDN is ready
// Example: NEXT_PUBLIC_CDN_BASE=https://cdn.fullfocusclub.ru
// Without CDN — files are served from public/clubs/{slug}/
const BASE = (process.env.NEXT_PUBLIC_CDN_BASE ?? '').replace(/\/$/, '')

export function clubMedia(slug: string) {
  const prefix = BASE ? `${BASE}/clubs/${slug}` : `/clubs/${slug}`
  return {
    video:          `${prefix}/hero.mp4`,
    videoDesktop:   `${prefix}/hero-desktop.mp4`,
    poster:         `${prefix}/hero-poster.jpg`,
    gallery: (i: number) => `${prefix}/gallery/${String(i).padStart(2, '0')}.jpg`,
  }
}
