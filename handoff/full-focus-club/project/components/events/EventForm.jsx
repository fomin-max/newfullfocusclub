/* EventForm.jsx — §8 application form (2-col) + success state */
const { useState: useStateEF, useRef: useRefEF, useEffect: useEffectEF } = React;

const EventForm = () => {
  const { Reveal } = window.FF;
  const Icon = window.EI;
  const { FORM_TYPES, FORM_CLUBS } = window.EVENTS_DATA;

  const [type, setType]       = useStateEF(FORM_TYPES[0]);
  const [club, setClub]       = useStateEF(FORM_CLUBS[0]);
  const [date, setDate]       = useStateEF('');
  const [people, setPeople]   = useStateEF('');
  const [name, setName]       = useStateEF('');
  const [contact, setContact] = useStateEF('');
  const [comment, setComment] = useStateEF('');
  const [done, setDone]       = useStateEF(false);

  const btnRef = useRefEF(null);

  // Magnetic CTA (desktop only)
  useEffectEF(() => {
    const el = btnRef.current;
    if (!el) return;
    if (window.matchMedia('(max-width: 1023px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${Math.max(-8, Math.min(8, mx * 0.18))}px, ${Math.max(-8, Math.min(8, my * 0.3))}px)`;
    };
    const onLeave = () => { el.style.transform = 'translate(0,0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [done]);

  const submit = (e) => {
    e.preventDefault();
    // Production: POST → Telegram Bot webhook → уведомление менеджеру.
    setDone(true);
  };

  return (
    <section id="form" className="ff-section ev-form-sec" data-screen-label="08 · ЗАЯВКА">
      <div className="ev-form-sec__bg" />
      <div className="ff-section__inner ev-form-sec__inner">
        <Reveal className="ff-section-head center">
          <span className="ff-tag">— свяжемся за 15 минут</span>
          <h2 className="ff-section-head__title">ОСТАВИТЬ ЗАЯВКУ</h2>
          <p className="ff-section-head__sub">Свяжемся в течение 15 минут в Telegram.</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="ev-form-card">
            {!done ? (
              <form className="ev-form" onSubmit={submit}>
                <div className="ev-form__col">
                  <div className="ev-field">
                    <label>Тип мероприятия</label>
                    <div className="ev-select">
                      <select value={type} onChange={(e) => setType(e.target.value)}>
                        {FORM_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                      <span className="ev-select__arr">▾</span>
                    </div>
                  </div>
                  <div className="ev-field">
                    <label>Клуб</label>
                    <div className="ev-select">
                      <select value={club} onChange={(e) => setClub(e.target.value)}>
                        {FORM_CLUBS.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <span className="ev-select__arr">▾</span>
                    </div>
                  </div>
                  <div className="ev-field-row">
                    <div className="ev-field">
                      <label>Дата</label>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="ev-field">
                      <label>Количество человек</label>
                      <input type="number" min="1" placeholder="20" value={people}
                             onChange={(e) => setPeople(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="ev-form__col">
                  <div className="ev-field">
                    <label>Имя</label>
                    <input type="text" placeholder="Как тебя зовут?" value={name}
                           onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="ev-field">
                    <label>Telegram или телефон</label>
                    <input type="text" placeholder="@username / +7" value={contact}
                           onChange={(e) => setContact(e.target.value)} required />
                  </div>
                  <div className="ev-field ev-field--grow">
                    <label>Комментарий</label>
                    <textarea placeholder="Расскажи подробнее о мероприятии" value={comment}
                              onChange={(e) => setComment(e.target.value)} />
                  </div>
                </div>

                <div className="ev-form__submit">
                  <button ref={btnRef} type="submit" className="ff-btn ff-btn--primary ff-btn--lg is-pulse"
                          style={{ width: '100%' }}>
                    ОТПРАВИТЬ ЗАЯВКУ <Icon name="arrowRight" size={15} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="ev-form__success">
                <span className="ev-form__success-mark"><Icon name="check" size={40} /></span>
                <h3>ЗАЯВКА ПРИНЯТА!</h3>
                <p>Свяжемся в течение 15 минут в Telegram.</p>
                <a className="ff-btn ff-btn--secondary" href="https://t.me/fullfocusclub" target="_blank" rel="noopener">
                  НАПИСАТЬ СЕЙЧАС <Icon name="telegram" size={15} />
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.EVENTS_PAGE = window.EVENTS_PAGE || {};
window.EVENTS_PAGE.EventForm = EventForm;
