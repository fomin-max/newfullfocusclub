/* TeamForm.jsx — §3 team registration form (2-col) + success state */
const { useState: useStateTF, useRef: useRefTF, useEffect: useEffectTF } = React;

const TeamForm = () => {
  const { Reveal } = window.FF;
  const Icon = window.TI;
  const { FORM_DISCIPLINES, FORM_SOURCES } = window.TOURN_DATA;

  const [team, setTeam]           = useStateTF('');
  const [captainTg, setCaptainTg] = useStateTF('');
  const [discipline, setDisc]     = useStateTF(FORM_DISCIPLINES[0]);
  const [source, setSource]       = useStateTF(FORM_SOURCES[0]);
  const [players, setPlayers]     = useStateTF(['', '', '', '', '']);
  const [steam, setSteam]         = useStateTF('');
  const [done, setDone]           = useStateTF(false);

  const btnRef = useRefTF(null);

  const setPlayer = (i, v) => setPlayers(p => p.map((x, idx) => idx === i ? v : x));

  // Magnetic submit CTA (desktop only)
  useEffectTF(() => {
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
    // Production: POST → Telegram Bot webhook → уведомление администратору клуба.
    setDone(true);
  };

  const PLAYER_LABELS = ['Игрок 1 (Капитан)', 'Игрок 2', 'Игрок 3', 'Игрок 4', 'Игрок 5'];

  return (
    <section id="form" className="ff-section tn-form-sec" data-screen-label="03 · РЕГИСТРАЦИЯ">
      <div className="tn-form-sec__bg" />
      <div className="ff-section__inner tn-form-sec__inner">
        <Reveal className="ff-section-head center">
          <span className="ff-tag">— свяжемся за 15 минут</span>
          <h2 className="ff-section-head__title">ЗАРЕГИСТРИРОВАТЬ КОМАНДУ</h2>
          <p className="ff-section-head__sub">Заполни форму — подтвердим участие в течение 15 минут.</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="tn-form-card">
            {!done ? (
              <form className="tn-form" onSubmit={submit}>
                {/* LEFT — team meta */}
                <div className="tn-form__col">
                  <span className="tn-form__col-title">Команда</span>
                  <div className="ev-field">
                    <label>Название команды</label>
                    <input type="text" placeholder="Например: Focus Five" value={team}
                           onChange={(e) => setTeam(e.target.value)} required />
                  </div>
                  <div className="ev-field">
                    <label>Telegram капитана</label>
                    <input type="text" placeholder="@username" value={captainTg}
                           onChange={(e) => setCaptainTg(e.target.value)} required />
                  </div>
                  <div className="ev-field">
                    <label>Дисциплина</label>
                    <div className="ev-select">
                      <select value={discipline} onChange={(e) => setDisc(e.target.value)}>
                        {FORM_DISCIPLINES.map(d => <option key={d}>{d}</option>)}
                      </select>
                      <span className="ev-select__arr">▾</span>
                    </div>
                  </div>
                  <div className="ev-field">
                    <label>Откуда узнали о турнире</label>
                    <div className="ev-select">
                      <select value={source} onChange={(e) => setSource(e.target.value)}>
                        {FORM_SOURCES.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <span className="ev-select__arr">▾</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT — 5 players */}
                <div className="tn-form__col">
                  <span className="tn-form__col-title">Состав · 5 игроков</span>
                  {PLAYER_LABELS.map((lbl, i) => (
                    <div className="ev-field" key={i}>
                      <label>{lbl}</label>
                      <input type="text" placeholder={i === 0 ? 'Никнейм капитана' : 'Никнейм'}
                             value={players[i]} onChange={(e) => setPlayer(i, e.target.value)}
                             required={i === 0} />
                    </div>
                  ))}
                  <div className="ev-field">
                    <label>Steam профиль капитана</label>
                    <input type="text" placeholder="steamcommunity.com/id/..." value={steam}
                           onChange={(e) => setSteam(e.target.value)} />
                  </div>
                </div>

                {/* info block */}
                <div className="tn-form__info">
                  <span className="tn-form__info-icon"><Icon name="info" size={18} /></span>
                  <p>
                    Взнос 500 ₽ с каждого игрока (2500 ₽ за команду) оплачивается
                    на месте в день турнира. Незарегистрированные команды
                    к турниру не допускаются.
                  </p>
                </div>

                <div className="tn-form__submit">
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
                <p>
                  Свяжемся с капитаном {captainTg ? <strong style={{ color: 'var(--ff-neon-bloom)' }}>{captainTg}</strong> : 'команды'}{' '}
                  в течение 15 минут для подтверждения участия.
                </p>
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

window.TOURN_PAGE = window.TOURN_PAGE || {};
window.TOURN_PAGE.TeamForm = TeamForm;
