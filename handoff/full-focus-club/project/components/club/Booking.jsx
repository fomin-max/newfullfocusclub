/* Booking.jsx — §9 fullscreen booking modal + sticky CTA */
const { useState: useStateBK, useEffect: useEffectBK, useRef: useRefBK } = React;

const StickyCTA = () => {
  const { Button } = window.FF;
  const [show, setShow] = useStateBK(false);
  useEffectBK(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`cl-sticky ${show ? 'is-show' : ''}`}>
      <Button variant="primary" pulse
              onClick={() => window.openBooking && window.openBooking()}>
        ЗАБРОНИРОВАТЬ →
      </Button>
    </div>
  );
};

const Booking = () => {
  const { CLUB, CLUB_ZONES } = window.CLUB_DATA;
  const { Button } = window.FF;
  const [open, setOpen]   = useStateBK(false);
  const [step, setStep]   = useStateBK(1);
  const [zone, setZone]   = useStateBK(null);
  const [date, setDate]   = useStateBK('');
  const [slot, setSlot]   = useStateBK(null);
  const [name, setName]   = useStateBK('');
  const [contact, setCtct]= useStateBK('');
  const [done, setDone]   = useStateBK(false);

  // Default date = today
  useEffectBK(() => {
    if (!date) {
      const d = new Date();
      const iso = d.toISOString().split('T')[0];
      setDate(iso);
    }
  }, []);

  // Expose openBooking globally
  useEffectBK(() => {
    window.openBooking = (zid) => {
      setOpen(true);
      setDone(false);
      setStep(1);
      if (zid && CLUB_ZONES.find(z => z.id === zid)) setZone(zid);
    };
    return () => { window.openBooking = null; };
  }, []);

  // Lock body scroll while open
  useEffectBK(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  const SLOTS = ['10:00','12:00','14:00','16:00','18:00','20:00','22:00','00:00','02:00','04:00','06:00','08:00'];

  const submit = () => {
    // In production → POST to Telegram Bot webhook.
    // Here we just play the success screen.
    setDone(true);
  };

  return (
    <>
      <StickyCTA />
      <div className={`cl-modal ${open ? 'is-open' : ''}`}
           role="dialog" aria-modal="true" aria-label="Бронирование">
        <div className="cl-modal__inner">
          <button className="cl-modal__close" onClick={close} aria-label="Закрыть">✕</button>

          {!done && (
            <>
              <div className="cl-modal__bar">
                <div className={step >= 1 ? 'on' : ''} />
                <div className={step >= 2 ? 'on' : ''} />
                <div className={step >= 3 ? 'on' : ''} />
              </div>
              <div className="cl-modal__step-label">
                <strong>0{step}</strong> / 03 · {['ВЫБЕРИ ЗОНУ','ДАТА И ВРЕМЯ','КОНТАКТЫ'][step-1]}
              </div>
            </>
          )}

          {/* STEP 1 — zone */}
          {!done && step === 1 && (
            <>
              <h3 className="cl-modal__title">КУДА БРОНИРУЕМ?</h3>
              <div className="cl-modal__zones">
                {CLUB_ZONES.map(z => (
                  <button key={z.id}
                          className={`cl-modal__zone ${zone === z.id ? 'is-on' : ''}`}
                          onClick={() => setZone(z.id)}>
                    <strong>{z.name}</strong>
                    <span>от {z.priceFrom} ₽/час · {z.seats} мест</span>
                  </button>
                ))}
              </div>
              <div className="cl-modal__nav">
                <Button variant="ghost" onClick={close}>ОТМЕНА</Button>
                <Button variant="primary" disabled={!zone}
                        onClick={() => setStep(2)}>
                  ДАЛЕЕ →
                </Button>
              </div>
            </>
          )}

          {/* STEP 2 — date + time */}
          {!done && step === 2 && (
            <>
              <h3 className="cl-modal__title">КОГДА?</h3>
              <div className="cl-field">
                <label>Дата</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <label style={{
                fontFamily: 'var(--ff-font-heading)', fontWeight: 600, fontSize: 10,
                letterSpacing: 'var(--ff-track-label)', textTransform: 'uppercase',
                color: 'var(--ff-system-fog)',
                display: 'block', marginBottom: 8,
              }}>Время</label>
              <div className="cl-modal__slots">
                {SLOTS.map(s => (
                  <button key={s}
                          className={`cl-modal__slot ${slot === s ? 'is-on' : ''}`}
                          onClick={() => setSlot(s)}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="cl-modal__nav">
                <Button variant="ghost" onClick={() => setStep(1)}>← НАЗАД</Button>
                <Button variant="primary" disabled={!slot}
                        onClick={() => setStep(3)}>
                  ДАЛЕЕ →
                </Button>
              </div>
            </>
          )}

          {/* STEP 3 — contacts */}
          {!done && step === 3 && (
            <>
              <h3 className="cl-modal__title">КОНТАКТЫ</h3>
              <div className="cl-field">
                <label>Как тебя зовут?</label>
                <input type="text" value={name}
                       onChange={e => setName(e.target.value)}
                       placeholder="Имя"/>
              </div>
              <div className="cl-field">
                <label>Телефон или Telegram</label>
                <input type="text" value={contact}
                       onChange={e => setCtct(e.target.value)}
                       placeholder="+7 / @username" />
              </div>
              <div className="cl-modal__nav">
                <Button variant="ghost" onClick={() => setStep(2)}>← НАЗАД</Button>
                <Button variant="primary" pulse
                        disabled={!name || !contact}
                        onClick={submit}>
                  ОТПРАВИТЬ →
                </Button>
              </div>
            </>
          )}

          {/* SUCCESS */}
          {done && (
            <div className="cl-modal__success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <h3>ЗАЯВКА ПРИНЯТА</h3>
              <p>
                Свяжемся с тобой в течение 15 минут.<br/>
                Если срочно — пиши в <a href={`https://t.me/${CLUB.TELEGRAM.replace('@','')}`}
                                       target="_blank"
                                       style={{ color:'var(--ff-neon-bloom)' }}>
                  {CLUB.TELEGRAM}
                </a>.
              </p>
              <div style={{ marginTop: 24 }}>
                <Button variant="primary" onClick={close}>ХОРОШО →</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

window.Booking = Booking;
