import type { ClubData, ClubMeta, ClubZone, ClubTariffs, Feature, FloorPlan, Review, FAQItem, EventItem } from './types'
import { ALL_CLUBS } from './shared'
import { clubMedia } from '@/lib/cdn'

const media = clubMedia('elektrosila')

const CLUB: ClubMeta = {
  NAME: 'Электросила',
  SLUG: 'elektrosila',
  ADDRESS: 'Московский проспект, 149А',
  METRO: 'Электросила',
  METRO_COLOR: '#0062AC',
  METRO_TIME: '8 мин пешком',
  HOURS: 'Круглосуточно · 24/7',
  TELEGRAM: '@fullfocusclub',
  VK: 'https://vk.com/fullfocusclub_electrosila',
  PHONE: '+7 (812) 660-55-96',
  MAPS_URL: 'https://yandex.com/maps/-/CPDl7Z7l',
  ROUTE_URL: 'https://yandex.ru/maps/?rtext=~59.874116,30.317797&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D86603849489',
  COORDS: '59.874° N · 30.318° E',
  VIDEO_URL: media.video,
  VIDEO_URL_DESKTOP: media.videoDesktop,
  POSTER_URL: media.poster,
  VIDEO_TITLE: 'Full Focus Электросила — обзор компьютерного клуба',
  VIDEO_DESC: 'Видеообзор компьютерного клуба Full Focus у м. Электросила. Игровые зоны, оборудование, атмосфера.',
  GALLERY: [media.gallery(1), media.gallery(2), media.gallery(3), media.gallery(4), media.gallery(5), media.gallery(6)],
  REVIEWS_COUNT: '180+ отзывов',
  REVIEWS_COUNT_NUM: 180,
  GEO: { lat: 59.874116, lng: 30.317797 },
  MEDIA_LABEL: 'FULL FOCUS · клуб #02',
  FACTS: [
    { icon: 'bolt',    val: 'от 170 ₽/час', lbl: 'Стартовый тариф' },
    { icon: 'gamepad', val: '5 зон',         lbl: 'Форматов под любую сессию' },
    { icon: 'leaf',    val: '2 лаунжа',      lbl: 'Green Room и Space Room' },
  ],
  FEATURES_TAG:   'чем мы особенные',
  FEATURES_TITLE: 'ЧЕМ МЫ ОСОБЕННЫЕ',
  FEATURES_SUB:   'Две тематические PS5-зоны, которых нет в других клубах сети. Плюс MAX ZONE с RTX 4080 и DUO ROOM в 3 минутах от метро.',
  MAP: {
    pin:   { top: '50%', left: '50%' },
    river: false,
    roads: [
      { type: 'line', x1: 196, y1: -10, x2: 214, y2: 290, w: 16, color: 'rgba(0,255,182,0.22)' },
      { type: 'line', x1: 196, y1: -10, x2: 214, y2: 290, w: 1.5, color: 'rgba(0,255,182,0.5)' },
      { type: 'line', x1: 0, y1: 72,  x2: 400, y2: 60,  w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0, y1: 150, x2: 400, y2: 134, w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0, y1: 222, x2: 400, y2: 208, w: 1, color: 'rgba(102,50,250,0.35)' },
    ],
    labels: [
      { x: 220, y: 36,  text: 'МОСКОВСКИЙ ПР.',  color: 'rgba(0,255,182,0.55)' },
      { x: 26,  y: 128, text: 'ул. Решетникова', color: 'rgba(102,50,250,0.55)' },
    ],
  },
}

