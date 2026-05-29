import type { ClubData, ClubMeta, ClubZone, ClubTariffs, Feature, FloorPlan, Review, FAQItem, EventItem } from './types'
import { ALL_CLUBS } from './shared'

const CLUB: ClubMeta = {
  NAME: 'Беговая',
  SLUG: 'begovaya',
  ADDRESS: 'Улица Савушкина, 127',
  METRO: 'Беговая',
  METRO_COLOR: '#a3df95',
  METRO_TIME: '4 мин пешком',
  HOURS: 'Круглосуточно · 24/7',
  TELEGRAM: '@fullfocusclub',
  PHONE: '+7 (812) 660-55-96',
  MAPS_URL: 'https://yandex.com/maps/-/CPDlzO58',
  ROUTE_URL: 'https://yandex.ru/maps/?rtext=~59.993,30.210&rtt=auto',
  COORDS: '59.993° N · 30.210° E',
  VIDEO_URL: '/assets/hero-video.mp4',
  POSTER_URL: '/assets/club-interior.jpg',
  REVIEWS_COUNT: '130+ отзывов',
  REVIEWS_COUNT_NUM: 130,
  GEO: { lat: 59.9927, lng: 30.2095 },
  MEDIA_LABEL: 'FULL FOCUS · клуб #05',
  FACTS: [
    { icon: 'bolt',    val: 'от 190 ₽/час', lbl: 'Стартовый тариф' },
    { icon: 'users',   val: '4 TRIO ROOM',   lbl: 'Четыре приватных комнаты' },
    { icon: 'clock',   val: 'Ночь 12ч',      lbl: 'Самый длинный ночной пакет' },
  ],
  FEATURES_TAG:   '— особые форматы',
  FEATURES_TITLE: 'СОБСТВЕННЫЙ РИТМ',
  FEATURES_SUB:   'Четыре TRIO ROOM для приватных сессий, эксклюзивный ночной пакет на 12 часов и утро с 08:00 — клуб на Беговой живёт по своему графику.',
  MAP: {
    pin:   { top: '50%', left: '46%' },
    river: false,
    roads: [
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 16, color: 'rgba(163,223,149,0.25)' },
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 1.5, color: 'rgba(163,223,149,0.6)' },
      { type: 'line', x1: 180, y1: -10, x2: 200, y2: 290, w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0,   y1: 60,  x2: 400, y2: 50,  w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0,   y1: 220, x2: 400, y2: 215, w: 1, color: 'rgba(102,50,250,0.35)' },
    ],
    labels: [
      { x: 20,  y: 132, text: 'УЛ. САВУШКИНА',  color: 'rgba(163,223,149,0.7)' },
      { x: 205, y: 42,  text: 'ТУРИСТСКАЯ УЛ.', color: 'rgba(102,50,250,0.55)' },
    ],
  },
}

const CLUB_ZONES: ClubZone[] = [
  { id: 'pro',      name: 'PRO ZONE',   accent: '#6632FA', seats: 12, priceFrom: 190,
    desc: 'Просторная open-space зона на 12 мест. RTX 4070, 165Hz — для длинных сессий в любое время суток.',
    specShort: 'RTX 4070 · 165Hz · 12 мест', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'bootcamp', name: 'BOOTCAMP',   accent: '#6632FA', seats: 5,  priceFrom: 240,
    desc: 'Командная зона на 5 мест с голосовой связью и оборудованием для стримов.',
    specShort: 'RTX 4070 · 144Hz · 5 мест', image: '/assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'trio',     name: 'TRIO ROOM ×4', accent: '#6632FA', seats: '3–12', priceFrom: 300,
    wide: true, badge: '4 ПРИВАТНЫХ КОМНАТЫ',
    desc: 'Четыре отдельные комнаты по 3 места — выбери свою. Полная приватность, Noblechairs, тишина. Идеально для трио или небольших команд.',
    specShort: 'RTX 4070 · 27" 144Hz · Noblechairs · × 4', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false },
  { id: 'duo',      name: 'DUO ROOM',   accent: '#6632FA', seats: 2,  priceFrom: 370,
    desc: 'Приватная комната на двоих. Тишина, Noblechairs, RTX 4080.',
    specShort: 'RTX 4080 · 27" 165Hz · Noblechairs', image: '/assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'solo',     name: 'SOLO ROOM',  accent: '#6632FA', seats: 1,  priceFrom: 420,
    desc: 'Изоляция от шума, RTX 4080 и лучшая периферия — идеал для ранкеда.',
    specShort: 'RTX 4080 · 27" 165Hz · Noblechairs', image: '/assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'ps5',      name: 'TV + PS5',   accent: '#00FFB6', seats: '4 кресла', priceFrom: 400,
    wide: true, badge: 'PS5 ЗОНА',
    desc: 'PS5 с большим TV, 4 кресла — кооперативы, файтинги, спортивные симуляторы и весь каталог PlayStation 5.',
    specShort: 'PS5 · TV · 4 кресла', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false },
]

