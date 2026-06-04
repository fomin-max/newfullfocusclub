import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'

const REVIEWS = [
  { text: 'Мощные ПК с топовыми видеокартами — игры запускаются моментально. Дизайн продуман до мелочей: стильное освещение, эргономичные кресла.', name: 'Тимофей М.', src: 'Яндекс Карты' },
  { text: 'Отличный клуб, постоянно сюда хожу — мощные ПК, классные девайсы. Работа команды на высшем уровне.', name: 'Катрина', src: '2ГИС' },
  { text: 'Атмосфера топ, всё новое и чистое. Администраторы помогают с настройкой за пару минут. Буду возвращаться.', name: 'Денис К.', src: 'Google' },
  { text: 'Брали Duo-комнату на двоих — тихо, свой свет, никто не мешает. Идеально для долгой катки.', name: 'Алина В.', src: 'Яндекс Карты' },
  { text: 'Проводили день рождения в Arena — собрали команду на 10 человек, было огонь. Спасибо за организацию!', name: 'Максим П.', src: '2ГИС' },
  { text: 'Перепробовал клубы по всему городу — тут лучшее железо и адекватные цены по студенческому.', name: 'Рома С.', src: 'Google' },
  { text: 'PS5-зона с большими экранами — заходили компанией на файтинги, кайфанули. Вернёмся ещё.', name: 'Ника', src: 'Яндекс Карты' },
  { text: 'Чисто, технологично, без душноты. Видно, что про деталей думают — от периферии до кресел.', name: 'Артём Л.', src: '2ГИС' },
]

function QuoteCard({ r }: { r: typeof REVIEWS[0] }) {
  return (
    <Card className="ff-quote" brackets>
      <span className="ff-quote__mark">«</span>
      <p className="ff-quote__text">{r.text}</p>
      <div className="ff-quote__attr">
        <div>
          <div className="ff-quote__name">{r.name}</div>
          <div className="ff-quote__source">{r.src}</div>
        </div>
        <span className="ff-quote__stars">★★★★★</span>
      </div>
    </Card>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Отзывы гостей</span>
          <h2 className="ff-section-head__title">Нам доверяют</h2>
          <p className="ff-section-head__sub">3000+ отзывов · средняя оценка 5.0★ на Яндекс, 2ГИС и Google. Каждый отзыв — реальный гость.</p>
        </Reveal>
      </div>
      <div className="ff-reviews__marquee" role="list" aria-label="Отзывы гостей">
        <div className="ff-reviews__track">
          {REVIEWS.map((r, i) => (
            <div className="ff-reviews__cell" role="listitem" key={`a-${i}`}>
              <QuoteCard r={r} />
            </div>
          ))}
          {REVIEWS.map((r, i) => (
            <div className="ff-reviews__cell" aria-hidden="true" key={`b-${i}`}>
              <QuoteCard r={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
