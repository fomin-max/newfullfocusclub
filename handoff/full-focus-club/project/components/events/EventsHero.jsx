/* EventsHero.jsx — §1 hero: full-bleed photo + mesh + cursor glow */
const { useEffect: useEffectEH, useRef: useRefEH } = React;

const EventsHero = () => {
  const { Button, Reveal } = window.FF;
  const Icon = window.EI;
  const { HERO_FACTS } = window.EVENTS_DATA;
  const heroRef = useRefEH(null);

  // Cursor glow (desktop only, respects reduced motion)
  useEffectEH(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.innerWidth < 1024) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--gx', `${e.clientX - r.left}px`);
      el.style.setProperty('--gy', `${e.clientY - r.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="hero" className="ev-hero" ref={heroRef} data-screen-label="01 · HERO">
      <div className="ev-hero__bg" />
      <div className="ev-hero__overlay" />
      <div className="ev-hero__mesh" />
      <div className="ev-hero__glow" />
      <div className="ev-hero__scan" />
      <span className="ev-hero__hash">//// МЕРОПРИЯТИЯ · FULL FOCUS</span>

      <div className="ev-hero__inner">
        <Reveal>
          <span className="ff-tag">— организуем под ключ</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="ev-hero__title">
            ТВОЁ МЕРОПРИЯТИЕ В<br/>
            <span className="ev-hero__brand">FULL FOCUS</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="ev-hero__sub">
            Корпоратив, день рождения или закрытый турнир — организуем
            под ключ. Кейтеринг, ведущий, трансляция и призы.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="ev-hero__ctas">
            <Button variant="primary" pulse onClick={() => scrollTo('form')}>
              ОСТАВИТЬ ЗАЯВКУ <Icon name="arrowRight" size={14} />
            </Button>
            <Button variant="secondary" onClick={() => scrollTo('formats')}>
              УЗНАТЬ ПОДРОБНЕЕ <Icon name="arrowDown" size={14} />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="ev-hero__facts">
            {HERO_FACTS.map((f, i) => (
              <div className="ev-fact" key={i}>
                <span className="ev-fact__icon"><Icon name={f.icon} size={20} /></span>
                <span className="ev-fact__val">{f.val}</span>
                <span className="ev-fact__lbl">{f.lbl}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.EVENTS_PAGE = window.EVENTS_PAGE || {};
window.EVENTS_PAGE.EventsHero = EventsHero;