const CLUB_ZONES: ClubZone[] = [
  { id: 'pro',  name: 'PRO ZONE', accent: '#6632FA', seats: 11, priceFrom: 170,
    desc: 'Просторная open-space зона на 11 мест. Игровые ПК следующего поколения и эргономика для длинных сессий.',
    specShort: 'RTX 3050 · 24.5" 280Гц', image: '/clubs/elektrosila/zones/pro.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'max',  name: 'MAX ZONE', accent: '#6632FA', seats: 7, priceFrom: 190,
    desc: 'Улучшенные ПК — RTX 3070, 27" 165Hz 2K. Для требовательных игроков, которым нужен максимум.',
    specShort: 'RTX 3070 · 27" 165Гц 2K', image: '/clubs/elektrosila/zones/max.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'duo',  name: 'DUO ROOM', accent: '#6632FA', seats: 2, priceFrom: 300,
    desc: 'Приватная комната на двоих. Тишина, своё пространство, кресла Knight Full Focus.',
    specShort: 'RTX 4070 Super · 27" 2K 320Гц', image: '/clubs/elektrosila/zones/duo.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'space', name: 'SPACE ROOM', accent: '#7C3AED', seats: 'до 6', priceFrom: 520,
    wide: true, badge: 'PS5 ЗОНА · ДО 6 ЧЕЛОВЕК',
    desc: 'Закрытая комната, TV 65" 120Hz, космическая атмосфера. 14 игр — Detroit, Mafia, COD, NBA и кооп на весь вечер.',
    specShort: 'PS5 · TV 65" 120Hz · до 6 человек', image: '/clubs/elektrosila/zones/space.jpg',
    games: ['UFC 5', 'MK 11', 'MK 1', 'NBA 2K23', 'Detroit: Become Human',
            'Mafia: Definitive Edition', 'Injustice 2', 'COD: Black Ops 3',
            'Star Wars Battlefront 2', 'Unravel', 'Unravel 2',
            'It Takes Two', 'A Way Out', 'EA Sports FC 26'],
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false },
  { id: 'green', name: 'GREEN ROOM', accent: '#22C55E', seats: '2–3', priceFrom: 380,
    wide: true, badge: 'PS5 ЗОНА',
    desc: 'Открытая зона с TV 65" и PS5. It Takes Two, UFC 5, EA Sports FC и другие — идеально для небольшой компании.',
    specShort: 'PS5 · TV 65" · зелёная подсветка', image: '/clubs/elektrosila/zones/green.jpeg',
    games: ['MK 11', 'UFC 5', 'NHL 23', 'EA Sports FC 26', 'It Takes Two', 'A Way Out'],
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false },
]

const TARIFFS: ClubTariffs = {
  cols: ['1 час', '3 часа', '5 часов', 'Утро 5ч', 'Ночь 10ч'],
  popular: 1, bestValue: 4,
  rows: [
    { zone: 'PRO ZONE',   vals: [[170,190], [480,530],  [750,850],   [450,500], [850,950]] },
    { zone: 'MAX ZONE',   vals: [[190,210], [530,580],  [850,950],   [500,550], [950,1050]] },
    { zone: 'DUO ROOM',   vals: [[300,350], [850,950],  [1300,1450], [800,900], [1550,1750]] },
    { zone: 'GREEN ROOM', vals: [[380,420], [950,1100], [1400,1600], null,      null] },
    { zone: 'SPACE ROOM', vals: [[520,580], [1350,1500],[2000,2300], null,      null] },
  ],
  student: 'Школьникам и студентам Пн-Пт 10:00–16:00 — PRO ZONE от 120₽/час',
}

const HARDWARE: ClubData['HARDWARE'] = {
  pro: { name: 'PRO ZONE', rows: [
    { k: 'Процессор',  v: 'Intel Core i5-12400F' },
    { k: 'Видеокарта', v: 'GeForce RTX 3050/3060', accent: true },
    { k: 'ОЗУ',        v: 'Corsair Vengeance LPX 16GB' },
    { k: 'Монитор',    v: 'ASUS TUF 24.5" 280Гц', accent: true },
    { k: 'Мышка',      v: 'Ajazz AJ159 Apex' },
    { k: 'Наушники',   v: 'HyperX Cloud II' },
    { k: 'Кресло',     v: 'Knight Full Focus' },
    { k: 'Клавиатура', v: 'Ajazz AK820MAX' },
    { k: 'Коврик',     v: 'Full Focus' },
  ]},
  max: { name: 'MAX ZONE', rows: [
    { k: 'Процессор',  v: 'Intel Core i5-12400F' },
    { k: 'Видеокарта', v: 'GeForce RTX 3070', accent: true },
    { k: 'ОЗУ',        v: 'A-Data XPG Spectrix D41 16GB' },
    { k: 'Монитор',    v: 'ASUS TUF Gaming 27" 165Гц 2K', accent: true },
    { k: 'Мышка',      v: 'Ajazz AJ159 Apex' },
    { k: 'Наушники',   v: 'HyperX Cloud II' },
    { k: 'Кресло',     v: 'WARP Full Focus' },
    { k: 'Клавиатура', v: 'Ajazz AK820MAX' },
    { k: 'Коврик',     v: 'Full Focus' },
  ]},
  duo: { name: 'DUO ROOM', rows: [
    { k: 'Процессор',  v: 'Intel Core i5-13600KF' },
    { k: 'Видеокарта', v: 'GeForce RTX 4070 Super', accent: true },
    { k: 'ОЗУ',        v: 'A-Data XPG GAMMIX 32GB' },
    { k: 'Монитор',    v: 'ASUS ROG Strix 27" 2K 320Гц', accent: true },
    { k: 'Мышка',      v: 'Logitech Superlight 2' },
    { k: 'Наушники',   v: 'HyperX Cloud II Wireless' },
    { k: 'Кресло',     v: 'Knight Full Focus' },
    { k: 'Клавиатура', v: 'Ajazz AK820MAX Ultra' },
    { k: 'Коврик',     v: 'SteelSeries' },
  ]},
  lounge: { name: 'GREEN / SPACE ROOM', rows: [
    { k: 'Консоль',  v: 'Sony PlayStation 5', accent: true },
    { k: 'Экран',    v: '65" TV · 120 Hz', accent: true },
    { k: 'Звук',     v: 'Объёмный звук' },
    { k: 'Геймпады', v: 'DualSense · до 4 штук' },
    { k: 'Игры',     v: 'Green — 6 · Space — 14', accent: true },
  ]},
}

