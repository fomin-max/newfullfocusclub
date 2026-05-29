import Icon from './Icon'

const CLUBS = [
  ['Василеостровская', '#bf9e4d', '/clubs/vasilyeostrovsky'],
  ['Электросила',      '#0066b3', '/clubs/elektrosila'],
  ['Комендантский',    '#8bc34a', '/clubs/komendantsky'],
  ['Просвещения',      '#c12a2c', '/clubs/prosvescheniya'],
  ['Садовая',          '#b14385', '/clubs/sadovaya'],
  ['Технологический',  '#0066b3', '/clubs/tekhnologichesky'],
  ['Махачкала',        '#6632FA', '/clubs/makhachkala'],
] as const

export default function Footer() {
  return (
    <footer className="ff-footer" id="contacts">
      <div className="ff-footer__promo">
        <span className="ff-footer__promo-text">
          Промокод <span className="ff-footer__promo-code">SITE500</span> — 500₽ новым гостям при первом пополнении
        </span>
        <a href="#find" className="ff-btn ff-btn--accent ff-btn--sm">
          ЗАБРАТЬ БОНУС <Icon name="arrowRight" size={12} />
        </a>
      </div>

      <div className="ff-footer__inner">
        <div className="ff-footer__brand">
          <span className="ff-logo">
            <span className="ff-logo__dot" />
            FULL FOCUS
          </span>
          <p className="ff-footer__tagline">
            Сеть киберспортивных клубов нового поколения · С 2022 года
          </p>
          <div className="ff-footer__social">
            <a href="https://vk.com/fullfocusclub" aria-label="VK" rel="noopener noreferrer" target="_blank">
              <Icon name="vk" size={20} />
            </a>
            <a href="https://t.me/fullfocusclub" aria-label="Telegram" rel="noopener noreferrer" target="_blank">
              <Icon name="telegram" size={20} />
            </a>
          </div>
        </div>

        <div className="ff-footer__col">
          <h4>Клубы</h4>
          <ul>
            {CLUBS.map(([name, color, href]) => (
              <li key={name}>
                <a href={href}>
                  <span className="metro" style={{ '--metro-color': color } as React.CSSProperties} />
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="ff-footer__col">
          <h4>Разделы</h4>
          <ul>
            <li><a href="/clubs">Все клубы</a></li>
            <li><a href="#zones">Зоны и форматы</a></li>
            <li><a href="/promo">Акции</a></li>
            <li><a href="#loyalty">Программа лояльности</a></li>
            <li><a href="/tournaments">Турниры</a></li>
            <li><a href="/events">Мероприятия</a></li>
            <li><a href="/franchise">Франшиза</a></li>
          </ul>
        </div>

        <div className="ff-footer__col">
          <h4>Контакты</h4>
          <ul>
            <li><a href="tel:+78126605596">+7 (812) 660-55-96</a></li>
            <li><a href="mailto:hello@fullfocusclub.ru">hello@fullfocusclub.ru</a></li>
            <li>Telegram · <a href="https://t.me/fullfocusclub" target="_blank" rel="noopener noreferrer">@fullfocusclub</a></li>
            <li>VK · <a href="https://vk.com/fullfocusclub" target="_blank" rel="noopener noreferrer">vk.com/fullfocusclub</a></li>
            <li style={{ color: 'var(--ff-system-fog)', marginTop: 8, fontSize: 12 }}>
              Круглосуточно · 24/7
            </li>
          </ul>
        </div>
      </div>

      <div className="ff-footer__copy">
        <span>© 2022–2026 Full Focus. Все права защищены.</span>
        <span>ИНН 7810943662 · ОГРН 1227800036860</span>
        <span>fullfocusclub.ru</span>
      </div>
    </footer>
  )
}
