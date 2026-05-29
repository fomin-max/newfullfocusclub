import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'

const REVIEWS = [
  {
    text: 'Мощные ПК с топовыми видеокартами — игры запускаются моментально. Дизайн продуман до мелочей: стильное освещение, эргономичные кресла.',
    name: 'Тимофей М.',
    src:  'Яндекс Карты',
  },
  {
    text: 'Отличный клуб, постоянно сюда хожу — мощные ПК, классные девайсы. Работа команды на высшем уровне.',
    name: 'Катрина',
    src:  '2ГИС',
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Отзывы гостей</span>
          <h2 className="ff-section-head__title">3000+ отзывов · 5.0 ★</h2>
          <p className="ff-section-head__sub">Каждый отзыв — реальный гость. Мы читаем все.</p>
        </Reveal>
        <div className="ff-reviews__grid">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 100}>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
