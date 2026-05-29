/* Promos.jsx — §6 ИГРАЙ ВЫГОДНЕЕ */
const { Section, Card, Reveal, Icon } = window.FF;

const PROMOS = [
  { icon: 'gift', title: '500₽ новым гостям',
    desc: 'Подарок при первом пополнении баланса. Введи код при первой регистрации в системе Langame.',
    code: 'SITE500' },
  { icon: 'school', title: 'Студентам и школьникам',
    desc: 'Час за 120₽. Пн-пт с 10:00 до 16:00. По студенческому или табелю.' },
  { icon: 'cake', title: 'День рождения · депозит × 2',
    desc: 'Удваиваем пополнение за 5 дней до и после ДР. Просто покажи документ.' },
  { icon: 'users', title: 'Пригласи друга',
    desc: 'Оба получаете час игры бесплатно. Активируется при первой сессии друга.' },
  { icon: 'taxi', title: '300 бонусов за такси',
    desc: 'Дарим бонусы на следующую сессию при пополнении от 300₽.' },
  { icon: 'bolt', title: 'Full Focus × Gorilla',
    desc: 'Энергетик в подарок при выборе ночного пакета. С 22:00 до 08:00.' },
];

const Promos = () => (
  <Section
    id="promos"
    label="Акции и бонусы"
    title="Играй выгоднее"
    sub="Каждый месяц — новые поводы прийти. Действуют параллельно с программой лояльности."
  >
    <div className="ff-promos__grid">
      {PROMOS.map((p, i) => (
        <Reveal key={p.title} delay={(i % 3) * 80}>
          <Card className="ff-promo" brackets>
            <div className="ff-promo__head">
              <span className="ff-promo__num">{String(i+1).padStart(2,'0')} / 06</span>
              {p.code && <span className="ff-promo__chip">КОД</span>}
            </div>
            <span style={{ color: 'var(--ff-neon-bloom)', display: 'inline-flex' }}>
              <Icon name={p.icon} size={26} />
            </span>
            <h3 className="ff-promo__title">{p.title}</h3>
            <p className="ff-promo__desc">{p.desc}</p>
            {p.code && <span className="ff-promo__code">{p.code}</span>}
          </Card>
        </Reveal>
      ))}
    </div>
  </Section>
);

window.FF.Promos = Promos;
