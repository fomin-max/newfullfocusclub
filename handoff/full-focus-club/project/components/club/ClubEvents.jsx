/* ClubEvents.jsx — §7 events cards */
const ClubEvents = () => {
  const { Button, Reveal } = window.FF;
  const { EVENTS } = window.CLUB_DATA;
  const Icon = window.CI;

  const events = EVENTS || [
    {
      icon: 'briefcase',
      name: 'КОРПОРАТИВ',
      desc: 'Аренда клуба или отдельных зон. Кейтеринг, ведущий, кастомные награды, прямой эфир турнира между отделами.',
    },
    {
      icon: 'cake',
      name: 'ДЕНЬ РОЖДЕНИЯ',
      desc: 'Закажи клуб для своей компании. Своя кухня, атмосфера, турнир между гостями.',
      badge: 'ДЕПОЗИТ × 2 В ДЕНЬ ДР',
    },
    {
      icon: 'trophy',
      name: 'ЗАКРЫТЫЙ ТУРНИР',
      desc: 'Арендуй ARENA 5×5 для командного турнира. Проектор, трансляция, призы.',
      badge: 'ТОЛЬКО ЗДЕСЬ',
    },
  ];

  return (
    <section id="events" className="ff-section" data-screen-label="07 · МЕРОПРИЯТИЯ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-section-head">
            <span className="ff-tag">— организуем под ключ</span>
            <h2 className="ff-section-head__title">ПРОВЕДИ МЕРОПРИЯТИЕ В КЛУБЕ</h2>
            <p className="ff-section-head__sub">
              Корпоратив, день рождения или закрытый турнир — берём на себя сценарий,
              кейтеринг, технику и призы.
            </p>
          </div>
        </Reveal>

        <div className="cl-events__grid">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={80 + i * 150}>
              <article className="cl-event">
                <span className="cl-event__icon"><Icon name={e.icon} size={26} /></span>
                <h3 className="cl-event__name">{e.name}</h3>
                <p className="cl-event__desc">{e.desc}</p>
                {e.badge && <span className="cl-event__badge">★ {e.badge}</span>}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="cl-events__cta">
            <Button variant="primary" pulse
                    onClick={() => window.openBooking && window.openBooking('event')}>
              ОСТАВИТЬ ЗАЯВКУ НА МЕРОПРИЯТИЕ →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.ClubEvents = ClubEvents;
