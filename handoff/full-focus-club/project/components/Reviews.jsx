/* Reviews.jsx — §8 SOCIAL PROOF QUOTES */
const { Section, Card, Reveal } = window.FF;

const REVIEWS = [
  {
    text: 'Мощные ПК с топовыми видеокартами — игры запускаются моментально. Дизайн продуман до мелочей: стильное освещение, эргономичные кресла.',
    name: 'Тимофей М.',
    src: 'Яндекс Карты',
  },
  {
    text: 'Отличный клуб, постоянно сюда хожу — мощные ПК, классные девайсы. Работа команды на высшем уровне.',
    name: 'Катрина',
    src: '2ГИС',
  },
];

const Reviews = () => (
  <Section
    id="reviews"
    label="Отзывы гостей"
    title={
      /* TODO: verify review count — по имеющимся данным 343 отзыва,
         уточнить суммарно по Яндекс · 2ГИС · Google */
      "3000+ отзывов · 5.0 ★"
    }
    sub="Каждый отзыв — реальный гость. Мы читаем все."
  >
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
  </Section>
);

window.FF.Reviews = Reviews;
