import type { ClubData, ClubMeta, ClubZone, ClubTariffs, Feature, FloorPlan, Review, FAQItem, EventItem } from './types'
import { ALL_CLUBS } from './shared'

const CLUB: ClubMeta = {
  NAME: 'Технологический',
  SLUG: 'tekhnologichesky',
  ADDRESS: '3-я Красноармейская, 10',
  METRO: 'Технологический',
  METRO_COLOR: '#0066b3',
  METRO_TIME: '5 мин пешком',
  HOURS: 'Круглосуточно · 24/7',
  TELEGRAM: '@fullfocusclub',
  PHONE: '+7 (812) 660-55-96',
  MAPS_URL: 'https://yandex.com/maps/-/CPDlzCZK',
  ROUTE_URL: 'https://yandex.ru/maps/?rtext=~59.915,30.319&rtt=auto',
  COORDS: '59.915° N · 30.319° E',
  VIDEO_URL: '/assets/hero-video.mp4',
  POSTER_URL: '/assets/club-interior.jpg',
  REVIEWS_COUNT: '120+ отзывов',
  REVIEWS_COUNT_NUM: 120,
  GEO: { lat: 59.9149, lng: 30.3187 },
  MEDIA_LABEL: 'FULL FOCUS · клуб #07',
  FACTS: [
    { icon: 'bolt',   val: 'от 170 ₽/час', lbl: 'Стартовый тариф' },
    { icon: 'school', val: 'У вузов',       lbl: 'Политех, ГУАП и другие' },
    { icon: 'users',  val: '25 ПК мест',    lbl: 'PRO + MAX зоны' },
  ],
  FEATURES_TAG:   '— студенческий район',
  FEATURES_TITLE: 'ДЛЯ СТУДЕНТОВ И PRO',
  FEATURES_SUB:   'Рядом с Политехом, ГУАП и другими вузами Петербурга. PRO ZONE на 15 мест, MAX ZONE с RTX 4080 и студенческие скидки каждый будний день.',
  MAP: {
    pin:   { top: '48%', left: '48%' },
    river: false,
    roads: [
      { type: 'line', x1: 185, y1: -10, x2: 205, y2: 290, w: 14, color: 'rgba(0,102,179,0.22)' },
      { type: 'line', x1: 185, y1: -10, x2: 205, y2: 290, w: 1.5, color: 'rgba(0,102,179,0.55)' },
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0,   y1: 70,  x2: 400, y2: 58,  w: 1, color: 'rgba(102,50,250,0.35)' },
      { type: 'line', x1: 0,   y1: 210, x2: 400, y2: 216, w: 1, color: 'rgba(102,50,250,0.35)' },
    ],
    labels: [
      { x: 210, y: 36,  text: '3-Я КРАСНОАРМЕЙСКАЯ', color: 'rgba(0,102,179,0.65)' },
      { x: 20,  y: 132, text: 'МС. МОСКОВСКИЙ',       color: 'rgba(102,50,250,0.55)' },
    ],
  },
}

const CLUB_ZONES: ClubZone[] = [
  { id: 'pro',      name: 'PRO ZONE',  accent: '#6632FA', seats: 15, priceFrom: 170,
    desc: '15 PC-мест в open-space — крупнейшая зона на юге города. RTX 4070, 165Hz, DXRacer.',
    specShort: 'RTX 4070 · 165Hz · 15 мест', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'max',      name: 'MAX ZONE',  accent: '#6632FA', seats: 5,  priceFrom: 190,
    desc: 'RTX 4080, DDR5, 27" 165Hz — для самых требовательных задач и соревновательного гейминга.',
    specShort: 'RTX 4080 · DDR5 · 27" 165Hz', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'bootcamp', name: 'BOOTCAMP', accent: '#6632FA', seats: 5,  priceFrom: 220,
    desc: 'Командная зона для 5 человек с голосовой связью и стриминговым оборудованием.',
    specShort: 'RTX 4070 · 144Hz · 5 мест', image: '/assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'ps5',      name: 'PS5 LOUNGE', accent: '#00FFB6', seats: '4 кресла', priceFrom: 350,
    wide: true, badge: 'PS5 ЗОНА',
    desc: 'PlayStation 5, TV 65" и весь каталог эксклюзивов. Кооперативы и файтинги в 4 кресла — рядом с университетами.',
    specShort: 'PS5 · 65" TV · 4 кресла', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false },
]