const TARIFFS: ClubTariffs = {
  cols: ['1 час', '3 часа', '5 часов', 'Утро 6ч', 'Ночь 12ч'],
  popular: 1, bestValue: 4,
  bestNote: '↑ Ночь 12ч — самая низкая цена за час сессии',
  rows: [
    { zone: 'PRO ZONE',    vals: [[190,220], [510,590],  [790,920],   [520,590],  [800,1000]] },
    { zone: 'BOOTCAMP',    vals: [[240,270], [650,720],  [1000,1100], [650,720],  [950,1250]] },
    { zone: 'TRIO ROOM',   vals: [[300,350], [820,940],  [1260,1460], [820,940],  [1200,1600]] },
    { zone: 'DUO ROOM',    vals: [[370,440], [1000,1200],[1680,1850], [1000,1200],[1700,2000]] },
    { zone: 'SOLO ROOM',   vals: [[420,520], [1100,1400],[1800,2100], [1100,1400],[1800,2500]] },
    { zone: 'TV + PS5',    vals: [[400,600], [1000,1500],[1700,2300], null,        null] },
  ],
  student: 'Школьникам и студентам Пн-Пт 10:00–15:00 — PRO ZONE от 120₽/час',
}

const HARDWARE: ClubData['HARDWARE'] = {
  pro: { name: 'PRO ZONE', rows: [
    { k: 'Видеокарта', v: 'NVIDIA RTX 4070', accent: true },
    { k: 'Процессор',  v: 'Intel Core i7' },
    { k: 'RAM',        v: 'DDR4 16 GB' },
    { k: 'Монитор',    v: '24" · 165 Hz · 1 ms', accent: true },
    { k: 'Кресло',     v: 'DXRacer Master' },
    { k: 'Периферия',  v: 'Razer / Logitech G' },
  ]},
  rooms: { name: 'TRIO / DUO / SOLO', rows: [
    { k: 'Видеокарта', v: 'NVIDIA RTX 4070–4080', accent: true },
    { k: 'Процессор',  v: 'Intel Core i7–i9' },
    { k: 'RAM',        v: 'DDR4/DDR5 16–32 GB' },
    { k: 'Монитор',    v: '27" · 144–165 Hz' },
    { k: 'Кресло',     v: 'Noblechairs Hero', accent: true },
    { k: 'Периферия',  v: 'Razer Pro · наушники Sennheiser' },
  ]},
  bootcamp: { name: 'BOOTCAMP', rows: [
    { k: 'Видеокарта', v: 'NVIDIA RTX 4070', accent: true },
    { k: 'Процессор',  v: 'Intel Core i7' },
    { k: 'RAM',        v: 'DDR4 16 GB' },
    { k: 'Монитор',    v: '27" · 144 Hz' },
    { k: 'Кресло',     v: 'DXRacer' },
    { k: 'Периферия',  v: 'Razer + гарнитуры для связи' },
  ]},
  ps5: { name: 'TV + PS5', rows: [
    { k: 'Консоль',   v: 'Sony PlayStation 5', accent: true },
    { k: 'Экран',     v: 'Большой TV · 120 Hz', accent: true },
    { k: 'Звук',      v: 'Объёмный звук + сабвуфер' },
    { k: 'Геймпады',  v: 'DualSense · до 4 штук' },
    { k: 'Посадка',   v: '4 удобных кресла' },
    { k: 'Игры',      v: 'Полная библиотека PS5' },
  ]},
}

