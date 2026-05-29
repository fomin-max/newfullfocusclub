/* SocialStats.jsx — §3 */
const { Reveal, useCountUp } = window.FF;

const Stat = ({ pre, prefix, target, unit, decimals, lbl }) => {
  const [val, ref] = useCountUp(target, { duration: 1700, decimals: decimals || 0 });
  return (
    <div className="ff-stat" ref={ref}>
      <span className="ff-stat__pre">{pre}</span>
      <span className="ff-stat__num">
        {prefix && <span className="ff-stat__unit" style={{marginRight: 4}}>{prefix}</span>}
        {val}
        {unit && <span className="ff-stat__unit">{unit}</span>}
      </span>
      <span className="ff-stat__lbl">{lbl}</span>
    </div>
  );
};

const SocialStats = () => (
  <section className="ff-stats" id="proof" data-screen-label="03 Social proof">
    <Reveal>
      <div className="ff-stats__grid">
        <Stat pre="Минимальный тариф" prefix="от" target={120}  unit="₽/час" lbl="Школьникам и студентам в будни" />
        <Stat pre="Клубов сети"  target={8} lbl="Санкт-Петербург и Махачкала" />
        <Stat pre="Отзывов гостей" target={3000} unit="+" lbl="Яндекс · 2ГИС · Google" />
        <Stat pre="Средняя оценка"  target={5.0}  unit="★" decimals={1} lbl="По всем клубам сети" />
      </div>
    </Reveal>
  </section>
);

window.FF.SocialStats = SocialStats;
