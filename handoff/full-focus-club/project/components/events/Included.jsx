/* Included.jsx — §4 "мы берём всё на себя" — 6 cards 3×2 */
const Included = () => {
  const { Section, Reveal, Card } = window.FF;
  const Icon = window.EI;
  const { INCLUDED } = window.EVENTS_DATA;

  return (
    <Section id="included" label="— всё включено" title="МЫ БЕРЁМ ВСЁ НА СЕБЯ"
             sub="Тебе остаётся только прийти. Остальное — наша зона ответственности.">
      <div className="ev-incl__grid">
        {INCLUDED.map((it, i) => (
          <Reveal key={it.name} delay={60 + i * 80}>
            <Card className="ev-incl">
              <span className="ev-incl__icon"><Icon name={it.icon} size={24} /></span>
              <h3 className="ev-incl__name">{it.name}</h3>
              <p className="ev-incl__desc">{it.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

window.EVENTS_PAGE = window.EVENTS_PAGE || {};
window.EVENTS_PAGE.Included = Included;
