'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'

const PARTNERS = [
  { slug: 'dodo',        name: 'Dodo Pizza', note: 'Пицца с доставкой прямо к игровому месту' },
  { slug: 'ketchup',     name: 'Ketchup',    note: 'Рестораны-партнёры — еда и напитки для гостей' },
  { slug: 'gorilla',     name: 'Gorilla',    note: 'Энергетики — топливо для долгой катки' },
  { slug: 'dobry_red',   name: 'Добрый',     note: 'Натуральные соки и нектары для гостей клуба' },
  { slug: 'rich',        name: 'Rich',       note: 'Премиальные соки и нектары в барной зоне' },
  { slug: 'borjomi',     name: 'Borjomi',    note: 'Минеральная вода — восстанавливайся между матчами' },
]

function PartnerLogo({ slug, name }: { slug: string; name: string }) {
  const [err, setErr] = useState(false)
  return (
    <div className="ff-partner__logo">
      {err
        ? <span className="ff-partner__logo-placeholder">{name}</span>
        : <img
            src={`/partners/${slug}.png`}
            alt={name}
            onError={() => setErr(true)}
            style={{ objectFit: 'contain', maxWidth: 160, maxHeight: 80 }}
          />
      }
    </div>
  )
}

export default function Partners() {
  return (
    <section className="ff-section" id="partners">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Партнёры</span>
          <h2 className="ff-section-head__title">С нами — лучшие</h2>
          <p className="ff-section-head__sub">Бренды, которые усиливают опыт в клубах Full Focus.</p>
        </Reveal>
        <div className="ff-partners__grid">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Card className="ff-partner">
                <PartnerLogo slug={p.slug} name={p.name} />
                <div className="ff-partner__name">{p.name}</div>
                <p className="ff-partner__note">{p.note}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
