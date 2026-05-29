import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const SERVICES = ['Steam', 'Epic Games', 'PlayStation', 'Xbox', 'Battle.net', 'EA', 'Riot']

export default function FFPay() {
  return (
    <section className="ff-pay" id="ffpay">
      <Reveal>
        <div className="ff-pay__card">
          <div className="ff-pay__left">
            <span className="ff-pay__brand">
              <span className="ff-pay__brand-mark">F</span>
              FULL FOCUS <span style={{ color: 'var(--ff-neon-bloom)' }}>PAY</span>
            </span>
            <h2 className="ff-pay__title">Пополни Steam<br />прямо здесь</h2>
            <p className="ff-pay__desc">
              Пополняй Steam и зарубежные игровые сервисы — быстро, безопасно, без лишних шагов. Курсы рынка, поддержка 24/7.
            </p>
            <div>
              <a href="#" className="ff-btn ff-btn--secondary ff-btn--sm">
                Перейти в FFPay <Icon name="arrowRight" size={14} />
              </a>
            </div>
          </div>
          <div className="ff-pay__right">
            <span className="ff-tag">Поддерживаемые сервисы</span>
            <div className="ff-pay__services">
              {SERVICES.map(s => (
                <span key={s} className="ff-pay__svc">
                  <span className="ff-pay__svc-dot" />{s}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--ff-font-heading)', fontSize: 11, letterSpacing: 'var(--ff-track-label)', textTransform: 'uppercase', color: 'var(--ff-system-fog)', marginTop: 4 }}>
              <span>· Без VPN</span>
              <span>· Без комиссий</span>
              <span>· Гарантия</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
