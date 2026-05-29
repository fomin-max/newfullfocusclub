import Icon from './Icon'

export default function MobileStickyBar() {
  return (
    <div className="ff-mobile-book" role="region" aria-label="Бронирование">
      <a href="#find" className="ff-btn ff-btn--primary is-pulse" style={{ width: '100%' }}>
        ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
      </a>
    </div>
  )
}
