import type { ClubData, ClubMeta, ClubZone, ClubTariffs, Feature, FloorPlan, Review, FAQItem, EventItem } from './types'
import { ALL_CLUBS } from './shared'

const CLUB: ClubMeta = {
  NAME: 'Махачкала',
  SLUG: 'makhachkala',
  ADDRESS: 'Улица Манташева, 107Б',
  METRO: 'Центр города',
  METRO_COLOR: '#6632FA',
  METRO_TIME: 'Центр Махачкалы',
  HOURS: 'Круглосуточно · 24/7',
  TELEGRAM: '@fullfocusclub',
  PHONE: '+7 (812) 660-55-96',
  MAPS_URL: 'https://yandex.com/maps/-/CPDl7Lo3',
  ROUTE_URL: 'https://yandex.ru/maps/?rtext=~42.986,47.504&rtt=auto',
  COORDS: '42.986° N · 47.504° E',
  VIDEO_URL: '/assets/hero-video.mp4',
  POSTER_URL: '/assets/club-interior.jpg',
  REVIEWS_COUNT: '100+ отзывов',
  REVIEWS_COUNT_NUM: 100,
  GEO: { lat: 42.9857, lng: 47.5042 },
  MEDIA_LABEL: 'FULL FOCUS · клуб #08',
  FACTS: [
    { icon: 'bolt',    val: 'от 170 ₽/час', lbl: 'Стартовый тариф' },
    { icon: 'gamepad', val: '7 зон',         lbl: 'Включая QUADRO ROOM' },
    { icon: 'pin',     val: 'Центр',         lbl: 'Единственный FF в Дагестане' },
  ],
  FEATURES_TAG:   '— единственный в Дагестане',
  FEATURES_TITLE: 'FULL FOCUS В МАХАЧКАЛЕ',
  FEATURES_SUB:   'Единственный клуб сети за пределами Санкт-Петербурга. Все стандарты Full Focus, уникальный QUADRO ROOM и два PS5 лаунжа в центре Махачкалы.',
  MAP: {
    pin:   { top: '50%', left: '50%' },
    river: false,
    roads: [
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 16, color: 'rgba(102,50,250,0.22)' },
      { type: 'line', x1: -10, y1: 140, x2: 410, y2: 140, w: 1.5, color: 'rgba(102,50,250,0.55)' },
      { type: 'line', x1: 190, y1: -10, x2: 210, y2: 290, w: 1, color: 'rgba(0,255,182,0.35)' },
      { type: 'line', x1: 0,   y1: 68,  x2: 400, y2: 55,  w: 1, color: 'rgba(0,255,182,0.35)' },
      { type: 'line', x1: 0,   y1: 215, x2: 400, y2: 222, w: 1, color: 'rgba(0,255,182,0.35)' },
    ],
    labels: [
      { x: 20,  y: 132, text: 'УЛ. МАНТАШЕВА',  color: 'rgba(102,50,250,0.65)' },
      { x: 215, y: 42,  text: 'ПР. ШАМИЛЯ',     color: 'rgba(0,255,182,0.55)' },
    ],
  },
}

