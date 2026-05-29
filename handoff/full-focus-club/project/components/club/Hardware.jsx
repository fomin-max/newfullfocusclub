/* Hardware.jsx — §4 hardware specs with tabs */
const { useState: useStateHW } = React;

const Hardware = () => {
  const { HARDWARE } = window.CLUB_DATA;
  const { Reveal } = window.FF;
  const Icon = window.CI;

  const tabs = Object.keys(HARDWARE).map(id => ({ id, name: HARDWARE[id].name }));
  const [active, setActive] = useStateHW(tabs[0]?.id);

  const iconFor = (k) => {
    if (/Видеокарта/i.test(k)) return 'monitor';
    if (/Процессор/i.test(k))  return 'cpu';
    if (/RAM/i.test(k))        return 'memory';
    if (/Монитор/i.test(k))    return 'monitor';
    if (/Проектор/i.test(k))   return 'projector';
    if (/Кресло|Посадка/i.test(k)) return 'sofa';
    if (/Периферия|Геймпад/i.test(k)) return 'keyboard';
    if (/Консоль/i.test(k))    return 'gamepad';
    if (/Экран/i.test(k))      return 'tv';
    if (/Звук/i.test(k))       return 'speakers';
    if (/Эксклюзив/i.test(k))  return 'trophy';
    return 'cpu';
  };

  const panel = HARDWARE[active];

  return (
    <section id="hardware" className="ff-section" data-screen-label="04 · ЖЕЛЕЗО">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-section-head">
            <span className="ff-tag">— технические характеристики</span>
            <h2 className="ff-section-head__title">НА ЧЁМ ТЫ БУДЕШЬ ИГРАТЬ</h2>
            <p className="ff-section-head__sub">
              Топовые конфигурации в каждой зоне — игры запускаются моментально,
              стримы пишутся без дропов, латенция — на минимуме.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="cl-hw__tabs" role="tablist">
            {tabs.map(t => (
              <button key={t.id}
                      role="tab"
                      aria-selected={active===t.id}
                      className={`cl-hw__tab ${active===t.id?'is-active':''}`}
                      onClick={() => setActive(t.id)}>
                {t.name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <dl key={active} className="cl-hw__panel">
            {panel.rows.map((r, i) => (
              <div key={`${active}-${i}`} className="cl-hw__row">
                <Icon name={iconFor(r.k)} size={22} />
                <dt>{r.k}</dt>
                <dd className={r.accent ? 'accent' : ''}>{r.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

window.Hardware = Hardware;
