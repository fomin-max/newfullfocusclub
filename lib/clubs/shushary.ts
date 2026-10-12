import type { ClubData, ClubMeta, ClubZone, ClubTariffs, Feature, FloorPlan, Review, FAQItem, EventItem } from './types'
import { ALL_CLUBS } from './shared'

// Свои фото лежат в public/clubs/shushary (CDN-ключи не работают — не через clubMedia).
// TODO(shushary): фото по зонам пока нет — в карточках зон временно фото других клубов.
const media = (rel: string) => `/clubs/shushary/${rel}`

const CLUB: ClubMeta = {
  NAME: 'Шушары',
  SLUG: 'shushary',
  ADDRESS: 'Вилеровский переулок, 6',
  HAS_METRO: false,
  LOCATION: 'в посёлке Шушары',
  METRO: 'ЖК «Юнион»',
  METRO_COLOR: '#888888',
  METRO_TIME: 'пос. Шушары · Пушкинский район',
  HOURS: 'Круглосуточно · 24/7',
  TELEGRAM: '@FullFocusShushary',
  VK: 'https://vk.ru/fullfocusclub_shushary',
  PHONE: '+7 (911) 218-16-02',
  MAPS_URL: 'https://yandex.com/maps/-/CXurvVIj',
  // TODO(shushary): добавить &ruri=…org%3Foid%3D<oid> из карточки — тогда появится кнопка «Оставить отзыв»
  ROUTE_URL: 'https://yandex.ru/maps/?rtext=~59.811180,30.364321&rtt=auto',
  COORDS: '59.811° N · 30.364° E',
  VIDEO_URL: '',
  POSTER_URL: media('hero-poster.jpg'),
  GALLERY: [1, 2, 3, 4, 5, 6].map(i => media(`gallery/0${i}.jpg`)),
  REVIEWS_COUNT: 'новый клуб',
  REVIEWS_COUNT_NUM: 0,
  GEO: { lat: 59.811180, lng: 30.364321 },
  MEDIA_LABEL: 'FULL FOCUS · НОВЫЙ КЛУБ',
  FACTS: [
    { icon: 'bolt',    val: 'от 140 ₽/час',   lbl: 'Стартовый тариф' },
    { icon: 'users',   val: '20 ПК мест',     lbl: '6 форматов — от PRO до SOLO' },
    { icon: 'gamepad', val: '3 PS5 комнаты',  lbl: 'TV 65" · до 4 человек' },
  ],
  FEATURES_TAG:   '— новый клуб сети',
  FEATURES_TITLE: 'САМЫЙ НОВЫЙ FULL FOCUS',
  FEATURES_SUB:   'Восьмой клуб сети и первый в Шушарах. Всё железо — новое: RTX 50-й серии, Ryzen 7 7800X3D в приватных комнатах и OLED 500 Гц в SOLO ROOM.',
  MAP: {
    pin:   { top: '50%', left: '50%' },
    river: false,
    roads: [
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 16, color: 'rgba(102,50,250,0.22)' },
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 1.5, color: 'rgba(102,50,250,0.55)' },
      { type: 'line', x1: 200, y1: -10, x2: 200, y2: 290, w: 1, color: 'rgba(0,255,182,0.35)' },
    ],
    labels: [
      { x: 20, y: 130, text: 'ВИЛЕРОВСКИЙ ПЕР.', color: 'rgba(102,50,250,0.65)' },
    ],
  },
}

