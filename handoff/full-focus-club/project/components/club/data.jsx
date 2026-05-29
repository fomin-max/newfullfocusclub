/* data.jsx — Vasileostrovskaya club template variables.
   All club-specific data here. To clone for another club:
   change CLUB.* values and the file replays for any of the 8 venues. */

const CLUB = {
  NAME: 'Василеостровская',
  SLUG: 'vasilyeostrovsky',
  ADDRESS: 'Бугский переулок, 3',
  METRO: 'Василеостровская',
  METRO_COLOR: '#bf9e4d',          // line 3 — orange
  METRO_TIME: '5 мин пешком',
  HOURS: 'Круглосуточно · 24/7',
  TELEGRAM: '@fullfocusclub',
  PHONE: '+7 (812) 660-55-96',
  MAPS_URL: 'https://yandex.com/maps/-/CPDlzUKP',
  ROUTE_URL: 'https://yandex.com/maps/?rtext=~59.943,30.275&rtt=auto',
  COORDS: '59.943° N · 30.275° E',
  VIDEO_URL: 'assets/hero-video.mp4',
  POSTER_URL: 'assets/club-interior.jpg',
};

/* ============================================================
   ZONES — for §3 horizontal-scroll cards
   ============================================================ */
const CLUB_ZONES = [
  {
    id: 'pro',
    name: 'PRO ZONE',
    accent: '#6632FA',
    seats: 10,
    priceFrom: 160,
    desc: 'Просторная open-space зона на 10 мест. Игровые ПК следующего поколения и эргономика для длинных сессий.',
    specShort: 'RTX 4080 · 165Hz',
    image: 'assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ',
  },
  {
    id: 'arena',
    name: 'ARENA 5×5',
    accent: '#00FFB6',
    seats: 10,
    priceFrom: 280,
    desc: 'Полноценная киберспортивная арена — 10 мест для двух команд, проектор по центру транслирует игру, атмосфера как на настоящем турнире.',
    specShort: 'RTX 4090 · 240Hz · Проектор центральный',
    image: 'assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ АРЕНУ',
    flagship: true,
    badge: 'ФЛАГМАНСКАЯ ЗОНА',
  },
  {
    id: 'bootcamp',
    name: 'BOOTCAMP / TRIO',
    accent: '#6632FA',
    seats: '3–6',
    priceFrom: 240,
    desc: 'Зона для команды или подготовки к турниру. Голосовая связь, оборудование для трансляций.',
    specShort: 'RTX 4070 · 144Hz',
    image: 'assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ',
  },
  {
    id: 'duo',
    name: 'DUO ROOM',
    accent: '#6632FA',
    seats: 2,
    priceFrom: 350,
    desc: 'Отдельная комната на двоих. Кресла Noblechairs, приглушённый свет, тишина.',
    specShort: 'RTX 4080 · Noblechairs',
    image: 'assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ',
  },
  {
    id: 'solo',
    name: 'SOLO ROOM',
    accent: '#6632FA',
    seats: 1,
    priceFrom: 400,
    desc: 'Один на один с игрой. Лучшая периферия, изоляция от шума, идеально для ранкеда.',
    specShort: 'RTX 4080 · Noblechairs',
    image: 'assets/club-background.jpg',
    cta: 'ЗАБРОНИРОВАТЬ',
  },
  {
    id: 'ps5',
    name: 'PS5 LOUNGE',
    accent: '#00FFB6',
    seats: '4 кресла',
    priceFrom: 450,
    desc: 'Большой OLED, удобные кресла, кооператив и эксклюзивы PlayStation 5.',
    specShort: 'PS5 · 65" OLED',
    image: 'assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ',
  },
  {
    id: 'ps5vip',
    name: 'PS5 VIP LOUNGE',
    accent: '#00FFB6',
    seats: 'до 6',
    priceFrom: 650,
    desc: 'Закрытая комната с диваном и большим OLED — для своей компании.',
    specShort: 'PS5 · 65" OLED · отдельная комната',
    image: 'assets/club-interior.jpg',
    cta: 'ЗАБРОНИРОВАТЬ',
  },
];

/* ============================================================
   TARIFFS — §5 interactive table
   Format: [weekday, weekend] in ₽
   ============================================================ */
