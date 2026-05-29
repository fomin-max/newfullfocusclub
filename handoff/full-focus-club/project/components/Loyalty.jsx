/* Loyalty.jsx — §7 ПРОКАЧАЙ СВОЙ УРОВЕНЬ */
const { Section, Card, Reveal } = window.FF;

const LEVELS = [
  { rank: 'I',   name: 'BASIC',     pct: 0,  range: '0 – 6 999 ₽',       p: 0.05 },
  { rank: 'II',  name: 'RARE',      pct: 3,  range: '7 000 – 9 999 ₽',   p: 0.15 },
  { rank: 'III', name: 'EPIC',      pct: 7,  range: '10 000 – 19 999 ₽', p: 0.35 },
  { rank: 'IV',  name: 'LEGENDARY', pct: 15, range: '20 000 – 49 999 ₽', p: 0.75 },
  { rank: 'V',   name: 'MYSTERY',   pct: 20, range: 'от 50 000 ₽',       p: 1.0  },
];

const Loyalty = () => (
  <Section
    id="loyalty"
    label="Программа лояльности"
    title="Прокачай свой уровень"
    sub="Возвращаем процент от пополнений бонусами. Чем выше уровень — тем больше кэшбэк. Уровни не сгорают."
    className="ff-loyalty"
  >
    <div className="ff-loyalty__grid">
      {LEVELS.map((l, i) => (
        <Reveal key={l.name} delay={i * 90}>
          <Card className={`ff-level ${l.name === 'MYSTERY' ? 'is-current' : ''}`} brackets>
            {l.name === 'MYSTERY' && <span className="ff-level__badge">Топ уровень</span>}
            <span className="ff-level__rank">УРОВЕНЬ · {l.rank}</span>
            <h3 className="ff-level__name">{l.name}</h3>
            <div className="ff-level__pct">
              {l.pct}<sup>%</sup>
            </div>
            <span className="ff-level__cashback">
              {l.name === 'BASIC' ? 'Начни — и уже на пути к RARE' : 'Кэшбэк бонусами'}
            </span>
            <div className="ff-level__bar">
              <div className="ff-level__bar-fill" style={{ '--p': l.p }} />
            </div>
            <span className="ff-level__range">{l.range}</span>
          </Card>
        </Reveal>
      ))}
    </div>
  </Section>
);

window.FF.Loyalty = Loyalty;
