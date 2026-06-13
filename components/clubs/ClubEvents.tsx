'use client'

import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import { useClubData } from './ClubDataContext'
import type { IconName } from '@/components/ui/Icon'

export default function ClubEvents() {
  const { EVENTS, CLUB } = useClubData()
  return (
    <section id="events" className="ff-section" data-screen-label="07 · МЕРОПРИЯТИЯ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-section-head">
            <span className="ff-tag">организуем под ключ</span>
            <h2 className="ff-section-head__title">ПРОВЕДИ МЕРОПРИЯТИЕ В КЛУБЕ</h2>
            <p className="ff-section-head__sub">
              Корпоратив, день рождения или закрытый турнир — берём на себя сценарий, кейтеринг, технику и призы.
            </p>
          </div>
        </Reveal>
        <div className="cl-events__grid">
          {EVENTS.map((e, i) => (
            <Reveal key={e.name} delay={80 + i * 150}>
              <div className={e.badge ? 'cl-event__outer' : undefined}>
                {e.badge && <span className="cl-event__badge">★ {e.badge}</span>}
                <article className="cl-event">
                  <span className="cl-event__icon"><Icon name={e.icon as IconName} size={26} /></span>
                  <h3 className="cl-event__name">{e.name}</h3>
                  <p className="cl-event__desc">{e.desc}</p>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div className="cl-events__cta">
            <a className="ff-btn ff-btn--primary is-pulse" href={`/events?club=${CLUB.SLUG}#form`}>
              ОСТАВИТЬ ЗАЯВКУ НА МЕРОПРИЯТИЕ →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
