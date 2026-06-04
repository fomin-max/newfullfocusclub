'use client'

import Reveal from '@/components/ui/Reveal'
import Card from '@/components/ui/Card'
import Icon from '@/components/ui/Icon'
import { CHOOSE } from '@/lib/clubs/aggregatorData'

export default function ClubsChoose() {
  const pickZone = (zone: string) => {
    window.dispatchEvent(new CustomEvent('cla-set-zone', { detail: zone }))
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="choose" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Как выбрать</span>
          <h2 className="ff-section-head__title">Под твой сценарий</h2>
          <p className="ff-section-head__sub">
            Не знаешь, какой клуб твой? Выбери, зачем идёшь — подсветим клубы с нужной зоной.
          </p>
        </Reveal>

        <div className="cla-choose">
          {CHOOSE.map((c, i) => (
            <Reveal key={c.zone} delay={(i % 4) * 80}>
              <Card className="cla-choose__card" brackets>
                <span className="cla-choose__icon">
                  <Icon name={c.icon} size={24} />
                </span>
                <h3 className="cla-choose__title">{c.title}</h3>
                <p className="cla-choose__desc">{c.desc}</p>
                <button type="button" className="cla-choose__zone" onClick={() => pickZone(c.zone)}>
                  Показать клубы · {c.zone} <Icon name="arrowRight" size={14} />
                </button>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
