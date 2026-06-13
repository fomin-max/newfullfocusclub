import type { ClubData, ClubMeta, ClubZone, ClubTariffs, Feature, FloorPlan, Review, FAQItem, EventItem } from './types'
import { ALL_CLUBS } from './shared'
import { clubMedia } from '@/lib/cdn'

const media = clubMedia('komendantsky')

const CLUB: ClubMeta = {
  NAME: 'Комендантский',
  SLUG: 'komendantsky',
  ADDRESS: 'Проспект Испытателей, 33',
  METRO: 'Комендантский пр.',
  METRO_COLOR: '#8E479B',
  METRO_TIME: '5 мин пешком',
  HOURS: 'Круглосуточно · 24/7',
  TELEGRAM: '@fullfocuskomenda',
  VK: 'https://vk.com/fullfocusclub_komenda',
  PHONE: '+7 (812) 660-55-96',
  MAPS_URL: 'https://yandex.com/maps/-/CPDl7Bpv',
  ROUTE_URL: 'https://yandex.ru/maps/?rtext=~60.008051,30.265316&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D177253656748',
  COORDS: '60.008° N · 30.265° E',
  VIDEO_URL: media.video,
  VIDEO_URL_DESKTOP: media.videoDesktop,
  POSTER_URL: media.poster,
  VIDEO_TITLE: 'Full Focus Комендантский — обзор компьютерного клуба',
  VIDEO_DESC: 'Видеообзор компьютерного клуба Full Focus у м. Комендантский проспект. Игровые зоны, оборудование, атмосфера.',
  GALLERY: [media.gallery(1), media.gallery(2), media.gallery(3), media.gallery(4), media.gallery(5), media.gallery(6)],
  REVIEWS_COUNT: '160+ отзывов',
  REVIEWS_COUNT_NUM: 160,
  GEO: { lat: 60.008051, lng: 30.265316 },
  MEDIA_LABEL: 'FULL FOCUS · клуб #03',
  FACTS: [
    { icon: 'bolt',    val: 'от 170 ₽/час', lbl: 'Стартовый тариф' },
    { icon: 'users',   val: '30 ПК мест',   lbl: 'PRO + MAX + BOOTCAMP' },
    { icon: 'gamepad', val: '4 PS5 зоны',   lbl: 'LOUNGE и VIP LOUNGE' },
  ],
  FEATURES_TAG:   '— север Петербурга',
  FEATURES_TITLE: 'КРУПНЕЙШИЙ НА СЕВЕРЕ',
  FEATURES_SUB:   'Самая большая PRO ZONE в сети — 15 мест. Плюс MAX ZONE с RTX 4070 и четыре PS5 лаунжа.',
  MAP: {
    pin:   { top: '50%', left: '48%' },
    river: false,
    roads: [
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 16, color: 'rgba(0,255,182,0.22)' },
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 1.5, color: 'rgba(0,255,182,0.5)' },
      { type: 'line', x1: 190, y1: -10, x2: 210, y2: 290, w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0,   y1: 80,  x2: 400, y2: 60,  w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0,   y1: 200, x2: 400, y2: 210, w: 1, color: 'rgba(102,50,250,0.35)' },
    ],
    labels: [
      { x: 20,  y: 130, text: 'ПР. ИСПЫТАТЕЛЕЙ',     color: 'rgba(0,255,182,0.55)' },
      { x: 215, y: 50,  text: 'ПЛАНЕРНАЯ УЛ.',        color: 'rgba(102,50,250,0.55)' },
    ],
  },
}

