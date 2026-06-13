import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'

const LEVELS = [
  { rank: 'I',   name: 'BASIC',     pct: 0,  range: '0 – 6 999 ₽',       p: 0.05 },
  { rank: 'II',  name: 'RARE',      pct: 3,  range: '7 000 – 9 999 ₽',   p: 0.15 },
  { rank: 'III', name: 'EPIC',      pct: 7,  range: '10 000 – 19 999 ₽', p: 0.35 },
  { rank: 'IV',  name: 'LEGENDARY', pct: 15, range: '20 000 – 49 999 ₽', p: 0.75 },
  { rank: 'V',   name: 'MYSTERY',   pct: 20, range: 'от 50 000 ₽',       p: 1.0  },
]

export default function Loyalty() {
  return (
    <section id="loyalty" className="ff-section ff-loyalty">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Программа лояльности</span>
          <h2 className="ff-section-head__title">Прокачай свой уровень</h2>
          <p className="ff-section-head__sub">Возвращаем процент от пополнений бонусами. Чем выше уровень — тем больше кэшбэк. Уровни не сгорают.</p>
        </Reveal>
        <div className="ff-loyalty__grid">
          {LEVELS.map((l, i) => (
            <Reveal key={l.name} delay={i * 90}>
              <div className={l.name === 'MYSTERY' ? 'ff-level__outer' : undefined}>
                {l.name === 'MYSTERY' && <span className="ff-level__badge">Топ уровень</span>}
                <Card className={`ff-level ${l.name === 'MYSTERY' ? 'is-current' : ''}`} brackets>
                <span className="ff-level__rank">УРОВЕНЬ · {l.rank}</span>
                <h3 className="ff-level__name">{l.name}</h3>
                <div className="ff-level__pct">{l.pct}<sup>%</sup></div>
                <span className="ff-level__cashback">
                  {l.name === 'BASIC' ? 'Начни — и уже на пути к RARE' : 'Кэшбэк бонусами'}
                </span>
                <div className="ff-level__bar">
                  <div className="ff-level__bar-fill" style={{ '--p': l.p } as React.CSSProperties} />
                </div>
                <span className="ff-level__range">{l.range}</span>
                </Card>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