const TARIFFS = {
  cols: ['1 час', '3 часа', '5 часов', 'Утро 5ч', 'Ночь 10ч'],
  popular: 1,          // index of "3 часа" → POPULAR badge
  bestValue: 4,        // index of "Ночь 10ч" → row badge
  rows: [
    { zone: 'PRO ZONE',         vals: [[160,180], [450,500],  [700,800],   [400,450],  [900,1000]] },
    { zone: 'BOOTCAMP / TRIO',  vals: [[240,270], [700,800],  [1000,1150], [600,700],  [1300,1500]] },
    { zone: 'ARENA 5×5',        vals: [[280,320], [800,900],  [1200,1400], [700,800],  [1500,1800]] },
    { zone: 'DUO ROOM',         vals: [[350,400], [1000,1100],[1500,1700], [900,1000], [1900,2200]] },
    { zone: 'SOLO ROOM',        vals: [[400,500], [1100,1400],[1700,2100], [1000,1300],[2200,2800]] },
    { zone: 'PS5 LOUNGE',       vals: [[450,650], [1000,1500],[1700,2400], null,        null] },
    { zone: 'PS5 VIP LOUNGE',   vals: [[650,900], [1500,2000],[2400,3400], null,        null] },
  ],
  student: '🎓  Школьникам и студентам Пн-Пт 10:00–16:00 — PRO ZONE от 120₽/час',
};

/* ============================================================
   HARDWARE — §4 tabs
   ============================================================ */
const HARDWARE = {
  pro: {
    name: 'PRO ZONE',
    rows: [
      { k: 'Видеокарта', v: 'NVIDIA RTX 4080',         accent: true },
      { k: 'Процессор',  v: 'Intel Core i7 14-го поколения' },
      { k: 'RAM',        v: 'DDR5 32 GB' },
      { k: 'Монитор',    v: '27" IPS · 165 Hz · 1 ms', accent: true },
      { k: 'Кресло',     v: 'DXRacer Master' },
      { k: 'Периферия',  v: 'Razer / Logitech G Pro' },
    ],
  },
  arena: {
    name: 'ARENA 5×5',
    rows: [
      { k: 'Видеокарта', v: 'NVIDIA RTX 4090',         accent: true },
      { k: 'Процессор',  v: 'Intel Core i9 14-го поколения', accent: true },
      { k: 'RAM',        v: 'DDR5 32 GB' },
      { k: 'Монитор',    v: '27" · 240 Hz · 1 ms',    accent: true },
      { k: 'Проектор',   v: 'Центральный экран команды', accent: true },
      { k: 'Периферия',  v: 'Razer Pro · турнирный комплект' },
    ],
  },
  rooms: {
    name: 'SOLO / DUO ROOM',
    rows: [
      { k: 'Видеокарта', v: 'NVIDIA RTX 4080',         accent: true },
      { k: 'Процессор',  v: 'Intel Core i7 14-го поколения' },
      { k: 'RAM',        v: 'DDR5 32 GB' },
      { k: 'Монитор',    v: '27" IPS · 165 Hz' },
      { k: 'Кресло',     v: 'Noblechairs Hero',        accent: true },
      { k: 'Периферия',  v: 'Razer Pro · наушники Sennheiser' },
    ],
  },
  ps5: {
    name: 'PS5 LOUNGE',
    rows: [
      { k: 'Консоль',    v: 'Sony PlayStation 5',      accent: true },
      { k: 'Экран',      v: '65" OLED 4K · 120 Hz',    accent: true },
      { k: 'Звук',       v: 'Sony 3D Audio + сабвуфер' },
      { k: 'Геймпады',   v: 'DualSense · до 6 штук' },
      { k: 'Посадка',    v: 'Кресла-мешки · мягкий диван' },
      { k: 'Эксклюзивы', v: 'Полная библиотека PS Store' },
    ],
  },
};

/* ============================================================
   UNIQUE FEATURES — §6 bento
   ============================================================ */
const FEATURES = [
  { id: 'arena',     size: 'big',  name: 'КИБЕРСПОРТИВНАЯ АРЕНА 5×5',
    desc: '10 мест, проектор по центру — две команды видят друг друга через игру, как на настоящем турнире.',
    image: 'assets/club-interior.jpg',
    tag: 'Флагман' },
  { id: 'kitchen',   size: 'wide', name: 'СВОЯ КУХНЯ',
    desc: 'Хот-доги, горячие блюда и охлаждённое пиво — не отрываясь от матча.',
    icon: 'kitchen' },
  { id: 'billiard',  size: 'small', name: 'БИЛЬЯРД',
    desc: 'Стол американка — перерыв между катками.', icon: 'billiard' },
  { id: 'poker',     size: 'small', name: 'СПОРТИВНЫЙ ПОКЕР',
    desc: 'Турниры в формате спортивных соревнований — стратегия и атмосфера.',
    note: '* Мероприятие проводится в формате спортивных соревнований, не является азартной игрой и не предусматривает денежных ставок или выигрышей в денежном эквиваленте. Соответствует законодательству РФ.',
    icon: 'cards' },
  { id: 'yamaguchi', size: 'small', name: 'МАССАЖНОЕ КРЕСЛО YAMAGUCHI',
    desc: 'Бесплатно при покупке ночного пакета. Полное восстановление между сессиями.',
    icon: 'chair' },
  { id: 'ps5vip',    size: 'wide', name: 'PS5 VIP LOUNGE',
    desc: 'Отдельная закрытая комната — диван, 65" OLED, тишина. Для своей компании.',
    icon: 'gamepad' },
];