const FEATURES: Feature[] = [
  { id: 'space',  size: 'big',   name: 'SPACE ROOM LOUNGE',
    desc: 'Закрытая комната, TV 65" 120Hz, космическая атмосфера. 14 игр и кооп на весь вечер — до 6 человек.',
    image: '/clubs/elektrosila/features/space.jpg', tag: 'PS5 зона', icon: null, note: null },
  { id: 'green',  size: 'wide',  name: 'GREEN ROOM LOUNGE',
    desc: 'Открытая зона с TV 65", PS5 и двумя ПК. It Takes Two, UFC 5, EA Sports FC — кооп для небольшой компании.',
    image: '/clubs/elektrosila/features/green.jpeg', tag: null, icon: null, note: null },
  { id: 'max',    size: 'small', name: 'MAX ZONE',
    desc: 'RTX 4080, DDR5, 27" 165Hz — для требовательных игроков, которым нужен максимум.',
    icon: 'cpu', image: '/clubs/elektrosila/features/max.jpg', tag: null, note: null },
  { id: 'duo',    size: 'small', name: 'DUO ROOM',
    desc: 'Тишина и приватность. Комната на двоих с креслами Noblechairs.',
    icon: 'sofa', image: '/clubs/elektrosila/features/duo.jpg', tag: null, note: null },
  { id: 'always', size: 'small', name: 'КРУГЛОСУТОЧНО 24/7',
    desc: 'Открыто всегда — заходи в любое время дня и ночи без предварительного звонка.',
    icon: 'clock', image: null, tag: null, note: null },
  { id: 'metro',  size: 'small', name: '3 МИНУТЫ ОТ МЕТРО',
    desc: 'Электросила — 3 минуты пешком от выхода из метро по Московскому проспекту.',
    icon: 'pin', image: null, tag: null, note: null },
]

const FLOOR: FloorPlan = {
  bg: '/assets/floor-bg-elektrosila.webp',
  filters: [
    { id: 'all', name: 'ВСЕ', match: null },
    { id: 'pro', name: 'PRO', match: null },
    { id: 'max', name: 'MAX', match: null },
    { id: 'duo', name: 'DUO ROOM', match: ['duo','green','space'] },
  ],
  outlines: [
    { label: 'PRO ZONE', left: '7%',  top: '7%',  width: '50%', height: '44%', highlightFor: 'pro' },
    { label: 'MAX ZONE', left: '15%', top: '53%', width: '44%', height: '43%', highlightFor: 'max' },
    { label: 'DUO ROOM', left: '59%', top: '7%',  width: '38%', height: '86%', highlightFor: 'duo', accent: '#06B6D4' },
  ],
  poi: [],
  zones: [
    { zone: 'pro', label: 'PRO ZONE',
      seats: Array.from({ length: 11 }, (_, i) => ({
        id: `pro-${i+1}`, x: 9 + (i%6) * 6.6, y: 26 + Math.floor(i/6) * 16,
        status: (['free','busy','free','free','busy','free','busy','free','free','busy','free'] as const)[i],
      })) },
    { zone: 'max', label: 'MAX ZONE',
      seats: Array.from({ length: 7 }, (_, i) => ({
        id: `max-${i+1}`, x: 57 + (i%4) * 9, y: 22 + Math.floor(i/4) * 12,
        status: (['busy','free','busy','free','free','busy','free'] as const)[i],
      })) },
    { zone: 'duo', label: 'DUO ROOM',
      seats: [
        { id: 'duo-1', x: 9,  y: 74, status: 'busy' },
        { id: 'duo-2', x: 16, y: 74, status: 'free' },
      ] },
    { zone: 'green', label: 'GREEN ROOM',
      seats: [
        { id: 'green-1', x: 30, y: 74, status: 'free' },
        { id: 'green-2', x: 37, y: 74, status: 'free' },
        { id: 'green-3', x: 44, y: 74, status: 'busy' },
      ] },
    { zone: 'space', label: 'SPACE ROOM',
      seats: Array.from({ length: 6 }, (_, i) => ({
        id: `space-${i+1}`, x: 62 + (i%3) * 10, y: 62 + Math.floor(i/3) * 16,
        status: (['free','busy','free','busy','off','free'] as const)[i],
      })) },
  ],
}

