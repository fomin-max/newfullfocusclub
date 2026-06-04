import type { Metadata } from 'next'
import ProgressBar from '@/components/ui/ProgressBar'
import Ticker from '@/components/ui/Ticker'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import MobileStickyBar from '@/components/ui/MobileStickyBar'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import TournamentsHero from '@/components/tournaments/TournamentsHero'
import NextTournament from '@/components/tournaments/NextTournament'
import TournamentForm from '@/components/tournaments/TournamentForm'
import TournamentsFAQ from '@/components/tournaments/TournamentsFAQ'
import './tournaments.css'

export const metadata: Metadata = {
  title: 'Турниры Full Focus — CS2, Dota 2, Valorant в СПб',
  description:
    'Регулярные киберспортивные турниры по CS2, Dota 2 и Valorant в компьютерном клубе Full Focus. Призовой фонд до 100 000 ₽, трансляция на Twitch. Регистрируй команду прямо сейчас.',
  metadataBase: new URL('https://fullfocusclub.ru'),
  alternates: { canonical: '/tournaments' },
  openGraph: {
    title: 'Турниры Full Focus — CS2, Dota 2, Valorant в СПб',
    description:
      'Регулярные турниры по CS2, Dota 2, Valorant. Призовой фонд до 100 000 ₽, прямой эфир на Twitch.',
    url: 'https://fullfocusclub.ru/tournaments',
    siteName: 'Full Focus Club',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Full Focus Club', item: 'https://fullfocusclub.ru' },
        { '@type': 'ListItem', position: 2, name: 'Турниры', item: 'https://fullfocusclub.ru/tournaments' },
      ],
    },
    {
      '@type': 'SportsEvent',
      name: 'CS2 5×5 — Кубок Василеостровской',
      startDate: '2026-06-14T14:00:00+03:00',
      location: {
        '@type': 'Place',
        name: 'Full Focus Василеостровская',
        address: { '@type': 'PostalAddress', streetAddress: 'Бугский переулок, 3', addressLocality: 'Санкт-Петербург' },
      },
      organizer: { '@type': 'Organization', name: 'Full Focus Club', url: 'https://fullfocusclub.ru' },
      description: 'CS2 турнир 5×5 с призовым фондом 100 000 ₽. Взнос 500 ₽ с игрока.',
    },
  ],
}

const STEPS = [
  { num: '01', name: 'РЕГИСТРАЦИЯ',   desc: 'Заполни форму команды. Укажи ники всех 5 игроков и Telegram капитана.' },
  { num: '02', name: 'ПОДТВЕРЖДЕНИЕ', desc: 'Свяжемся с капитаном в течение 15 минут. Подтвердим слот в турнире.' },
  { num: '03', name: 'ОПЛАТА',        desc: 'В день турнира оплати взнос на месте — 500 ₽ с каждого игрока.' },
  { num: '04', name: 'ТУРНИР',        desc: 'Приходи в 13:30 на чек-ин. Старт в 14:00 на ARENA 5×5.' },
]

