/* LiveMap.jsx — §2 free-seats schematic */
const { useState: useStateLM, useMemo: useMemoLM } = React;

const LiveMap = () => {
  const { FLOOR } = window.CLUB_DATA;
  const { Reveal, Button } = window.FF;
  const Icon = window.CI;
  const [filter, setFilter] = useStateLM('all');

  // Flatten all seats once
  const allSeats = useMemoLM(() => {
    return FLOOR.zones.flatMap(z => z.seats.map(s => ({ ...s, zone: z.zone, zoneLabel: z.label })));
  }, []);

  const counts = useMemoLM(() => {
    const c = { all: { free: 0, total: 0 }};
    for (const s of allSeats) {
      const zoneKey = ['pro','arena','bootcamp','duo','solo','lounge'].includes(s.zone) ? s.zone : s.zone;
      c[zoneKey] = c[zoneKey] || { free: 0, total: 0 };
      if (s.status !== 'off') {
        c.all.total++;
        c[zoneKey].total++;
        if (s.status === 'free') {
          c.all.free++;
          c[zoneKey].free++;
        }
      }
    }
    return c;
  }, [allSeats]);

  const FILTERS = FLOOR.filters || [
    { id: 'all',      name: 'ВСЕ' },
    { id: 'pro',      name: 'PRO' },
    { id: 'arena',    name: 'ARENA' },
    { id: 'bootcamp', name: 'BOOTCAMP' },
    { id: 'duo',      name: 'DUO/SOLO', match: ['duo','solo'] },
    { id: 'lounge',   name: 'PS5' },
  ];

  const OUTLINES = FLOOR.outlines || [
    { label: 'PRO ZONE',        left: '4%',  top: '14%', width: '46%', height: '34%' },
    { label: 'ARENA 5×5',       left: '54%', top: '14%', width: '40%', height: '34%', highlightFor: 'arena' },
    { label: 'BOOTCAMP',        left: '54%', top: '52%', width: '24%', height: '24%' },
    { label: 'DUO / SOLO ROOM', left: '4%',  top: '58%', width: '32%', height: '20%' },
    { label: 'PS5 LOUNGE',      left: '80%', top: '60%', width: '18%', height: '32%' },
  ];

  const isActiveFor = (s, filterId) => {
    if (filterId === 'all') return true;
    const f = FILTERS.find(x => x.id === filterId);
    const match = f?.match || [filterId];
    return match.includes(s.zone);
  };

  return (
    <section id="live" className="ff-section cl-live" data-screen-label="02 · LIVE">
      <div className="ff-section__inner">
        <Reveal>
          <div className="cl-live__head">
            <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
              <span className="ff-tag">live · обновлено сейчас</span>
              <h2 className="ff-section-head__title">
                СВОБОДНЫЕ МЕСТА<br/>ПРЯМО СЕЙЧАС
              </h2>
            </div>
            <div className="cl-live__status">
              <span className="cl-status-dot"></span> Клуб открыт · принимаем гостей
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="cl-live__filters">
            {FILTERS.map(f => {
              const c = f.match
                ? f.match.reduce((acc, k) => ({
                    free: acc.free + (counts[k]?.free||0),
                    total: acc.total + (counts[k]?.total||0),
                  }), { free:0,total:0 })
                : counts[f.id] || { free:0, total:0 };
              return (
                <button key={f.id}
                        className={`cl-live__filter ${filter===f.id?'is-active':''}`}
                        onClick={() => setFilter(f.id)}>
                  {f.name}<sup>{c.free}/{c.total}</sup>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="cl-floor">
            <div className="cl-floor__legend">
              <span style={{ color:'var(--ff-neon-bloom)' }}><i></i>свободно</span>
              <span style={{ color:'var(--ff-danger)' }}><i></i>занято</span>
              <span style={{ color:'var(--ff-system-fog)' }}><i></i>недоступно</span>
            </div>

            {/* Zone outlines */}
            {OUTLINES.map((o, i) => (
              <div key={i}
                   className={`cl-floor__zone ${o.highlightFor && filter === o.highlightFor ? 'is-highlight' : ''}`}
                   style={{
                     left: o.left, top: o.top, width: o.width, height: o.height,
                     ...(o.accent ? { '--zone-outline-accent': o.accent } : {}),
                   }}>
                {o.label}
              </div>
            ))}

            <div className="cl-floor__entrance">▼ ВХОД</div>

            {allSeats.map(s => {
              const active = isActiveFor(s, filter);
              return (
                <span key={s.id}
                      className={[
                        'cl-seat',
                        `cl-seat--${s.status}`,
                        !active && 'cl-seat--dim'
                      ].filter(Boolean).join(' ')}
                      style={{ left: `${s.x}%`, top: `${s.y}%` }}
                      title={`${s.zoneLabel} · ${s.status}`} />
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="cl-live__count">
            <strong>{counts.all.free}</strong>
            <em>из <strong>{counts.all.total}</strong> мест свободно сейчас</em>
            <div className="cl-live__action">
              <Button variant="primary" pulse
                      onClick={() => window.openBooking && window.openBooking()}>
                ЗАБРОНИРОВАТЬ МЕСТО →
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.LiveMap = LiveMap;