/* ============================================================
   LIVE SEATS — §2 floor plan
   Mock data; in production read-only Langame API.
   ============================================================ */
const FLOOR = {
  // Schematic plan: relative %-positions in a normalised canvas.
  zones: [
    // PRO ZONE — 10 seats, two rows on the left
    { zone: 'pro',  label: 'PRO ZONE',
      seats: Array.from({length: 10}, (_, i) => ({
        id: `pro-${i+1}`, x: 8 + (i%5) * 9, y: 22 + Math.floor(i/5) * 16,
        status: ['free','busy','free','busy','free','free','free','busy','free','free'][i],
      })) },
    // ARENA 5×5 — central, two facing rows of 5
    { zone: 'arena', label: 'ARENA 5×5',
      seats: Array.from({length: 10}, (_, i) => ({
        id: `arena-${i+1}`, x: 58 + (i%5) * 6.5, y: 22 + Math.floor(i/5) * 16,
        status: ['busy','busy','busy','busy','busy','free','busy','busy','busy','free'][i],
      })) },
    // BOOTCAMP — 6 seats top right
    { zone: 'bootcamp', label: 'BOOTCAMP',
      seats: Array.from({length: 6}, (_, i) => ({
        id: `bc-${i+1}`, x: 60 + (i%3) * 6.5, y: 56 + Math.floor(i/3) * 10,
        status: ['free','free','busy','free','free','off'][i],
      })) },
    // DUO ROOM — 2 seats
    { zone: 'duo', label: 'DUO',
      seats: [
        { id: 'duo-1', x: 12, y: 64, status: 'busy' },
        { id: 'duo-2', x: 19, y: 64, status: 'busy' },
      ]},
    // SOLO ROOM — 1
    { zone: 'solo', label: 'SOLO',
      seats: [{ id: 'solo-1', x: 30, y: 64, status: 'free' }]},
    // PS5 LOUNGE — 2 markers (couch)
    { zone: 'lounge', label: 'PS5',
      seats: [
        { id: 'ps5-1', x: 86, y: 70, status: 'free' },
        { id: 'ps5-2', x: 92, y: 70, status: 'busy' },
      ]},
    { zone: 'lounge', label: 'PS5 VIP',
      seats: [
        { id: 'ps5vip-1', x: 86, y: 84, status: 'free' },
      ]},
  ],
};

/* ============================================================
   REVIEWS — §8 marquee
   ============================================================ */
const REVIEWS = [
  { name: 'Андрей К.',  src: 'Яндекс',  stars: 5,
    text: 'Мощные ПК, топовые видеокарты — игры запускаются моментально. Атмосфера 10/10.' },
  { name: 'Мария В.',   src: '2ГИС',    stars: 5,
    text: 'Дизайн продуман до мелочей: стильное освещение с неоновыми акцентами, всё по фен-шую.' },
  { name: 'Иван П.',    src: 'Яндекс',  stars: 5,
    text: 'Эргономичные игровые кресла — не устаёшь даже после нескольких часов на бутcкампе.' },
  { name: 'Дарья С.',   src: '2ГИС',    stars: 5,
    text: 'Работа команды на высшем уровне. Помогли с настройкой периферии, объяснили тарифы.' },
  { name: 'Кирилл М.',  src: 'Яндекс',  stars: 5,
    text: 'Своя кухня — это разрыв шаблона. Хот-доги вкусные, пиво холодное, никуда уходить не надо.' },
  { name: 'Полина Р.',  src: '2ГИС',    stars: 5,
    text: 'Снимали PS5 VIP на день рождения — отдельная комната, огромный OLED, тишина, кайф.' },
  { name: 'Сергей Ж.',  src: 'Яндекс',  stars: 5,
    text: 'Арена с проектором — это другое измерение. Играли 5×5, ощущение настоящего турнира.' },
  { name: 'Алина Т.',   src: '2ГИС',    stars: 5,
    text: 'Интернет летает, пинг минимальный, никакого фриза. Видно, что железо подбирали профи.' },
];

window.CLUB_DATA = { CLUB, CLUB_ZONES, TARIFFS, HARDWARE, FEATURES, FLOOR, REVIEWS };
