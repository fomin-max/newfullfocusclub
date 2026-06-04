'use client'

import { useCountUp } from '@/lib/hooks'
import Reveal from '@/components/ui/Reveal'

const formatRu = (n: number) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

function StatTile({
  pre, target, unit, label, format,
}: {
  pre?: string
  target: number
  unit: string
  label: string
  format?: (n: number) => string
}) {
  const [val, ref] = useCountUp(target, { duration: 1800 })
  const display = format ? format(parseFloat(val)) : val

  return (
    <div className="ff-stat" ref={ref as React.RefObject<HTMLDivElement>}>
      {pre && <span className="ff-stat__pre">{pre}</span>}
      <span className="ff-stat__num">
        {display}<span className="ff-stat__unit">{unit}</span>
      </span>
      <span className="ff-stat__lbl">{label}</span>
    </div>
  )
}

export default function FranchiseStats() {
  return (
    <section className="ff-stats" id="stats">
      <Reveal>
        <div className="ff-stats__grid">
          <StatTile pre="от" target={7}      unit="МЛН ₽"    label="Инвестиции на старте" />
          <StatTile pre="от" target={18}     unit="МЕС"      label="Срок окупаемости" />
          <StatTile          target={7}      unit="КЛУБОВ"   label="Работают прямо сейчас" />
          <StatTile          target={450000} unit="₽ / МЕС"  label="Средняя прибыль клуба"
                             format={formatRu} />
        </div>
      </Reveal>
    </section>
  )
}