const TARIFFS: ClubTariffs = {
  cols: ['1 час', '3 часа', '5 часов', 'Утро 5ч', 'Ночь 10ч'],
  popular: 1, bestValue: 4,
  rows: [
    { zone: 'PRO ZONE',   vals: [[170,190], [450,500], [650,750],  [250,300], [700,800]] },
    { zone: 'MAX ZONE',   vals: [[190,210], [550,570], [800,900],  [300,350], [800,950]] },
    { zone: 'BOOTCAMP',   vals: [[220,240], [580,600], [900,950],  [350,370], [950,990]] },
    { zone: 'PS5 LOUNGE', vals: [[350,400], [850,950], [1200,1600],null,      null] },
  ],
  student: 'Школьникам и студентам Пн-Пт 10:00–16:00 — PRO ZONE от 120₽/час (нужен студенческий)',
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
    { k: 'Периферия',  v: 'Razer Pro · наушники' },
  ]},
  bootcamp: { name: 'BOOTCAMP', rows: [
    { k: 'Видеокарта', v: 'NVIDIA RTX 4070', accent: true },
    { k: 'Процессор',  v: 'Intel Core i7' },
    { k: 'RAM',        v: 'DDR4 16 GB' },
    { k: 'Монитор',    v: '27" · 144 Hz' },
    { k: 'Кресло',     v: 'DXRacer' },
    { k: 'Периферия',  v: 'Razer + гарнитуры для команды' },
  ]},
  ps5: { name: 'PS5 LOUNGE', rows: [
    { k: 'Консоль',   v: 'Sony PlayStation 5', accent: true },
    { k: 'Экран',     v: '65" TV · 120 Hz', accent: true },
    { k: 'Звук',      v: 'Объёмный звук + сабвуфер' },
    { k: 'Геймпады',  v: 'DualSense · до 4 штук' },
    { k: 'Посадка',   v: '4 комфортных кресла' },
    { k: 'Игры',      v: 'Полная библиотека PS5' },
  ]},
}

const FEATURES: Feature[] = [
  { id: 'student', size: 'big',   name: 'РЯДОМ С УНИВЕРСИТЕТАМИ',
    desc: 'В 5 минутах — Политехнический, ГУАП, ИТМО и другие вузы. Студентам PRO ZONE от 120₽/час пн-пт 10:00–16:00.',
    image: '/assets/club-interior.jpg', tag: null, icon: null, note: null },
  { id: 'pro15',   size: 'wide',  name: 'PRO ZONE 15 МЕСТ',
    desc: '15 мест с RTX 4070 — места всегда хватит даже в пятницу после пар.',
    icon: 'monitor', image: null, tag: null, note: null },
  { id: 'max5',    size: 'small', name: 'MAX ZONE — RTX 4080',
    desc: '5 топовых мест с RTX 4080, DDR5 и 27" 165Hz.',
    icon: 'cpu', image: null, tag: null, note: null },
  { id: 'ps5',     size: 'small', name: 'PS5 LOUNGE',
    desc: 'PS5 + TV 65". 4 кресла, кооп и эксклюзивы.',
    icon: 'gamepad', image: null, tag: null, note: null },
  { id: 'always',  size: 'small', name: '24/7 КРУГЛОСУТОЧНО',
    desc: 'Открыто всегда — перед парами, после и среди ночи.',
    icon: 'clock', image: null, tag: null, note: null },
  { id: 'metro',   size: 'small', name: '5 МИН ОТ ТЕХНОЛОГИЧЕСКОГО',
    desc: 'Метро Технологический институт — 5 минут по 3-й Красноармейской.',
    icon: 'pin', image: null, tag: null, note: null },
]

const FLOOR: FloorPlan = {
  filters: [
    { id: 'all',      name: 'ВСЕ',  match: null },
    { id: 'pro',      name: 'PRO',  match: null },
    { id: 'max',      name: 'MAX',  match: null },
    { id: 'bootcamp', name: 'BOOT', match: null },
    { id: 'ps5',      name: 'PS5',  match: null },
  ],
  outlines: [
    { label: 'PRO ZONE',   left: '2%',  top: '10%', width: '46%', height: '40%', highlightFor: null },
    { label: 'MAX ZONE',   left: '52%', top: '10%', width: '20%', height: '40%', highlightFor: 'max' },
    { label: 'PS5 LOUNGE', left: '76%', top: '10%', width: '22%', height: '40%', highlightFor: 'ps5', accent: '#00FFB6' },
    { label: 'BOOTCAMP',   left: '2%',  top: '58%', width: '30%', height: '32%', highlightFor: null },
  ],
  zones: [
    { zone: 'pro', label: 'PRO ZONE',
      seats: Array.from({length: 15}, (_, i) => ({
        id: `pro-${i+1}`, x: 5 + (i%5) * 8, y: 20 + Math.floor(i/5) * 14,
        status: (['free','busy','free','free','free','busy','free','free','busy','free','free','free','busy','free','free'] as const)[i],
      })) },
    { zone: 'max', label: 'MAX ZONE',
      seats: Array.from({length: 5}, (_, i) => ({
        id: `max-${i+1}`, x: 56 + (i%2) * 9, y: 20 + Math.floor(i/2) * 16,
        status: (['free','busy','free','free','busy'] as const)[i],
      })) },
    { zone: 'ps5', label: 'PS5 LOUNGE',
      seats: [
        { id: 'ps5-1', x: 80, y: 22, status: 'free' },
        { id: 'ps5-2', x: 86, y: 22, status: 'free' },
        { id: 'ps5-3', x: 80, y: 34, status: 'busy' },
      ]},
    { zone: 'bootcamp', label: 'BOOTCAMP',
      seats: Array.from({length: 5}, (_, i) => ({
        id: `bc-${i+1}`, x: 6 + (i%3) * 8, y: 66 + Math.floor(i/3) * 14,
        status: (['free','free','busy','free','free'] as const)[i],
      })) },
  ],
}

