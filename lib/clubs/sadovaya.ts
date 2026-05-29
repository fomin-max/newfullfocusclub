import type { ClubData, ClubMeta, ClubZone, ClubTariffs, Feature, FloorPlan, Review, FAQItem, EventItem } from './types'
import { ALL_CLUBS } from './shared'

const CLUB: ClubMeta = {
  NAME: 'Садовая',
  SLUG: 'sadovaya',
  ADDRESS: 'Улица Казанская, 33',
  METRO: 'Садовая',
  METRO_COLOR: '#b14385',
  METRO_TIME: '6 мин пешком',
  HOURS: 'Круглосуточно · 24/7',
  TELEGRAM: '@fullfocusclub',
  PHONE: '+7 (812) 660-55-96',
  MAPS_URL: 'https://yandex.com/maps/-/CPDlzV2T',
  ROUTE_URL: 'https://yandex.ru/maps/?rtext=~59.929,30.322&rtt=auto',
  COORDS: '59.929° N · 30.322° E',
  VIDEO_URL: '/assets/hero-video.mp4',
  POSTER_URL: '/assets/club-interior.jpg',
  REVIEWS_COUNT: '190+ отзывов',
  REVIEWS_COUNT_NUM: 190,
  GEO: { lat: 59.9292, lng: 30.3223 },
  MEDIA_LABEL: 'FULL FOCUS · клуб #06',
  FACTS: [
    { icon: 'bolt',   val: 'от 170 ₽/час', lbl: 'Стартовый тариф' },
    { icon: 'pin',    val: 'Центр СПб',     lbl: 'Рядом с Невским проспектом' },
    { icon: 'users',  val: '15 PRO мест',   lbl: 'Самый большой open-space' },
  ],
  FEATURES_TAG:   '— в самом сердце города',
  FEATURES_TITLE: 'ЦЕНТР ПЕТЕРБУРГА',
  FEATURES_SUB:   'Единственный клуб Full Focus в историческом центре — 6 минут от Садовой, рядом с Невским проспектом. PRO ZONE на 15 мест, MAX ZONE и PS5.',
  MAP: {
    pin:   { top: '46%', left: '50%' },
    river: false,
    roads: [
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 14, color: 'rgba(177,67,133,0.22)' },
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 1.5, color: 'rgba(177,67,133,0.6)' },
      { type: 'line', x1: 0,   y1: 80,  x2: 400, y2: 68,  w: 14, color: 'rgba(0,255,182,0.15)' },
      { type: 'line', x1: 0,   y1: 80,  x2: 400, y2: 68,  w: 1.5, color: 'rgba(0,255,182,0.45)' },
      { type: 'line', x1: 190, y1: -10, x2: 205, y2: 290, w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0,   y1: 210, x2: 400, y2: 216, w: 1, color: 'rgba(102,50,250,0.35)' },
    ],
    labels: [
      { x: 20,  y: 132, text: 'УЛ. КАЗАНСКАЯ',    color: 'rgba(177,67,133,0.7)' },
      { x: 20,  y: 60,  text: 'НЕВСКИЙ ПР.',       color: 'rgba(0,255,182,0.65)' },
    ],
  },
}

const CLUB_ZONES: ClubZone[] = [
  { id: 'pro',      name: 'PRO ZONE',  accent: '#6632FA', seats: 15, priceFrom: 170,
    desc: '15 PC-мест в просторном open-space. Игровые ПК с RTX 4070 — в самом центре Петербурга.',
    specShort: 'RTX 4070 · 165Hz · 15 мест', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'max',      name: 'MAX ZONE',  accent: '#6632FA', seats: 5,  priceFrom: 190,
    desc: 'Топовые конфигурации — RTX 4080, DDR5, 27" 165Hz. Максимальная производительность.',
    specShort: 'RTX 4080 · DDR5 · 27" 165Hz', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'bootcamp', name: 'BOOTCAMP', accent: '#6632FA', seats: 5,  priceFrom: 220,
    desc: 'Командная зона на 5 мест с голосовой связью. Для командных игр и подготовки к турнирам.',
    specShort: 'RTX 4070 · 144Hz · 5 мест', image: '/assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'duo',      name: 'DUO ROOM', accent: '#6632FA', seats: 2,  priceFrom: 250,
    desc: 'Приватная комната на двоих. Тишина, своё пространство, Noblechairs.',
    specShort: 'RTX 4070 · 27" 144Hz · Noblechairs', image: '/assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'ps5',      name: 'PS5 LOUNGE', accent: '#00FFB6', seats: '4 кресла', priceFrom: 350,
    wide: true, badge: 'PS5 ЗОНА',
    desc: 'PS5 с TV 65" в самом центре города. Кооперативы, файтинги, спорт и весь каталог PlayStation 5.',
    specShort: 'PS5 · 65" TV · 4 кресла', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false },
]

