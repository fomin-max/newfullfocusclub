import type { Metadata } from 'next'
import Image from 'next/image'
import ProgressBar from '@/components/ui/ProgressBar'
import Ticker from '@/components/ui/Ticker'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import MobileStickyBar from '@/components/ui/MobileStickyBar'
import Reveal from '@/components/ui/Reveal'
import FranchiseHero from '@/components/franchise/FranchiseHero'
import FranchiseStats from '@/components/franchise/FranchiseStats'
import FranchiseFinalCTA from '@/components/franchise/FranchiseFinalCTA'
import FranchiseFAQ from '@/components/franchise/FranchiseFAQ'
import FranchiseRoadmap from '@/components/franchise/FranchiseRoadmap'
import './franchise.css'

export const metadata: Metadata = {
  title: 'Франшиза Full Focus — Компьютерный и киберспортивный клуб нового поколения',
  description:
    'Франшиза компьютерного и киберспортивного клуба Full Focus: готовая бизнес-модель, IT-экосистема (Hub, Club, Pay), поддержка на каждом шаге. От 7 млн ₽, окупаемость от 10 мес. 7 клубов в сети.',
  keywords: 'франшиза компьютерного клуба, франшиза киберспортивного клуба, открыть компьютерный клуб, франшиза игрового клуба, франшиза клуба СПб',
  metadataBase: new URL('https://fullfocusclub.ru'),
  alternates: { canonical: '/franchise' },
  openGraph: {
    title: 'Франшиза Full Focus — Компьютерный и киберспортивный клуб нового поколения',
    description: 'Франшиза компьютерного и киберспортивного клуба. Готовая IT-экосистема, проверенная бизнес-модель. От 7 млн ₽, окупаемость от 10 мес.',
    url: 'https://fullfocusclub.ru/franchise',
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
        { '@type': 'ListItem', position: 2, name: 'Франшиза', item: 'https://fullfocusclub.ru/franchise' },
      ],
    },
    {
      '@type': 'Offer',
      name: 'Франшиза Full Focus Club',
      description: 'Готовая IT-экосистема и бизнес-модель компьютерного и киберспортивного клуба нового поколения.',
      url: 'https://fullfocusclub.ru/franchise',
      seller: { '@type': 'Organization', name: 'Full Focus Club', url: 'https://fullfocusclub.ru' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Это франшиза компьютерного клуба или киберспортивного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Full Focus — это франшиза компьютерного клуба нового поколения с киберспортивной концепцией. Вы открываете современный компьютерный клуб под брендом Full Focus: мощные ПК RTX, зоны PS5, арены для турниров. Подходит как для аудитории "просто поиграть", так и для киберспортивного сообщества.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько стоит открыть компьютерный клуб по франшизе Full Focus?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Инвестиции зависят от формата: СТАРТ (90–130 м²) — от 7 млн ₽, КЛУБ (140–200 м²) — от 12 млн ₽, АРЕНА (250+ м²) — от 20 млн ₽. Окупаемость — от 10 месяцев.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как открыть киберспортивный клуб по франшизе в своём городе?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оставьте заявку на сайте — наш менеджер свяжется в течение 24 часов. Весь процесс: выбор формата → подбор помещения → дизайн → оборудование → IT-система → обучение → открытие. Поддержка на каждом шаге.',
          },
        },
      ],
    },
  ],
}

/* ─── Data ─────────────────────────────────────────────────── */
const CLUBS_REVENUE = [
  { city: 'Санкт-Петербург', format: 'Клуб',  area: '180 м²', pcs: '32', ps: '4', revenue: '2.4 млн ₽' },
  { city: 'Махачкала',       format: 'Арена',  area: '420 м²', pcs: '52', ps: '4', revenue: '3.8 млн ₽' },
  { city: 'Санкт-Петербург', format: 'Старт',  area: '110 м²', pcs: '22', ps: '4', revenue: '1.6 млн ₽' },
]

const VALUES = [
  { name: 'Качество',     desc: 'Топовое железо и стабильная инфраструктура. RTX 4080 — не предел, а стандарт.' },
  { name: 'Комфорт',      desc: 'Атмосфера, удобство, сервис. Каждая деталь продумана для полного погружения.' },
  { name: 'Прозрачность', desc: 'Честные тарифы, понятные условия. Открытые цифры по каждому клубу сети.' },
  { name: 'Технологии',   desc: 'Технологии завтра — стандарт Full Focus сегодня. Собственная IT-разработка.' },
]

