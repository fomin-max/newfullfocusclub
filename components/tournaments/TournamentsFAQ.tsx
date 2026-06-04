'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'

interface FAQItem { q: string; a: string }

export default function TournamentsFAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const toggle = (i: number) => setOpen(prev => (prev === i ? null : i))

  return (
    <section id="faq" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head center">
          <span className="ff-tag">частые вопросы</span>
          <h2 className="ff-section-head__title">FAQ</h2>
        </Reveal>
        <div className="ff-faq__grid">
          {items.map((item, i) => (
            <Reveal key={i} delay={40 * i}>
              <div className={`ff-faq__item ${open === i ? 'is-open' : ''}`}>
                <button className="ff-faq__q" onClick={() => toggle(i)} aria-expanded={open === i}>
                  {item.q}
                  <span className="ff-faq__plus">{open === i ? '×' : '+'}</span>
                </button>
                <div className="ff-faq__a">
                  <p>{item.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="ev-faq__cta">
          <a href="https://t.me/fullfocusclub" target="_blank" rel="noopener noreferrer"
             className="ff-btn ff-btn--secondary">
            Остались вопросы? Напишите нам
          </a>
        </div>
      </div>
    </section>
  )
}
