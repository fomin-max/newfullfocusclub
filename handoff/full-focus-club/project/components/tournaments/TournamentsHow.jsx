/* TournamentsHow.jsx — §4 four-step timeline with line draw on scroll */
const { useEffect: useEffectTHW, useRef: useRefTHW, useState: useStateTHW } = React;

const TournamentsHow = () => {
  const { Section, Reveal } = window.FF;
  const { STEPS } = window.TOURN_DATA;
  const lineRef = useRefTHW(null);
  const [drawn, setDrawn] = useStateTHW(false);

  useEffectTHW(() => {
    const el = lineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section id="how" label="— 4 шага" title="КАК ПРИНЯТЬ УЧАСТИЕ"
             sub="От заявки до старта — без лишней суеты.">
      <div className="ev-how" ref={lineRef}>
        <div className={`ev-how__line ${drawn ? 'is-drawn' : ''}`} />
        <div className="ev-how__list">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 200} className="ev-how__step">
              <span className="ev-how__dot" />
              <span className="ev-how__num">{s.num} /</span>
              <h3 className="ev-how__name">{s.name}</h3>
              <p className="ev-how__desc">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

window.TOURN_PAGE = window.TOURN_PAGE || {};
window.TOURN_PAGE.TournamentsHow = TournamentsHow;
