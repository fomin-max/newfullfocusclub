/* Zones.jsx — §5 ДЛЯ ЛЮБОЙ КОМПАНИИ */
const { Section, Card, Reveal, Icon } = window.FF;

const ZONES = [
  { name: 'PRO ZONE',  desc: 'Соло-игра на топовом железе RTX 4080+. Стандарт сети.', icon: 'cpu' },
  { name: 'MAX ZONE',  desc: 'Улучшенные ПК и премиум-периферия для требовательных гостей.', icon: 'bolt' },
  { name: 'BOOTCAMP',  desc: 'Командная зона на 5+ мест — тренировки, турниры, скримы.', icon: 'users' },
  { name: 'DUO ROOM',  desc: 'Приватная комната на двоих. Тишина и собственный свет.', icon: 'userPair' },
  { name: 'TRIO ROOM', desc: 'Приватная комната на троих. Идеально для стрима.', icon: 'users' },
  { name: 'SOLO ROOM', desc: 'Полностью приватная комната для одного. Глубокая концентрация.', icon: 'user' },
  { name: 'LOUNGE',    desc: 'PS5-зона с диванами и большими экранами. Файтинги, кооп.', icon: 'sofa' },
  { name: 'ARENA',     desc: 'Большая командная зона на 10+ мест. Турниры и LAN-вечера.', icon: 'trophy', only: '· Только в клубе на Василеостровской' },
];

const Zones = () => (
  <Section
    id="zones"
    label="Зоны и форматы"
    title="Для любой компании"
    sub="Восемь форматов под любой сценарий — от одиночного гринда до командного турнира. Тарифы — на странице клуба."
  >
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
  </Section>
);

window.FF.Zones = Zones;