const IT_PRODUCTS = [
  {
    url: 'fullfocushub.ru',
    name: 'FULL FOCUS HUB',
    body: 'ERP-система управления сетью клубов. Аналитика, бронирование, задачи, активы, персонал. Собственная разработка.',
    role: 'Управление',
    beamDelay: '0s',
  },
  {
    url: 'fullfocusclub.ru',
    name: 'FULL FOCUS CLUB',
    body: 'Сайт-витрина для клиентов. Тарифы, акции, онлайн-бронирование. Подключение каждого нового клуба — за минуты.',
    role: 'Клиентский фронт',
    beamDelay: '-0.8s',
  },
  {
    url: 'fullfocuspay.ru',
    name: 'FULL FOCUS PAY',
    body: 'Пополнение Steam и зарубежных игровых платформ. Дополнительный источник дохода для партнёра.',
    role: 'Доп. выручка',
    beamDelay: '-1.6s',
  },
]

const PACKAGE_ITEMS = [
  { n: '01', name: 'Готовая бизнес-модель',     desc: 'Финансовая модель, регламенты, тарифная сетка под формат и регион.' },
  { n: '02', name: 'Дизайн и интерьер',          desc: 'Брендовые решения интерьера от команды Full Focus.' },
  { n: '03', name: 'Оборудование',               desc: 'Прямые контракты с поставщиками. Скидки сети.' },
  { n: '04', name: 'IT-система под ключ',        desc: 'Hub, Club и Pay — настроены и подключены к открытию.' },
  { n: '05', name: 'Маркетинг и продвижение',    desc: 'Запуск рекламных кампаний, SMM, контент.' },
  { n: '06', name: 'Обучение и поддержка',       desc: 'Тренинг команды, постоянный канал связи с основателем.' },
]

const FORMATS = [
  {
    name: 'СТАРТ',
    area: '90–130 м²',
    pcs: '20–25 ПК',
    extras: '1–2 консоли',
    price: '7',
    featured: false,
  },
  {
    name: 'КЛУБ',
    area: '150–200 м²',
    pcs: '30–35 ПК',
    extras: '4+ консолей',
    price: '10',
    featured: true,
  },
  {
    name: 'АРЕНА',
    area: '200–600 м²',
    pcs: '40+ ПК',
    extras: 'консоли · бильярд · покер',
    price: '15',
    featured: false,
  },
]

const GALLERY = [
  { kind: 'photo', src: '/clubs/vasilyeostrovsky/gallery/01.jpg', city: 'Санкт-Петербург', name: 'FF · Василеостровская', pos: 'center' },
  { kind: 'photo', src: '/clubs/makhachkala/gallery/01.jpg',      city: 'Махачкала',       name: 'FF · Арена',            pos: '70% center' },
  { kind: 'photo', src: '/clubs/elektrosila/gallery/01.jpg',      city: 'Санкт-Петербург', name: 'FF · Электросила',      pos: 'center' },
  { kind: 'photo', src: '/clubs/komendantsky/gallery/01.jpg',     city: 'Санкт-Петербург', name: 'FF · Комендантский',    pos: 'center' },
]

const STEPS = [
  { n: '01', name: 'Заявка',   desc: 'Оставляешь контакты. Получаешь пакет документов.' },
  { n: '02', name: 'Встреча',  desc: 'Звонок с основателем. Разбор города и формата.' },
  { n: '03', name: 'Договор',  desc: 'Подписываем договор. Закрепляем территорию.' },
  { n: '04', name: 'Запуск',   desc: 'Помещение, ремонт, оборудование, IT-инфраструктура.' },
  { n: '05', name: 'Открытие', desc: 'Маркетинг, обучение команды, гранд-опенинг.' },
]

const FAQ_ITEMS = [
  {
    q: 'Сколько стоит открытие клуба по франшизе Full Focus?',
    a: 'Инвестиции от 7 млн ₽. Точная сумма зависит от площади помещения, города и формата. Свяжитесь с нами — рассчитаем под ваши условия.',
  },
  {
    q: 'Каков срок окупаемости?',
    a: 'Средний срок окупаемости — от 10 месяцев. В крупных городах с высоким трафиком — быстрее.',
  },
  {
    q: 'Нужен ли опыт в киберспорте или IT?',
    a: 'Нет. Достаточно предпринимательского опыта и желания работать. Мы обучаем команду и передаём все операционные процессы.',
  },
  {
    q: 'Что входит в IT-экосистему франшизы?',
    a: 'Три продукта: Full Focus Hub (ERP-управление), Full Focus Club (сайт-витрина), Full Focus Pay (пополнение Steam и платформ). Всё настраивается и подключается до открытия.',
  },
  {
    q: 'Помогаете ли с подбором помещения?',
    a: 'Да. Помогаем с поиском локации, переговорами с арендодателем и согласованием планировки.',
  },
  {
    q: 'Можно ли открыть клуб в другом городе?',
    a: 'Да. Рассматриваем города-миллионники и крупные региональные центры. Напишите — обсудим потенциал вашего рынка.',
  },
]

