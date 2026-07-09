export const revalidate = 300

import ProgressBar from '@/components/ui/ProgressBar'
import Ticker from '@/components/ui/Ticker'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import MobileStickyBar from '@/components/ui/MobileStickyBar'
import Hero from '@/components/home/Hero'
import FindClub from '@/components/home/FindClub'
import SocialStats from '@/components/home/SocialStats'
import HowItWorks from '@/components/home/HowItWorks'
import Zones from '@/components/home/Zones'
import Promos from '@/components/home/Promos'
import Partners from '@/components/home/Partners'
import Loyalty from '@/components/home/Loyalty'
import Tournament from '@/components/home/Tournament'
import Reviews from '@/components/home/Reviews'
import FranchiseSection from '@/components/home/FranchiseSection'
import FFPay from '@/components/home/FFPay'
import EventsBanner from '@/components/home/EventsBanner'
import FAQ from '@/components/home/FAQ'

const FAQS = [
  { q: 'Full Focus — это компьютерный клуб или киберспортивный?',
    a: 'Full Focus — это сеть современных компьютерных клубов нового поколения (киберспортивных клубов) в Санкт-Петербурге и Махачкале. 7 клубов с мощными ПК RTX 5080, зонами PS5, своей кухней и профессиональными турнирами.' },
  { q: 'Сколько стоит час игры?',
    a: 'От 120₽/час для школьников и студентов в будние дни. Стандартный тариф — от 170₽/час. Подробные тарифы — на странице каждого клуба.' },
  { q: 'Как забронировать место?',
    a: 'Оставьте заявку на сайте через форму бронирования или напишите в Telegram-чат клуба. Администратор подтвердит свободные слоты за минуту.' },
  { q: 'Работаете ли вы круглосуточно?',
    a: 'Да, все клубы сети работают круглосуточно, без выходных. На ночной пакет действуют отдельные тарифы.' },
  { q: 'Есть ли PlayStation в клубах?',
    a: 'Да, во всех клубах есть зоны Lounge с PS5 — диваны, большие экраны, файтинги и кооперативные игры.' },
  { q: 'Какие игры установлены?',
    a: 'CS2, Dota 2, Valorant, Apex, PUBG, Fortnite, Genshin, GTA V, Cyberpunk и ещё 200+. Аккаунты Steam / Epic / Battle.net уже залогинены — садись и играй.' },
  { q: 'Можно ли прийти со своей периферией?',
    a: 'Да, на каждом месте есть USB-хаб и удобные точки подключения. Можешь принести свою мышь, наушники и клавиатуру.' },
]

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://fullfocusclub.ru/#organization',
      name: 'Full Focus Club',
      url: 'https://fullfocusclub.ru',
      logo: 'https://fullfocusclub.ru/assets/full-focus-wordmark.svg',
      telephone: '+78126605596',
      email: 'info@fullfocusclub.ru',
      sameAs: ['https://vk.com/fullfocusclub', 'https://t.me/fullfocusclub'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://fullfocusclub.ru/#website',
      url: 'https://fullfocusclub.ru',
      name: 'Full Focus Club',
      publisher: { '@id': 'https://fullfocusclub.ru/#organization' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

export default function Home() {
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
        <Hero />
        <FindClub />
        <SocialStats />
        <HowItWorks />
        <Zones />
        <Promos />
        <Partners />
        <Loyalty />
        <Tournament />
        <Reviews />
        <FranchiseSection />
        <FFPay />
        <EventsBanner />
        <FAQ items={FAQS} />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  )
}
