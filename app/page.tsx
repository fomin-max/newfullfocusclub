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
      email: 'hello@fullfocusclub.ru',
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
      mainEntity: [
        { '@type': 'Question', name: 'Full Focus — это компьютерный клуб или киберспортивный?',
          acceptedAnswer: { '@type': 'Answer', text: 'Full Focus — это сеть современных компьютерных клубов нового поколения (киберспортивных клубов) в Санкт-Петербурге и Махачкале. 7 клубов с мощными ПК RTX 4090, зонами PS5, своей кухней и профессиональными турнирами.' } },
        { '@type': 'Question', name: 'Сколько стоит час игры в Full Focus?',
          acceptedAnswer: { '@type': 'Answer', text: 'От 120₽/час для школьников и студентов в будние дни пн-пт 10:00–16:00. Стандартный тариф — от 170₽/час.' } },
        { '@type': 'Question', name: 'Как забронировать место в компьютерном клубе Full Focus?',
          acceptedAnswer: { '@type': 'Answer', text: 'Оставьте заявку на сайте или напишите в Telegram @fullfocusclub. Бронь подтверждается в течение 15 минут.' } },
        { '@type': 'Question', name: 'Работаете ли вы круглосуточно?',
          acceptedAnswer: { '@type': 'Answer', text: 'Да, все клубы работают круглосуточно без выходных.' } },
        { '@type': 'Question', name: 'Есть ли PlayStation в клубах?',
          acceptedAnswer: { '@type': 'Answer', text: 'Да, во всех клубах есть зоны с PS5. На Василеостровской — также PS5 VIP Lounge.' } },
      ],
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
        <FAQ />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  )
}