const TARIFFS: ClubTariffs = {
  cols: ['1 час', '3 часа', '5 часов', 'Утро 5ч', 'Ночь 10ч'],
  popular: 1, bestValue: 4,
  rows: [
    { zone: 'PRO ZONE',  vals: [[170,190], [450,500], [650,750],  [250,300], [700,800]] },
    { zone: 'MAX ZONE',  vals: [[190,210], [550,570], [800,900],  [300,350], [800,950]] },
    { zone: 'BOOTCAMP',  vals: [[220,240], [580,600], [900,950],  [350,370], [950,990]] },
    { zone: 'DUO ROOM',  vals: [[250,270], [600,700], [950,1000], [370,420], [1200,1400]] },
    { zone: 'PS5 LOUNGE',vals: [[350,400], [850,950], [1200,1600],null,      null] },
  ],
  student: 'Школьникам и студентам Пн-Пт 10:00–16:00 — PRO ZONE от 120₽/час',
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
  max: { name: 'MAX ZONE', rows: [
    { k: 'Видеокарта', v: 'NVIDIA RTX 4080', accent: true },
    { k: 'Процессор',  v: 'Intel Core i9', accent: true },
    { k: 'RAM',        v: 'DDR5 32 GB', accent: true },
    { k: 'Монитор',    v: '27" · 165 Hz · 1 ms', accent: true },
    { k: 'Кресло',     v: 'DXRacer Master' },
    { k: 'Периферия',  v: 'Razer Pro' },
  ]},
  duo: { name: 'DUO ROOM', rows: [
    { k: 'Видеокарта', v: 'NVIDIA RTX 4070', accent: true },
    { k: 'Процессор',  v: 'Intel Core i7' },
    { k: 'RAM',        v: 'DDR4 16 GB' },
    { k: 'Монитор',    v: '27" · 144 Hz' },
    { k: 'Кресло',     v: 'Noblechairs Hero', accent: true },
    { k: 'Периферия',  v: 'Razer Pro · наушники' },
  ]},
  ps5: { name: 'PS5 LOUNGE', rows: [
    { k: 'Консоль',   v: 'Sony PlayStation 5', accent: true },
    { k: 'Экран',     v: '65" TV · 120 Hz', accent: true },
    { k: 'Звук',      v: 'Объёмный звук + сабвуфер' },
    { k: 'Геймпады',  v: 'DualSense · до 4 штук' },
    { k: 'Посадка',   v: '4 удобных кресла' },
    { k: 'Игры',      v: 'Полная библиотека PS5' },
  ]},
}