const CALENDAR = [
  {
    id: 'jun',
    status: 'active',
    badge: 'РЕГИСТРАЦИЯ ОТКРЫТА',
    date: '14 ИЮНЯ · CS2 5×5',
    title: 'Кубок Василеостровской',
    prize: '100 000 ₽',
    cta: { label: 'ЗАРЕГИСТРИРОВАТЬСЯ', href: '#form' },
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
]

const GALLERY = [
  { span: 'tall', src: '/assets/club-interior.jpg',  label: 'ARENA 5×5 · Василеостровская' },
  { span: 'wide', src: '/assets/club-background.jpg', label: 'Финал турнира' },
  { span: 'std',  src: '/assets/club-interior.jpg',   label: 'Чек-ин команд' },
  { span: 'std',  src: '/assets/club-background.jpg', label: 'Игровая зона' },
  { span: 'tall', src: '/assets/club-interior.jpg',   label: 'Студия трансляции' },
  { span: 'std',  src: '/assets/club-background.jpg', label: 'Награждение' },
  { span: 'wide', src: '/assets/club-interior.jpg',   label: 'Зрительская зона' },
  { span: 'std',  src: '/assets/club-background.jpg', label: 'Кубок чемпиона' },
]

const FAQ_ITEMS = [
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
]

export default function TournamentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <ProgressBar />
      <Ticker />
      <Header />
      <main>
        {/* §1 Hero */}
        <TournamentsHero />

        {/* §2 Next Tournament with countdown */}
        <NextTournament />

        {/* §3 Registration Form */}
        <TournamentForm />

        {/* §4 How to participate */}
        <section id="how" className="ff-section" style={{ paddingTop: 0 }}>
          <div className="ff-section__inner">
            <Reveal className="ff-section-head">
              <span className="ff-tag">как участвовать</span>
              <h2 className="ff-section-head__title">КАК УЧАСТВОВАТЬ</h2>
              <p className="ff-section-head__sub">
                От регистрации до первого матча — четыре простых шага.
              </p>
            </Reveal>
            <div className="ev-how">
              <div className="ev-how__line is-drawn" />
              <div className="ev-how__list">
                {STEPS.map((s, i) => (
                  <Reveal key={s.num} delay={80 * i}>
                    <div className="ev-how__step">
                      <span className="ev-how__dot" />
                      <span className="ev-how__num">{s.num}</span>
                      <h3 className="ev-how__name">{s.name}</h3>
                      <p className="ev-how__desc">{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* §5 Calendar */}
        <section id="calendar" className="ff-section" style={{ paddingTop: 0 }}>
          <div className="ff-section__inner">
            <Reveal className="ff-section-head">
              <span className="ff-tag">расписание</span>
              <h2 className="ff-section-head__title">КАЛЕНДАРЬ ТУРНИРОВ</h2>
              <p className="ff-section-head__sub">
                Следующие турниры уже в расписании. Следи за анонсами и регистрируй команду заранее.
              </p>
            </Reveal>
            <div className="tn-cal__grid">
              {CALENDAR.map((c, i) => (
                <Reveal key={c.id} delay={80 * i}>
                  <div className={`tn-cal ${c.status === 'active' ? 'is-active' : 'is-soon'}`}>
                    <span className={`tn-cal__badge ${c.status === 'active' ? '' : 'is-outline'}`}>
                      {c.badge}
                    </span>
                    <span className="tn-cal__date">{c.date}</span>
                    <h3 className="tn-cal__title">{c.title}</h3>
                    {c.prize && (
                      <div className="tn-cal__prize">
                        <span className="tn-cal__prize-lbl">Призовой фонд</span>
                        <span className="tn-cal__prize-val">{c.prize}</span>
                      </div>
                    )}
                    {c.note && <p className="tn-cal__note">{c.note}</p>}
                    <div className="tn-cal__foot">
                      <a
                        href={c.cta.href}
                        className={`ff-btn ${c.status === 'active' ? 'ff-btn--primary' : 'ff-btn--secondary'}`}
                        {...(c.cta.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {c.cta.label} <Icon name="arrowRight" size={13} />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* §6 Gallery */}
        <section id="gallery" className="ff-section" style={{ paddingTop: 0 }}>
          <div className="ff-section__inner">
            <Reveal className="ff-section-head">
              <span className="ff-tag">атмосфера</span>
              <h2 className="ff-section-head__title">КАК ЭТО ВЫГЛЯДИТ</h2>
            </Reveal>
            <div className="ev-gallery">
              {GALLERY.map((g, i) => (
                <div
                  key={i}
                  className={`ev-gallery__cell ${g.span === 'tall' ? 'ev-gallery__cell--tall' : g.span === 'wide' ? 'ev-gallery__cell--wide' : ''}`}
                >
                  <div className="ev-gallery__tile tn-gallery__tile">
                    <img src={g.src} alt={g.label}
                         style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="ev-gallery__overlay">
                      <span className="ev-gallery__label">{g.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* §7 FAQ */}
        <TournamentsFAQ items={FAQ_ITEMS} />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  )
}
