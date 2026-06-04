import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const PROMOS = [
  { icon: 'gift'    as const, title: '500₽ новым гостям',        desc: 'Подарок при первом пополнении баланса. Введи код при первой регистрации в системе Langame.', code: 'SITE500' },
  { icon: 'school'  as const, title: 'Студентам и школьникам',   desc: 'Час за 120₽. Пн-пт с 10:00 до 16:00. По студенческому или табелю.' },
  { icon: 'cake'    as const, title: 'День рождения · депозит × 2', desc: 'Удваиваем пополнение за 5 дней до и после ДР. Просто покажи документ.' },
  { icon: 'users'   as const, title: 'Пригласи друга',           desc: 'Оба получаете час игры бесплатно. Активируется при первой сессии друга.' },
  { icon: 'taxi'    as const, title: '300 бонусов за такси',     desc: 'Дарим бонусы на следующую сессию при пополнении от 300₽.' },
  { icon: 'bolt'    as const, title: 'Full Focus × Gorilla',     desc: 'Энергетик в подарок при выборе ночного пакета. С 22:00 до 08:00.' },
]

export default function Promos() {
  return (
    <section id="promos" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Акции и бонусы</span>
          <h2 className="ff-section-head__title">Играй выгоднее</h2>
          <p className="ff-section-head__sub">Каждый месяц — новые поводы прийти. Действуют параллельно с программой лояльности.</p>
        </Reveal>
        <div className="ff-promos__grid">
          {PROMOS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80}>
              <Card className="ff-promo" brackets>
                <div className="ff-promo__head">
                  <span className="ff-promo__num">{String(i + 1).padStart(2, '0')} / 06</span>
                  {p.code && <span className="ff-promo__chip">{p.code}</span>}
                </div>
                <span style={{ color: 'var(--ff-neon-bloom)', display: 'inline-flex' }}>
                  <Icon name={p.icon} size={26} />
                </span>
                <h3 className="ff-promo__title">{p.title}</h3>
                <p className="ff-promo__desc">{p.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