// Цены — по прайс-листу клуба (будни Пн–Чт)
const CLUB_ZONES: ClubZone[] = [
  { id: 'pro',      name: 'PRO ZONE',    accent: '#6632FA', seats: 5, priceFrom: 140,
    desc: 'Открытая зона на 5 мест: Ryzen 5 7500F, RTX 5060 и мониторы MSI 300 Гц — всё, что нужно для рейтинга и катки с друзьями.',
    specShort: 'RTX 5060 · 24.5" 300Hz · 5 мест', image: '/clubs/komendantsky/zones/pro.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'bootcamp', name: 'BOOTCAMP',    accent: '#6632FA', seats: 5, priceFrom: 160,
    desc: 'Отдельная зона на пятёрку: RTX 5060 Ti, 300 Гц и общий голосовой — для тренировок команды и турнирных вечеров.',
    specShort: 'RTX 5060 Ti · 24.5" 300Hz · 5 мест', image: '/clubs/makhachkala/zones/bootcamp.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'quadro',   name: 'QUADRO ROOM', accent: '#6632FA', seats: 4, priceFrom: 180,
    desc: 'Закрытая комната на четверых с 2K-мониторами 320 Гц. Свой угол для сквада — никто не мешает.',
    specShort: 'RTX 5060 Ti · 27" 2K 320Hz · 4 места', image: '/clubs/makhachkala/zones/quadro.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'trio',     name: 'TRIO ROOM',   accent: '#6632FA', seats: 3, priceFrom: 200,
    desc: 'Приватная комната на троих: 2K 320 Гц, Logitech Superlight 2, беспроводные HyperX Cloud III и клавиатуры на магнитных свитчах.',
    specShort: 'RTX 5060 Ti · 27" 2K 320Hz · 3 места', image: '/clubs/makhachkala/zones/trio.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'duo',      name: 'DUO ROOM',    accent: '#6632FA', seats: 2, priceFrom: 240,
    desc: 'Комната на двоих на Ryzen 7 7800X3D и RTX 5070 — топовый процессор для игр и 2K 320 Гц.',
    specShort: 'RTX 5070 · 7800X3D · 27" 2K 320Hz', image: '/clubs/makhachkala/zones/duo.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'solo',     name: 'SOLO ROOM',   accent: '#6632FA', seats: 1, priceFrom: 290,
    desc: 'Самое мощное место клуба: RTX 5070 Ti, Ryzen 7 7800X3D и OLED-монитор MSI 500 Гц. Отдельная комната только для тебя.',
    specShort: 'RTX 5070 Ti · 27" 2K OLED 500Hz', image: '/clubs/makhachkala/zones/solo.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: true, wide: false, badge: 'ТОП МЕСТО КЛУБА' },
  { id: 'ps5',      name: 'PS5 LOUNGE',  accent: '#00FFB6', seats: 'до 4', priceFrom: 300,
    desc: 'Три одинаковые отдельные комнаты с дверью: PS5, TV 65" и диван. Для кооператива, файтингов и FIFA своей компанией до 4 человек.',
    specShort: 'PS5 · TV 65" · 3 комнаты с дверью', image: '/clubs/makhachkala/zones/ps5.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: true },
]

// Фолбэк, если Langame недоступен. Источник: прайс-лист клуба.
// Будни = Пн–Чт, выходные = Пт–Вс. Утро 09:00–14:00, ночь 23:00–09:00.
const TARIFFS: ClubTariffs = {
  cols: ['1 час', '3 часа', '5 часов', 'Утро 5ч', 'Ночь 10ч'],
  popular: 1, bestValue: 4,
  rows: [
    { zone: 'PRO ZONE',    vals: [[140,160], [400,450],  [600,700],   [350,400], [650,750]] },
    { zone: 'BOOTCAMP',    vals: [[160,180], [450,500],  [700,750],   [400,450], [750,850]] },
    { zone: 'QUADRO ROOM', vals: [[180,200], [500,550],  [750,850],   [450,500], [800,900]] },
    { zone: 'TRIO ROOM',   vals: [[200,220], [550,600],  [850,950],   [500,550], [900,1000]] },
    { zone: 'DUO ROOM',    vals: [[240,270], [650,750],  [1050,1150], [600,700], [1100,1200]] },
    { zone: 'SOLO ROOM',   vals: [[290,330], [800,900],  [1250,1400], [750,850], [1300,1500]] },
    { zone: 'PS5 LOUNGE',  vals: [[300,350], [750,900],  [1200,1400], null,      null] },
  ],
  student: 'Школьникам и студентам Пн-Пт 10:00–16:00 — PRO ZONE от 120₽/час',
}

const PERIPH_BASE = [
  { k: 'Мышка',      v: 'ATK A9 Ultimate' },
  { k: 'Наушники',   v: 'HyperX Cloud II' },
  { k: 'Кресло',     v: 'Knight Gladiator' },
  { k: 'Клавиатура', v: 'Dark Project Arena' },
]
const PERIPH_ROOMS = [
  { k: 'Мышка',      v: 'Logitech Superlight 2', accent: true },
  { k: 'Наушники',   v: 'HyperX Cloud III Wireless' },
  { k: 'Кресло',     v: 'Knight Gladiator' },
  { k: 'Клавиатура', v: 'Attack Shark R85 HE' },
]

// Источник: инфографика «Железо и периферия · Вилеровский переулок, 6»
const HARDWARE: ClubData['HARDWARE'] = {
  pro: { name: 'PRO ZONE', rows: [
    { k: 'Видеокарта', v: 'NVIDIA GeForce RTX 5060', accent: true },
    { k: 'Процессор',  v: 'AMD Ryzen 5 7500F' },
    { k: 'Монитор',    v: 'MSI MAG 24.5" · 300 Hz', accent: true },
    ...PERIPH_BASE,
  ]},
  bootcamp: { name: 'BOOTCAMP', rows: [
    { k: 'Видеокарта', v: 'NVIDIA GeForce RTX 5060 Ti', accent: true },
    { k: 'Процессор',  v: 'AMD Ryzen 5 7500F' },
    { k: 'Монитор',    v: 'MSI MAG 24.5" · 300 Hz', accent: true },
    ...PERIPH_BASE,
  ]},
  quadro: { name: 'QUADRO ROOM', rows: [
    { k: 'Видеокарта', v: 'NVIDIA GeForce RTX 5060 Ti', accent: true },
    { k: 'Процессор',  v: 'AMD Ryzen 5 7500F' },
    { k: 'Монитор',    v: 'MSI MAG 27" 2K · 320 Hz', accent: true },
    ...PERIPH_BASE,
  ]},
  trio: { name: 'TRIO ROOM', rows: [
    { k: 'Видеокарта', v: 'NVIDIA GeForce RTX 5060 Ti', accent: true },
    { k: 'Процессор',  v: 'AMD Ryzen 5 7500F' },
    { k: 'Монитор',    v: 'MSI MAG 27" 2K · 320 Hz', accent: true },
    ...PERIPH_ROOMS,
  ]},
  duo: { name: 'DUO ROOM', rows: [
    { k: 'Видеокарта', v: 'NVIDIA GeForce RTX 5070', accent: true },
    { k: 'Процессор',  v: 'AMD Ryzen 7 7800X3D', accent: true },
    { k: 'Монитор',    v: 'MSI MAG 27" 2K · 320 Hz', accent: true },
    ...PERIPH_ROOMS,
  ]},
  solo: { name: 'SOLO ROOM', rows: [
    { k: 'Видеокарта', v: 'NVIDIA GeForce RTX 5070 Ti', accent: true },
    { k: 'Процессор',  v: 'AMD Ryzen 7 7800X3D', accent: true },
    { k: 'Монитор',    v: 'MSI MAG 27" 2K OLED · 500 Hz', accent: true },
    { k: 'Мышка',      v: 'Logitech Superstrike', accent: true },
    { k: 'Наушники',   v: 'HyperX Cloud III Wireless' },
    { k: 'Кресло',     v: 'Knight Gladiator' },
    { k: 'Клавиатура', v: 'Attack Shark R85 HE' },
  ]},
  ps5: { name: 'PS5 LOUNGE', rows: [
    { k: 'Консоль',    v: 'Sony PlayStation 5', accent: true },
    { k: 'Экран',      v: 'TV 65"', accent: true },
    { k: 'Геймпады',   v: 'DualSense · 2 штуки' },
    { k: 'Посадка',    v: 'Диван · отдельная комната с дверью' },
    { k: 'Игры',       v: 'Библиотека PS5' },
  ]},
}

const FEATURES: Feature[] = [
  { id: 'new',     size: 'big',   name: 'ВСЁ ЖЕЛЕЗО — НОВОЕ',
    desc: 'Клуб только открылся: видеокарты RTX 50-й серии во всех зонах, процессоры Ryzen, мониторы MSI от 300 Гц.',
    image: null, tag: 'Новый клуб', icon: 'cpu', note: null },
  { id: 'oled',    size: 'wide',  name: 'OLED 500 ГЦ В SOLO ROOM',
    desc: 'RTX 5070 Ti, Ryzen 7 7800X3D и OLED-монитор MSI 27" 2K 500 Гц — самое быстрое место в клубе.',
    icon: 'bolt', image: null, tag: null, note: null },
  { id: 'rooms',   size: 'small', name: 'SOLO · DUO · TRIO · QUADRO',
    desc: 'Четыре формата закрытых комнат — на 1, 2, 3 и 4 игроков.',
    icon: 'sofa', image: null, tag: null, note: null },
  { id: 'ps5',     size: 'small', name: 'PS5 В ОТДЕЛЬНЫХ КОМНАТАХ',
    desc: 'Три комнаты с дверью: TV 65", диван и PlayStation 5 — для компании до 4 человек.',
    icon: 'gamepad', image: null, tag: null, note: null },
  { id: 'always',  size: 'small', name: 'КРУГЛОСУТОЧНО 24/7',
    desc: 'Клуб работает без выходных — приходи в любое время суток.',
    icon: 'clock', image: null, tag: null, note: null },
  { id: 'local',   size: 'small', name: 'РЯДОМ С ДОМОМ',
    desc: 'Первый Full Focus в Шушарах — больше не нужно ехать в город, чтобы поиграть на топовом железе.',
    icon: 'pin', image: null, tag: null, note: null },
]

// Схема для режима без Langame (live-места появятся после подключения клуба)
const FLOOR: FloorPlan = {
  filters: [
    { id: 'all',      name: 'ВСЕ',     match: null },
    { id: 'pro',      name: 'PRO',     match: null },
    { id: 'bootcamp', name: 'BOOT',    match: null },
    { id: 'rooms',    name: 'КОМНАТЫ', match: ['quadro','trio','duo','solo'] },
    { id: 'lounge',   name: 'PS5',     match: ['ps5'] },
  ],
  outlines: [
    { label: 'PRO ZONE',        left: '2%',  top: '8%',  width: '40%', height: '26%', highlightFor: null },
    { label: 'BOOTCAMP',        left: '2%',  top: '38%', width: '40%', height: '24%', highlightFor: null },
    { label: 'QUADRO ROOM',     left: '2%',  top: '66%', width: '40%', height: '26%', highlightFor: 'rooms' },
    { label: 'PS5 LOUNGE ×3',    left: '46%', top: '8%',  width: '52%', height: '24%', highlightFor: 'lounge', accent: '#00FFB6' },
    { label: 'DUO / SOLO',      left: '74%', top: '36%', width: '24%', height: '26%', highlightFor: 'rooms' },
    { label: 'TRIO ROOM',       left: '46%', top: '66%', width: '30%', height: '26%', highlightFor: 'rooms' },
  ],
  zones: [],
}

// Новый клуб — реальных отзывов пока нет, секция скрыта. Не придумывать.
const REVIEWS: Review[] = []

const FAQ: FAQItem[] = [
  { q: 'Сколько стоит час игры в Full Focus Шушары?',
    a: 'PRO ZONE от 140₽/час, BOOTCAMP от 160₽/час, QUADRO ROOM от 180₽/час, TRIO ROOM от 200₽/час, DUO ROOM от 240₽/час, SOLO ROOM от 290₽/час, PS5 LOUNGE от 300₽/час (цены Пн–Чт, в Пт–Вс немного выше). Ночь 10 часов (23:00–09:00) в PRO ZONE — от 650₽. Школьники и студенты — PRO ZONE от 120₽/час в будни с 10:00 до 16:00.' },
  { q: 'Где находится Full Focus в Шушарах?',
    a: 'Вилеровский переулок, 6, ЖК «Юнион», посёлок Шушары (Пушкинский район Санкт-Петербурга). Метро рядом нет — удобнее всего добраться пешком из жилых кварталов Шушар, на машине или такси.' },
  { q: 'Какое железо в Full Focus Шушары?',
    a: 'Во всех зонах — видеокарты NVIDIA RTX 50-й серии: RTX 5060 в PRO ZONE, RTX 5060 Ti в BOOTCAMP, QUADRO и TRIO, RTX 5070 в DUO ROOM и RTX 5070 Ti в SOLO ROOM. Процессоры AMD Ryzen 5 7500F и Ryzen 7 7800X3D, мониторы MSI от 300 до 500 Гц.' },
  { q: 'Сколько мест в клубе?',
    a: '20 игровых ПК: PRO ZONE на 5 мест, BOOTCAMP на 5 мест, QUADRO ROOM на 4, TRIO ROOM на 3, DUO ROOM на 2 и SOLO ROOM на 1 место. Плюс отдельные комнаты с PS5.' },
  { q: 'Есть ли PS5 в Full Focus Шушары?',
    a: 'Да. PS5 LOUNGE — три одинаковые отдельные комнаты с дверью: PlayStation 5, TV 65", диван и 2 геймпада. Каждая — для компании до 4 человек, от 300₽/час.' },
  { q: 'Работает ли клуб круглосуточно?',
    a: 'Да, Full Focus Шушары работает 24/7 без выходных.' },
  { q: 'Действует ли программа лояльности сети в Шушарах?',
    a: 'Да, баллы и уровень лояльности едины для всех 8 клубов Full Focus — в Шушарах, остальных клубах Санкт-Петербурга и в Махачкале.' },
  { q: 'Можно ли провести день рождения или корпоратив в Шушарах?',
    a: 'Да — аренда комнат или всего клуба, турнир между гостями, PS5-комнаты для компании. Заявка через сайт или Telegram @FullFocusShushary.' },
  { q: 'Какие правила посещения Full Focus Шушары?',
    a: 'Единые правила действуют во всех клубах сети — они опубликованы на fullfocusclub.ru/rules: бронирование и оплата, посещение несовершеннолетними, права и обязанности гостя, запреты и порядок урегулирования споров. Оформляя бронь или начиная сессию за ПК, гость подтверждает согласие с правилами и прайс-листом.',
    links: [{ text: 'fullfocusclub.ru/rules', href: '/rules' }] },
]

const EVENTS: EventItem[] = [
  { icon: 'briefcase', name: 'КОРПОРАТИВ',
    desc: 'Аренда клуба или отдельных зон. PRO ZONE и BOOTCAMP — 10 мест для командных мероприятий, плюс приватные комнаты.' },
  { icon: 'cake', name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'PS5 LOUNGE или комната на свою компанию. Турнир между гостями, подарки, атмосфера.',
    badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР' },
  { icon: 'trophy', name: 'ЗАКРЫТЫЙ ТУРНИР',
    desc: 'BOOTCAMP на 5 мест для командного турнира 5×5 или QUADRO ROOM для 2×2. Своя сетка, призы.' },
]

export const CLUB_DATA: ClubData = {
  CLUB, CLUB_ZONES, TARIFFS, HARDWARE, FEATURES, FLOOR, REVIEWS, ALL_CLUBS, FAQ, EVENTS,
}
