/* EventFormats.jsx — §2 three large format cards (tilt + glow) */
const EventFormats = () => {
  const { Section, Reveal, useTilt, Button } = window.FF;
  const Icon = window.EI;
  const { FORMATS } = window.EVENTS_DATA;

  const FormatCard = ({ f }) => {
    const tilt = useTilt({ max: 6 });
    return (
      <article
        ref={tilt}
        className={`ev-format ${f.featured ? 'is-featured' : ''}`}
      >
        <span className="ev-format__glow" />
        <div className="ev-format__body">
          <div className="ev-format__top">
            <span className="ev-format__icon"><Icon name={f.icon} size={28} /></span>
            {f.badge && <span className="ev-format__badge">{f.badge}</span>}
          </div>
          <h3 className="ev-format__name">{f.name}</h3>
          <p className="ev-format__desc">{f.desc}</p>
          <ul className="ev-format__details">
            {f.details.map((d, i) => (
              <li key={i}><span className="ev-format__tick">✓</span>{d}</li>
            ))}
          </ul>
          <a
            href="#form"
            className="ev-format__cta"
            onClick={(e) => { e.preventDefault(); document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
          >
            ОСТАВИТЬ ЗАЯВКУ <Icon name="arrowRight" size={13} />
          </a>
        </div>
      </article>
    );
  };

  return (
    <Section id="formats" label="— выбери формат" title="ВЫБЕРИ ФОРМАТ"
             sub="Три сценария под любую задачу — от закрытого корпоратива до киберспортивного турнира.">
      <div className="ev-formats__grid">
        {FORMATS.map((f, i) => (
          <Reveal key={f.name} delay={80 + i * 120}>
            <FormatCard f={f} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

window.EVENTS_PAGE = window.EVENTS_PAGE || {};
window.EVENTS_PAGE.EventFormats = EventFormats;
