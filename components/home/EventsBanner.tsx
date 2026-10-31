import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

export default function EventsBanner() {
  return (
    <section id="events" className="ff-section">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-events-banner">
            <div className="ff-events-banner__text">
              <span className="ff-banner__hash">//// МЕРОПРИЯТИЯ</span>
              <h3 className="ff-banner__title">
                Корпоратив, день рождения или закрытый турнир?
              </h3>
              <p className="ff-banner__sub">
                Организуем мероприятие под ключ в любом клубе сети. Кейтеринг, ведущий, кастомные награды, прямой эфир — всё включено.
              </p>
              <div className="ff-events-banner__actions">
                <a href="/events" className="ff-btn ff-btn--primary">
                  Подробнее <Icon name="arrowRight" size={14} />
                </a>
                <a href="/events#form" className="ff-btn ff-btn--secondary">
                  Оставить заявку
                </a>
              </div>
            </div>
            <div
              className="ff-events-banner__photo"
              style={{ backgroundImage: 'url(/assets/club-interior.jpg)' }}
              aria-hidden="true"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
