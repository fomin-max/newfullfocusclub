/* Layout.jsx — ProgressBar, Ticker, Navbar, MobileStickyBar, Footer */
const { useEffect, useState } = React;
const { Button, Icon } = window.FF;

const NAV_LINKS = [
  { id: 'find',        name: 'Клубы' },
  { id: 'how',         name: 'Как начать' },
  { id: 'zones',       name: 'Зоны' },
  { id: 'promos',      name: 'Акции' },
  { id: 'loyalty',     name: 'Уровни' },
  { id: 'tournament',  name: 'Турниры' },
  { id: 'events',      name: 'Мероприятия' },
  { id: 'franchise',   name: 'Франшиза' },
];

/* ----------------- ProgressBar ----------------- */
const ProgressBar = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="ff-progress" aria-hidden="true">
      <div className="ff-progress__fill" style={{ width: `${pct}%` }} />
    </div>
  );
};

/* ----------------- Ticker ----------------- */
const TICKER_ITEMS = [
  <React.Fragment><em>500₽</em> новым гостям</React.Fragment>,
  <React.Fragment>промокод <em>SITE500</em></React.Fragment>,
  <React.Fragment>Школьникам час за <em>120₽</em> · пн-пт 10:00-16:00</React.Fragment>,
  <React.Fragment><em>14 июня</em> турнир на Василеостровской</React.Fragment>,
  <React.Fragment>Пригласи друга — играйте бесплатно</React.Fragment>,
];

const Ticker = () => {
  // Render the list twice for seamless loop
  const renderChunk = (key) => (
    <React.Fragment key={key}>
      {TICKER_ITEMS.map((it, i) => (
        <React.Fragment key={`${key}-${i}`}>
          <span className="ff-ticker__chunk">{it}</span>
          <span className="ff-ticker__sep">////</span>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
  return (
    <div className="ff-ticker" role="region" aria-label="Акции и события">
      <div className="ff-ticker__track">
        {renderChunk('a')}
        {renderChunk('b')}
      </div>
    </div>
  );
};

/* ----------------- Navbar ----------------- */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ['hero', ...NAV_LINKS.map(l => l.id)];
      const y = window.scrollY + 200;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`ff-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="ff-header__inner">
        <a className="ff-logo" href="#hero">
          <span className="ff-logo__dot"></span>
          FULL FOCUS
        </a>
        <ul className="ff-nav">
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>
                {l.name}
              </a>
            </li>
          ))}
        </ul>
        <Button variant="primary" size="sm" pulse>
          ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
        </Button>
      </div>
    </header>
  );
};

/* ----------------- MobileStickyBar ----------------- */
const MobileStickyBar = () => (
  <div className="ff-mobile-book" role="region" aria-label="Бронирование">
    <a href="#find" className="ff-btn ff-btn--primary is-pulse" style={{width: '100%'}}>
      ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
    </a>
  </div>
);

/* ----------------- Footer ----------------- */
const CLUBS_FOOTER = [
  ['Василеостровская', '#bf9e4d'],
  ['Электросила',      '#0066b3'],
  ['Комендантский',    '#8bc34a'],
  ['Просвещения',      '#c12a2c'],
  ['Беговая',          '#a3df95'],
  ['Садовая',          '#b14385'],
  ['Технологический',  '#0066b3'],
  ['Махачкала',        '#6632FA'],
];

const Footer = () => (
  <footer className="ff-footer" id="contacts">
    <div className="ff-footer__promo">
      <span className="ff-footer__promo-text">
        Промокод <span className="ff-footer__promo-code">SITE500</span> — 500₽ новым гостям при первом пополнении
      </span>
      <a href="#find" className="ff-btn ff-btn--accent ff-btn--sm">
        ЗАБРАТЬ БОНУС <Icon name="arrowRight" size={12} />
      </a>
    </div>
    <div className="ff-footer__inner">
      <div className="ff-footer__brand">
        <span className="ff-logo">
          <span className="ff-logo__dot"></span>
          FULL FOCUS
        </span>
        <p className="ff-footer__tagline">
          Сеть киберспортивных клубов нового поколения · С 2022 года
        </p>
        <div className="ff-footer__social">
          <a href="https://vk.com/fullfocusclub" aria-label="VK"><Icon name="vk" size={20}/></a>
          <a href="https://t.me/fullfocusclub" aria-label="Telegram"><Icon name="telegram" size={20}/></a>
        </div>
      </div>
      <div className="ff-footer__col">
        <h4>Клубы</h4>
        <ul>
          {CLUBS_FOOTER.map(([name, color]) => (
            <li key={name}>
              <a href="#find">
                <span className="metro" style={{ '--metro-color': color }}></span>
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="ff-footer__col">
        <h4>Разделы</h4>
        <ul>
          <li><a href="#find">Найти клуб</a></li>
          <li><a href="#zones">Зоны и форматы</a></li>
          <li><a href="#promos">Акции</a></li>
          <li><a href="#loyalty">Программа лояльности</a></li>
          <li><a href="#tournament">Турниры</a></li>
          <li><a href="#events">Мероприятия</a></li>
          <li><a href="#franchise">Франшиза</a></li>
          <li><a href="#">FFPay</a></li>
        </ul>
      </div>
      <div className="ff-footer__col">
        <h4>Контакты</h4>
        <ul>
          <li>+7 (812) 660-55-96</li>
          <li>hello@fullfocusclub.ru</li>
          <li>Telegram · <a href="https://t.me/fullfocusclub" style={{color:'inherit'}}>@fullfocusclub</a></li>
          <li>VK · <a href="https://vk.com/fullfocusclub" style={{color:'inherit'}}>vk.com/fullfocusclub</a></li>
          <li style={{ color: 'var(--ff-system-fog)', marginTop: 8, fontSize: 12 }}>
            Круглосуточно · 24/7
          </li>
        </ul>
      </div>
    </div>
    <div className="ff-footer__copy">
      <span>© 2022–2025 Full Focus. Все права защищены.</span>
      <span>ИНН 7810943662 · ОГРН 1227800036860</span>
      <span>fullfocusclub.ru</span>
    </div>
  </footer>
);

Object.assign(window.FF, { ProgressBar, Ticker, Navbar, MobileStickyBar, Footer });
