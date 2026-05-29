/* TournamentsNav.jsx — /tournaments navbar + breadcrumb (mirrors EventsNav) */
const { useEffect: useEffectTN, useState: useStateTN } = React;

const TOURN_NAV = [
  { id: 'next',     name: 'Ближайший' },
  { id: 'form',     name: 'Регистрация' },
  { id: 'calendar', name: 'Календарь' },
  { id: 'gallery',  name: 'Галерея' },
  { id: 'faq',      name: 'Вопросы' },
];

const TournamentsNav = () => {
  const { Button, Icon } = window.FF;
  const [scrolled, setScrolled] = useStateTN(false);
  const [active, setActive] = useStateTN('hero');
  useEffectTN(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ['hero', ...TOURN_NAV.map(l => l.id)];
      const y = window.scrollY + 220;
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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <React.Fragment>
      <header className={`ff-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="ff-header__inner">
          <a className="ff-logo" href="index.html">
            <span className="ff-logo__dot"></span>
            FULL FOCUS
          </a>
          <ul className="ff-nav">
            {TOURN_NAV.map(l => (
              <li key={l.id}>
                <a href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
          <Button variant="primary" size="sm" pulse onClick={() => scrollTo('form')}>
            ЗАРЕГИСТРИРОВАТЬСЯ <Icon name="arrowRight" size={14} />
          </Button>
        </div>
      </header>

      <nav className="cl-crumbs" aria-label="breadcrumb">
        <div className="cl-crumbs__inner">
          <a href="index.html">← На главную</a>
          <span className="cl-crumbs__sep">/</span>
          <span>FULL FOCUS</span>
          <span className="cl-crumbs__sep">/</span>
          <span className="cl-crumbs__pill">ТУРНИРЫ</span>
        </div>
      </nav>
    </React.Fragment>
  );
};

window.TOURN_PAGE = window.TOURN_PAGE || {};
window.TOURN_PAGE.TournamentsNav = TournamentsNav;
