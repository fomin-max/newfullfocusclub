import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

export default function EventsBanner() {
  return (
    <section id="events" className="ff-section">
      <div className="ff-section__inner">
        <Reveal>
          <a href="/events" className="ff-events-banner">
            <div className="ff-events-banner__text">
              <span className="ff-banner__hash">//// МЕРОПРИЯТИЯ</span>
              <h3 className="ff-banner__title">
                Корпоратив, день рождения или закрытый турнир?
              </h3>
              <p className="ff-banner__sub">
                Организуем мероприятие под ключ в любом клубе сети. Кейтеринг, ведущий, кастомные награды, прямой эфир — всё включено.
              </p>
              <span className="ff-banner__cta ff-btn ff-btn--secondary" style={{ alignSelf: 'flex-start' }}>
                Оставить заявку <Icon name="arrowRight" size={14} />
              </span>
            </div>
            <div
              className="ff-events-banner__photo"
              style={{ backgroundImage: 'url(/assets/club-interior.jpg)' }}
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
