/* MapContact.jsx — §10 map + contacts + other clubs */
const MapContact = () => {
  const { CLUB } = window.CLUB_DATA;
  const { Button, Reveal } = window.FF;
  const Icon = window.CI;

  const ALL_CLUBS = window.CLUB_DATA.ALL_CLUBS || [
    { slug: 'vasilyeostrovsky', name: 'Василеостровская', metro: 'Василеостровская', color: '#bf9e4d', addr: 'Бугский пер., 3' },
    { slug: 'elektrosila',     name: 'Электросила',     metro: 'Электросила',     color: '#0066b3', addr: 'Московский пр., 149А' },
    { slug: 'komendantsky',    name: 'Комендантский',   metro: 'Комендантский',   color: '#8bc34a', addr: 'Комендантский пр., 17' },
    { slug: 'prosvescheniya',  name: 'Просвещения',     metro: 'Просвещения',     color: '#c12a2c', addr: 'пр. Луначарского, 78' },
    { slug: 'begovaya',        name: 'Беговая',         metro: 'Беговая',         color: '#a3df95', addr: 'Туристская ул., 26' },
    { slug: 'sadovaya',        name: 'Садовая',         metro: 'Сенная',          color: '#b14385', addr: 'Садовая ул., 38' },
    { slug: 'tehnolog',        name: 'Технологический', metro: 'Технологический', color: '#0066b3', addr: 'Загородный пр., 24' },
    { slug: 'mahachkala',      name: 'Махачкала',       metro: 'центр',           color: '#6632FA', addr: 'ул. Ярагского, 65' },
  ];
  // Pages that actually exist get a direct link; the rest fall back to the map.
  const PAGES = { vasilyeostrovsky: 'club-vasilyeostrovsky.html', elektrosila: 'club-elektrosila.html' };
  const OTHER_CLUBS = ALL_CLUBS
    .filter(c => c.slug !== CLUB.SLUG)
    .map(c => ({ ...c, href: PAGES[c.slug] || 'index.html#find' }));

  const MAP = CLUB.MAP || {
    pin: { top: '48%', left: '42%' },
    river: true,
    roads: [
      { type: 'path', d: 'M0,90 Q90,100 180,80 T400,110', w: 14, color: 'rgba(0,255,182,0.25)' },
      { type: 'path', d: 'M0,95 Q90,105 180,85 T400,115', w: 1,  color: 'rgba(0,255,182,0.4)' },
      { x1: 20,  y1: 200, x2: 380, y2: 180, w: 1, color: 'rgba(102,50,250,0.35)' },
      { x1: 120, y1: 0,   x2: 160, y2: 280, w: 1, color: 'rgba(102,50,250,0.35)' },
      { x1: 240, y1: 0,   x2: 280, y2: 280, w: 1, color: 'rgba(102,50,250,0.35)' },
    ],
    labels: [
      { x: 40, y: 86,  text: 'БОЛЬШАЯ НЕВА',     color: 'rgba(0,255,182,0.55)' },
      { x: 40, y: 215, text: 'СРЕДНИЙ ПР. В.О.', color: 'rgba(102,50,250,0.55)' },
    ],
  };

  return (
    <section id="contacts" className="ff-section" data-screen-label="10 · КОНТАКТЫ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-section-head">
            <span className="ff-tag">— как добраться</span>
            <h2 className="ff-section-head__title">КАРТА И КОНТАКТЫ</h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="cl-map__wrap">
            <div className="cl-map__canvas">
              <span className="cl-map__placeholder">▸ Яндекс.Карты · превью</span>
              {MAP.river && <span className="cl-map__river" />}
              <span className="cl-map__coords">{CLUB.COORDS}</span>

              <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}
                   viewBox="0 0 400 280" preserveAspectRatio="none">
                {MAP.roads.map((r, i) => (
                  r.type === 'path'
                    ? <path key={i} d={r.d} stroke={r.color} strokeWidth={r.w} fill="none" />
                    : <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={r.color} strokeWidth={r.w} />
                ))}
                {MAP.labels.map((l, i) => (
                  <text key={i} x={l.x} y={l.y} fill={l.color}
                        style={{ font: '600 9px "Orbitron", monospace', letterSpacing: 1.5 }}>
                    {l.text}
                  </text>
                ))}
              </svg>

              <div className="cl-map__pin" style={{ top: MAP.pin.top, left: MAP.pin.left }}>
                <span className="cl-map__pin-dot" />
                <span className="cl-map__pin-label">FF · {CLUB.NAME.toUpperCase()}</span>
              </div>
            </div>

            <aside className="cl-contact-card">
              <div className="cl-contact-row">
                <Icon name="pin" size={18} />
                <dd>
                  <strong>Адрес</strong>
                  <p>{CLUB.ADDRESS}</p>
                </dd>
              </div>
              <div className="cl-contact-row">
                <span className="cl-metro-pill__dot"
                      style={{ background: CLUB.METRO_COLOR, marginTop: 0 }}>М</span>
                <dd>
                  <strong>Метро</strong>
                  <p>{CLUB.METRO} · {CLUB.METRO_TIME}</p>
                </dd>
              </div>
              <div className="cl-contact-row">
                <Icon name="clock" size={18} />
                <dd>
                  <strong>Режим работы</strong>
                  <p><span className="cl-status-dot" />{CLUB.HOURS}</p>
                </dd>
              </div>
              <div className="cl-contact-row">
                <Icon name="phone" size={18} />
                <dd>
                  <strong>Телефон</strong>
                  <p><a href={`tel:${CLUB.PHONE.replace(/[^+\d]/g, '')}`}>{CLUB.PHONE}</a></p>
                </dd>
              </div>
              <div className="cl-contact-row">
                <window.FF.Icon name="telegram" size={18} />
                <dd>
                  <strong>Telegram клуба</strong>
                  <p><a href={`https://t.me/${CLUB.TELEGRAM.replace('@','')}`} target="_blank">{CLUB.TELEGRAM}</a></p>
                </dd>
              </div>
              <div className="cl-contact-row">
                <window.FF.Icon name="vk" size={18} />
                <dd>
                  <strong>VK</strong>
                  <p><a href="https://vk.com/fullfocusclub" target="_blank">vk.com/fullfocusclub</a></p>
                </dd>
              </div>

              <div style={{ display:'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
                <a href={CLUB.ROUTE_URL} target="_blank"
                   className="ff-btn ff-btn--primary ff-btn--sm">
                  <Icon name="route" size={14} /> ПОСТРОИТЬ МАРШРУТ
                </a>
                <a href={CLUB.MAPS_URL} target="_blank"
                   className="ff-btn ff-btn--secondary ff-btn--sm">
                  ОТКРЫТЬ В КАРТАХ →
                </a>
              </div>
            </aside>
          </div>
        </Reveal>

        <div className="cl-other-clubs">
          <Reveal>
            <div className="cl-other-clubs__head">
              <h3 className="cl-other-clubs__title">— Другие клубы сети</h3>
              <a href="index.html#find" style={{
                fontFamily: 'var(--ff-font-heading)',
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: 'var(--ff-track-button)',
                color: 'var(--ff-neon-bloom)',
                textTransform: 'uppercase',
              }}>ВСЕ КЛУБЫ НА КАРТЕ →</a>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="cl-other-clubs__row">
              {OTHER_CLUBS.map((c) => (
                <a key={c.slug || c.name} className="cl-otherclub" href={c.href}>
                  <span className="cl-otherclub__metro" style={{ '--metro-color': c.color }}>
                    {c.metro}
                  </span>
                  <span className="cl-otherclub__name">FF · {c.name}</span>
                  <span className="cl-otherclub__addr">{c.addr}</span>
                  <span className="cl-otherclub__cta">К клубу</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

window.MapContact = MapContact;
