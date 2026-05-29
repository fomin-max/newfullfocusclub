/* TournamentCalendar.jsx — §5 calendar of tournaments (active + upcoming cards) */
const TournamentCalendar = () => {
  const { Section, Reveal } = window.FF;
  const Icon = window.TI;
  const { CALENDAR } = window.TOURN_DATA;

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Section id="calendar" label="— КАЛЕНДАРЬ" title="КАЛЕНДАРЬ"
             sub="Турниры каждый месяц — следи за анонсами.">
      <div className="tn-cal__grid">
        {CALENDAR.map((c, i) => (
          <Reveal key={c.id} delay={i * 100}>
            <div className={`tn-cal ${c.status === 'soon' ? 'is-soon' : 'is-active'}`}>
              <span className={`tn-cal__badge ${c.status === 'soon' ? 'is-outline' : ''}`}>
                {c.badge}
              </span>
              <span className="tn-cal__date">{c.date}</span>
              <h3 className="tn-cal__title">{c.title}</h3>

              {c.prize && (
                <div className="tn-cal__prize">
                  <span className="tn-cal__prize-lbl">Призовой</span>
                  <span className="tn-cal__prize-val">{c.prize}</span>
                </div>
              )}
              {c.note && <p className="tn-cal__note">{c.note}</p>}

              <div className="tn-cal__foot">
                {c.cta.target ? (
                  <button className="ff-btn ff-btn--primary ff-btn--sm" onClick={() => scrollTo(c.cta.target)}>
                    {c.cta.label} <Icon name="arrowRight" size={13} />
                  </button>
                ) : (
                  <a className="ff-btn ff-btn--ghost ff-btn--sm" href={c.cta.href} target="_blank" rel="noopener">
                    {c.cta.label} <Icon name="telegram" size={13} />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

window.TOURN_PAGE = window.TOURN_PAGE || {};
window.TOURN_PAGE.TournamentCalendar = TournamentCalendar;
