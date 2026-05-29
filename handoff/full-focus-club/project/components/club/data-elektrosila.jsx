/* data-elektrosila.jsx — Электросила club template variables.
   Same template as Vasileostrovskaya (data.jsx); only CLUB.* / data
   arrays change. A compact club with no ARENA, kitchen, billiard or
   Yamaguchi chair — instead two themed PS5 lounges (Green / Space). */

const CLUB = {
  NAME: 'Электросила',
  SLUG: 'elektrosila',
  ADDRESS: 'Московский проспект, 149А',
  METRO: 'Электросила',
  METRO_COLOR: '#0066b3',          // line 2 — blue
  METRO_TIME: '3 мин пешком',
  HOURS: 'Круглосуточно · 24/7',
  TELEGRAM: '@fullfocusclub',
  PHONE: '+7 (812) 660-55-96',
  MAPS_URL: 'https://yandex.com/maps/-/CPDl7Z7l',
  ROUTE_URL: 'https://yandex.ru/maps/?rtext=~59.876,30.318&rtt=auto',
  COORDS: '59.876° N · 30.318° E',
  VIDEO_URL: 'assets/hero-video.mp4',
  POSTER_URL: 'assets/club-interior.jpg',

  // Hero
  MEDIA_LABEL: 'FULL FOCUS · клуб #02',
  FACTS: [
    { icon: 'bolt',    val: 'от 170 ₽/час', lbl: 'Стартовый тариф' },
    { icon: 'gamepad', val: '5 зон',        lbl: 'Форматов под любую сессию' },
    { icon: 'leaf',    val: '2 лаунжа',     lbl: 'Green Room и Space Room' },
  ],

  // §3 Zones tag
  ZONES_TAG: '— 5 форматов',

  // §6 Features section header
  FEATURES_TAG:   '— чем мы особенные',
  FEATURES_TITLE: 'ЧЕМ МЫ ОСОБЕННЫЕ',
  FEATURES_SUB:   'Две тематические зоны, которых нет в других клубах сети.',

  // §8 Reviews
  REVIEWS_TITLE: 'ОТЗЫВЫ ИЗ ЯНДЕКСА И 2ГИС',
  REVIEWS_COUNT: '180+ отзывов',

  // §10 Map sketch — Московский проспект, no river
  MAP: {
    pin: { top: '50%', left: '50%' },
    river: false,
    roads: [
      // Московский пр. — the main avenue (mint), runs vertically
      { x1: 196, y1: -10, x2: 214, y2: 290, w: 16, color: 'rgba(0,255,182,0.22)' },
      { x1: 196, y1: -10, x2: 214, y2: 290, w: 1.5, color: 'rgba(0,255,182,0.5)' },
      // cross streets (purple)
      { x1: 0, y1: 72,  x2: 400, y2: 60,  w: 1, color: 'rgba(102,50,250,0.35)' },
      { x1: 0, y1: 150, x2: 400, y2: 134, w: 1, color: 'rgba(102,50,250,0.35)' },
      { x1: 0, y1: 222, x2: 400, y2: 208, w: 1, color: 'rgba(102,50,250,0.35)' },
    ],
    labels: [
      { x: 220, y: 36,  text: 'МОСКОВСКИЙ ПР.',  color: 'rgba(0,255,182,0.55)' },
      { x: 26,  y: 128, text: 'ул. Решетникова', color: 'rgba(102,50,250,0.55)' },
    ],
  },
};

/* Master list of network clubs — drives §10 «Другие клубы сети». */
const ALL_CLUBS = [
  { slug: 'vasilyeostrovsky', name: 'Василеостровская', metro: 'Василеостровская', color: '#bf9e4d', addr: 'Бугский пер., 3' },
  { slug: 'elektrosila',      name: 'Электросила',      metro: 'Электросила',      color: '#0066b3', addr: 'Московский пр., 149А' },
  { slug: 'komendantsky',     name: 'Комендантский',    metro: 'Комендантский',    color: '#8bc34a', addr: 'Комендантский пр., 17' },
  { slug: 'prosvescheniya',   name: 'Просвещения',      metro: 'Просвещения',      color: '#c12a2c', addr: 'пр. Луначарского, 78' },
  { slug: 'begovaya',         name: 'Беговая',          metro: 'Беговая',          color: '#a3df95', addr: 'Туристская ул., 26' },
  { slug: 'sadovaya',         name: 'Садовая',          metro: 'Сенная',           color: '#b14385', addr: 'Садовая ул., 38' },
  { slug: 'tehnolog',         name: 'Технологический',  metro: 'Технологический',  color: '#0066b3', addr: 'Загородный пр., 24' },
  { slug: 'mahachkala',       name: 'Махачкала',        metro: 'центр',            color: '#6632FA', addr: 'ул. Ярагского, 65' },
];

