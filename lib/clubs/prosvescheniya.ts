import type { ClubData, ClubMeta, ClubZone, ClubTariffs, Feature, FloorPlan, Review, FAQItem, EventItem } from './types'
import { ALL_CLUBS } from './shared'
import { clubMedia } from '@/lib/cdn'

const media = clubMedia('prosvescheniya')

const CLUB: ClubMeta = {
  NAME: 'Просвещения',
  SLUG: 'prosvescheniya',
  ADDRESS: 'Проспект Просвещения, 43',
  METRO: 'Пр. Просвещения',
  METRO_COLOR: '#0062AC',
  METRO_TIME: '10 мин на трамвае',
  HOURS: 'Круглосуточно · 24/7',
  TELEGRAM: '@fullfocusprosvet',
  VK: 'https://vk.com/fullfocusprosvet',
  PHONE: '+7 (812) 660-55-96',
  MAPS_URL: 'https://yandex.com/maps/-/CPDl7G8E',
  ROUTE_URL: 'https://yandex.ru/maps/?rtext=~60.045799,30.365117&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D90561655807',
  COORDS: '60.046° N · 30.365° E',
  VIDEO_URL: media.video,
  VIDEO_URL_DESKTOP: media.videoDesktop,
  POSTER_URL: media.poster,
  VIDEO_TITLE: 'Full Focus Просвещения — обзор компьютерного клуба',
  VIDEO_DESC: 'Видеообзор компьютерного клуба Full Focus у м. Проспект Просвещения. Игровые зоны, оборудование, атмосфера.',
  GALLERY: [media.gallery(1), media.gallery(2), media.gallery(3), media.gallery(4), media.gallery(5), media.gallery(6)],
  REVIEWS_COUNT: '140+ отзывов',
  REVIEWS_COUNT_NUM: 140,
  GEO: { lat: 60.045799, lng: 30.365117 },
  MEDIA_LABEL: 'FULL FOCUS · клуб #04',
  FACTS: [
    { icon: 'bolt',   val: 'от 120 ₽/час', lbl: 'Самые низкие цены в сети' },
    { icon: 'users',  val: 'Лондон Парк',  lbl: '3 712 квартир — 5 мин пешком' },
    { icon: 'school', val: 'Студентам',     lbl: 'Скидки пн-пт 10:00–16:00' },
  ],
  FEATURES_TAG:   'самые доступные цены',
  FEATURES_TITLE: 'ДОСТУПНО И КАЧЕСТВЕННО',
  FEATURES_SUB:   'Внутри ЖК Лондон Парк — 3 712 квартир в шаговой доступности. Самые низкие цены в сети от 120₽/час, два PS-лаунжа и скидки студентам.',
  MAP: {
    pin:   { top: '50%', left: '46%' },
    river: false,
    roads: [
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 16, color: 'rgba(193,42,44,0.22)' },
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 1.5, color: 'rgba(193,42,44,0.55)' },
      { type: 'line', x1: 180, y1: -10, x2: 200, y2: 290, w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0,   y1: 70,  x2: 400, y2: 50,  w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0,   y1: 210, x2: 400, y2: 220, w: 1, color: 'rgba(102,50,250,0.35)' },
    ],
    labels: [
      { x: 20,  y: 130, text: 'ПР. ПРОСВЕЩЕНИЯ', color: 'rgba(193,42,44,0.65)' },
      { x: 205, y: 50,  text: 'РУСТАВЕЛИ УЛ.',   color: 'rgba(102,50,250,0.55)' },
    ],
  },
}