const CLUB_ZONES: ClubZone[] = [
  { id: 'pro',     name: 'PRO ZONE',      accent: '#6632FA', seats: 15, priceFrom: 170,
    desc: 'Крупнейшая PRO ZONE в сети — 15 мест в просторном open-space. Игровые ПК следующего поколения с эргономикой для длинных сессий.',
    specShort: 'RTX 3060 · 24.5" 280Гц · 15 мест', image: '/clubs/komendantsky/zones/pro.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'max',     name: 'MAX ZONE',      accent: '#6632FA', seats: 10, priceFrom: 190,
    desc: 'Улучшенные конфигурации — RTX 4070, DDR5 32GB, 27" 165Hz 2K. Для тех, кому нужна максимальная производительность.',
    specShort: 'RTX 4070 · DDR5 · 27" 165Hz 2K', image: '/clubs/komendantsky/zones/max.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'bootcamp', name: 'BOOTCAMP',     accent: '#6632FA', seats: 5, priceFrom: 240,
    desc: 'Зона для команды или подготовки к турниру. BenQ Zowie 240Hz, Logitech G Pro, голосовая связь.',
    specShort: 'RTX 3070 · BenQ Zowie 240Hz · 5 мест', image: '/clubs/komendantsky/zones/bootcamp.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'ps5',     name: 'PS5 LOUNGE',   accent: '#00FFB6', seats: '4 кресла', priceFrom: 400,
    desc: 'Открытая PS5-зона с TV 65", кооперативы и эксклюзивы PlayStation 5 для небольшой компании.',
    specShort: 'PS5 · 65" TV · 4 кресла', image: '/clubs/komendantsky/zones/ps5.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'ps5vip',  name: 'PS5 VIP LOUNGE', accent: '#00FFB6', seats: 'до 6', priceFrom: 500,
    desc: 'Закрытая комната с диваном, TV 65" и PS5 — для своей компании в полной приватности.',
    specShort: 'PS5 · 65" TV · отдельная комната', image: '/clubs/komendantsky/zones/ps5vip.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
]

const TARIFFS: ClubTariffs = {
  cols: ['1 час', '3 часа', '5 часов', 'Утро 5ч', 'Ночь 10ч'],
  popular: 1, bestValue: 4,
  rows: [
    { zone: 'PRO ZONE',      vals: [[170,190], [500,550],  [700,800],   [450,500], [900,1000]] },
    { zone: 'MAX ZONE',      vals: [[190,210], [550,600],  [800,900],   [500,550], [1000,1200]] },
    { zone: 'BOOTCAMP',      vals: [[240,260], [700,750],  [1000,1100], [600,700], [1300,1450]] },
    { zone: 'PS5 LOUNGE',    vals: [[400,500], [950,1100], [1600,1800], null,      null] },
    { zone: 'PS5 VIP LOUNGE',vals: [[500,550], [1100,1200],[1800,2000], null,      null] },
  ],
  student: 'Школьникам и студентам Пн-Пт 10:00–16:00 — PRO ZONE от 120₽/час',
}

const HARDWARE: ClubData['HARDWARE'] = {
  pro: { name: 'PRO ZONE', rows: [
    { k: 'Видеокарта', v: 'GeForce RTX 3060', accent: true },
    { k: 'Процессор',  v: 'Intel Core i5-12400F' },
    { k: 'RAM',        v: 'A-Data XPG Spectrix D41 16GB' },
    { k: 'Монитор',    v: 'ASUS TUF 24.5" 280Гц', accent: true },
    { k: 'Мышка',      v: 'Ajazz AJ159 Apex' },
    { k: 'Наушники',   v: 'HyperX Cloud II' },
    { k: 'Кресло',     v: 'Knight Outrider' },
    { k: 'Клавиатура', v: 'HyperX Alloy Origins Core TKL' },
    { k: 'Коврик',     v: 'Full Focus' },
  ]},
  max: { name: 'MAX ZONE', rows: [
    { k: 'Видеокарта', v: 'GeForce RTX 4070', accent: true },
    { k: 'Процессор',  v: 'Intel Core i5-12400F' },
    { k: 'RAM',        v: 'A-Data XPG Spectrix D41 32GB', accent: true },
    { k: 'Монитор',    v: 'ASUS TUF Gaming 27" 165Гц 2K', accent: true },
    { k: 'Мышка',      v: 'Ajazz AJ159 Apex' },
    { k: 'Наушники',   v: 'HyperX Cloud II' },
    { k: 'Кресло',     v: 'Knight Titan' },
    { k: 'Клавиатура', v: 'SteelSeries Apex 7' },
    { k: 'Коврик',     v: 'Full Focus' },
  ]},
  bootcamp: { name: 'BOOTCAMP', rows: [
    { k: 'Видеокарта', v: 'GeForce RTX 3070', accent: true },
    { k: 'Процессор',  v: 'Intel Core i5-13600KF' },
    { k: 'RAM',        v: 'A-Data XPG Spectrix D41 32GB', accent: true },
    { k: 'Монитор',    v: 'BenQ Zowie XL2540K', accent: true },
    { k: 'Мышка',      v: 'Logitech G Pro Wireless' },
    { k: 'Наушники',   v: 'HyperX Cloud II' },
    { k: 'Кресло',     v: 'Knight Titan' },
    { k: 'Клавиатура', v: 'Ajazz AK820MAX ULTRA' },
    { k: 'Коврик',     v: 'Full Focus' },
  ]},
  ps5: { name: 'PS5 LOUNGE', rows: [
    { k: 'Консоль',    v: 'Sony PlayStation 5', accent: true },
    { k: 'Экран',      v: '65" TV · 120 Hz', accent: true },
    { k: 'Звук',       v: 'Объёмный звук' },
    { k: 'Геймпады',   v: 'DualSense · до 4 штук' },
    { k: 'Посадка',    v: 'Мягкий диван' },
    { k: 'Игры',       v: 'Большая библиотека PS Store' },
  ]},
}

const FEATURES: Feature[] = [
  { id: 'pro15',  size: 'big',   name: 'PRO ZONE НА 15 МЕСТ',
    desc: 'Крупнейший PRO ZONE в сети — 15 PC-мест в едином open-space. RTX 4070, 165Hz, DXRacer. Место всегда найдётся.',
    image: '/clubs/komendantsky/features/pro15.jpg', tag: null, icon: null, note: null },
  { id: 'max10',  size: 'wide',  name: 'MAX ZONE — RTX 4070',
    desc: '10 мест с RTX 4070, DDR5 32GB и 27" 165Hz 2K. Для тех, кому нужен настоящий максимум.',
    icon: 'cpu', image: null, tag: null, note: null },
  { id: 'ps5vip', size: 'small', name: 'PS5 VIP LOUNGE',
    desc: 'Закрытая комната с TV 65" и PS5 на компанию до 6 человек.',
    icon: 'gamepad', image: null, tag: null, note: null },
  { id: 'bootcamp', size: 'small', name: 'BOOTCAMP 5 МЕСТ',
    desc: 'Командная зона с голосовой связью и оборудованием для трансляций.',
    icon: 'users', image: null, tag: null, note: null },
  { id: 'always', size: 'small', name: 'КРУГЛОСУТОЧНО 24/7',
    desc: 'Клуб работает без выходных — приходи в любое время суток.',
    icon: 'clock', image: null, tag: null, note: null },
  { id: 'metro',  size: 'small', name: '5 МИН ОТ МЕТРО',
    desc: 'Комендантский проспект — 5 минут пешком от выхода из метро.',
    icon: 'pin', image: null, tag: null, note: null },
]

const FLOOR: FloorPlan = {
  filters: [
    { id: 'all',      name: 'ВСЕ',     match: null },
    { id: 'pro',      name: 'PRO',     match: null },
    { id: 'max',      name: 'MAX',     match: null },
    { id: 'bootcamp', name: 'BOOT',    match: null },
    { id: 'lounge',   name: 'PS5',     match: ['ps5','ps5vip'] },
  ],
  outlines: [
    { label: 'PRO ZONE',      left: '2%',  top: '10%', width: '48%', height: '40%', highlightFor: null },
    { label: 'MAX ZONE',      left: '54%', top: '10%', width: '44%', height: '30%', highlightFor: 'max' },
    { label: 'BOOTCAMP',      left: '54%', top: '46%', width: '22%', height: '28%', highlightFor: null },
    { label: 'PS5 LOUNGE',    left: '2%',  top: '56%', width: '24%', height: '34%', highlightFor: 'lounge', accent: '#00FFB6' },
    { label: 'PS5 VIP',       left: '28%', top: '56%', width: '22%', height: '34%', highlightFor: 'lounge', accent: '#00FFB6' },
  ],
  zones: [
    { zone: 'pro', label: 'PRO ZONE',
      seats: Array.from({length: 15}, (_, i) => ({
        id: `pro-${i+1}`, x: 6 + (i%5) * 8, y: 20 + Math.floor(i/5) * 14,
        status: (['free','free','busy','free','busy','free','free','busy','free','free','free','busy','free','free','busy'] as const)[i],
      })) },
    { zone: 'max', label: 'MAX ZONE',
      seats: Array.from({length: 10}, (_, i) => ({
        id: `max-${i+1}`, x: 57 + (i%5) * 8, y: 20 + Math.floor(i/5) * 14,
        status: (['busy','free','free','busy','free','free','busy','free','free','busy'] as const)[i],
      })) },
    { zone: 'bootcamp', label: 'BOOTCAMP',
      seats: Array.from({length: 5}, (_, i) => ({
        id: `bc-${i+1}`, x: 58 + (i%3) * 8, y: 56 + Math.floor(i/3) * 14,
        status: (['free','free','busy','free','free'] as const)[i],
      })) },
    { zone: 'ps5', label: 'PS5 LOUNGE',
      seats: [
        { id: 'ps5-1', x: 8,  y: 72, status: 'free' },
        { id: 'ps5-2', x: 14, y: 72, status: 'busy' },
        { id: 'ps5-3', x: 8,  y: 82, status: 'free' },
      ]},
    { zone: 'ps5vip', label: 'PS5 VIP',
      seats: [
        { id: 'vip-1', x: 32, y: 72, status: 'free' },
        { id: 'vip-2', x: 38, y: 72, status: 'free' },
      ]},
  ],
}

const REVIEWS: Review[] = [
  { name: 'Денис К.',  src: 'Яндекс', stars: 5, text: 'PRO ZONE огромный — 15 мест, всегда есть свободное место даже в пятницу вечером.' },
  { name: 'Ольга М.',  src: '2ГИС',   stars: 5, text: 'MAX ZONE — это что-то. RTX 4080 тянет всё на ультрах, без единого фриза.' },
  { name: 'Сергей Л.', src: 'Яндекс', stars: 5, text: 'Хожу после работы — удобно, 5 минут от метро Комендантский. Всё чисто, уютно.' },
  { name: 'Наташа В.', src: '2ГИС',   stars: 5, text: 'PS5 VIP брали на ДР — закрытая комната, огромный TV, PS5, никто не мешает.' },
  { name: 'Артём Б.',  src: 'Яндекс', stars: 5, text: 'Bootcamp на 5 мест — играли командой, связь отличная, атмосфера как на турнире.' },
  { name: 'Влада С.',  src: '2ГИС',   stars: 5, text: 'Персонал вежливый, помогли настроить гарнитуру и объяснили все тарифы.' },
  { name: 'Максим Н.', src: 'Яндекс', stars: 5, text: 'Ночной пакет на MAX ZONE — 10 часов за разумные деньги, железо не подвело ни разу.' },
  { name: 'Юля П.',    src: '2ГИС',   stars: 5, text: 'Хорошая вентиляция, не жарко даже ночью. Кресла удобные, спина не болит.' },
]

const FAQ: FAQItem[] = [
  { q: 'Сколько стоит час игры в Full Focus на Комендантском проспекте?',
    a: 'PRO ZONE от 170₽/час, MAX ZONE от 190₽/час, BOOTCAMP от 240₽/час, PS5 LOUNGE от 400₽/час. Школьники и студенты — PRO ZONE от 120₽/час в будни с 10:00 до 16:00.' },
  { q: 'Где находится клуб Full Focus на Комендантском?',
    a: 'Проспект Испытателей, 33, Санкт-Петербург. 5 минут пешком от метро Комендантский проспект (фиолетовая линия). Координаты: 60.009° N, 30.258° E.' },
  { q: 'Сколько мест в PRO ZONE на Комендантском?',
    a: 'PRO ZONE на Комендантском — крупнейшая в сети: 15 PC-мест в едином open-space с RTX 4070 и мониторами 165Hz.' },
  { q: 'Что такое MAX ZONE в Full Focus?',
    a: 'MAX ZONE — это 10 мест с RTX 4080, DDR5 32GB и мониторами 27" 165Hz. Топовые конфигурации для требовательных игр и стримов.' },
  { q: 'Есть ли PS5 в Full Focus на Комендантском?',
    a: 'Да. PS5 LOUNGE — открытая зона с TV 65", 4 кресла, от 400₽/час. PS5 VIP LOUNGE — закрытая комната на компанию до 6 человек, от 500₽/час.' },
  { q: 'Работает ли Full Focus на Комендантском круглосуточно?',
    a: 'Да, клуб работает 24/7 без выходных.' },
  { q: 'Как добраться до Full Focus на Комендантском?',
    a: '5 минут пешком от метро Комендантский проспект по проспекту Испытателей.' },
  { q: 'Можно ли провести корпоратив на Комендантском проспекте?',
    a: 'Да — аренда зон или всего клуба, организация турнира между командами, кейтеринг. Заявка через сайт или Telegram @fullfocusclub.' },
]

const EVENTS: EventItem[] = [
  { icon: 'briefcase', name: 'КОРПОРАТИВ',
    desc: 'Аренда клуба или отдельных зон. Кейтеринг, ведущий, кастомные награды. MAX ZONE и PRO ZONE вмещают большие команды.' },
  { icon: 'cake', name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'PS5 VIP LOUNGE или аренда зоны для своей компании. Турнир между гостями, подарки, атмосфера.',
    badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР' },
  { icon: 'trophy', name: 'ЗАКРЫТЫЙ ТУРНИР',
    desc: 'Арендуй BOOTCAMP или MAX ZONE для командного турнира. Трансляция, призы, своя сетка.' },
]

export const CLUB_DATA: ClubData = {
  CLUB, CLUB_ZONES, TARIFFS, HARDWARE, FEATURES, FLOOR, REVIEWS, ALL_CLUBS, FAQ, EVENTS,
}
