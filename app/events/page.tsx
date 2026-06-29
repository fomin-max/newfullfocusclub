import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import ProgressBar from '@/components/ui/ProgressBar'
import Ticker from '@/components/ui/Ticker'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import MobileStickyBar from '@/components/ui/MobileStickyBar'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import EventsHero from '@/components/events/EventsHero'
import EventsForm from '@/components/events/EventsForm'
import './events.css'

export const metadata: Metadata = {
  title: 'Мероприятия в Full Focus — Корпоративы, дни рождения, турниры',
  description:
    'Организуем корпоратив, день рождения или закрытый турнир в компьютерном клубе Full Focus под ключ. Кейтеринг, ведущий, трансляция, призы. До 80 человек. 7 клубов в СПб и Махачкале.',
  metadataBase: new URL('https://fullfocusclub.ru'),
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Мероприятия в Full Focus — Корпоративы, дни рождения, турниры',
    description:
      'Организуем корпоратив, день рождения или закрытый турнир под ключ. Кейтеринг, ведущий, трансляция. До 80 человек.',
    url: 'https://fullfocusclub.ru/events',
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
        { '@type': 'ListItem', position: 2, name: 'Мероприятия', item: 'https://fullfocusclub.ru/events' },
      ],
    },
    {
      '@type': 'EventReservation',
      name: 'Мероприятия в Full Focus Club',
      description:
        'Корпоративы, дни рождения, закрытые турниры — организуем под ключ в 7 клубах Full Focus.',
      url: 'https://fullfocusclub.ru/events',
    },
  ],
}

const FORMATS = [
  {
    icon: 'briefcase' as const,
    name: 'КОРПОРАТИВ',
    desc: 'Аренда клуба или отдельных зон. Кейтеринг, ведущий, кастомные награды и прямой эфир турнира между отделами.',
    details: ['До 80 человек', 'от 2 часов', 'Любой клуб сети'],
  },
  {
    icon: 'cake' as const,
    name: 'ДЕНЬ РОЖДЕНИЯ',
    desc: 'Закажи клуб для своей компании. Своя кухня на Василеостровской, атмосфера и турнир между гостями.',
    badge: 'ДЕПОЗИТ × 2',
    featured: true,
    details: ['Любое количество', 'Кейтеринг', 'Кастомные призы'],
  },
  {
    icon: 'trophy' as const,
    name: 'ЗАКРЫТЫЙ ТУРНИР',
    desc: 'Арендуй ARENA 5×5 для командного турнира. Проектор по центру, трансляция, призы — как на настоящем киберспортивном ивенте.',
    badge: 'ARENA 5×5',
    details: ['Формат 5×5', 'Проектор', 'Трансляция'],
  },
]

const VENUES = [
  {
    name: 'ВАСИЛЕОСТРОВСКАЯ',
    tag: 'ФЛАГМАН',
    capacity: 'ДО 80 ЧЕЛОВЕК',
    address: 'Бугский переулок, 3',
    metro: 'Василеостровская',
    metroColor: '#009E40',
    href: '/clubs/vasilyeostrovsky',
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
    metroColor: '#8E479B',
    href: '/clubs/komendantsky',
    features: [
      'Большой зал PRO + MAX',
      'PS5 VIP LOUNGE',
      'Турниры от внешних организаторов',
      'Прямая трансляция',
    ],
  },
]

const SMALL_CLUBS = [
  { name: 'Электросила',     color: '#0062AC', href: '/clubs/elektrosila' },
  { name: 'Просвещения',     color: '#0062AC', href: '/clubs/prosvescheniya' },
  { name: 'Садовая',         color: '#8E479B', href: '/clubs/sadovaya' },
  { name: 'Технологический', color: '#E4171B', href: '/clubs/tekhnologichesky' },
  { name: 'Махачкала',       color: '#888888', href: '/clubs/makhachkala' },
]

const INCLUDED = [
  { icon: 'gamepad'   as const, name: 'ИГРОВОЕ ОБОРУДОВАНИЕ', desc: 'Топовые ПК и PS5 готовы к старту — без настройки и ожидания.' },
  { icon: 'burger'    as const, name: 'КЕЙТЕРИНГ',            desc: 'Хот-доги, горячие блюда и напитки. Своя кухня на Василеостровской.' },
  { icon: 'mic'       as const, name: 'ВЕДУЩИЙ',              desc: 'Сценарий, командные игры и церемония награждения.' },
  { icon: 'broadcast' as const, name: 'ТРАНСЛЯЦИЯ',           desc: 'Прямой эфир на проекторе внутри клуба или стриминг наружу.' },
  { icon: 'award'     as const, name: 'КАСТОМНЫЕ ПРИЗЫ',      desc: 'Кубки, медали и брендированный мерч Full Focus.' },
  { icon: 'camera'    as const, name: 'ФОТО И ВИДЕО',         desc: 'Репортажная съёмка мероприятия — по запросу.' },
]

