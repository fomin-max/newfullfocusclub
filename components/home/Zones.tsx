import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const ZONES = [
  { name: 'PRO ZONE',  desc: 'Соло-игра на топовом железе RTX 4080+. Стандарт сети.',              icon: 'cpu'      as const },
  { name: 'MAX ZONE',  desc: 'Улучшенные ПК и премиум-периферия для требовательных гостей.',        icon: 'bolt'     as const },
  { name: 'BOOTCAMP',  desc: 'Командная зона на 5+ мест — тренировки, турниры, скримы.',            icon: 'users'    as const },
  { name: 'DUO ROOM',  desc: 'Приватная комната на двоих. Тишина и собственный свет.',              icon: 'userPair' as const },
  { name: 'TRIO ROOM', desc: 'Приватная комната на троих. Идеально для стрима.',                    icon: 'users'    as const },
  { name: 'SOLO ROOM', desc: 'Полностью приватная комната для одного. Глубокая концентрация.',      icon: 'user'     as const },
  { name: 'LOUNGE',    desc: 'PS5-зона с диванами и большими экранами. Файтинги, кооп.',            icon: 'sofa'     as const },
  { name: 'ARENA',     desc: 'Большая командная зона на 10+ мест. Турниры и LAN-вечера.',           icon: 'trophy'   as const, only: '· Только в клубе на Василеостровской' },
]

export default function Zones() {
  return (
    <section id="zones" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Зоны и форматы</span>
          <h2 className="ff-section-head__title">Для любой компании</h2>
          <p className="ff-section-head__sub">Восемь форматов под любой сценарий — от одиночного гринда до командного турнира.</p>
        </Reveal>
        <div className="ff-zones__grid">
          {ZONES.map((z, i) => (
            <Reveal key={z.name} delay={(i % 4) * 80}>
              <Card className="ff-zone" brackets>
                <span className="ff-zone__icon"><Icon name={z.icon} size={22} /></span>
                <h3 className="ff-zone__name">{z.name}</h3>
                <p className="ff-zone__desc">{z.desc}</p>
                {z.only && <p className="ff-zone__only">{z.only}</p>}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
