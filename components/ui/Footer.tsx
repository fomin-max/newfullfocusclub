import Icon from './Icon'
import LogoFull from './LogoFull'
import CookieSettingsBtn from './CookieSettingsBtn'

const CLUBS = [
  ['Василеостровская', '#009E40', '/clubs/vasilyeostrovsky'],
  ['Электросила',      '#0062AC', '/clubs/elektrosila'],
  ['Комендантский',    '#8E479B', '/clubs/komendantsky'],
  ['Просвещения',      '#0062AC', '/clubs/prosvescheniya'],
  ['Садовая',          '#8E479B', '/clubs/sadovaya'],
  ['Технологический',  '#E4171B', '/clubs/tekhnologichesky'],
  ['Махачкала',        '#888888', '/clubs/makhachkala'],
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
          <LogoFull className="ff-footer__logo-full" height={40} />
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

      <div className="ff-footer__legal">
        <div className="ff-footer__legal-top">
          <a href="/privacy" className="ff-footer__policy">Политика обработки персональных данных</a>
          <CookieSettingsBtn />
          <span className="ff-footer__legal-site">fullfocusclub.ru</span>
        </div>
        <div className="ff-footer__legal-body">
          <p>© 2022–2026. Full Focus Co. Ltd.</p>
          <p>All rights reserved.</p>
          <p>&nbsp;</p>
          <p>Общество с ограниченной ответственностью «ФУЛЛ ФОКУС»</p>
          <p>ИНН / КПП 7810943662 / 781001001</p>
          <p>ОГРН 1227800036860</p>
          <p>196128, г. Санкт-Петербург, вн.тер.г. муниципальный округ Московская застава, пр-кт Московский, д. 149А, литера А, помещ. 1-Н, раб.м. 1-Ф</p>
        </div>
      </div>
    </footer>
  )
}
