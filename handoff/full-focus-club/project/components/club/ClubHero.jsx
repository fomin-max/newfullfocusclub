/* ClubHero.jsx — §1 hero split layout */
const { useEffect: useEffectCH, useRef: useRefCH } = React;

const ClubHero = () => {
  const { CLUB } = window.CLUB_DATA;
  const { Button, Reveal } = window.FF;
  const Icon = window.CI;
  const mediaRef = useRefCH(null);

  // Cursor glow tracking (desktop only)
  useEffectCH(() => {
    const el = mediaRef.current;
    if (!el) return;
    if (window.innerWidth < 1024) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="hero" className="cl-hero" data-screen-label="01 · HERO">
      <div className="cl-hero__media" ref={mediaRef}>
        <video
          className="cl-hero__video"
          autoPlay muted loop playsInline
          poster={CLUB.POSTER_URL}
          preload="metadata"
        >
          <source src={CLUB.VIDEO_URL} type="video/mp4" />
        </video>
        <span className="cl-hero__cursor" />
        <div className="cl-hero__media-coord">
          {CLUB.COORDS}
        </div>
        <div className="cl-hero__media-meta">
          <span>{CLUB.MEDIA_LABEL || 'FULL FOCUS · клуб #01'}</span>
          <span><strong>● LIVE</strong> · Санкт-Петербург</span>
        </div>
      </div>

      <div className="cl-hero__panel">
        <Reveal>
          <span className="cl-hero__badge">— {CLUB.NAME.toUpperCase()}</span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="cl-hero__title">
            FULL FOCUS
            <span className="accent">{CLUB.NAME}</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <div className="cl-hero__meta">
            <div className="cl-meta-row">
              <span className="cl-metro-pill" style={{ '--metro-color': CLUB.METRO_COLOR }}>
                <span className="cl-metro-pill__dot">М</span>
                <strong>{CLUB.METRO}</strong>
              </span>
              <span>{CLUB.METRO_TIME}</span>
            </div>
            <div className="cl-meta-row">
              <span className="cl-icon-cell"><Icon name="pin" size={18} /></span>
              <span><strong>{CLUB.ADDRESS}</strong></span>
            </div>
            <div className="cl-meta-row">
              <span className="cl-icon-cell"><Icon name="clock" size={18} /></span>
              <span><span className="cl-status-dot" />{CLUB.HOURS}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="cl-hero__ctas">
            <Button variant="primary" pulse
                    onClick={() => window.openBooking && window.openBooking()}>
              ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
            </Button>
            <Button variant="secondary" onClick={() => {
              document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>
              СМОТРЕТЬ ЗОНЫ <Icon name="arrowDown" size={14} />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="cl-hero__facts">
            {(CLUB.FACTS || [
              { icon: 'bolt', val: 'от 160 ₽/час', lbl: 'Стартовый тариф' },
              { icon: 'gamepad', val: '7 зон', lbl: 'Форматов под любую сессию' },
              { icon: 'utensils', val: 'Своя кухня', lbl: 'Хот-доги, горячее, пиво' },
            ]).map((f, i) => (
              <div className="cl-fact" key={i}>
                <span className="cl-fact__icon"><Icon name={f.icon} size={18} /></span>
                <span className="cl-fact__val">{f.val}</span>
                <span className="cl-fact__lbl">{f.lbl}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.ClubHero = ClubHero;
