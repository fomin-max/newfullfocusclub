'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import FaqAnswer from '@/components/ui/FaqAnswer'
import { useClubData } from './ClubDataContext'
import { buildMetroFaqItem } from '@/lib/clubs/schema'

export default function ClubFAQ() {
  const clubData = useClubData()
  const FAQ = [buildMetroFaqItem(clubData), ...clubData.FAQ]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="ff-section" data-screen-label="FAQ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-section-head">
            <span className="ff-tag">частые вопросы</span>
            <h2 className="ff-section-head__title">ВОПРОСЫ И ОТВЕТЫ</h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <dl className="cl-faq">
            {FAQ.map((item, i) => (
              <div key={i} className={`cl-faq__item ${open === i ? 'is-open' : ''}`}>
                <dt>
                  <button
                    className="cl-faq__q"
                    aria-expanded={open === i}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    {item.q}
                    <span className="cl-faq__sign">{open === i ? '−' : '+'}</span>
                  </button>
                </dt>
                <dd className="cl-faq__a">
                  <p><FaqAnswer text={item.a} links={item.links} /></p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