const PROOF = [
  {
    type: 'КИБЕРСПОРТИВНЫЙ МЕДИАТУРНИР',
    name: 'QUANTUM DOTA 2 MEDIA CUP',
    badge: 'ПРИЗОВОЙ ФОНД 550 000 ₽',
    desc: 'Студия аналитики турнира работала прямо из Full Focus Василеостровская. В эфире — Андрей Pyrokinesis, Фёдор Букер, Даниил Бальцер, Святослав Драгунов.',
  },
  {
    type: 'ЛОКАЦИЯ ДЛЯ СЪЁМОК',
    name: 'СЪЁМКИ КИНО',
    badge: 'ЛОКАЦИЯ ДЛЯ КИНО',
    desc: 'Клуб на Василеостровской становился площадкой для съёмок российских сериалов.',
  },
  {
    type: 'ПРОМО-СЪЁМКА',
    name: 'БК ЗЕНИТ САНКТ-ПЕТЕРБУРГ',
    badge: 'БК ЗЕНИТ · ОФИЦИАЛЬНОЕ ПРОМО',
    desc: 'Баскетбольный клуб Зенит снял промо-ролик к новому сезону в Full Focus Василеостровская.',
    cta: { label: 'СМОТРЕТЬ РОЛИК', embedSrc: 'https://rutube.ru/play/embed/8bdcb8ea9b03bc51028e0689b8e9b91f' },
  },
]


const GALLERY = [
  { span: 'tall', src: '/assets/club-interior.jpg',  label: 'Интерьер · Василеостровская' },
  { span: 'wide', src: '/assets/club-background.jpg', label: 'Главный зал' },
  { span: 'std',  src: '/assets/club-interior.jpg',   label: 'ARENA 5×5' },
  { span: 'std',  src: '/assets/club-background.jpg', label: 'Турнир' },
  { span: 'tall', src: '/assets/club-interior.jpg',   label: 'PS5 VIP Lounge' },
  { span: 'std',  src: '/assets/club-background.jpg', label: 'Кейтеринг' },
  { span: 'wide', src: '/assets/club-interior.jpg',   label: 'Награждение' },
  { span: 'std',  src: '/assets/club-background.jpg', label: 'Атмосфера' },
]

const FAQ_ITEMS = [
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
    a: 'Да, организуем прямую трансляцию на Twitch или YouTube. На Василеостровской — студия аналитики с профессиональным оборудованием.',
  },
]

import EventsFAQ from '@/components/events/EventsFAQ'
import EventsHowSection from '@/components/events/EventsHowSection'
import ProofVideoButton from '@/components/events/ProofVideoButton'

