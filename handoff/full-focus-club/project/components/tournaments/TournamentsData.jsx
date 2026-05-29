/* TournamentsData.jsx — all content for the Full Focus /tournaments page.
   Brand voice: ты, кратко, технологично. No emoji (design system rule). */

/* Target date for the next tournament countdown — 14 June 2026, 14:00 MSK (UTC+3) */
const NEXT_TOURNAMENT_DATE = '2026-06-14T14:00:00+03:00';

/* §1 — hero quick facts */
const HERO_FACTS = [
  { icon: 'trophy',    val: 'до 100 000 ₽',          lbl: 'Призовой фонд' },
  { icon: 'users',     val: 'до 16 команд',          lbl: 'Слотов в сетке' },
  { icon: 'broadcast', val: 'twitch · fullfocus',    lbl: 'Прямой эфир' },
];

/* §2 — the next tournament */
const NEXT = {
  dateLine: '14 ИЮНЯ · СУББОТА · 14:00',
  title: ['CS2 5×5 —', 'КУБОК ВАСИЛЕОСТРОВСКОЙ'],
  venue: 'Full Focus Василеостровская · Бугский переулок, 3',
  details: [
    { icon: 'swords',    lbl: 'Формат',     val: '5 × 5' },
    { icon: 'list',      lbl: 'Слотов',     val: '16 команд' },
    { icon: 'crosshair', lbl: 'Дисциплина', val: 'Counter-Strike 2' },
    { icon: 'trophy',    lbl: 'Призовой',   val: '100 000 ₽', accent: true },
    { icon: 'ruble',     lbl: 'Взнос',      val: '500 ₽ / игрок' },
    { icon: 'broadcast', lbl: 'Эфир',       val: 'twitch · fullfocus' },
    { icon: 'pin',       lbl: 'Место',      val: 'ARENA 5×5 · Василеостровская' },
  ],
  note: 'Взнос оплачивается на месте в день турнира. Регистрация подтверждается в течение 15 минут в Telegram.',
};

/* §4 — how to participate */
const STEPS = [
  { num: '01', name: 'РЕГИСТРАЦИЯ',   desc: 'Заполни форму команды. Укажи ники всех 5 игроков и Telegram капитана.' },
  { num: '02', name: 'ПОДТВЕРЖДЕНИЕ', desc: 'Свяжемся с капитаном в течение 15 минут. Подтвердим слот в турнире.' },
  { num: '03', name: 'ОПЛАТА',        desc: 'В день турнира оплати взнос на месте — 500 ₽ с каждого игрока.' },
  { num: '04', name: 'ТУРНИР',        desc: 'Приходи в 13:30 на чек-ин. Старт в 14:00 на ARENA 5×5.' },
];

/* §5 — tournament calendar */
const CALENDAR = [
  {
    id: 'jun',
    status: 'active',
    badge: 'РЕГИСТРАЦИЯ ОТКРЫТА',
    date: '14 ИЮНЯ · CS2 5×5',
    title: 'Кубок Василеостровской',
    prize: '100 000 ₽',
    cta: { label: 'ЗАРЕГИСТРИРОВАТЬСЯ', target: 'form' },
  },
  {
    id: 'jul',
    status: 'soon',
    badge: 'АНОНС СКОРО',
    date: 'ИЮЛЬ 2026',
    title: 'Дисциплина: объявим позже',
    note: 'Следи за @fullfocusclub в Telegram',
    cta: { label: 'ПОДПИСАТЬСЯ НА АНОНСЫ', href: 'https://t.me/fullfocusclub' },
  },
  {
    id: 'aug',
    status: 'soon',
    badge: 'АНОНС СКОРО',
    date: 'АВГУСТ 2026',
    title: 'Дисциплина: объявим позже',
    note: 'Следи за @fullfocusclub в Telegram',
    cta: { label: 'ПОДПИСАТЬСЯ НА АНОНСЫ', href: 'https://t.me/fullfocusclub' },
  },
];

/* §6 — gallery tiles (image-slots, seeded with real photos as fallback) */
const GALLERY = [
  { id: 'tn-gal-1', span: 'tall', src: 'assets/club-interior.jpg',   label: 'ARENA 5×5 · Василеостровская' },
  { id: 'tn-gal-2', span: 'wide', src: 'assets/club-background.jpg',  label: 'Финал турнира' },
  { id: 'tn-gal-3', span: 'std',  src: '',                            label: 'Чек-ин команд' },
  { id: 'tn-gal-4', span: 'std',  src: 'assets/club-interior.jpg',    label: 'Игровая зона' },
  { id: 'tn-gal-5', span: 'tall', src: 'assets/club-background.jpg',  label: 'Студия трансляции' },
  { id: 'tn-gal-6', span: 'std',  src: '',                            label: 'Награждение' },
  { id: 'tn-gal-7', span: 'wide', src: 'assets/club-interior.jpg',    label: 'Зрительская зона' },
  { id: 'tn-gal-8', span: 'std',  src: '',                            label: 'Кубок чемпиона' },
];

/* §3 — form selects */
const FORM_DISCIPLINES = ['Counter-Strike 2'];
const FORM_SOURCES = ['Из соцсетей', 'От друга', 'Был в клубе', 'Другое'];

/* §7 — FAQ */
const FAQ = [
  {
    q: 'Можно ли участвовать командой меньше 5 человек?',
    a: 'Нет — формат турнира 5×5, нужна полная команда. Можно найти игроков в нашем Telegram-чате @fullfocusclub.',
  },
  {
    q: 'Когда нужно приехать в день турнира?',
    a: 'Чек-ин начинается в 13:30, старт в 14:00. Опоздавшие команды могут быть сняты с турнира.',
  },
  {
    q: 'Как распределяется призовой фонд?',
    a: 'Распределение объявляется перед турниром. Как правило: 1 место — 60%, 2 место — 30%, 3 место — 10%.',
  },
  {
    q: 'Будет ли трансляция турнира?',
    a: 'Да, прямой эфир на twitch.tv/fullfocus. Студия аналитики — прямо из клуба.',
  },
  {
    q: 'Можно ли заменить игрока после регистрации?',
    a: 'Да, до начала чек-ина. Напиши капитану или администратору клуба в Telegram.',
  },
  {
    q: 'Какие дисциплины будут в следующих турнирах?',
    a: 'Планируем CS2, Dota 2, Valorant и другие. Следи за анонсами в @fullfocusclub.',
  },
];

window.TOURN_DATA = {
  NEXT_TOURNAMENT_DATE, HERO_FACTS, NEXT, STEPS, CALENDAR,
  GALLERY, FORM_DISCIPLINES, FORM_SOURCES, FAQ,
};