export default function FranchisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <ProgressBar />
      <Ticker />
      <Header />
      <main className="fr-page">

        {/* §1 Hero — video background */}
        <FranchiseHero />

        {/* §2 Stats — count-up strip */}
        <FranchiseStats />

        {/* §3 Revenue — real club cards */}
        <section className="ff-section" id="revenue">
          <div className="ff-section__inner">
            <Reveal>
              <div className="ff-section-head">
                <span className="ff-tag">Показатели</span>
                <h2 className="ff-section-head__title">Показатели наших клубов</h2>
                <p className="ff-section-head__sub">
                  Реальные цифры из действующих клубов сети. Эти данные мы открыто
                  показываем партнёрам — никаких маркетинговых округлений.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="ff-revenue__grid">
                {CLUBS_REVENUE.map((c, i) => (
                  <div className="ff-card" key={i}>
                    <div className="ff-card__glow" />
                    <div className="ff-club-card" style={{ position: 'relative', zIndex: 1 }}>
                      <div className="ff-club-card__head">
                        <span className="ff-club-card__city">{c.city}</span>
                        <span className="ff-club-card__format">· {c.format}</span>
                      </div>
                      <dl className="ff-club-card__meta">
                        <div><dt>Площадь</dt><dd>{c.area}</dd></div>
                        <div><dt>PC</dt><dd>{c.pcs}</dd></div>
                        <div><dt>PS</dt><dd>{c.ps}</dd></div>
                      </dl>
                      <div className="ff-club-card__revenue">
                        <span className="ff-club-card__revenue-pre">Выручка · апр. 2025</span>
                        <strong>{c.revenue}</strong>
                        <span className="ff-flag">[ ДАННЫЕ ПО ЗАПРОСУ ]</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ textAlign: 'center' }}>
                <a href="#contacts" className="ff-btn ff-btn--primary ff-btn--lg">
                  ПОЛУЧИТЬ ПОЛНУЮ СТАТИСТИКУ
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* §4 Concept */}
        <section className="ff-section ff-concept" id="about">
          <div className="ff-section__inner">
            <Reveal>
              <div className="ff-concept__grid">
                <div>
                  <div className="ff-section-head" style={{ marginBottom: 24 }}>
                    <span className="ff-tag">О франшизе</span>
                    <h2 className="ff-section-head__title">
                      Мы — не&nbsp;просто{' '}
                      <span className="ff-gradient-text">компьютерный клуб</span>
                    </h2>
                    <p className="ff-section-head__sub">
                      Full Focus — высокотехнологичное пространство нового поколения, где
                      комфорт, визуальный стиль и киберкультура сливаются в цельный,
                      запоминающийся опыт. Мы создаём цифровую реальность, в которой
                      игрок — главный герой.
                    </p>
                  </div>
                  <div className="ff-concept__values">
                    {VALUES.map(v => (
                      <div className="ff-value" key={v.name}>
                        <span className="ff-value__name">{v.name}</span>
                        <span className="ff-value__desc">{v.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ff-concept__media">
                  <Image src="/assets/club-interior.jpg" alt="Full Focus Club — интерьер" fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* §5 IT Ecosystem */}
        <section className="ff-section" id="it">
          <div className="ff-section__inner">
            <Reveal>
              <div className="ff-section-head">
                <span className="ff-tag">IT-экосистема</span>
                <h2 className="ff-section-head__title">
                  Собственная{' '}
                  <span className="ff-gradient-text">IT-экосистема</span>
                </h2>
                <p className="ff-section-head__sub">
                  Три продукта, которые работают на твой бизнес — уже включены во
                  франшизу. Без доплат, без сторонних подрядчиков.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="ff-it__grid">
                {IT_PRODUCTS.map((p, i) => (
                  <div
                    key={i}
                    className="ff-card ff-it-card"
                    style={{ '--beam-delay': p.beamDelay } as React.CSSProperties}
                  >
                    <div className="ff-card__glow" />
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', gap: 'inherit' }}>
                      <div className="ff-it-card__url">{p.url}</div>
                      <div className="ff-it-card__name">{p.name}</div>
                      <p className="ff-it-card__body">{p.body}</p>
                      <div className="ff-it-card__sig">// {p.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="ff-it__footer">
                Всё это входит во&nbsp;франшизу.{' '}
                <span className="accent">Без дополнительных платежей.</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* §6 Package Grid */}
        <section className="ff-section ff-package" id="package">
          <div className="ff-section__inner">
            <Reveal>
              <div className="ff-section-head">
                <span className="ff-tag">Что входит</span>
                <h2 className="ff-section-head__title">Поддержка на каждом шаге</h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="ff-pack__grid">
                {PACKAGE_ITEMS.map(it => (
                  <div key={it.n} className="ff-card ff-pack-card">
                    <div className="ff-card__glow" />
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div className="ff-pack-card__num">[ {it.n} ]</div>
                      <div className="ff-pack-card__name">{it.name}</div>
                      <div className="ff-pack-card__desc">{it.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* §7 Formats */}
        <section className="ff-section" id="formats">
          <div className="ff-section__inner">
            <Reveal>
              <div className="ff-section-head">
                <span className="ff-tag">Форматы</span>
                <h2 className="ff-section-head__title">Выбери свой формат</h2>
                <p className="ff-section-head__sub">
                  От компактного старта до арены с консолями и зоной для турниров.
                  Точный расчёт инвестиций — после первого разговора.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="ff-formats__grid">
                {FORMATS.map((f, i) => (
                  <div
                    key={i}
                    className={`ff-card ff-format-card${f.featured ? ' is-featured' : ''}`}
                    style={{ position: 'relative' }}
                  >
                    {f.featured && (
                      <span className="ff-format-card__badge">★ Рекомендуем</span>
                    )}
                    <div className="ff-card__glow" />
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 18, height: '100%' }}>
                      <div className="ff-format-card__name">{f.name}</div>
                      <dl className="ff-format-card__meta">
                        <div className="ff-format-card__row"><dt>Площадь</dt><dd>{f.area}</dd></div>
                        <div className="ff-format-card__row"><dt>PC</dt><dd>{f.pcs}</dd></div>
                        <div className="ff-format-card__row"><dt>Дополнительно</dt><dd>{f.extras}</dd></div>
                      </dl>
                      <div>
                        <div className="ff-format-card__price">
                          <small>от · </small>{f.price} млн ₽
                        </div>
                      </div>
                      <div style={{ marginTop: 'auto' }}>
                        <a
                          href="#contacts"
                          className={`ff-btn ${f.featured ? 'ff-btn--primary' : 'ff-btn--secondary'} ff-btn--sm ff-btn--block`}
                        >
                          Подобрать {f.name}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ marginTop: 40, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--ff-font-body)', color: 'var(--ff-system-fog)', fontSize: 14 }}>
                  Точный расчёт — бесплатно после заявки
                </span>
                <a href="#contacts" className="ff-btn ff-btn--primary ff-btn--lg is-pulse">
                  ОСТАВИТЬ ЗАЯВКУ
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* §8 Gallery */}
        <section className="ff-section" id="gallery">
          <div className="ff-section__inner">
            <Reveal>
              <div className="ff-section-head">
                <span className="ff-tag">Галерея</span>
                <h2 className="ff-section-head__title">Как выглядят клубы Full Focus</h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="ff-gallery__grid">
                {GALLERY.map((p, i) => (
                  <div
                    key={i}
                    className={`ff-gallery__cell ff-gallery__cell--${p.kind}`}
                  >
                    {p.kind === 'photo' ? (
                      <img
                        src={p.src}
                        alt={p.name}
                        style={{ objectPosition: (p as { pos?: string }).pos }}
                      />
                    ) : (
                      <div className="ff-gallery__soon">
                        <span>Фото клуба</span>
                        <strong>СКОРО</strong>
                      </div>
                    )}
                    <div className="ff-gallery__label">
                      <span>{p.city}</span>
                      {p.name}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* §9 Steps */}
        <FranchiseRoadmap />

        {/* §10 Final CTA */}
        <FranchiseFinalCTA />

        {/* §11 FAQ */}
        <FranchiseFAQ items={FAQ_ITEMS} />

      </main>
      <Footer />
      <MobileStickyBar label="ОСТАВИТЬ ЗАЯВКУ" href="#contacts" />
    </>
  )
}
