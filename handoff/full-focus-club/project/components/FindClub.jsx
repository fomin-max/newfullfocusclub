/* FindClub.jsx — §2 НАЙДИ СВОЙ КЛУБ */
const { Card, Reveal, Section, Icon, Button, useTilt } = window.FF;
const { useState, useRef } = React;

/* SPB clubs — pin x/y are percentage positions on the stylized map.
   metro_color is the official SPB metro line color of the nearest station.
   Zone badges per current content base (see brief). */
const CLUBS = [
  { id: 'vasil',   name: 'Василеостровская',         metro: 'м. Василеостровская',           color: '#bf9e4d', line: 'Зелёная',     x: 32, y: 38, zones: ['PRO', 'DUO', 'BOOTCAMP', 'ARENA', 'SOLO', 'LOUNGE'] },
  { id: 'electro', name: 'Электросила',              metro: 'м. Электросила',                color: '#0066b3', line: 'Синяя',       x: 55, y: 80, zones: ['PRO', 'MAX', 'DUO', 'LOUNGE'] },
  { id: 'komen',   name: 'Комендантский',            metro: 'м. Комендантский проспект',     color: '#8bc34a', line: 'Фиолетовая',  x: 22, y: 18, zones: ['PRO', 'MAX', 'BOOTCAMP', 'LOUNGE'] },
  { id: 'prosv',   name: 'Просвещения',              metro: 'м. Пр. Просвещения',            color: '#c12a2c', line: 'Красная',     x: 48, y: 12, zones: ['PRO', 'MAX', 'BOOTCAMP', 'DUO', 'SOLO', 'LOUNGE'] },
  { id: 'begov',   name: 'Беговая',                  metro: 'м. Беговая',                    color: '#a3df95', line: 'Зелёная',     x: 14, y: 32, zones: ['PRO', 'BOOTCAMP', 'TRIO', 'DUO', 'SOLO', 'LOUNGE'] },
  { id: 'sadov',   name: 'Садовая',                  metro: 'м. Садовая',                    color: '#b14385', line: 'Фиолетовая',  x: 52, y: 50, zones: ['PRO', 'MAX', 'BOOTCAMP', 'DUO', 'LOUNGE'] },
  { id: 'tech',    name: 'Технологический институт', metro: 'м. Технологический институт',   color: '#0066b3', line: 'Синяя',       x: 50, y: 64, zones: ['PRO', 'MAX', 'BOOTCAMP', 'LOUNGE'] },
  { id: 'makha',   name: 'Махачкала',                metro: 'Центр города',                  color: '#6632FA', line: '',            x: 84, y: 58, zones: ['BOOTCAMP', 'QUADRO', 'TRIO', 'DUO', 'SOLO', 'LOUNGE'] },
];

const ClubCard = ({ c, setActive }) => {
  const tiltRef = useTilt({ max: 8 });
  return (
    <Card ref={tiltRef} className="ff-club" brackets
          id={`club-${c.id}`} role="listitem"
          onMouseEnter={() => setActive(c.id)}>
      <div>
        <div className="ff-club__name">{c.name}</div>
      </div>
      <div className="ff-club__metro">
        <span className="ff-club__metro-dot" style={{ '--metro-color': c.color }}>М</span>
        {c.metro}
      </div>
      <div className="ff-club__zones">
        {c.zones.map(z => <span key={z} className="ff-club__zone">{z}</span>)}
      </div>
      <div className="ff-club__more" role="button" tabIndex={0}>
        Подробнее
      </div>
    </Card>
  );
};

const FindClub = () => {
  const [active, setActive] = useState(null);

  return (
    <Section
      id="find"
      label="Карта клубов"
      title="Найди свой клуб"
      sub="8 локаций в шаговой доступности от метро. Открыто 24/7."
    >
      <Reveal>
        <div className="ff-find__map" role="img" aria-label="Карта клубов Full Focus">
          <span className="ff-find__map-label">Санкт-Петербург · Махачкала</span>

          {/* Stylized water + roads */}
          <svg className="ff-find__river" viewBox="0 0 100 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="neva" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#6632FA" stopOpacity="0"/>
                <stop offset="0.5" stopColor="#6632FA" stopOpacity="0.6"/>
                <stop offset="1" stopColor="#00FFB6" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            {/* Neva river */}
            <path d="M 0 28 C 18 22, 26 30, 40 32 S 60 40, 78 36 L 100 34"
                  stroke="url(#neva)" strokeWidth="1.4" fill="none" />
            {/* Side canals */}
            <path d="M 30 32 C 38 38, 42 48, 48 52"
                  stroke="rgba(102,50,250,0.3)" strokeWidth="0.6" fill="none" />
            <path d="M 50 36 C 56 44, 58 50, 62 56"
                  stroke="rgba(102,50,250,0.3)" strokeWidth="0.6" fill="none" />
            {/* Ring road dashed */}
            <ellipse cx="40" cy="42" rx="36" ry="28"
                     stroke="rgba(102,50,250,0.18)" strokeWidth="0.4"
                     strokeDasharray="1.5 1.5" fill="none" />
            {/* MKHACHKALA divider */}
            <line x1="74" y1="6" x2="74" y2="58"
                  stroke="rgba(102,50,250,0.25)" strokeWidth="0.4"
                  strokeDasharray="0.8 0.8" />
            <text x="80" y="14" fill="rgba(157,157,156,0.5)" fontSize="2.4"
                  fontFamily="Orbitron" letterSpacing="0.5"
                  style={{textTransform:'uppercase'}}>МАХАЧКАЛА</text>
            <text x="6" y="10" fill="rgba(157,157,156,0.5)" fontSize="2.4"
                  fontFamily="Orbitron" letterSpacing="0.5"
                  style={{textTransform:'uppercase'}}>САНКТ-ПЕТЕРБУРГ</text>
          </svg>

          {/* Pins */}
          {CLUBS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={`ff-pin ${active === c.id ? 'is-active' : ''}`}
              style={{ left: `${c.x}%`, top: `${c.y}%`, '--pin-delay': `${i * 0.3}s` }}
              onMouseEnter={() => setActive(c.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(c.id)}
              onBlur={() => setActive(null)}
              onClick={() => {
                const el = document.getElementById(`club-${c.id}`);
                const row = el && el.parentElement;
                if (el && row) {
                  row.scrollTo({ left: el.offsetLeft - 24, behavior: 'smooth' });
                }
              }}
              aria-label={`Клуб ${c.name}`}
            >
              <span className="ff-pin__pulse" />
              <span className="ff-pin__dot" />
              <span className="ff-pin__label">{c.name}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="ff-find__row" role="list">
        {CLUBS.map((c, i) => (
          <Reveal key={c.id} delay={i * 100} className="ff-find__row-cell">
            <ClubCard c={c} setActive={setActive} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

window.FF.FindClub = FindClub;