const FEATURES: Feature[] = [
  { id: 'center', size: 'big',   name: 'В ЦЕНТРЕ ПЕТЕРБУРГА',
    desc: 'Единственный клуб Full Focus в историческом центре — рядом с Невским проспектом, Казанским собором и Садовой улицей.',
    image: '/assets/club-interior.jpg', tag: 'Центр города', icon: null, note: null },
  { id: 'pro15',  size: 'wide',  name: 'PRO ZONE 15 МЕСТ',
    desc: '15 PC-мест в открытом пространстве. RTX 4070, 165Hz, DXRacer — место найдётся даже в пятницу вечером.',
    icon: 'monitor', image: null, tag: null, note: null },
  { id: 'max5',   size: 'small', name: 'MAX ZONE — RTX 4080',
    desc: '5 мест с RTX 4080 и DDR5. Топовое железо в центре города.',
    icon: 'cpu', image: null, tag: null, note: null },
  { id: 'ps5',    size: 'small', name: 'PS5 LOUNGE',
    desc: 'PS5 с TV 65". 4 кресла, кооп и весь каталог PlayStation 5.',
    icon: 'gamepad', image: null, tag: null, note: null },
  { id: 'duo',    size: 'small', name: 'DUO ROOM',
    desc: 'Приватная комната для двоих с Noblechairs и тишиной.',
    icon: 'sofa', image: null, tag: null, note: null },
  { id: 'always', size: 'small', name: '24/7 В ЦЕНТРЕ',
    desc: 'Круглосуточно в самом центре Петербурга — в любое время дня и ночи.',
    icon: 'clock', image: null, tag: null, note: null },
]

const FLOOR: FloorPlan = {
  filters: [
    { id: 'all',      name: 'ВСЕ',     match: null },
    { id: 'pro',      name: 'PRO',     match: null },
    { id: 'max',      name: 'MAX',     match: null },
    { id: 'bootcamp', name: 'BOOT',    match: null },
    { id: 'duo',      name: 'DUO',     match: null },
    { id: 'ps5',      name: 'PS5',     match: null },
  ],
  outlines: [
    { label: 'PRO ZONE',   left: '2%',  top: '10%', width: '46%', height: '38%', highlightFor: null },
    { label: 'MAX ZONE',   left: '52%', top: '10%', width: '20%', height: '38%', highlightFor: 'max' },
    { label: 'PS5 LOUNGE', left: '76%', top: '10%', width: '22%', height: '38%', highlightFor: 'ps5', accent: '#00FFB6' },
    { label: 'BOOTCAMP',   left: '2%',  top: '55%', width: '30%', height: '36%', highlightFor: null },
    { label: 'DUO ROOM',   left: '36%', top: '55%', width: '18%', height: '36%', highlightFor: 'duo' },
  ],
  zones: [
    { zone: 'pro', label: 'PRO ZONE',
      seats: Array.from({length: 15}, (_, i) => ({
        id: `pro-${i+1}`, x: 5 + (i%5) * 8, y: 20 + Math.floor(i/5) * 12,
        status: (['free','free','busy','free','free','busy','free','free','free','busy','free','free','busy','free','free'] as const)[i],
      })) },
    { zone: 'max', label: 'MAX ZONE',
      seats: Array.from({length: 5}, (_, i) => ({
        id: `max-${i+1}`, x: 56 + (i%2) * 9, y: 20 + Math.floor(i/2) * 16,
        status: (['busy','free','free','busy','free'] as const)[i],
      })) },
    { zone: 'ps5', label: 'PS5 LOUNGE',
      seats: [
        { id: 'ps5-1', x: 80, y: 22, status: 'free' },
        { id: 'ps5-2', x: 86, y: 22, status: 'busy' },
        { id: 'ps5-3', x: 80, y: 34, status: 'free' },
      ]},
    { zone: 'bootcamp', label: 'BOOTCAMP',
      seats: Array.from({length: 5}, (_, i) => ({
        id: `bc-${i+1}`, x: 6 + (i%3) * 8, y: 64 + Math.floor(i/3) * 14,
        status: (['free','busy','free','free','free'] as const)[i],
      })) },
    { zone: 'duo', label: 'DUO ROOM',
      seats: [
        { id: 'duo-1', x: 40, y: 66, status: 'busy' },
        { id: 'duo-2', x: 46, y: 66, status: 'free' },
      ]},
  ],
}

