/* NextTournament.jsx — §2 featured next tournament with live countdown */
const { useState: useStateNT, useEffect: useEffectNT, useRef: useRefNT } = React;

/* A single flip-animated number block */
const FlipUnit = ({ value, label }) => {
  const [display, setDisplay] = useStateNT(value);
  const [flip, setFlip] = useStateNT(false);
  const prev = useRefNT(value);
  useEffectNT(() => {
    if (prev.current === value) return;
    prev.current = value;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setDisplay(value); return; }
    setFlip(true);
    const t = setTimeout(() => { setDisplay(value); setFlip(false); }, 240);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="tn-count__unit">
      <span className={`tn-count__num ${flip ? 'is-flip' : ''}`}>
        {String(display).padStart(2, '0')}
      </span>
      <span className="tn-count__lbl">{label}</span>
    </div>
  );
};

const Countdown = ({ target }) => {
  const calc = () => {
    const diff = Math.max(0, new Date(target).getTime() - Date.now());
    const s = Math.floor(diff / 1000);
    return {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
      over: diff === 0,
    };
  };
  const [t, setT] = useStateNT(calc);
  useEffectNT(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.over) {
    return <div className="tn-count tn-count--over">ТУРНИР НАЧАЛСЯ · СЛЕДИ ЗА ЭФИРОМ</div>;
  }
  return (
    <div className="tn-count" role="timer" aria-label="До старта турнира">
      <FlipUnit value={t.days} label="дней" />
      <span className="tn-count__sep">:</span>
      <FlipUnit value={t.hours} label="часов" />
      <span className="tn-count__sep">:</span>
      <FlipUnit value={t.minutes} label="минут" />
      <span className="tn-count__sep">:</span>
      <FlipUnit value={t.seconds} label="секунд" />
    </div>
  );
};

const NextTournament = () => {
  const { Section, Reveal, Button } = window.FF;
  const Icon = window.TI;
  const { NEXT, NEXT_TOURNAMENT_DATE } = window.TOURN_DATA;

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Section id="next" label="— РЕГИСТРАЦИЯ ОТКРЫТА" title="БЛИЖАЙШИЙ ТУРНИР"
             sub="Полная команда, полный фокус. Регистрация открыта прямо сейчас.">
      <Reveal>
        <div className="tn-next">
          <span className="tn-next__corner tn-next__corner--tl" />
          <span className="tn-next__corner tn-next__corner--tr" />
          <span className="tn-next__corner tn-next__corner--bl" />
          <span className="tn-next__corner tn-next__corner--br" />

          {/* LEFT — 60% */}
          <div className="tn-next__main">
            <span className="tn-next__date">{NEXT.dateLine}</span>
            <h3 className="tn-next__title">
              {NEXT.title.map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
            </h3>
            <div className="tn-next__venue">
              <Icon name="pin" size={16} />
              <span>{NEXT.venue}</span>
            </div>

            <Countdown target={NEXT_TOURNAMENT_DATE} />

            <div className="tn-next__ctas">
              <Button variant="primary" pulse onClick={() => scrollTo('form')}>
                ЗАРЕГИСТРИРОВАТЬ КОМАНДУ <Icon name="arrowRight" size={14} />
              </Button>
              <a className="ff-btn ff-btn--secondary" href="https://twitch.tv/fullfocus"
                 target="_blank" rel="noopener">
                СМОТРЕТЬ НА TWITCH <Icon name="broadcast" size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT — 40% */}
          <div className="tn-next__aside">
            <ul className="tn-next__specs">
              {NEXT.details.map((d, i) => (
                <li key={i} className={`tn-spec ${d.accent ? 'is-accent' : ''}`}>
                  <span className="tn-spec__icon"><Icon name={d.icon} size={16} /></span>
                  <span className="tn-spec__lbl">{d.lbl}</span>
                  <span className="tn-spec__val">{d.val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <p className="tn-next__note">
          <Icon name="info" size={15} />
          {NEXT.note}
        </p>
      </Reveal>
    </Section>
  );
};

window.TOURN_PAGE = window.TOURN_PAGE || {};
window.TOURN_PAGE.NextTournament = NextTournament;
