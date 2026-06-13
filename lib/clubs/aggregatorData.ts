export interface AggClub {
  id: string
  slug: string | null
  name: string
  city: 'spb' | 'mkh'
  cityLabel: string
  metro: string
  hasMetro?: boolean
  address: string
  color: string
  x: number
  y: number
  lng: number
  lat: number
  zones: string[]
}

export const AGG_CLUBS: AggClub[] = [
  { id: 'vasil',   slug: 'vasilyeostrovsky', name: 'Василеостровская',        city: 'spb', cityLabel: 'СПб',       metro: 'м. Василеостровская',         address: 'Бугский переулок, 3',          color: '#009E40', x: 32, y: 40, lng: 30.285601, lat: 59.938389, zones: ['PRO','DUO','BOOTCAMP','ARENA','SOLO','LOUNGE'] },
  { id: 'electro', slug: 'elektrosila',       name: 'Электросила',             city: 'spb', cityLabel: 'СПб',       metro: 'м. Электросила',               address: 'Московский проспект, 149А',    color: '#0062AC', x: 55, y: 82, lng: 30.317797, lat: 59.874116, zones: ['PRO','MAX','DUO','LOUNGE'] },
  { id: 'komen',   slug: 'komendantsky',      name: 'Комендантский',           city: 'spb', cityLabel: 'СПб',       metro: 'м. Комендантский пр.',         address: 'Проспект Испытателей, 33',     color: '#8E479B', x: 22, y: 18, lng: 30.265316, lat: 60.008051, zones: ['PRO','MAX','BOOTCAMP','LOUNGE'] },
  { id: 'prosv',   slug: 'prosvescheniya',    name: 'Просвещения',             city: 'spb', cityLabel: 'СПб',       metro: 'м. Пр. Просвещения',           address: 'Проспект Просвещения, 43',     color: '#0062AC', x: 48, y: 12, lng: 30.365117, lat: 60.045799, zones: ['PRO','MAX','BOOTCAMP','DUO','SOLO','LOUNGE'] },
  { id: 'tech',    slug: 'tekhnologichesky',  name: 'Технологический',         city: 'spb', cityLabel: 'СПб',       metro: 'м. Технологический институт',  address: '3-я Красноармейская, 10',      color: '#E4171B', x: 50, y: 64, lng: 30.313694, lat: 59.914358, zones: ['PRO','MAX','BOOTCAMP','LOUNGE'] },
  { id: 'sadov',   slug: 'sadovaya',          name: 'Садовая',                 city: 'spb', cityLabel: 'СПб',       metro: 'м. Садовая',                   address: 'Улица Казанская, 33',          color: '#8E479B', x: 52, y: 52, lng: 30.311556, lat: 59.929723, zones: ['PRO','MAX','BOOTCAMP','DUO','LOUNGE'] },
  { id: 'makha',   slug: 'makhachkala',       name: 'Махачкала',               city: 'mkh', cityLabel: 'Махачкала', metro: 'Центр города', hasMetro: false,  address: 'Улица Манташева, 107Б',        color: '#888888', x: 84, y: 56, lng: 47.519765, lat: 42.976510, zones: ['BOOTCAMP','DUO','SOLO','LOUNGE'] },
]

export const CITY_META = {
  spb: { label: 'Санкт-Петербург', short: 'СПб' },
  mkh: { label: 'Махачкала',       short: 'Махачкала' },
} as const

export const ZONE_FILTERS = ['PRO','MAX','BOOTCAMP','ARENA','DUO','SOLO','LOUNGE'] as const

export const HERO_FACTS = [
  { icon: 'pin'     as const, val: '7',        lbl: 'клубов · 2 города' },
  { icon: 'cpu'     as const, val: 'RTX 4090', lbl: 'стандарт сети' },
  { icon: 'gamepad' as const, val: 'PS5',      lbl: 'в lounge-зонах' },
  { icon: 'bolt'    as const, val: '24/7',     lbl: 'без выходных' },
  { icon: 'star'    as const, val: '5.0',      lbl: '3000+ отзывов' },
]

export const CHOOSE = [
  { icon: 'users'  as const, title: 'С друзьями',          zone: 'ARENA',    desc: 'Командные зоны DUO, TRIO и ARENA — рядом, на одной скорости и в одном голосовом.' },
  { icon: 'trophy' as const, title: 'Тренировка · буткемп', zone: 'BOOTCAMP', desc: 'Изолированные BOOTCAMP-комнаты для команды, разборов и долгих сессий без шума.' },
  { icon: 'sofa'   as const, title: 'PS5 и компания',       zone: 'LOUNGE',   desc: 'Lounge-зоны с PS5, большими экранами и диванами. Файтинги, кооператив, кино.' },
  { icon: 'cpu'    as const, title: 'Максимум железа',      zone: 'PRO',      desc: 'Топовые ПК на RTX 4090 в зонах PRO и MAX. 240+ Гц, низкий пинг, чистый звук.' },
]

export const CLUB_FAQS = [
  { q: 'Какой клуб ближе ко мне?',         a: 'Все клубы — в шаговой доступности от метро. Открой карту выше: наведи на точку или выбери город, чтобы увидеть ближайшую к тебе локацию и станцию метро.' },
  { q: 'Во всех ли клубах есть PS5?',       a: 'Да, PS5 есть в Lounge-зоне каждого клуба — диваны, большие экраны, файтинги и кооператив. Набор остальных форматов (ARENA, BOOTCAMP, MAX) различается по локациям — фильтр по зонам над карточками покажет, где что есть.' },
  { q: 'Клубы работают круглосуточно?',    a: 'Да. Все 7 клубов сети работают 24/7, без выходных. На ночной пакет (с 22:00 до 08:00) действуют отдельные тарифы.' },
  { q: 'Чем клубы отличаются друг от друга?', a: 'Базовое железо и сервис едины по сети. Различается набор зон и площадь: где-то есть ARENA для турниров, где-то — больше BOOTCAMP-комнат. Смотри теги зон на карточке клуба.' },
  { q: 'Можно ли забронировать онлайн?',   a: 'Да. Нажми «Забронировать» на карточке нужного клуба или напиши в Telegram — администратор подтвердит свободные места за минуту.' },
  { q: 'Сколько стоит час игры?',          a: 'От 120₽/час для школьников и студентов в будни. Стандартный тариф — от 170₽/час. Точные тарифы — на странице каждого клуба.' },
]