const REVIEWS: Review[] = [
  { name: 'Кирилл О.', src: 'Яндекс', stars: 5, text: 'Центр города, после прогулки по Невскому зашли — идеально. Клуб современный, всё на уровне.' },
  { name: 'Вера М.',   src: '2ГИС',   stars: 5, text: 'PRO ZONE на 15 мест — никогда нет очереди. RTX 4070 тянет всё что нужно.' },
  { name: 'Рома Л.',   src: 'Яндекс', stars: 5, text: 'MAX ZONE — в пяти минутах от Невского, а железо как в флагмане. Впечатлён.' },
  { name: 'Катя С.',   src: '2ГИС',   stars: 5, text: 'DUO ROOM с Noblechairs — лучший вариант для двоих. Тихо и уютно.' },
  { name: 'Витя Д.',   src: 'Яндекс', stars: 5, text: 'Удобно добираться из любой точки центра. Сел на метро — и уже у клуба.' },
  { name: 'Аня Б.',    src: '2ГИС',   stars: 5, text: 'PS5 LOUNGE с TV 65" — играли в Mortal Kombat, атмосфера крутая.' },
  { name: 'Федор Г.',  src: 'Яндекс', stars: 5, text: 'Bootcamp на 5 мест — взяли с командой, связь отличная, железо не подводит.' },
  { name: 'Соня П.',   src: '2ГИС',   stars: 5, text: 'Чисто, светло, приятная музыка. Персонал профессиональный, всё объяснили.' },
]

const FAQ: FAQItem[] = [
  { q: 'Сколько стоит час игры в Full Focus на Садовой?',
    a: 'PRO ZONE от 170₽/час, MAX ZONE от 190₽/час, BOOTCAMP от 220₽/час, DUO ROOM от 250₽/час, PS5 LOUNGE от 350₽/час. Студентам и школьникам — PRO ZONE от 120₽/час в будни.' },
  { q: 'Где находится Full Focus на Садовой?',
    a: 'Улица Казанская, 33, Санкт-Петербург. 6 минут пешком от метро Садовая. Рядом с Невским проспектом и Казанским собором. Координаты: 59.929° N, 30.322° E.' },
  { q: 'Это единственный клуб Full Focus в центре Петербурга?',
    a: 'Да, клуб на Казанской улице — единственный Full Focus в историческом центре Петербурга. Удобно добраться с Невского проспекта, Сенной площади и Садовой.' },
  { q: 'Работает ли Full Focus на Садовой круглосуточно?',
    a: 'Да, клуб работает 24/7 без выходных.' },
  { q: 'Есть ли MAX ZONE с RTX 4080 на Садовой?',
    a: 'Да — 5 мест с RTX 4080, DDR5 и мониторами 27" 165Hz. От 190₽/час в будни.' },
  { q: 'Есть ли PS5 в Full Focus на Садовой?',
    a: 'Да — PS5 LOUNGE с TV 65", 4 кресла. Полная библиотека PlayStation 5. От 350₽/час.' },
  { q: 'Как добраться до Full Focus на Садовой?',
    a: '6 минут пешком от метро Садовая (фиолетовая линия) или Сенная площадь по улице Казанская.' },
  { q: 'Можно ли провести корпоратив в Full Focus на Садовой?',
    a: 'Да — аренда зон или всего клуба, организация турнира, кейтеринг. В центре города удобно для любой команды. Заявка через Telegram @fullfocusclub.' },
]

const EVENTS: EventItem[] = [
  { icon: 'briefcase', name: 'КОРПОРАТИВ',
    desc: 'Аренда клуба в центре Петербурга — удобно добраться из любой точки города. PRO ZONE 15 мест + MAX ZONE + PS5.' },
  { icon: 'cake', name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'Праздник в центре города. PS5 LOUNGE или аренда нескольких зон, турнир между гостями.',
    badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР' },
  { icon: 'trophy', name: 'ЗАКРЫТЫЙ ТУРНИР',
    desc: 'Арендуй Bootcamp или MAX ZONE под командный турнир в историческом центре СПб.' },
]

export const CLUB_DATA: ClubData = {
  CLUB, CLUB_ZONES, TARIFFS, HARDWARE, FEATURES, FLOOR, REVIEWS, ALL_CLUBS, FAQ, EVENTS,
}
