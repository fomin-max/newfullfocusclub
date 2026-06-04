'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import { CLUB_FAQS } from '@/lib/clubs/aggregatorData'

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

export default function ClubsFAQ() {
  return (
    <section id="faq" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head ff-section-head--center">
          <span className="ff-tag">Частые вопросы</span>
          <h2 className="ff-section-head__title">Что важно знать о клубах</h2>
          <p className="ff-section-head__sub">
            Если ответа нет — напиши в Telegram, ответим за минуту.
          </p>
        </Reveal>
        <div className="ff-faq__grid">
          {CLUB_FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <FaqItem q={f.q} a={f.a} defaultOpen={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