const CLUB_ZONES: ClubZone[] = [
  { id: 'pro',   name: 'PRO ZONE',      accent: '#6632FA', seats: 6,  priceFrom: 120,
    desc: 'Игровые ПК с RTX 2060 по самым доступным ценам в сети. 6 мест в уютной атмосфере.',
    specShort: 'RTX 2060 · 27" 240Hz · от 120₽', image: '/clubs/prosvescheniya/zones/pro.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'bootcamp', name: 'BOOTCAMP',   accent: '#6632FA', seats: 6,  priceFrom: 170,
    desc: 'Командная зона на 6 мест — голосовая связь и мониторы 280Hz для командных игр.',
    specShort: 'RTX 2060 · 27" 280Hz · 6 мест', image: '/clubs/prosvescheniya/zones/bootcamp.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'max',   name: 'MAX ZONE',      accent: '#6632FA', seats: 4,  priceFrom: 190,
    desc: 'RTX 5060/4060, процессор i5-13490KF и монитор 300Hz — максимум для соревновательного гейминга.',
    specShort: 'RTX 5060 · 24.5" 300Hz · 4 места', image: '/clubs/prosvescheniya/zones/max.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'trio',  name: 'TRIO ROOM',     accent: '#6632FA', seats: 3,  priceFrom: 220,
    desc: 'Приватная комната на троих. RTX 4060 Ti, 300Hz, тишина и кресла Knight Full Focus.',
    specShort: 'RTX 4060 Ti · 24.5" 300Hz', image: '/clubs/prosvescheniya/zones/trio.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'solo',  name: 'SOLO ROOM',     accent: '#6632FA', seats: 1,  priceFrom: 250,
    desc: 'Один на один с игрой. RTX 4070 Super, 27" 2K 300Hz — лучшее железо в клубе.',
    specShort: 'RTX 4070 Super · 27" 2K 300Hz', image: '/clubs/prosvescheniya/zones/solo.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'ps4',   name: 'PS4 PRO LOUNGE', accent: '#00D4FF', seats: 'до 3 чел', priceFrom: 280,
    wide: true, badge: 'PS4 PRO ЗОНА',
    desc: 'Уникальная зона с PS4 Pro и TV 55". Классика PlayStation — обширная библиотека игр по выгодной цене.',
    specShort: 'PS4 Pro · 55" TV', image: '/clubs/prosvescheniya/zones/ps4.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false },
  { id: 'ps5',   name: 'PS5 LOUNGE',    accent: '#00FFB6', seats: 'до 5 чел', priceFrom: 380,
    wide: true, badge: 'PS5 ЗОНА',
    desc: 'PS5 с TV 65" и полной библиотекой эксклюзивов. Кооперативы и одиночные игры на большом экране.',
    specShort: 'PS5 · 65" TV', image: '/clubs/prosvescheniya/zones/ps5.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false },
]

const TARIFFS: ClubTariffs = {
  cols: ['1 час', '3 часа', '5 часов', 'Утро 5ч', 'Ночь 10ч'],
  popular: 1, bestValue: 4,
  rows: [
    { zone: 'PRO ZONE',      vals: [[120,140], [340,400], [510,600],  [310,360], [650,780]] },
    { zone: 'BOOTCAMP',      vals: [[170,190], [480,540], [720,810],  [440,490], [920,1060]] },
    { zone: 'MAX ZONE',      vals: [[190,210], [500,560], [740,830],  [460,510], [920,1060]] },
    { zone: 'TRIO ROOM',     vals: [[220,250], [630,710], [940,1060], [570,650], [1190,1400]] },
    { zone: 'SOLO ROOM',     vals: [[250,280], [710,800], [1060,1190],[650,730], [1350,1570]] },
    { zone: 'PS4 PRO LOUNGE',vals: [[280,350], [800,1000],[1190,1490],null,      null] },
    { zone: 'PS5 LOUNGE',    vals: [[380,420], [1080,1200],[1620,1780],null,     null] },
  ],
  student: 'Школьникам и студентам Пн-Пт 10:00–16:00 — PRO ZONE всего от 120₽/час',
}

const HARDWARE: ClubData['HARDWARE'] = {
  pro: { name: 'PRO ZONE', rows: [
    { k: 'Видеокарта', v: 'NVIDIA GeForce RTX 2060', accent: true },
    { k: 'Процессор',  v: 'Intel Core i5-10400F' },
    { k: 'Монитор',    v: 'AOC 27" · 240 Hz', accent: true },
    { k: 'Мышка',      v: 'SteelSeries Rival 3' },
    { k: 'Наушники',   v: 'HyperX Cloud II' },
    { k: 'Кресло',     v: 'Warp Full Focus' },
    { k: 'Клавиатура', v: 'HyperX Alloy Origins FPS' },
  ]},
  bootcamp: { name: 'BOOTCAMP', rows: [
    { k: 'Видеокарта', v: 'RTX 3060 / AMD RX 5600XT', accent: true },
    { k: 'Процессор',  v: 'Intel Core i5-10400F' },
    { k: 'Монитор',    v: 'Asus 27" · 280 Hz', accent: true },
    { k: 'Мышка',      v: 'Ajazz AJ139' },
    { k: 'Наушники',   v: 'HyperX Cloud II' },
    { k: 'Кресло',     v: 'Warp Full Focus' },
    { k: 'Клавиатура', v: 'HyperX Alloy Origins FPS' },
  ]},
  max: { name: 'MAX ZONE', rows: [
    { k: 'Видеокарта', v: 'NVIDIA RTX 5060 / RTX 4060', accent: true },
    { k: 'Процессор',  v: 'Intel Core i5-13490KF / i5-12400F', accent: true },
    { k: 'Монитор',    v: 'MSI 24.5" · 300 Hz', accent: true },
    { k: 'Мышка',      v: 'Ajazz Max Wireless' },
    { k: 'Наушники',   v: 'HyperX Cloud II' },
    { k: 'Кресло',     v: 'Knight Full Focus' },
    { k: 'Клавиатура', v: 'Ajazz AK820MAX' },
  ]},
  trio: { name: 'TRIO ROOM', rows: [
    { k: 'Видеокарта', v: 'NVIDIA GeForce RTX 4060 Ti', accent: true },
    { k: 'Процессор',  v: 'Intel Core i5-13490KF' },
    { k: 'Монитор',    v: 'MSI 24.5" · 300 Hz', accent: true },
    { k: 'Мышка',      v: 'Ajazz Max Wireless' },
    { k: 'Наушники',   v: 'HyperX Cloud II' },
    { k: 'Кресло',     v: 'Knight Full Focus' },
    { k: 'Клавиатура', v: 'Ajazz AK820MAX' },
  ]},
  solo: { name: 'SOLO ROOM', rows: [
    { k: 'Видеокарта', v: 'NVIDIA GeForce RTX 4070 Super', accent: true },
    { k: 'Процессор',  v: 'Intel Core i5-13490F' },
    { k: 'Монитор',    v: 'MSI 27" 2K · 300 Hz', accent: true },
    { k: 'Мышка',      v: 'Ajazz Apex AJ159 Max', accent: true },
    { k: 'Наушники',   v: 'HyperX Cloud III' },
    { k: 'Кресло',     v: 'Knight Full Focus' },
    { k: 'Клавиатура', v: 'Ajazz AK820MAX' },
  ]},
  ps: { name: 'PS4 PRO / PS5 LOUNGE', rows: [
    { k: 'Консоль PS5', v: 'Sony PlayStation 5', accent: true },
    { k: 'Консоль PS4', v: 'Sony PS4 Pro', accent: true },
    { k: 'Экран PS5',   v: '65" TV · 120 Hz', accent: true },
    { k: 'Экран PS4',   v: '55" TV · 60 Hz' },
    { k: 'Геймпады',    v: 'DualSense / DualShock 4' },
    { k: 'Игры',        v: 'PS4 Pro + PS5 Library' },
  ]},
}

const FEATURES: Feature[] = [
  { id: 'price',  size: 'big',   name: 'ОТ 120₽/ЧАС — ДЕШЕВЛЕ В СЕТИ НЕТ',
    desc: 'PRO ZONE от 120₽/час — самый доступный тариф среди всех клубов Full Focus.',
    image: '/clubs/prosvescheniya/features/price.jpg', tag: 'Лучшая цена', icon: null, note: null },
  { id: 'ps5',   size: 'small', name: 'PS5 LOUNGE',
    desc: 'PS5 с TV 65" для кооперативов и эксклюзивов. 4 кресла, от 380₽/час.',
    icon: 'gamepad', image: null, tag: null, note: null },
  { id: 'solo',  size: 'small', name: 'SOLO ROOM',
    desc: 'Изолированная комната для ранкеда. RTX 4070 Super, 27" 2K 300Hz, тишина.',
    icon: 'sofa', image: null, tag: null, note: null },
  { id: 'always', size: 'small', name: '24/7 БЕЗ ВЫХОДНЫХ',
    desc: 'Работаем круглосуточно. Приходи в любое время — от ночной сессии до утренней.',
    icon: 'clock', image: null, tag: null, note: null },
]

const FLOOR: FloorPlan = {
  filters: [
    { id: 'all',      name: 'ВСЕ',     match: null },
    { id: 'pro',      name: 'PRO',     match: null },
    { id: 'bootcamp', name: 'BOOT',    match: null },
    { id: 'max',      name: 'MAX',     match: null },
    { id: 'rooms',    name: 'КОМНАТЫ', match: ['trio','solo'] },
    { id: 'lounge',   name: 'PS',      match: ['ps4','ps5'] },
  ],
  outlines: [
    { label: 'PRO ZONE',   left: '2%',  top: '10%', width: '28%', height: '32%', highlightFor: null },
    { label: 'BOOTCAMP',   left: '34%', top: '10%', width: '28%', height: '32%', highlightFor: null },
    { label: 'MAX ZONE',   left: '66%', top: '10%', width: '30%', height: '32%', highlightFor: 'max' },
    { label: 'TRIO / SOLO',left: '2%',  top: '50%', width: '28%', height: '38%', highlightFor: null },
    { label: 'PS4 PRO',    left: '34%', top: '50%', width: '28%', height: '38%', highlightFor: 'lounge', accent: '#00D4FF' },
    { label: 'PS5 LOUNGE', left: '66%', top: '50%', width: '30%', height: '38%', highlightFor: 'lounge', accent: '#00FFB6' },
  ],
  zones: [
    { zone: 'pro', label: 'PRO ZONE',
      seats: Array.from({length: 6}, (_, i) => ({
        id: `pro-${i+1}`, x: 6 + (i%3) * 8, y: 22 + Math.floor(i/3) * 18,
        status: (['free','busy','free','free','free','busy'] as const)[i],
      })) },
    { zone: 'bootcamp', label: 'BOOTCAMP',
      seats: Array.from({length: 6}, (_, i) => ({
        id: `bc-${i+1}`, x: 37 + (i%3) * 8, y: 22 + Math.floor(i/3) * 18,
        status: (['free','free','busy','free','busy','free'] as const)[i],
      })) },
    { zone: 'max', label: 'MAX ZONE',
      seats: Array.from({length: 4}, (_, i) => ({
        id: `max-${i+1}`, x: 70 + (i%2) * 10, y: 22 + Math.floor(i/2) * 18,
        status: (['busy','free','free','busy'] as const)[i],
      })) },
    { zone: 'trio', label: 'TRIO ROOM',
      seats: [
        { id: 'trio-1', x: 6,  y: 64, status: 'free' },
        { id: 'trio-2', x: 12, y: 64, status: 'busy' },
        { id: 'trio-3', x: 18, y: 64, status: 'free' },
      ]},
    { zone: 'solo', label: 'SOLO ROOM',
      seats: [{ id: 'solo-1', x: 12, y: 78, status: 'free' }]},
    { zone: 'ps4', label: 'PS4 PRO',
      seats: [
        { id: 'ps4-1', x: 38, y: 64, status: 'free' },
        { id: 'ps4-2', x: 44, y: 64, status: 'free' },
      ]},
    { zone: 'ps5', label: 'PS5 LOUNGE',
      seats: [
        { id: 'ps5-1', x: 72, y: 64, status: 'busy' },
        { id: 'ps5-2', x: 78, y: 64, status: 'free' },
      ]},
  ],
}

const REVIEWS: Review[] = [
  { name: 'Кира В.',   src: 'Яндекс', stars: 5, text: '120 рублей за час — не верила пока не пришла. Железо реально топовое, ничего не тормозит.' },
  { name: 'Артём С.',  src: '2ГИС',   stars: 5, text: 'Студенческий тариф в будни — ходим всей группой после пар. Лучший клуб для студентов в СПб.' },
  { name: 'Дима Р.',   src: 'Яндекс', stars: 5, text: 'PS4 Pro зона — это неожиданно круто. Классика PlayStation, которой уже нет в других клубах.' },
  { name: 'Полина К.', src: '2ГИС',   stars: 5, text: 'SOLO ROOM — тишина, Noblechairs, RTX 4080. Идеально для серьёзного ранкеда.' },
  { name: 'Антон М.',  src: 'Яндекс', stars: 5, text: 'Самые доступные цены в городе при нормальном качестве. Bootcamp на 6 человек — берём регулярно.' },
  { name: 'Лена Т.',   src: '2ГИС',   stars: 5, text: 'PS5 LOUNGE с большим TV — сыграли в It Takes Two и Kena, впечатления на весь вечер.' },
  { name: 'Егор Ф.',   src: 'Яндекс', stars: 5, text: 'Ночной пакет на PRO ZONE — 10 часов за 650 рублей. Железо не подвело ни разу.' },
  { name: 'Настя О.',  src: '2ГИС',   stars: 5, text: 'Приятный персонал, всегда помогут выбрать зону под бюджет. TRIO ROOM тихая и комфортная.' },
]

const FAQ: FAQItem[] = [
  { q: 'Сколько стоит час игры в Full Focus на Просвещения?',
    a: 'PRO ZONE от 120₽/час — самые низкие цены в сети Full Focus. BOOTCAMP от 170₽/час, MAX ZONE от 190₽/час, SOLO ROOM от 250₽/час, PS5 LOUNGE от 380₽/час.' },
  { q: 'Где находится Full Focus на Просвещения?',
    a: 'Проспект Просвещения, 43, Санкт-Петербург. 5 минут пешком от метро Проспект Просвещения (красная линия). Координаты: 60.053° N, 30.356° E.' },
  { q: 'Есть ли скидки студентам в Full Focus на Просвещения?',
    a: 'Да — школьники и студенты могут играть в PRO ZONE от 120₽/час в будние дни с 10:00 до 16:00 при предъявлении студенческого билета.' },
  { q: 'Что такое PS4 Pro Lounge в Full Focus на Просвещения?',
    a: 'Уникальная зона с PlayStation 4 Pro и TV 55" — единственная в сети Full Focus. Обширная библиотека классических игр по доступной цене от 280₽/час.' },
  { q: 'Есть ли PS5 в Full Focus на Просвещения?',
    a: 'Да — PS5 LOUNGE с TV 65", 4 кресла, от 380₽/час. Все эксклюзивы PlayStation 5.' },
  { q: 'Работает ли Full Focus на Просвещения круглосуточно?',
    a: 'Да, клуб работает 24/7 без выходных.' },
  { q: 'Какой самый дешёвый клуб Full Focus в СПб?',
    a: 'Клуб на Проспекте Просвещения — самые доступные тарифы в сети: PRO ZONE от 120₽/час в будни и от 140₽/час в выходные.' },
  { q: 'Есть ли приватные комнаты в Full Focus на Просвещения?',
    a: 'Да — TRIO ROOM (3 места, от 220₽/час) и SOLO ROOM (1 место, от 250₽/час) для полной приватности и тишины.' },
]

const EVENTS: EventItem[] = [
  { icon: 'briefcase', name: 'КОРПОРАТИВ',
    desc: 'Аренда клуба или отдельных зон. Турниры на любой вкус и бюджет — самые доступные площадки в сети.' },
  { icon: 'cake', name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'Праздник для своей компании — аренда PS5 LOUNGE или нескольких зон. Турнир, призы, атмосфера.',
    badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР' },
  { icon: 'trophy', name: 'ЗАКРЫТЫЙ ТУРНИР',
    desc: 'Арендуй Bootcamp или несколько зон под командный турнир. Своя сетка и призы.' },
]

export const CLUB_DATA: ClubData = {
  CLUB, CLUB_ZONES, TARIFFS, HARDWARE, FEATURES, FLOOR, REVIEWS, ALL_CLUBS, FAQ, EVENTS,
}