export default function EventsPage() {
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
        <EventsHero />

        {/* §2 Formats */}
        <section id="formats" className="ff-section">
          <div className="ff-section__inner">
            <Reveal className="ff-section-head">
              <span className="ff-tag">выбери формат</span>
              <h2 className="ff-section-head__title">ВЫБЕРИ ФОРМАТ</h2>
              <p className="ff-section-head__sub">
                Три сценария под любую задачу — от закрытого корпоратива до киберспортивного турнира.
              </p>
            </Reveal>
            <div className="ev-formats__grid">
              {FORMATS.map((f, i) => (
                <Reveal key={f.name} delay={80 + i * 120}>
                  <article className={`ev-format ${f.featured ? 'is-featured' : ''}`}>
                    <span className="ev-format__glow" />
                    {f.badge && <span className="ev-format__badge">{f.badge}</span>}
                    <div className="ev-format__body">
                      <div className="ev-format__top">
                        <span className="ev-format__icon"><Icon name={f.icon} size={28} /></span>
                      </div>
                      <h3 className="ev-format__name">{f.name}</h3>
                      <p className="ev-format__desc">{f.desc}</p>
                      <ul className="ev-format__details">
                        {f.details.map((d, di) => (
                          <li key={di}><span className="ev-format__tick">✓</span>{d}</li>
                        ))}
                      </ul>
                      <a href="#form" className="ev-format__cta">
                        ОСТАВИТЬ ЗАЯВКУ <Icon name="arrowRight" size={13} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* §3 Venues */}
        <section id="venues" className="ff-section" style={{ paddingTop: 0 }}>
          <div className="ff-section__inner">
            <Reveal className="ff-section-head">
              <span className="ff-tag">площадки</span>
              <h2 className="ff-section-head__title">ВЫБЕРИ ПЛОЩАДКУ</h2>
              <p className="ff-section-head__sub">
                Флагман на Васильевском острове — до 80 человек. Остальные клубы — для камерных мероприятий.
              </p>
            </Reveal>
            <div className="ev-venues__grid">
              {VENUES.map((v, i) => (
                <Reveal key={v.name} delay={i * 100}>
                  <article className="ff-card ff-card--brackets ev-venue">
                    <div className="ff-card__glow" />
                    <div className="ev-venue__media">
                      {i === 0 ? (
                        <>
                          <Image src="/assets/club-interior.jpg" alt={v.name} fill sizes="(max-width: 768px) 100vw, 50vw" />
                          <div className="ev-venue__media-shade" />
                          <span className="ev-venue__cap">{v.capacity}</span>
                          <span className="ev-venue__flag">{v.tag}</span>
                        </>
                      ) : (
                        <div className="ev-venue__soon">
                          <span className="ev-venue__soon-mark"><Icon name="calendar" size={22} /></span>
                          <span className="ev-venue__soon-txt">{v.capacity}</span>
                        </div>
                      )}
                    </div>
                    <div className="ev-venue__head">
                      <h3 className="ev-venue__name">{v.name}</h3>
                      <div className="ev-venue__addr">
                        <span className="ev-venue__metro"
                              style={{ '--metro-color': v.metroColor } as React.CSSProperties} />
                        {v.address} · м.&nbsp;{v.metro}
                      </div>
                    </div>
                    <ul className="ev-venue__features">
                      {v.features.map((feat, fi) => (
                        <li key={fi}>
                          <span className="ev-venue__tick"><Icon name="check" size={12} /></span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <a href="#form" className="ev-venue__more">
                      ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Small clubs strip */}
            <Reveal delay={200}>
              <div className="ev-small">
                <div className="ev-small__text">
                  <span className="ev-small__title">ДРУГИЕ КЛУБЫ СЕТИ</span>
                  <p>Для камерных мероприятий до 30 человек. Оставь заявку — подберём клуб под твои задачи.</p>
                </div>
                <div className="ev-small__clubs">
                  {SMALL_CLUBS.map(c => (
                    <a key={c.name} href="#form" className="ev-small__club">
                      <span className="ev-small__dot" style={{ '--metro-color': c.color } as React.CSSProperties} />
                      {c.name}
                      <span className="ev-small__arr"><Icon name="arrowRight" size={11} /></span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* §4 Included */}
        <section id="included" className="ff-section" style={{ paddingTop: 0 }}>
          <div className="ff-section__inner">
            <Reveal className="ff-section-head">
              <span className="ff-tag">входит в стоимость</span>
              <h2 className="ff-section-head__title">ЧТО ВХОДИТ</h2>
              <p className="ff-section-head__sub">
                Организуем всё от и до — тебе остаётся только прийти и получать удовольствие.
              </p>
            </Reveal>
            <div className="ev-incl__grid">
              {INCLUDED.map((item, i) => (
                <Reveal key={item.name} delay={60 * i}>
                  <div className="ff-card ev-incl">
                    <div className="ff-card__glow" />
                    <span className="ev-incl__icon"><Icon name={item.icon} size={24} /></span>
                    <h3 className="ev-incl__name">{item.name}</h3>
                    <p className="ev-incl__desc">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* §5 Social Proof */}
        <section id="proof" className="ff-section" style={{ paddingTop: 0 }}>
          <div className="ff-section__inner">
            <Reveal className="ff-section-head">
              <span className="ff-tag">нам доверяют</span>
              <h2 className="ff-section-head__title">НАМ ДОВЕРЯЮТ</h2>
              <p className="ff-section-head__sub">
                Медиатурниры, съёмки кино и промо крупнейших брендов — всё прошло в Full Focus.
              </p>
            </Reveal>
            <div className="ev-proof__grid">
              {PROOF.map((p, i) => (
                <Reveal key={p.name} delay={80 * i}>
                  <article className="ev-proof">
                    <div className="ev-proof__media">
                      <img
                        src={i === 1 ? '/assets/club-background.jpg' : '/assets/club-interior.jpg'}
                        alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div className="ev-proof__media-shade" />
                      <span className="ev-proof__badge">{p.badge}</span>
                    </div>
                    <div className="ev-proof__body">
                      <span className="ev-proof__type">{p.type}</span>
                      <h3 className="ev-proof__name">{p.name}</h3>
                      <p className="ev-proof__desc">{p.desc}</p>
                      {p.cta && (
                        <ProofVideoButton label={p.cta.label} embedSrc={p.cta.embedSrc} />
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* §6 How It Works */}
        <EventsHowSection />

        {/* §7 Gallery */}
        <section id="gallery" className="ff-section" style={{ paddingTop: 0 }}>
          <div className="ff-section__inner">
            <Reveal className="ff-section-head">
              <span className="ff-tag">галерея</span>
              <h2 className="ff-section-head__title">АТМОСФЕРА</h2>
            </Reveal>
            <div className="ev-gallery">
              {GALLERY.map((g, i) => (
                <div
                  key={i}
                  className={`ev-gallery__cell ${g.span === 'tall' ? 'ev-gallery__cell--tall' : g.span === 'wide' ? 'ev-gallery__cell--wide' : ''}`}
                >
                  <div className="ev-gallery__tile">
                    <Image src={g.src} alt={g.label} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                    <div className="ev-gallery__overlay">
                      <span className="ev-gallery__label">{g.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* §8 Form */}
        <Suspense fallback={null}>
          <EventsForm />
        </Suspense>

        {/* §9 FAQ */}
        <EventsFAQ items={FAQ_ITEMS} />
      </main>
      <Footer />
      <MobileStickyBar label="ЗАБРОНИРОВАТЬ МЕРОПРИЯТИЕ" href="#form" />
    </>
  )
}
