/* EventsData.jsx — all content for the Full Focus /events page.
   Keep copy inside the brand voice (ты, кратко, технологично). */

/* §1 — hero quick facts */
const HERO_FACTS = [
  { icon: 'users',    val: 'До 80 человек',     lbl: 'Вместимость флагмана' },
  { icon: 'trophy',   val: '8 клубов сети',     lbl: 'Площадки в СПб и Махачкале' },
  { icon: 'bolt',     val: 'Под ключ',          lbl: 'Берём всю организацию на себя' },
];

/* §2 — event formats */
const FORMATS = [
  {
    icon: 'briefcase',
    name: 'КОРПОРАТИВ',
    desc: 'Аренда клуба или отдельных зон. Кейтеринг, ведущий, кастомные награды и прямой эфир турнира между отделами.',
    details: ['До 80 человек', 'от 2 часов', 'Любой клуб сети'],
  },
  {
    icon: 'cake',
    name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'Закажи клуб для своей компании. Своя кухня на Василеостровской, атмосфера и турнир между гостями.',
    badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР',
    featured: true,
    details: ['Любое количество', 'Кейтеринг', 'Кастомные призы'],
  },
  {
    icon: 'trophy',
    name: 'ЗАКРЫТЫЙ ТУРНИР',
    desc: 'Арендуй ARENA 5×5 для командного турнира. Проектор по центру, трансляция, призы — как на настоящем киберспортивном ивенте.',
    badge: 'ARENA 5×5 · ВАСИЛЕОСТРОВСКАЯ',
    details: ['Формат 5×5', 'Проектор', 'Трансляция'],
  },
];

/* §3 — flagship venues */
const VENUES = [
  {
    name: 'ВАСИЛЕОСТРОВСКАЯ',
    tag: 'ФЛАГМАН',
    capacity: 'ДО 80 ЧЕЛОВЕК',
    address: 'Бугский переулок, 3',
    metro: 'Василеостровская',
    metroColor: '#bf9e4d',
    image: 'assets/club-interior.jpg',
    href: 'club-vasilyeostrovsky.html',
    features: [
      'ARENA 5×5 с проектором',
      'Своя кухня — кейтеринг без подрядчиков',
      'PS5 VIP LOUNGE для VIP-гостей',
      'Бильярд и спортивный покер',
      'Прямая трансляция',
    ],
  },
  {
    name: 'КОМЕНДАНТСКИЙ ПРОСПЕКТ',
    tag: null,
    capacity: 'ДО 60 ЧЕЛОВЕК',
    address: 'Проспект Испытателей, 33',
    metro: 'Комендантский проспект',
    metroColor: '#8bc34a',
    image: '',
    href: '#form',
    features: [
      'Большой зал PRO + MAX',
      'PS5 VIP LOUNGE',
      'Турниры от внешних организаторов',
      'Прямая трансляция',
    ],
  },
];

/* small clubs row for camerный turniry */
const SMALL_CLUBS = [
  { name: 'Электросила',     color: '#0066b3', href: 'club-elektrosila.html' },
  { name: 'Просвещения',     color: '#c12a2c', href: '#form' },
  { name: 'Беговая',         color: '#a3df95', href: '#form' },
  { name: 'Садовая',         color: '#b14385', href: '#form' },
  { name: 'Технологический', color: '#0066b3', href: '#form' },
  { name: 'Махачкала',       color: '#6632FA', href: '#form' },
];

/* §4 — what's included */
const INCLUDED = [
  { icon: 'gamepad',   name: 'ИГРОВОЕ ОБОРУДОВАНИЕ', desc: 'Топовые ПК и PS5 готовы к старту — без настройки и ожидания.' },
  { icon: 'burger',    name: 'КЕЙТЕРИНГ',            desc: 'Хот-доги, горячие блюда и напитки. Своя кухня на Василеостровской.' },
  { icon: 'mic',       name: 'ВЕДУЩИЙ',              desc: 'Сценарий, командные игры и церемония награждения.' },
  { icon: 'broadcast', name: 'ТРАНСЛЯЦИЯ',           desc: 'Прямой эфир на проекторе внутри клуба или стриминг наружу.' },
  { icon: 'award',     name: 'КАСТОМНЫЕ ПРИЗЫ',      desc: 'Кубки, медали и брендированный мерч Full Focus.' },
  { icon: 'camera',    name: 'ФОТО И ВИДЕО',         desc: 'Репортажная съёмка мероприятия — по запросу.' },
];

