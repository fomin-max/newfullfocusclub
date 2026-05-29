/* TournamentsHero.jsx — §1 hero: full-bleed photo + mesh + cursor glow + magnetic CTA */
const { useEffect: useEffectTH, useRef: useRefTH } = React;

const TournamentsHero = () => {
  const { Button, Reveal } = window.FF;
  const Icon = window.TI;
  const { HERO_FACTS } = window.TOURN_DATA;
  const heroRef = useRefTH(null);
  const magnetRef = useRefTH(null);

  // Cursor glow (desktop only, respects reduced motion)
  useEffectTH(() => {
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

  // Magnetic primary CTA (±40px, desktop only)
  useEffectTH(() => {
    const el = magnetRef.current;
    if (!el) return;
    if (window.matchMedia('(max-width: 1023px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const clamp = (v, m) => Math.max(-m, Math.min(m, v));
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${clamp(mx * 0.4, 40)}px, ${clamp(my * 0.5, 24)}px)`;
    };
    const onLeave = () => { el.style.transform = 'translate(0,0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="hero" className="tn-hero" ref={heroRef} data-screen-label="01 · HERO">
      <div className="tn-hero__bg" />
      <div className="tn-hero__overlay" />
      <div className="tn-hero__mesh" />
      <div className="tn-hero__glow" />
      <div className="tn-hero__scan" />
      <span className="tn-hero__hash">//// ТУРНИРЫ · FULL FOCUS</span>

      <div className="tn-hero__inner">
        <Reveal>
          <span className="ff-tag">— ТУРНИРЫ</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="tn-hero__title">
            ДОКАЖИ,<br/>
            ЧТО ТЫ<br/>
            <span className="tn-hero__brand">ЛУЧШИЙ</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="tn-hero__sub">
            Регулярные турниры по CS2, Dota 2, Valorant. Призовые,
            мерч и эфир на Twitch.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="tn-hero__ctas">
            <span className="tn-hero__magnet" ref={magnetRef}>
              <Button variant="primary" pulse onClick={() => scrollTo('form')}>
                ЗАРЕГИСТРИРОВАТЬ КОМАНДУ <Icon name="arrowRight" size={14} />
              </Button>
            </span>
            <Button variant="secondary" onClick={() => scrollTo('next')}>
              БЛИЖАЙШИЙ ТУРНИР <Icon name="arrowDown" size={14} />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="tn-hero__facts">
            {HERO_FACTS.map((f, i) => (
              <div className="tn-fact" key={i}>
                <span className="tn-fact__icon"><Icon name={f.icon} size={20} /></span>
                <span className="tn-fact__val">{f.val}</span>
                <span className="tn-fact__lbl">{f.lbl}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.TOURN_PAGE = window.TOURN_PAGE || {};
window.TOURN_PAGE.TournamentsHero = TournamentsHero;
