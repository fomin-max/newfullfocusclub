/* EventsFAQ.jsx — §9 accordion */
const { useState: useStateFAQ } = React;

const EventsFAQ = () => {
  const { Section, Reveal } = window.FF;
  const Icon = window.EI;
  const { FAQ } = window.EVENTS_DATA;
  const [open, setOpen] = useStateFAQ(0);

  return (
    <Section id="faq" label="— FAQ" title="ЧАСТЫЕ ВОПРОСЫ"
             sub="Если ответа нет — напиши в Telegram.">
      <div className="ff-faq__grid">
        {FAQ.map((it, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className={`ff-faq__item ${open === i ? 'is-open' : ''}`}>
              <button className="ff-faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
                {it.q}
                <span className="ff-faq__plus">+</span>
              </button>
              <div className="ff-faq__a">
                <p>{it.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="ev-faq__cta">
          <a className="ff-btn ff-btn--secondary" href="https://t.me/fullfocusclub" target="_blank" rel="noopener">
            НАПИСАТЬ В TELEGRAM <Icon name="telegram" size={15} />
          </a>
        </div>
      </Reveal>
    </Section>
  );
};

window.EVENTS_PAGE = window.EVENTS_PAGE || {};
window.EVENTS_PAGE.EventsFAQ = EventsFAQ;
