/* EventsHow.jsx — §6 four-step timeline with line draw on scroll */
const { useEffect: useEffectHW, useRef: useRefHW, useState: useStateHW } = React;

const EventsHow = () => {
  const { Section, Reveal } = window.FF;
  const { STEPS } = window.EVENTS_DATA;
  const lineRef = useRefHW(null);
  const [drawn, setDrawn] = useStateHW(false);

  useEffectHW(() => {
    const el = lineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section id="how" label="— 4 шага" title="КАК ОРГАНИЗОВАТЬ МЕРОПРИЯТИЕ"
             sub="От заявки до праздника — без головной боли.">
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

window.EVENTS_PAGE = window.EVENTS_PAGE || {};
window.EVENTS_PAGE.EventsHow = EventsHow;
