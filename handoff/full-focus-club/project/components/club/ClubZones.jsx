/* ClubZones.jsx — §3 horizontal scroll-hijack zones */
const { useEffect: useEffectCZ, useRef: useRefCZ, useState: useStateCZ } = React;

const ClubZones = () => {
  const { CLUB, CLUB_ZONES } = window.CLUB_DATA;
  const { Button, Reveal } = window.FF;
  const Icon = window.CI;

  const wrapRef  = useRefCZ(null);
  const trackRef = useRefCZ(null);
  const [progress, setProgress] = useStateCZ(0);
  const [isMobile, setIsMobile] = useStateCZ(false);
  const [openGames, setOpenGames] = useStateCZ(null);

  useEffectCZ(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setIsMobile(mq.matches || reduce.matches);
    sync();
    mq.addEventListener('change', sync);
    reduce.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  // Scroll-hijack: vertical scroll within section -> horizontal translate
  useEffectCZ(() => {
    if (isMobile) return;
    const wrap  = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const calcOverflow = () => {
      const trackWidth = track.scrollWidth;
      const viewport = window.innerWidth;
      return Math.max(0, trackWidth - viewport + 80);   // 80px breathing room
    };

    const update = () => {
      const overflow = calcOverflow();
      // Section height = viewport + overflow distance (so user scrolls through it)
      wrap.style.height = `${window.innerHeight + overflow}px`;

      const rect = wrap.getBoundingClientRect();
      const start = rect.top;            // how far the section top has scrolled past
      // start === 0 at the entry point, becomes negative as user scrolls
      const scrolled = Math.min(Math.max(-start, 0), overflow);
      const p = overflow > 0 ? scrolled / overflow : 0;
      setProgress(p);
      track.style.transform = `translate3d(${-scrolled}px, 0, 0)`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isMobile]);

  return (
    <section id="zones" className="cl-zones" ref={wrapRef} data-screen-label="03 · ZONES">
      <div className="cl-zones__sticky">
        <div className="cl-zones__head">
          <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
            <span className="ff-tag">{CLUB.ZONES_TAG || `— ${CLUB_ZONES.length} форматов`}</span>
            <h2>ВЫБЕРИ СВОЙ ФОРМАТ</h2>
          </div>
          <div className="cl-zones__progress">
            ▸ <strong>{Math.round(progress*100)}%</strong> / 100
          </div>
        </div>

        <div className={`cl-zones__track ${isMobile ? 'cl-zones__track--mobile' : ''}`}
             ref={trackRef}>
          {CLUB_ZONES.map((z, i) => {
            const isWide = z.wide || z.flagship;
            const gamesOpen = openGames === z.id;
            return (
            <article key={z.id}
                     className={[
                       'cl-zonecard',
                       z.flagship && 'cl-zonecard--flagship',
                       z.wide && 'cl-zonecard--wide',
                     ].filter(Boolean).join(' ')}
                     style={{ '--zone-accent': z.accent }}>
              <div className="cl-zonecard__media">
                <img src={z.image} alt={z.name} loading="lazy" />
                {z.badge && <span className="cl-zonecard__badge">{z.flagship ? '★ ' : ''}{z.badge}</span>}
                <span className="cl-zonecard__idx">0{i+1} / 0{CLUB_ZONES.length}</span>
              </div>
              <div className="cl-zonecard__body">
                <h3 className="cl-zonecard__name">{z.name}</h3>
                <div className="cl-zonecard__meta">
                  <span><strong>{z.seats}</strong> мест</span>
                  <span>от <em>{z.priceFrom} ₽</em>/час</span>
                </div>
                <p className="cl-zonecard__desc">{z.desc}</p>
                <div className="cl-zonecard__spec">▸ {z.specShort}</div>

                {z.games && z.games.length > 0 && (
                  <div className={`cl-zonecard__games ${gamesOpen ? 'is-open' : ''}`}>
                    <button className="cl-games-toggle"
                            aria-expanded={gamesOpen}
                            onClick={() => setOpenGames(gamesOpen ? null : z.id)}>
                      ВСЕ ИГРЫ ({z.games.length})
                      <span className="cl-games-toggle__sign">{gamesOpen ? '×' : '+'}</span>
                    </button>
                    <div className="cl-games-panel">
                      <div className="cl-games-panel__inner">
                        {z.games.map((g, gi) => (
                          <span className="cl-game-pill" key={gi}
                                style={{ '--pill-delay': `${gi * 0.04}s` }}>{g}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="cl-zonecard__cta">
                  <Button variant={isWide ? 'primary' : 'secondary'}
                          onClick={() => window.openBooking && window.openBooking(z.id)}>
                    {z.cta} →
                  </Button>
                </div>
              </div>
            </article>
            );
          })}
        </div>

        {!isMobile && (
          <div className="cl-zones__hint">прокручивай вниз — листает вбок</div>
        )}
      </div>
    </section>
  );
};

window.ClubZones = ClubZones;