const REVIEWS: Review[] = [
  { name: 'Андрей К.', src: 'Яндекс', stars: 5, text: 'Две тематические комнаты — это что-то особенное, нигде такого нет.' },
  { name: 'Мария В.',  src: '2ГИС',   stars: 5, text: 'MAX ZONE — разница с обычными клубами сразу чувствуется, RTX 4080 летит.' },
  { name: 'Иван П.',   src: 'Яндекс', stars: 5, text: '3 минуты от метро, зашёл после работы — просто и удобно. Персонал приветливый.' },
  { name: 'Дарья С.',  src: '2ГИС',   stars: 5, text: 'DUO ROOM тихая, никто не мешает, своя атмосфера — идеально для двоих.' },
  { name: 'Кирилл М.', src: 'Яндекс', stars: 5, text: 'Space Room на шестерых — сыграли в COD и Detroit всю ночь, незабываемо.' },
  { name: 'Полина Р.', src: '2ГИС',   stars: 5, text: 'It Takes Two в Green Room — лучший вечер с парнем, хватило на несколько часов.' },
  { name: 'Алексей Н.', src: 'Яндекс', stars: 5, text: 'Ходим с командой на MAX ZONE раз в неделю — железо реально топовое.' },
  { name: 'Катя М.',   src: '2ГИС',   stars: 5, text: 'Зашли спонтанно — всё чисто, приятная музыка, нас быстро устроили.' },
]

const FAQ: FAQItem[] = [
  { q: 'Сколько стоит час игры в Full Focus на Электросиле?',
    a: 'Стартовый тариф PRO ZONE — от 170₽/час, MAX ZONE — от 190₽/час, DUO ROOM — от 300₽/час, GREEN ROOM — от 380₽/час, SPACE ROOM — от 520₽/час. Школьники и студенты — PRO ZONE от 120₽/час в будни с 10:00 до 16:00.' },
  { q: 'Где находится клуб Full Focus на Электросиле?',
    a: 'Московский проспект, 149А, Санкт-Петербург. 3 минуты пешком от станции метро Электросила (2-я линия, синяя). Координаты: 59.876° N, 30.318° E.' },
  { q: 'Что такое GREEN ROOM и SPACE ROOM в Full Focus на Электросиле?',
    a: 'GREEN ROOM — открытая PS5-зона с TV 65" на 2–3 человека с 6 играми (It Takes Two, UFC 5, EA Sports FC и др.), от 380₽/час. SPACE ROOM — закрытая комната с TV 65" 120Hz до 6 человек, 14 игр включая Detroit, Mafia, COD, от 520₽/час.' },
  { q: 'Чем отличается MAX ZONE от PRO ZONE на Электросиле?',
    a: 'MAX ZONE — это 7 мест с RTX 4080, DDR5 32GB и 27" 165Hz мониторами. PRO ZONE — 11 мест с RTX 4070, DDR4 и 24" 165Hz. MAX ZONE дороже, но мощнее для требовательных игр.' },
  { q: 'Можно ли прийти в Full Focus на Электросиле компанией до 6 человек?',
    a: 'Да. SPACE ROOM рассчитан именно на компании до 6 человек: закрытая комната, PS5, TV 65" 120Hz и 14 игр. Стоимость — от 520₽/час за всю зону.' },
  { q: 'Работает ли Full Focus на Электросиле круглосуточно?',
    a: 'Да, клуб работает 24/7 без выходных и праздников.' },
  { q: 'Как забронировать место в Full Focus на Электросиле?',
    a: 'Через форму на сайте или Telegram @fullfocusclub. Подтверждение — в течение 15 минут.' },
  { q: 'Можно ли провести день рождения в Full Focus на Электросиле?',
    a: 'Да. Аренда SPACE ROOM или всего клуба, кейтеринг, ведущий и турнир между гостями. В день рождения именинника — депозит × 2. Заявка через Telegram @fullfocusclub.' },
]

const EVENTS: EventItem[] = [
  { icon: 'briefcase', name: 'КОРПОРАТИВ',
    desc: 'Аренда клуба или отдельных зон. Кейтеринг, ведущий, кастомные награды, прямой эфир турнира между отделами.' },
  { icon: 'cake', name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'Закажи зону или весь клуб для своей компании. Атмосфера, турнир между гостями, подарки.',
    badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР' },
  { icon: 'trophy', name: 'ЗАКРЫТЫЙ ТУРНИР',
    desc: 'Арендуй зону под командный турнир. Своя сетка, трансляция на TV 65", призы для победителей.' },
]

export const CLUB_DATA: ClubData = {
  CLUB, CLUB_ZONES, TARIFFS, HARDWARE, FEATURES, FLOOR, REVIEWS, ALL_CLUBS, FAQ, EVENTS,
}