const FEATURES: Feature[] = [
  { id: 'trio4',  size: 'big',   name: '4 TRIO ROOM',
    desc: 'Четыре приватные комнаты по 3 места — нигде в сети нет столько приватных TRIO. Noblechairs, тишина, отдельное пространство.',
    image: '/assets/club-interior.jpg', tag: 'Уникально', icon: null, note: null },
  { id: 'night12', size: 'wide',  name: 'НОЧЬ 12 ЧАСОВ',
    desc: 'Эксклюзивный ночной пакет на 12 часов — самый длинный в сети. Играй с вечера до утра без перерыва.',
    icon: 'clock', image: null, tag: 'Только здесь', note: null },
  { id: 'morning8', size: 'small', name: 'УТРО С 08:00',
    desc: 'Утренний пакет стартует в 08:00 — раньше всех в сети.',
    icon: 'bolt', image: null, tag: null, note: null },
  { id: 'ps5',    size: 'small', name: 'TV + PS5',
    desc: 'PS5 с большим TV для кооперативов. 4 кресла, от 400₽/час.',
    icon: 'gamepad', image: null, tag: null, note: null },
  { id: 'solo',   size: 'small', name: 'SOLO + DUO ROOM',
    desc: 'Приватные комнаты для одного или двоих. RTX 4080, Noblechairs.',
    icon: 'sofa', image: null, tag: null, note: null },
  { id: 'metro',  size: 'small', name: '4 МИН ОТ БЕГОВОЙ',
    desc: 'Метро Беговая — 4 минуты пешком. Удобно с Петроградской стороны.',
    icon: 'pin', image: null, tag: null, note: null },
]

const FLOOR: FloorPlan = {
  filters: [
    { id: 'all',      name: 'ВСЕ',     match: null },
    { id: 'pro',      name: 'PRO',     match: null },
    { id: 'bootcamp', name: 'BOOT',    match: null },
    { id: 'trio',     name: 'TRIO',    match: null },
    { id: 'rooms',    name: 'DUO/SOLO',match: ['duo','solo'] },
    { id: 'ps5',      name: 'PS5',     match: null },
  ],
  outlines: [
    { label: 'PRO ZONE',  left: '2%',  top: '10%', width: '44%', height: '34%', highlightFor: null },
    { label: 'BOOTCAMP',  left: '50%', top: '10%', width: '20%', height: '34%', highlightFor: null },
    { label: 'TV + PS5',  left: '74%', top: '10%', width: '24%', height: '34%', highlightFor: 'ps5', accent: '#00FFB6' },
    { label: 'TRIO ×4',   left: '2%',  top: '52%', width: '44%', height: '38%', highlightFor: 'trio' },
    { label: 'DUO / SOLO',left: '50%', top: '52%', width: '20%', height: '38%', highlightFor: null },
  ],
  zones: [
    { zone: 'pro', label: 'PRO ZONE',
      seats: Array.from({length: 12}, (_, i) => ({
        id: `pro-${i+1}`, x: 6 + (i%6) * 6, y: 22 + Math.floor(i/6) * 16,
        status: (['free','busy','free','free','busy','free','free','free','busy','free','free','busy'] as const)[i],
      })) },
    { zone: 'bootcamp', label: 'BOOTCAMP',
      seats: Array.from({length: 5}, (_, i) => ({
        id: `bc-${i+1}`, x: 54 + (i%3) * 5, y: 22 + Math.floor(i/3) * 16,
        status: (['free','free','busy','free','free'] as const)[i],
      })) },
    { zone: 'ps5', label: 'TV + PS5',
      seats: [
        { id: 'ps5-1', x: 78, y: 24, status: 'free' },
        { id: 'ps5-2', x: 84, y: 24, status: 'busy' },
      ]},
    { zone: 'trio', label: 'TRIO ROOM',
      seats: Array.from({length: 12}, (_, i) => ({
        id: `trio-${i+1}`, x: 6 + (i%6) * 6, y: 62 + Math.floor(i/6) * 16,
        status: (['free','free','busy','free','free','free','busy','free','free','free','busy','free'] as const)[i],
      })) },
    { zone: 'duo', label: 'DUO ROOM',
      seats: [
        { id: 'duo-1', x: 52, y: 62, status: 'free' },
        { id: 'duo-2', x: 58, y: 62, status: 'busy' },
      ]},
    { zone: 'solo', label: 'SOLO ROOM',
      seats: [{ id: 'solo-1', x: 55, y: 74, status: 'free' }]},
  ],
}

