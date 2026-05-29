/* ClubLayout.jsx — Club page navbar + breadcrumb */
const { useEffect: useEffectCL, useState: useStateCL } = React;

const CLUB_NAV = [
  { id: 'zones',     name: 'Зоны' },
  { id: 'tariffs',   name: 'Тарифы' },
  { id: 'hardware',  name: 'Железо' },
  { id: 'features',  name: 'Особенности' },
  { id: 'events',    name: 'Мероприятия' },
  { id: 'contacts',  name: 'Контакты' },
];

const ClubNavbar = () => {
  const [scrolled, setScrolled] = useStateCL(false);
  const [active, setActive] = useStateCL('hero');
  useEffectCL(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ['hero', ...CLUB_NAV.map(l => l.id)];
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
  const { Button, Icon } = window.FF;
  return (
    <header className={`ff-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="ff-header__inner">
        <a className="ff-logo" href="index.html">
          <span className="ff-logo__dot"></span>
          FULL FOCUS
        </a>
        <ul className="ff-nav">
          {CLUB_NAV.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>
                {l.name}
              </a>
            </li>
          ))}
        </ul>
        <Button variant="primary" size="sm" pulse onClick={() => window.openBooking && window.openBooking()}>
          ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
        </Button>
      </div>
    </header>
  );
};

const ClubCrumbs = () => {
  const { CLUB } = window.CLUB_DATA;
  return (
    <nav className="cl-crumbs" aria-label="breadcrumb">
      <div className="cl-crumbs__inner">
        <a href="index.html">
          ← Все клубы
        </a>
        <span className="cl-crumbs__sep">/</span>
        <span>FULL FOCUS</span>
        <span className="cl-crumbs__sep">/</span>
        <span className="cl-crumbs__pill">{CLUB.NAME.toUpperCase()}</span>
      </div>
    </nav>
  );
};

window.ClubLayout = { ClubNavbar, ClubCrumbs };
