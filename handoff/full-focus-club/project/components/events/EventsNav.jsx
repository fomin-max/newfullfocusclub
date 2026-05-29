/* EventsNav.jsx — events page navbar + breadcrumb (mirrors ClubNavbar style) */
const { useEffect: useEffectEN, useState: useStateEN } = React;

const EVENTS_NAV = [
  { id: 'formats',  name: 'Форматы' },
  { id: 'venues',   name: 'Площадки' },
  { id: 'included', name: 'Что включено' },
  { id: 'proof',    name: 'Нам доверяют' },
  { id: 'how',      name: 'Как это работает' },
  { id: 'gallery',  name: 'Атмосфера' },
  { id: 'faq',      name: 'Вопросы' },
];

const EventsNav = () => {
  const { Button, Icon } = window.FF;
  const [scrolled, setScrolled] = useStateEN(false);
  const [active, setActive] = useStateEN('hero');
  useEffectEN(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ['hero', ...EVENTS_NAV.map(l => l.id), 'form'];
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
            {EVENTS_NAV.map(l => (
              <li key={l.id}>
                <a href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
          <Button variant="primary" size="sm" pulse onClick={() => scrollTo('form')}>
            ОСТАВИТЬ ЗАЯВКУ <Icon name="arrowRight" size={14} />
          </Button>
        </div>
      </header>

      <nav className="cl-crumbs" aria-label="breadcrumb">
        <div className="cl-crumbs__inner">
          <a href="index.html">← На главную</a>
          <span className="cl-crumbs__sep">/</span>
          <span>FULL FOCUS</span>
          <span className="cl-crumbs__sep">/</span>
          <span className="cl-crumbs__pill">МЕРОПРИЯТИЯ</span>
        </div>
      </nav>
    </React.Fragment>
  );
};

window.EVENTS_PAGE = window.EVENTS_PAGE || {};
window.EVENTS_PAGE.EventsNav = EventsNav;
