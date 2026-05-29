import Reveal from '@/components/ui/Reveal'

const STEPS = [
  { num: '01', name: 'Выбери клуб и зону',
    desc: 'Найди ближайший клуб, выбери формат — PRO, DUO, SOLO, Lounge или командную зону.' },
  { num: '02', name: 'Зарегистрируйся на месте',
    desc: 'Быстрая регистрация за 2 минуты. Администратор проведёт экскурсию и поможет выбрать.',
    promo: 'При первой регистрации введи промокод SITE500 — получишь 500₽ на баланс.' },
  { num: '03', name: 'Садись и играй',
    desc: 'Игры уже установлены, аккаунты настроены — просто нажми Play и погружайся.' },
]

export default function HowItWorks() {
  return (
    <section id="how" className="ff-section ff-how">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">С чего начать</span>
          <h2 className="ff-section-head__title">Как начать играть</h2>
          <p className="ff-section-head__sub">Три шага от метро до твоего любимого героя. Никаких очередей и предзагрузок.</p>
        </Reveal>
        <div className="ff-how__list">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 120} className="ff-how__step">
              <span className="ff-how__num">{s.num} / 03</span>
              <h3 className="ff-how__name">{s.name}</h3>
              <p className="ff-how__desc">{s.desc}</p>
              {s.promo && <p className="ff-how__promo">{s.promo}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