/* ============================================================
   ZONES — §3 horizontal-scroll cards (5 zones)
   ============================================================ */
const CLUB_ZONES = [
  {
    id: 'pro',
    name: 'PRO ZONE',
    accent: '#6632FA',
    seats: 11,
    priceFrom: 170,
    desc: 'Просторная open-space зона на 11 мест. Игровые ПК следующего поколения и эргономика для длинных сессий.',
    specShort: 'RTX 4070 · 24" 165Hz',
    image: 'assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ',
  },
  {
    id: 'max',
    name: 'MAX ZONE',
    accent: '#6632FA',
    seats: 7,
    priceFrom: 190,
    desc: 'Улучшенные ПК — RTX 4080, DDR5, 27" 165Hz. Для требовательных игроков, которым нужен максимум.',
    specShort: 'RTX 4080 · DDR5 · 27" 165Hz',
    image: 'assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ',
  },
  {
    id: 'duo',
    name: 'DUO ROOM',
    accent: '#6632FA',
    seats: 2,
    priceFrom: 300,
    desc: 'Приватная комната на двоих. Тишина, своё пространство, кресла Noblechairs.',
    specShort: 'RTX 4070 · 27" 144Hz · Noblechairs',
    image: 'assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ',
  },
  {
    id: 'green',
    name: 'GREEN ROOM',
    accent: '#22C55E',
    seats: '2–3',
    priceFrom: 380,
    wide: true,
    badge: 'PS5 ЗОНА',
    desc: 'Открытая зона с TV 65" и PS5. It Takes Two, UFC 5, EA Sports FC и другие — идеально для небольшой компании.',
    specShort: 'PS5 · TV 65" · зелёная подсветка',
    image: 'assets/club-interior.jpg',
    games: ['MK 11', 'UFC 5', 'NHL 23', 'EA Sports FC 26', 'It Takes Two', 'A Way Out'],
    cta: 'ЗАБРОНИРОВАТЬ',
  },
  {
    id: 'space',
    name: 'SPACE ROOM',
    accent: '#7C3AED',
    seats: 'до 6',
    priceFrom: 520,
    wide: true,
    badge: 'PS5 ЗОНА · ДО 6 ЧЕЛОВЕК',
    desc: 'Закрытая комната, TV 65" 120Hz, космическая атмосфера. 14 игр — Detroit, Mafia, COD, NBA и кооп на весь вечер.',
    specShort: 'PS5 · TV 65" 120Hz · до 6 человек',
    image: 'assets/club-background.jpg',
    games: ['UFC 5', 'MK 11', 'MK 1', 'NBA 2K23', 'Detroit: Become Human',
            'Mafia: Definitive Edition', 'Injustice 2', 'COD: Black Ops 3',
            'Star Wars Battlefront 2', 'Unravel', 'Unravel 2',
            'It Takes Two', 'A Way Out', 'EA Sports FC 26'],
    cta: 'ЗАБРОНИРОВАТЬ',
  },
];

/* ============================================================
   TARIFFS — §5 interactive table  [weekday, weekend] in ₽
   ============================================================ */
const TARIFFS = {
  cols: ['1 час', '3 часа', '5 часов', 'Утро 5ч', 'Ночь 10ч'],
  popular: 1,          // «3 часа» → POPULAR badge
  bestValue: 4,        // «Ночь 10ч» → row badge
  rows: [
    { zone: 'PRO ZONE',   vals: [[170,190], [480,530],  [750,850],   [450,500], [850,950]] },
    { zone: 'MAX ZONE',   vals: [[190,210], [530,580],  [850,950],   [500,550], [950,1050]] },
    { zone: 'DUO ROOM',   vals: [[300,350], [850,950],  [1300,1450], [800,900], [1550,1750]] },
    { zone: 'GREEN ROOM', vals: [[380,420], [950,1100], [1400,1600], null,      null] },
    { zone: 'SPACE ROOM', vals: [[520,580], [1350,1500],[2000,2300], null,      null] },
  ],
  student: '🎓  Школьникам и студентам Пн-Пт 10:00–16:00 — PRO ZONE от 120₽/час',
};

/* ============================================================
   HARDWARE — §4 tabs (PRO · MAX · DUO · LOUNGE)
   ============================================================ */
