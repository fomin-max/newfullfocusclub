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
import TournamentsFAQ from '@/components/tournaments/TournamentsFAQ'
import TournamentHowSection from '@/components/tournaments/TournamentHowSection'
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
      name: 'FULL FOCUS Captain\'s Draft #1',
      startDate: '2026-06-13T11:00:00+03:00',
      location: {
        '@type': 'Place',
        name: 'Full Focus',
        address: { '@type': 'PostalAddress', streetAddress: 'Большой проспект В.О. 18А', addressLocality: 'Санкт-Петербург' },
      },
      organizer: { '@type': 'Organization', name: 'Full Focus Club', url: 'https://fullfocusclub.ru' },
      description: 'Captain\'s Draft турнир по CS2 с призовым фондом 20 000 ₽. Взнос 1000 ₽ с игрока.',
      url: 'https://fullfocusclub.ru/tournaments/captains-draft-1',
    },
  ],
}

const CALENDAR = [
  {
    id: 'jun',
    status: 'done',
    badge: 'ТУРНИР ЗАВЕРШЁН',
    date: '13 ИЮНЯ · CAPTAIN\'S DRAFT',
    title: 'Full Focus Captain\'s Draft #1',
    prize: '20 000 ₽',
    cta: { label: 'РЕЗУЛЬТАТЫ', href: '/tournaments/captains-draft-1' },
  },
  {
    id: 'jul',
    status: 'soon',
    badge: 'АНОНС СКОРО',
    date: 'ИЮЛЬ 2026',
    title: 'Дисциплина: объявим позже',
    note: 'Следи за @fullfocusclub в Telegram',
    cta: { label: 'ПОДПИСАТЬСЯ НА АНОНСЫ', href: 'https://t.me/fullfocusclubru?direct' },
  },
  {
    id: 'aug',
    status: 'soon',
    badge: 'АНОНС СКОРО',
    date: 'АВГУСТ 2026',
    title: 'Дисциплина: объявим позже',
    note: 'Следи за @fullfocusclub в Telegram',
    cta: { label: 'ПОДПИСАТЬСЯ НА АНОНСЫ', href: 'https://t.me/fullfocusclubru?direct' },
  },
]

const GALLERY = [
  { span: 'tall', label: 'ARENA 5×5 · Василеостровская' },
  { span: 'wide', label: 'Финал турнира' },
  { span: 'std',  label: 'Чек-ин команд' },
  { span: 'std',  label: 'Игровая зона' },
  { span: 'tall', label: 'Студия трансляции' },
  { span: 'std',  label: 'Награждение' },
  { span: 'wide', label: 'Зрительская зона' },
  { span: 'std',  label: 'Кубок чемпиона' },
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

        {/* §4 How to participate */}
        <TournamentHowSection />

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
                  <div className={`tn-cal ${c.status === 'active' ? 'is-active' : c.status === 'done' ? 'is-done' : 'is-soon'}`}>
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
        <section id="gallery" className="ff-section">
          <div className="ff-section__inner">
            <Reveal className="ff-section-head">
              <span className="ff-tag">атмосфера</span>
              <h2 className="ff-section-head__title">АТМОСФЕРА</h2>
              <p className="ff-section-head__sub">
                Фото с наших турниров. Перетащи свои — галерея запомнит их.
              </p>
            </Reveal>
            <div className="ev-gallery">
              {GALLERY.map((g, i) => (
                <div
                  key={i}
                  className={`ev-gallery__cell ${g.span === 'tall' ? 'ev-gallery__cell--tall' : g.span === 'wide' ? 'ev-gallery__cell--wide' : ''}`}
                >
                  <div className="ev-gallery__tile tn-gallery__tile tn-gallery__placeholder">
                    <div className="ev-gallery__overlay" style={{ opacity: 1 }}>
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