const REVIEWS: Review[] = [
  { name: 'Иван Г.',    src: 'Яндекс', stars: 5, text: 'Четыре TRIO ROOM — это находка. Пришли втроём, заняли свою комнату, никто не мешает.' },
  { name: 'Света М.',   src: '2ГИС',   stars: 5, text: 'Ночь 12 часов — лучший пакет для ночных сессий. Играли с 23:00 до 11:00, железо не подвело.' },
  { name: 'Паша Д.',    src: 'Яндекс', stars: 5, text: 'Утренний пакет с 08:00 — прихожу перед работой. Тихо, никого, атмосфера отличная.' },
  { name: 'Женя К.',    src: '2ГИС',   stars: 5, text: 'SOLO ROOM с RTX 4080 и Noblechairs — для ранкеда лучше не найдёшь в этом районе.' },
  { name: 'Маша Р.',    src: 'Яндекс', stars: 5, text: 'Хожу с компанией в TRIO ROOM, каждую пятницу. Уютно, тихо, своё пространство.' },
  { name: 'Слава Т.',   src: '2ГИС',   stars: 5, text: '4 минуты от Беговой — очень удобно. PRO ZONE на 12 мест, место всегда есть.' },
  { name: 'Вика Н.',    src: 'Яндекс', stars: 5, text: 'DUO ROOM для двоих — лучший вариант на вечер. Тихо, Noblechairs, RTX 4080.' },
  { name: 'Антон М.',   src: '2ГИС',   stars: 5, text: 'Персонал приветливый, все настроили быстро. TV + PS5 порадовал — звук отменный.' },
]

const FAQ: FAQItem[] = [
  { q: 'Сколько стоит час игры в Full Focus на Беговой?',
    a: 'PRO ZONE от 190₽/час, BOOTCAMP от 240₽/час, TRIO ROOM от 300₽/час, DUO ROOM от 370₽/час, SOLO ROOM от 420₽/час, TV + PS5 от 400₽/час.' },
  { q: 'Где находится Full Focus на Беговой?',
    a: 'Улица Савушкина, 127, Санкт-Петербург. 4 минуты пешком от метро Беговая. Координаты: 59.993° N, 30.210° E.' },
  { q: 'Что такое TRIO ROOM в Full Focus на Беговой?',
    a: 'TRIO ROOM — приватная комната на 3 места с Noblechairs и 27" 144Hz. На Беговой их 4 штуки — можно взять все сразу для компании до 12 человек. От 300₽/час.' },
  { q: 'Есть ли ночной пакет на 12 часов в Full Focus?',
    a: 'Да, на Беговой действует эксклюзивный ночной пакет Ночь 12ч — самый длинный в сети. PRO ZONE от 800₽ за 12 часов в будни.' },
  { q: 'С какого часа начинается утренний пакет на Беговой?',
    a: 'Утро с 08:00 — раньше всех клубов сети. Пакет на 6 часов, PRO ZONE от 520₽.' },
  { q: 'Работает ли Full Focus на Беговой круглосуточно?',
    a: 'Да, клуб работает 24/7 без выходных.' },
  { q: 'Как добраться до Full Focus на Беговой?',
    a: '4 минуты пешком от метро Беговая по улице Савушкина до дома 127.' },
  { q: 'Есть ли приватные комнаты в Full Focus на Беговой?',
    a: 'Да — 4 TRIO ROOM (по 3 места), 1 DUO ROOM и 1 SOLO ROOM. Всего 6 приватных пространств — больше, чем в любом другом клубе сети.' },
]

const EVENTS: EventItem[] = [
  { icon: 'briefcase', name: 'КОРПОРАТИВ',
    desc: 'Аренда TRIO ROOM ×4 или всего клуба. 12 приватных мест + PRO ZONE + Bootcamp — удобный формат для команд.' },
  { icon: 'cake', name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'Компания до 12 человек в TRIO ROOM или аренда нескольких зон. Ночной пакет 12ч — идеально для праздника.',
    badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР' },
  { icon: 'trophy', name: 'ЗАКРЫТЫЙ ТУРНИР',
    desc: 'TRIO ROOM ×4 для одновременной игры команд. Своя сетка, трансляция, призы победителям.' },
]

export const CLUB_DATA: ClubData = {
  CLUB, CLUB_ZONES, TARIFFS, HARDWARE, FEATURES, FLOOR, REVIEWS, ALL_CLUBS, FAQ, EVENTS,
}