/* §5 — social proof feature blocks */
const PROOF = [
  {
    id: 'quantum',
    type: 'КИБЕРСПОРТИВНЫЙ МЕДИАТУРНИР',
    name: 'QUANTUM DOTA 2 MEDIA CUP',
    badge: 'ПРИЗОВОЙ ФОНД 550 000 ₽',
    desc: 'Студия аналитики турнира работала прямо из Full Focus Василеостровская. В эфире — Андрей Pyrokinesis, Фёдор Букер, Даниил Бальцер, Святослав Драгунов.',
    image: 'assets/club-interior.jpg',
    slot: 'proof-quantum',
  },
  {
    id: 'cinema',
    type: 'ЛОКАЦИЯ ДЛЯ СЪЁМОК',
    name: 'СЪЁМКИ КИНО',
    badge: 'ЛОКАЦИЯ ДЛЯ КИНО',
    desc: 'Клуб на Василеостровской становился площадкой для съёмок российских сериалов.',
    image: 'assets/club-background.jpg',
    slot: 'proof-cinema',
    projects: ['Сериал 1', 'Сериал 2'],
  },
  {
    id: 'zenit',
    type: 'ПРОМО-СЪЁМКА',
    name: 'БК ЗЕНИТ САНКТ-ПЕТЕРБУРГ',
    badge: 'БК ЗЕНИТ · ОФИЦИАЛЬНОЕ ПРОМО',
    desc: 'Баскетбольный клуб Зенит снял промо-ролик к новому сезону в Full Focus Василеостровская.',
    image: 'assets/club-interior.jpg',
    slot: 'proof-zenit',
    cta: { label: 'СМОТРЕТЬ РОЛИК', href: 'https://youtu.be/AV0z2DHdTIk' },
  },
];

/* partners — logos placeholders, replace before publish */
const PARTNERS = [
  { name: 'Quantum' },
  { name: 'БК Зенит' },
  { name: 'Skynet' },
  { name: 'Lova Lova' },
];

/* §6 — how it works */
const STEPS = [
  { num: '01', name: 'ЗАЯВКА',      desc: 'Оставь заявку с деталями — формат, дата, количество гостей, клуб.' },
  { num: '02', name: 'ОБСУЖДЕНИЕ',  desc: 'Свяжемся в течение 15 минут. Обсудим сценарий и детали.' },
  { num: '03', name: 'ПОДГОТОВКА',  desc: 'Берём организацию на себя — оборудование, кейтеринг, ведущий.' },
  { num: '04', name: 'МЕРОПРИЯТИЕ', desc: 'Ты просто приходишь и наслаждаешься. Мы делаем всё остальное.' },
];

/* §7 — gallery tiles (image-slots, seeded with real photos as fallback) */
const GALLERY = [
  { id: 'gal-1', span: 'tall', src: 'assets/club-interior.jpg',   label: 'Интерьер · Василеостровская' },
  { id: 'gal-2', span: 'wide', src: 'assets/club-background.jpg',  label: 'Главный зал' },
  { id: 'gal-3', span: 'std',  src: '',                            label: 'ARENA 5×5' },
  { id: 'gal-4', span: 'std',  src: 'assets/club-interior.jpg',    label: 'Турнир' },
  { id: 'gal-5', span: 'tall', src: 'assets/club-background.jpg',  label: 'PS5 VIP Lounge' },
  { id: 'gal-6', span: 'std',  src: '',                            label: 'Кейтеринг' },
  { id: 'gal-7', span: 'wide', src: 'assets/club-interior.jpg',    label: 'Награждение' },
  { id: 'gal-8', span: 'std',  src: '',                            label: 'Атмосфера' },
];

/* §8 — form selects */
const FORM_TYPES = ['Корпоратив', 'День рождения', 'Закрытый турнир', 'Другое'];
const FORM_CLUBS = ['Василеостровская', 'Комендантский проспект', 'Другой клуб сети'];

/* §9 — FAQ */
const FAQ = [
  {
    q: 'Сколько стоит аренда клуба для мероприятия?',
    a: 'Стоимость рассчитывается индивидуально — зависит от формата, количества гостей, клуба и длительности. Оставь заявку, свяжемся и подберём оптимальный вариант.',
  },
  {
    q: 'Как быстро можно организовать мероприятие?',
    a: 'Минимальный срок — 3 дня для небольших мероприятий. Для крупных корпоративов рекомендуем бронировать за 1–2 недели.',
  },
  {
    q: 'Можно ли привезти своё угощение?',
    a: 'Да, можно. На Василеостровской также работает своя кухня — хот-доги, горячие блюда и напитки без лишних подрядчиков.',
  },
  {
    q: 'Есть ли трансляция турнира в прямом эфире?',
    a: 'Да, организуем прямой эфир на проекторе внутри клуба или стриминг на внешних платформах.',
  },
  {
    q: 'Можно ли арендовать только часть клуба?',
    a: 'Да, можно арендовать отдельные зоны — ARENA, Bootcamp, несколько DUO Room — в зависимости от формата мероприятия.',
  },
  {
    q: 'Можно ли организовать турнир с трансляцией на Twitch?',
    a: 'Да, организуем прямую трансляцию на Twitch или YouTube. На Василеостровской — студия аналитики с профессиональным оборудованием, как на Quantum Dota 2 Media Cup.',
  },
];

window.EVENTS_DATA = {
  HERO_FACTS, FORMATS, VENUES, SMALL_CLUBS, INCLUDED,
  PROOF, PARTNERS, STEPS, GALLERY, FORM_TYPES, FORM_CLUBS, FAQ,
};