const REVIEWS: Review[] = [
  { name: 'Гриша П.',  src: 'Яндекс', stars: 5, text: 'Хожу после пар в Политехе — 5 минут пешком. PRO ZONE за 120₽ в будни это отлично.' },
  { name: 'Даша Л.',   src: '2ГИС',   stars: 5, text: 'Студенческий тариф реально работает — показал студак и получил цену 120₽. Честно.' },
  { name: 'Коля М.',   src: 'Яндекс', stars: 5, text: 'MAX ZONE — RTX 4080 и DDR5. Для лабораторных по игровым движкам идеально.' },
  { name: 'Катя В.',   src: '2ГИС',   stars: 5, text: 'PS5 Lounge с большим TV — после зачётной сессии отдохнули всей группой.' },
  { name: 'Олег С.',   src: 'Яндекс', stars: 5, text: 'Bootcamp на 5 мест — взяли с командой по CS2. Связь хорошая, железо не лагает.' },
  { name: 'Маша Р.',   src: '2ГИС',   stars: 5, text: 'Ночной пакет за 700₽ — 10 часов на PRO ZONE. Ценник для студента приятный.' },
  { name: 'Тимур Н.',  src: 'Яндекс', stars: 5, text: 'Рядом с ГУАП — удобнее не придумать. Клуб современный, атмосфера без шума.' },
  { name: 'Лиза Ф.',   src: '2ГИС',   stars: 5, text: 'Персонал вежливый. Помогли выбрать зону под бюджет — взяли Bootcamp на всю команду.' },
]

const FAQ: FAQItem[] = [
  { q: 'Сколько стоит час игры в Full Focus у Технологического института?',
    a: 'PRO ZONE от 170₽/час, MAX ZONE от 190₽/час, BOOTCAMP от 220₽/час, PS5 LOUNGE от 350₽/час. Студентам — PRO ZONE от 120₽/час в будни с 10:00 до 16:00.' },
  { q: 'Где находится Full Focus у Технологического института?',
    a: '3-я Красноармейская, 10, Санкт-Петербург. 5 минут пешком от метро Технологический институт (синяя и красная линии). Координаты: 59.915° N, 30.319° E.' },
  { q: 'Есть ли скидки студентам в Full Focus на Технологическом?',
    a: 'Да. Школьники и студенты — PRO ZONE от 120₽/час в будние дни с 10:00 до 16:00 при предъявлении студенческого билета.' },
  { q: 'Какие университеты находятся рядом с Full Focus на Технологическом?',
    a: 'В 5–15 минутах ходьбы: Политехнический университет, ГУАП, ИТМО, СПбГТИ и другие технические вузы Московского района.' },
  { q: 'Работает ли Full Focus у Технологического круглосуточно?',
    a: 'Да, клуб работает 24/7 без выходных.' },
  { q: 'Есть ли MAX ZONE на Технологическом?',
    a: 'Да — 5 мест с RTX 4080, DDR5 32GB, мониторами 27" 165Hz. От 190₽/час в будни.' },
  { q: 'Есть ли PS5 в Full Focus у Технологического института?',
    a: 'Да — PS5 LOUNGE с TV 65", 4 кресла. Полная библиотека PlayStation 5. От 350₽/час.' },
  { q: 'Как добраться до Full Focus на Технологическом?',
    a: '5 минут пешком от метро Технологический институт по 3-й Красноармейской улице.' },
]

const EVENTS: EventItem[] = [
  { icon: 'briefcase', name: 'КОРПОРАТИВ / КОМАНДНОЕ МЕРОПРИЯТИЕ',
    desc: 'Аренда зон для корпоратива или командного мероприятия студенческих организаций. PRO ZONE 15 мест + Bootcamp.' },
  { icon: 'cake', name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'Праздник для своей компании. Аренда PS5 LOUNGE или нескольких зон, турнир между гостями.',
    badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР' },
  { icon: 'trophy', name: 'СТУДЕНЧЕСКИЙ ТУРНИР',
    desc: 'Межвузовский или внутренний турнир. Bootcamp или MAX ZONE, своя турнирная сетка, трансляция, призы.' },
]

export const CLUB_DATA: ClubData = {
  CLUB, CLUB_ZONES, TARIFFS, HARDWARE, FEATURES, FLOOR, REVIEWS, ALL_CLUBS, FAQ, EVENTS,
}
