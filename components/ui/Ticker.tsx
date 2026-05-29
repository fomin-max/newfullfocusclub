const ITEMS = [
  <><em key="v">500₽</em> новым гостям</>,
  <>промокод <em key="c">SITE500</em></>,
  <>Школьникам час за <em key="p">120₽</em> · пн-пт 10:00-16:00</>,
  <><em key="d">14 июня</em> турнир на Василеостровской</>,
  <>Пригласи друга — играйте бесплатно</>,
]

function renderChunk(prefix: string) {
  return ITEMS.flatMap((it, i) => [
    <span key={`${prefix}-c-${i}`} className="ff-ticker__chunk">{it}</span>,
    <span key={`${prefix}-s-${i}`} className="ff-ticker__sep">////</span>,
  ])
}

export default function Ticker() {
  return (
    <div className="ff-ticker" role="region" aria-label="Акции и события">
      <div className="ff-ticker__track">
        {renderChunk('a')}
        {renderChunk('b')}
      </div>
    </div>
  )
}
