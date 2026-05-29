'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'

const FAQS = [
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

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className={`ff-faq__item ${open ? 'is-open' : ''}`}>
      <button type="button" className="ff-faq__q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        <span className="ff-faq__plus" aria-hidden="true">+</span>
      </button>
      <div className="ff-faq__a"><p>{a}</p></div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head center">
          <span className="ff-tag">Частые вопросы</span>
          <h2 className="ff-section-head__title">Что важно знать</h2>
          <p className="ff-section-head__sub">Если ответа нет — напишите в Telegram, ответим за минуту.</p>
        </Reveal>
        <div className="ff-faq__grid">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <FaqItem q={f.q} a={f.a} defaultOpen={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
