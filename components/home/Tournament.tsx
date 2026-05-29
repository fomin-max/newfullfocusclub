import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

export default function Tournament() {
  return (
    <section id="tournament" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Турниры</span>
          <h2 className="ff-section-head__title">Докажи, что ты лучший</h2>
          <p className="ff-section-head__sub">Регулярные турниры по CS2, Dota 2, Valorant и Tekken. Призовые, мерч и эфиры на твиче.</p>
        </Reveal>
        <Reveal>
          <div className="ff-tournament__card">
            <div className="ff-tournament__left">
              <div className="ff-tournament__date">
                <strong>14 июня</strong>
                <span>· Суббота · 14:00</span>
              </div>
              <h3 className="ff-tournament__title">
                CS2 5×5 — Кубок<br />Василеостровской
              </h3>
              <p className="ff-tournament__loc">
                <Icon name="pin" size={16} />
                <span><strong>Full Focus Василеостровская</strong> · Бугский переулок, 3</span>
              </p>
              <div className="ff-tournament__cta">
                <a href="/tournaments" className="ff-btn ff-btn--primary is-pulse">
                  Зарегистрироваться <Icon name="arrowRight" size={14} />
                </a>
                <a href="/tournaments" className="ff-btn ff-btn--secondary">
                  Все турниры <Icon name="arrowRight" size={14} />
                </a>
              </div>
            </div>
            <dl className="ff-tournament__meta">
              <div className="ff-tournament__meta-cell"><dt>Формат</dt><dd>5 × 5</dd></div>
              <div className="ff-tournament__meta-cell"><dt>Призовой</dt><dd><span className="mint">100 000 ₽</span></dd></div>
              <div className="ff-tournament__meta-cell"><dt>Слотов</dt><dd>16 команд</dd></div>
              <div className="ff-tournament__meta-cell"><dt>Взнос</dt><dd>500 ₽ / игрок</dd></div>
              <div className="ff-tournament__meta-cell"><dt>Дисциплина</dt><dd>Counter-Strike 2</dd></div>
              <div className="ff-tournament__meta-cell">
                <dt>Эфир</dt>
                <dd>
                  <span className="ff-tournament__twitch">
                    <Icon name="twitch" size={14} /> twitch · fullfocus
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
