/* Venues.jsx — §3 two flagship venue cards + small clubs row */
const Venues = () => {
  const { Section, Reveal, Card } = window.FF;
  const Icon = window.EI;
  const { VENUES, SMALL_CLUBS } = window.EVENTS_DATA;

  return (
    <Section id="venues" label="— большие ивенты" title="ПЛОЩАДКИ ДЛЯ БОЛЬШИХ МЕРОПРИЯТИЙ"
             sub="Два флагманских клуба для крупных ивентов.">
      <div className="ev-venues__grid">
        {VENUES.map((v, i) => (
          <Reveal key={v.name} delay={80 + i * 120}>
            <Card className="ev-venue" brackets>
              <div className="ev-venue__media">
                {v.image ? (
                  <img src={v.image} alt={v.name} loading="lazy" />
                ) : (
                  <div className="ev-venue__soon">
                    <span className="ev-venue__soon-mark"><Icon name="camera" size={26} /></span>
                    <span className="ev-venue__soon-txt">· ФОТО СКОРО ·</span>
                  </div>
                )}
                <div className="ev-venue__media-shade" />
                <span className="ev-venue__cap">{v.capacity}</span>
                {v.tag && <span className="ev-venue__flag">{v.tag}</span>}
              </div>
              <div className="ev-venue__head">
                <h3 className="ev-venue__name">{v.name}</h3>
                <div className="ev-venue__addr">
                  <span className="ev-venue__metro" style={{ '--metro-color': v.metroColor }} />
                  {v.address} · м.&nbsp;{v.metro}
                </div>
              </div>
              <ul className="ev-venue__features">
                {v.features.map((ft, j) => (
                  <li key={j}><span className="ev-venue__tick"><Icon name="check" size={13} /></span>{ft}</li>
                ))}
              </ul>
              <a
                className="ev-venue__more"
                href={v.href}
                onClick={(e) => {
                  if (v.href.startsWith('#')) {
                    e.preventDefault();
                    document.getElementById(v.href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {v.href.startsWith('#') ? 'ОСТАВИТЬ ЗАЯВКУ' : 'СТРАНИЦА КЛУБА'}
                <Icon name="arrowRight" size={14} />
              </a>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={260}>
        <div className="ev-small">
          <div className="ev-small__text">
            <span className="ev-small__title">НЕБОЛЬШИЕ МЕРОПРИЯТИЯ</span>
            <p>Остальные 6 клубов сети подходят для камерных турниров и дней рождения до 40 человек.</p>
          </div>
          <div className="ev-small__clubs">
            {SMALL_CLUBS.map((c) => (
              <a
                key={c.name}
                className="ev-small__club"
                href={c.href}
                onClick={(e) => {
                  if (c.href.startsWith('#')) {
                    e.preventDefault();
                    document.getElementById(c.href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <span className="ev-small__dot" style={{ '--metro-color': c.color }} />
                {c.name}
                <span className="ev-small__arr">→</span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
};

window.EVENTS_PAGE = window.EVENTS_PAGE || {};
window.EVENTS_PAGE.Venues = Venues;
