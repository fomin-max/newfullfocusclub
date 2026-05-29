/* EventsFranchise.jsx — §11 Events full-width banner (franchise moved out) */
const { Section, Reveal, Icon } = window.FF;

const EventsFranchise = () => (
  <Section id="events">
    <Reveal>
      <a id="events-inner" href="#" className="ff-events-banner">
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
          style={{ backgroundImage: 'url(assets/club-interior.jpg)' }}
          aria-hidden="true"
        />
      </a>
    </Reveal>
  </Section>
);

window.FF.EventsFranchise = EventsFranchise;