const HARDWARE = {
  pro: {
    name: 'PRO ZONE',
    rows: [
      { k: 'Видеокарта', v: 'NVIDIA RTX 4070',              accent: true },
      { k: 'Процессор',  v: 'Intel Core i7' },
      { k: 'RAM',        v: 'DDR4 16 GB' },
      { k: 'Монитор',    v: '24" · 165 Hz · 1 ms',          accent: true },
      { k: 'Кресло',     v: 'DXRacer Master' },
      { k: 'Периферия',  v: 'Razer / Logitech G' },
    ],
  },
  max: {
    name: 'MAX ZONE',
    rows: [
      { k: 'Видеокарта', v: 'NVIDIA RTX 4080',              accent: true },
      { k: 'Процессор',  v: 'Intel Core i9',                accent: true },
      { k: 'RAM',        v: 'DDR5 32 GB',                   accent: true },
      { k: 'Монитор',    v: '27" · 165 Hz · 1 ms',          accent: true },
      { k: 'Кресло',     v: 'DXRacer Master' },
      { k: 'Периферия',  v: 'Razer Pro · наушники' },
    ],
  },
  duo: {
    name: 'DUO ROOM',
    rows: [
      { k: 'Видеокарта', v: 'NVIDIA RTX 4070',              accent: true },
      { k: 'Процессор',  v: 'Intel Core i7' },
      { k: 'RAM',        v: 'DDR4 16 GB' },
      { k: 'Монитор',    v: '27" · 144 Hz' },
      { k: 'Кресло',     v: 'Noblechairs Hero',             accent: true },
      { k: 'Периферия',  v: 'Razer Pro · наушники Sennheiser' },
    ],
  },
  lounge: {
    name: 'LOUNGE · GREEN / SPACE',
    rows: [
      { k: 'Консоль',    v: 'Sony PlayStation 5',           accent: true },
      { k: 'Экран',      v: '65" TV · 120 Hz',              accent: true },
      { k: 'ПК зоны',    v: '2× RTX 4080 / 4070' },
      { k: 'Звук',       v: 'Объёмный звук + сабвуфер' },
      { k: 'Геймпады',   v: 'DualSense · до 6 штук' },
      { k: 'Игры',       v: 'Green — 6 · Space — 14',       accent: true },
    ],
  },
};

/* ============================================================
   UNIQUE FEATURES — §6 bento «ЧЕМ МЫ ОСОБЕННЫЕ»
   ============================================================ */
const FEATURES = [
  { id: 'green',  size: 'big',  name: 'GREEN ROOM LOUNGE',
    desc: 'Открытая зона с TV 65", PS5 и двумя ПК. It Takes Two, UFC 5, EA Sports FC — кооп для небольшой компании.',
    image: 'assets/club-interior.jpg',
    tag: 'PS5 зона' },
  { id: 'space',  size: 'wide', name: 'SPACE ROOM LOUNGE',
    desc: 'Закрытая комната, TV 65" 120Hz, космическая атмосфера. 14 игр и кооп на весь вечер — до 6 человек.',
    image: 'assets/club-background.jpg' },
  { id: 'max',    size: 'small', name: 'MAX ZONE',
    desc: 'RTX 4080, DDR5, 27" 165Hz — для требовательных игроков.',
    icon: 'cpu' },
  { id: 'duo',    size: 'small', name: 'DUO ROOM',
    desc: 'Тишина и приватность. Комната на двоих с креслами Noblechairs.',
    icon: 'sofa' },
  { id: 'always', size: 'small', name: 'КРУГЛОСУТОЧНО 24/7',
    desc: 'Открыто всегда — заходи в любое время дня и ночи.',
    icon: 'clock' },
  { id: 'metro',  size: 'small', name: '3 МИНУТЫ ОТ МЕТРО',
    desc: 'Электросила — 3 минуты пешком от выхода из метро.',
    icon: 'mapPin' },
];

/* ============================================================
   EVENTS — §7 (no ARENA → «ЗАКРЫТЫЙ ТУРНИР» без бейджа «ТОЛЬКО ЗДЕСЬ»)
   ============================================================ */
const EVENTS = [
  {
    icon: 'briefcase',
    name: 'КОРПОРАТИВ',
    desc: 'Аренда клуба или отдельных зон. Кейтеринг, ведущий, кастомные награды, прямой эфир турнира между отделами.',
  },
  {
    icon: 'cake',
    name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'Закажи зону или весь клуб для своей компании. Атмосфера, турнир между гостями, подарки.',
    badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР',
  },
  {
    icon: 'trophy',
    name: 'ЗАКРЫТЫЙ ТУРНИР',
    desc: 'Арендуй зону под командный турнир. Своя сетка, трансляция на TV 65", призы для победителей.',
  },
];

