import Icon from './Icon'

interface Props {
  label?: string
  href?: string
}

export default function MobileStickyBar({ label = 'ЗАБРОНИРОВАТЬ', href = '#find' }: Props) {
  return (
    <div className="ff-mobile-book" role="region" aria-label="Бронирование">
      <a href={href} className="ff-btn ff-btn--primary is-pulse" style={{ width: '100%' }}>
        {label} <Icon name="arrowRight" size={14} />
      </a>
    </div>
  )
}