const CLUB_ZONES: ClubZone[] = [
  { id: 'bootcamp', name: 'BOOTCAMP ×2', accent: '#6632FA', seats: '5+5', priceFrom: 170,
    wide: true, badge: '2 ЗОНЫ ПО 5 МЕСТ',
    desc: 'Два отдельных BOOTCAMP по 5 мест каждый. Командные игры, голосовая связь, подготовка к турнирам.',
    specShort: 'RTX 4070 · 144Hz · 2×5 мест', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false },
  { id: 'quadro',   name: 'QUADRO ROOM', accent: '#6632FA', seats: 4, priceFrom: 200,
    desc: 'Уникальная зона на 4 места — нигде в сети Full Focus нет такого формата. Для компании из четырёх игроков.',
    specShort: 'RTX 4080 · 27" 165Hz · 4 места', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'trio',     name: 'TRIO ROOM',  accent: '#6632FA', seats: 3, priceFrom: 260,
    desc: 'Приватная комната на троих. Noblechairs, тишина, RTX 4070.',
    specShort: 'RTX 4070 · 27" 144Hz · Noblechairs', image: '/assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'duo',      name: 'DUO ROOM',  accent: '#6632FA', seats: 2, priceFrom: 280,
    desc: 'Приватная комната на двоих. Noblechairs, приглушённый свет.',
    specShort: 'RTX 4070 · 27" 144Hz · Noblechairs', image: '/assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'solo',     name: 'SOLO ROOM', accent: '#6632FA', seats: 1, priceFrom: 320,
    desc: 'Полная изоляция, RTX 4080, Noblechairs — идеал для ранкеда.',
    specShort: 'RTX 4080 · 27" 165Hz · Noblechairs', image: '/assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'ps5',      name: 'PS5 LOUNGE',    accent: '#00FFB6', seats: '4 кресла', priceFrom: 350,
    desc: 'PS5 с большим TV. Кооперативы, файтинги и весь каталог PlayStation 5.',
    specShort: 'PS5 · TV · 4 кресла', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
  { id: 'ps5vip',   name: 'PS5 VIP LOUNGE', accent: '#00FFB6', seats: 'до 6', priceFrom: 400,
    desc: 'Закрытая комната с TV и PS5 — для своей компании до 6 человек.',
    specShort: 'PS5 · TV · отдельная комната', image: '/assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ', flagship: false, wide: false },
]

const TARIFFS: ClubTariffs = {
  cols: ['1 час', '3 часа', '5 часов', 'Утро 5ч', 'Ночь 10ч'],
  popular: 1, bestValue: 4,
  rows: [
    { zone: 'BOOTCAMP',      vals: [[170,170], [480,480], [750,750],  [380,380], [750,750]] },
    { zone: 'QUADRO ROOM',   vals: [[200,200], [580,580], [900,900],  [480,480], [850,850]] },
    { zone: 'TRIO ROOM',     vals: [[260,260], [750,750], [1150,1150],[650,650], [1200,1200]] },
    { zone: 'DUO ROOM',      vals: [[280,280], [850,850], [1350,1350],[700,700], [1300,1300]] },
    { zone: 'SOLO ROOM',     vals: [[320,320], [950,950], [1450,1450],[800,800], [1500,1500]] },
    { zone: 'PS5 LOUNGE',    vals: [[350,350], [900,900], [1400,1400],null,      null] },
    { zone: 'PS5 VIP LOUNGE',vals: [[400,400], [1000,1000],[1600,1600],null,     null] },
  ],
  student: 'Школьникам и студентам — BOOTCAMP от 120₽/час в будни с 10:00 до 16:00',
  bestNote: '↑ Ночь 10ч — самая низкая цена за час (единый тариф без разбивки по дням)',
}

const HARDWARE: ClubData['HARDWARE'] = {
  bootcamp: { name: 'BOOTCAMP', rows: [
    { k: 'Видеокарта', v: 'NVIDIA RTX 4070', accent: true },
    { k: 'Процессор',  v: 'Intel Core i7' },
    { k: 'RAM',        v: 'DDR4 16 GB' },
    { k: 'Монитор',    v: '27" · 144 Hz' },
    { k: 'Кресло',     v: 'DXRacer Master' },
    { k: 'Периферия',  v: 'Razer / Logitech G + гарнитуры' },
  ]},
  quadro: { name: 'QUADRO ROOM', rows: [
    { k: 'Видеокарта', v: 'NVIDIA RTX 4080', accent: true },
    { k: 'Процессор',  v: 'Intel Core i9', accent: true },
    { k: 'RAM',        v: 'DDR5 32 GB', accent: true },
    { k: 'Монитор',    v: '27" · 165 Hz · 1 ms', accent: true },
    { k: 'Кресло',     v: 'DXRacer Master' },
    { k: 'Периферия',  v: 'Razer Pro' },
  ]},
  rooms: { name: 'TRIO / DUO / SOLO', rows: [
    { k: 'Видеокарта', v: 'NVIDIA RTX 4070–4080', accent: true },
    { k: 'Процессор',  v: 'Intel Core i7–i9' },
    { k: 'RAM',        v: 'DDR4/DDR5 16–32 GB' },
    { k: 'Монитор',    v: '27" · 144–165 Hz' },
    { k: 'Кресло',     v: 'Noblechairs Hero', accent: true },
    { k: 'Периферия',  v: 'Razer Pro · наушники' },
  ]},
  ps5: { name: 'PS5 LOUNGE / VIP', rows: [
    { k: 'Консоль',    v: 'Sony PlayStation 5', accent: true },
    { k: 'Экран',      v: 'Большой TV · 120 Hz', accent: true },
    { k: 'Звук',       v: 'Объёмный звук + сабвуфер' },
    { k: 'Геймпады',   v: 'DualSense · до 6 штук' },
    { k: 'VIP комната',v: 'Закрытая, до 6 человек', accent: true },
    { k: 'Игры',       v: 'Полная библиотека PS5' },
  ]},
}

const FEATURES: Feature[] = [
  { id: 'unique',  size: 'big',   name: 'ЕДИНСТВЕННЫЙ FF В ДАГЕСТАНЕ',
    desc: 'Full Focus Махачкала — единственный клуб сети за пределами Санкт-Петербурга. Те же стандарты: топовое железо, 24/7, программа лояльности.',
    image: '/assets/club-interior.jpg', tag: 'Первый в Дагестане', icon: null, note: null },
  { id: 'quadro',  size: 'wide',  name: 'QUADRO ROOM — ТОЛЬКО ЗДЕСЬ',
    desc: 'Уникальная зона на 4 места — нигде в сети Full Focus нет такого формата. RTX 4080, DDR5, 165Hz. Для четвёрки игроков.',
    icon: 'cpu', image: null, tag: 'Только здесь', note: null },
  { id: 'ps5vip',  size: 'small', name: 'PS5 VIP LOUNGE',
    desc: 'Закрытая комната с PS5 и TV — для компании до 6 человек.',
    icon: 'gamepad', image: null, tag: null, note: null },
  { id: 'rooms',   size: 'small', name: 'SOLO · DUO · TRIO',
    desc: 'Три формата приватных комнат — для 1, 2 и 3 игроков.',
    icon: 'sofa', image: null, tag: null, note: null },
  { id: 'loyalty', size: 'small', name: 'ПРОГРАММА ЛОЯЛЬНОСТИ',
    desc: 'Баллы действуют во всей сети — в Махачкале и всех клубах СПб.',
    icon: 'star', image: null, tag: null, note: null },
  { id: 'always',  size: 'small', name: '24/7 КРУГЛОСУТОЧНО',
    desc: 'Открыто всегда — в любое время дня и ночи, без выходных.',
    icon: 'clock', image: null, tag: null, note: null },
]

const FLOOR: FloorPlan = {
  filters: [
    { id: 'all',      name: 'ВСЕ',     match: null },
    { id: 'bootcamp', name: 'BOOT',    match: null },
    { id: 'quadro',   name: 'QUADRO',  match: null },
    { id: 'rooms',    name: 'КОМНАТЫ', match: ['trio','duo','solo'] },
    { id: 'lounge',   name: 'PS5',     match: ['ps5','ps5vip'] },
  ],
  outlines: [
    { label: 'BOOTCAMP ×2',  left: '2%',  top: '10%', width: '46%', height: '36%', highlightFor: null },
    { label: 'QUADRO ROOM',  left: '52%', top: '10%', width: '46%', height: '36%', highlightFor: 'quadro' },
    { label: 'TRIO / DUO / SOLO', left: '2%', top: '54%', width: '40%', height: '36%', highlightFor: null },
    { label: 'PS5 LOUNGE',   left: '46%', top: '54%', width: '26%', height: '36%', highlightFor: 'lounge', accent: '#00FFB6' },
    { label: 'PS5 VIP',      left: '76%', top: '54%', width: '22%', height: '36%', highlightFor: 'lounge', accent: '#00FFB6' },
  ],
  zones: [
    { zone: 'bootcamp', label: 'BOOTCAMP',
      seats: Array.from({length: 10}, (_, i) => ({
        id: `bc-${i+1}`, x: 5 + (i%5) * 7.5, y: 22 + Math.floor(i/5) * 18,
        status: (['free','free','busy','free','free','busy','free','free','busy','free'] as const)[i],
      })) },
    { zone: 'quadro', label: 'QUADRO ROOM',
      seats: [
        { id: 'q-1', x: 60, y: 22, status: 'free' },
        { id: 'q-2', x: 68, y: 22, status: 'free' },
        { id: 'q-3', x: 60, y: 34, status: 'busy' },
        { id: 'q-4', x: 68, y: 34, status: 'free' },
      ]},
    { zone: 'trio', label: 'TRIO ROOM',
      seats: [
        { id: 'trio-1', x: 8,  y: 64, status: 'free' },
        { id: 'trio-2', x: 15, y: 64, status: 'busy' },
        { id: 'trio-3', x: 22, y: 64, status: 'free' },
      ]},
    { zone: 'duo',  label: 'DUO ROOM',
      seats: [
        { id: 'duo-1', x: 8,  y: 76, status: 'busy' },
        { id: 'duo-2', x: 15, y: 76, status: 'free' },
      ]},
    { zone: 'solo', label: 'SOLO ROOM',
      seats: [{ id: 'solo-1', x: 30, y: 70, status: 'free' }]},
    { zone: 'ps5',  label: 'PS5 LOUNGE',
      seats: [
        { id: 'ps5-1', x: 52, y: 64, status: 'free' },
        { id: 'ps5-2', x: 58, y: 64, status: 'free' },
      ]},
    { zone: 'ps5vip', label: 'PS5 VIP',
      seats: [
        { id: 'vip-1', x: 80, y: 66, status: 'free' },
        { id: 'vip-2', x: 86, y: 66, status: 'busy' },
      ]},
  ],
}

const REVIEWS: Review[] = [
  { name: 'Руслан М.',  src: 'Яндекс', stars: 5, text: 'Full Focus наконец в Махачкале! Давно ждали — и не разочаровали. Железо топовое.' },
  { name: 'Заира Г.',   src: '2ГИС',   stars: 5, text: 'QUADRO ROOM — уникальная вещь. Зашли вчетвером, поиграли в FIFA и NBA, кайф.' },
  { name: 'Амир С.',    src: 'Яндекс', stars: 5, text: 'PS5 VIP Lounge брали на ДР — закрытая комната, TV большой, шесть человек, весело.' },
  { name: 'Саида Х.',   src: '2ГИС',   stars: 5, text: 'DUO ROOM для двоих — тишина, Noblechairs, RTX. Лучший вечер в городе.' },
  { name: 'Тимур А.',   src: 'Яндекс', stars: 5, text: 'BOOTCAMP на 5 мест — сыграли командой в CS2. Связь отличная, пинг нормальный.' },
  { name: 'Нажмудин К.',src: '2ГИС',   stars: 5, text: 'Наконец нормальный игровой клуб в центре. Всё чисто, персонал вежливый, цены ок.' },
  { name: 'Патимат А.', src: 'Яндекс', stars: 5, text: 'SOLO ROOM — изоляция полная, RTX 4080. Для ранкеда в Dota это идеально.' },
  { name: 'Магомед О.', src: '2ГИС',   stars: 5, text: 'Программа лояльности работает — накопил баллы и получил бонус. Буду ходить.' },
]

const FAQ: FAQItem[] = [
  { q: 'Сколько стоит час игры в Full Focus в Махачкале?',
    a: 'BOOTCAMP от 170₽/час, QUADRO ROOM от 200₽/час, TRIO ROOM от 260₽/час, DUO ROOM от 280₽/час, SOLO ROOM от 320₽/час, PS5 LOUNGE от 350₽/час. Единый тариф без разбивки на будни/выходные.' },
  { q: 'Где находится Full Focus в Махачкале?',
    a: 'Улица Манташева, 107Б, Махачкала, центр города. Координаты: 42.986° N, 47.504° E.' },
  { q: 'Full Focus в Махачкале — это официальный клуб сети?',
    a: 'Да, полноправный клуб сети Full Focus с теми же стандартами качества, что и в Санкт-Петербурге. Программа лояльности действует во всех 8 клубах сети.' },
  { q: 'Что такое QUADRO ROOM в Full Focus Махачкала?',
    a: 'QUADRO ROOM — уникальная зона на 4 места, которой нет ни в одном другом клубе сети. RTX 4080, DDR5, мониторы 27" 165Hz. От 200₽/час.' },
  { q: 'Есть ли PS5 в Full Focus Махачкала?',
    a: 'Да — PS5 LOUNGE (от 350₽/час) и PS5 VIP LOUNGE — закрытая комната на компанию до 6 человек (от 400₽/час).' },
  { q: 'Работает ли Full Focus в Махачкале круглосуточно?',
    a: 'Да, клуб работает 24/7 без выходных и праздников.' },
  { q: 'Действуют ли скидки студентам в Махачкале?',
    a: 'Да — школьники и студенты могут играть в BOOTCAMP от 120₽/час в будние дни с 10:00 до 16:00 при предъявлении документа.' },
  { q: 'Действует ли программа лояльности Full Focus в Махачкале?',
    a: 'Да, накопленные баллы и уровень лояльности действуют во всех 8 клубах сети — и в Махачкале, и в любом клубе Санкт-Петербурга.' },
]

const EVENTS: EventItem[] = [
  { icon: 'briefcase', name: 'КОРПОРАТИВ',
    desc: 'Аренда клуба или зон. BOOTCAMP ×2 и QUADRO ROOM — до 14 PC-мест для командных мероприятий.' },
  { icon: 'cake', name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'PS5 VIP LOUNGE или аренда нескольких зон для компании. Турнир между гостями, призы.',
    badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР' },
  { icon: 'trophy', name: 'ЗАКРЫТЫЙ ТУРНИР',
    desc: 'BOOTCAMP ×2 или QUADRO ROOM для командного турнира. Своя сетка, трансляция, призы.' },
]

export const CLUB_DATA: ClubData = {
  CLUB, CLUB_ZONES, TARIFFS, HARDWARE, FEATURES, FLOOR, REVIEWS, ALL_CLUBS, FAQ, EVENTS,
}
