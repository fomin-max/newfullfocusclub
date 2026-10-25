import type { IconName } from '@/components/ui/Icon'

export interface SocialLink {
  href:   string
  icon:   IconName
  /** Картинка-логотип вместо иконки из набора */
  img?:   string
  title:  string
  meta:   string
  /** Сноска про Meta — для Instagram */
  extremist?: boolean
}

/** Общие соцсети сети (Петербург) — используются на /links и в футере */
export const SPB_SOCIALS: SocialLink[] = [
  { href: 'https://t.me/fullfocusclubru',              icon: 'telegram',  title: 'Telegram',  meta: '@fullfocusclubru' },
  { href: 'https://vk.ru/fullfocusclub',               icon: 'vk',        title: 'VK',        meta: 'vk.ru/fullfocusclub' },
  { href: 'https://www.tiktok.com/@fullfocusclub',     icon: 'tiktok',    title: 'TikTok',    meta: '@fullfocusclub' },
  { href: 'https://www.youtube.com/@fullfocusclub',    icon: 'youtube',   title: 'YouTube',   meta: '@fullfocusclub' },
  { href: 'https://www.instagram.com/fullfocusclubru', icon: 'instagram', title: 'Instagram', meta: '@fullfocusclubru', extremist: true },
]