/* ============================================================
   LIVE SEATS — §2 floor plan (mock data)
   ============================================================ */
const FLOOR = {
  filters: [
    { id: 'all',    name: 'ВСЕ' },
    { id: 'pro',    name: 'PRO' },
    { id: 'max',    name: 'MAX' },
    { id: 'duo',    name: 'DUO' },
    { id: 'lounge', name: 'LOUNGE', match: ['green', 'space'] },
  ],
  outlines: [
    { label: 'PRO ZONE',   left: '4%',  top: '14%', width: '44%', height: '40%' },
    { label: 'MAX ZONE',   left: '52%', top: '12%', width: '44%', height: '30%', highlightFor: 'max' },
    { label: 'DUO ROOM',   left: '4%',  top: '60%', width: '18%', height: '28%' },
    { label: 'GREEN ROOM', left: '24%', top: '60%', width: '28%', height: '28%', highlightFor: 'lounge', accent: '#22C55E' },
    { label: 'SPACE ROOM', left: '56%', top: '50%', width: '40%', height: '38%', highlightFor: 'lounge', accent: '#7C3AED' },
  ],
  zones: [
    // PRO ZONE — 11 seats, two rows on the left
    { zone: 'pro', label: 'PRO ZONE',
      seats: Array.from({ length: 11 }, (_, i) => ({
        id: `pro-${i+1}`, x: 9 + (i%6) * 6.6, y: 26 + Math.floor(i/6) * 16,
        status: ['free','busy','free','free','busy','free','busy','free','free','busy','free'][i],
      })) },
    // MAX ZONE — 7 seats, top-right
    { zone: 'max', label: 'MAX ZONE',
      seats: Array.from({ length: 7 }, (_, i) => ({
        id: `max-${i+1}`, x: 57 + (i%4) * 9, y: 22 + Math.floor(i/4) * 12,
        status: ['busy','free','busy','free','free','busy','free'][i],
      })) },
    // DUO ROOM — 2 seats, bottom-left
    { zone: 'duo', label: 'DUO ROOM',
      seats: [
        { id: 'duo-1', x: 9,  y: 74, status: 'busy' },
        { id: 'duo-2', x: 16, y: 74, status: 'free' },
      ] },
    // GREEN ROOM — 3 lounge markers
    { zone: 'green', label: 'GREEN ROOM',
      seats: [
        { id: 'green-1', x: 30, y: 74, status: 'free' },
        { id: 'green-2', x: 37, y: 74, status: 'free' },
        { id: 'green-3', x: 44, y: 74, status: 'busy' },
      ] },
    // SPACE ROOM — 6 markers
    { zone: 'space', label: 'SPACE ROOM',
      seats: Array.from({ length: 6 }, (_, i) => ({
        id: `space-${i+1}`, x: 62 + (i%3) * 10, y: 62 + Math.floor(i/3) * 16,
        status: ['free','busy','free','busy','off','free'][i],
      })) },
  ],
};

/* ============================================================
   REVIEWS — §8 marquee (adapted for Электросила)
   ============================================================ */
const REVIEWS = [
  { name: 'Андрей К.', src: 'Яндекс', stars: 5,
    text: 'Две тематические комнаты — это что-то особенное, нигде такого нет.' },
  { name: 'Мария В.',  src: '2ГИС',   stars: 5,
    text: 'MAX ZONE — разница с обычными клубами сразу чувствуется.' },
  { name: 'Иван П.',   src: 'Яндекс', stars: 5,
    text: '3 минуты от метро, зашёл после работы — просто и удобно.' },
  { name: 'Дарья С.',  src: '2ГИС',   stars: 5,
    text: 'DUO ROOM тихая, никто не мешает, своя атмосфера.' },
  { name: 'Кирилл М.', src: 'Яндекс', stars: 5,
    text: 'Space Room на шестерых — сыграли в COD всю ночь, незабываемо.' },
  { name: 'Полина Р.', src: '2ГИС',   stars: 5,
    text: 'It Takes Two в Green Room — лучший вечер с девушкой.' },
];

window.CLUB_DATA = { CLUB, ALL_CLUBS, CLUB_ZONES, TARIFFS, HARDWARE, FEATURES, EVENTS, FLOOR, REVIEWS };
