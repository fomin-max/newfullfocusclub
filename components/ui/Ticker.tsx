'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const STATIC_ITEMS = [
  <><em key="v">500₽</em> новым гостям</>,
  <>промокод <em key="c">SITE500</em></>,
  <>Школьникам час за <em key="p">120₽</em> · пн-пт 10:00-16:00</>,
  <>Пригласи друга — играйте бесплатно</>,
]

function formatTickerDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', timeZone: 'Europe/Moscow',
  })
}

function renderChunk(items: React.ReactNode[], prefix: string) {
  return items.flatMap((it, i) => [
    <span key={`${prefix}-c-${i}`} className="ff-ticker__chunk">{it}</span>,
    <span key={`${prefix}-s-${i}`} className="ff-ticker__sep">////</span>,
  ])
}

export default function Ticker() {
  const [tournamentItem, setTournamentItem] = useState<React.ReactNode>(null)

  useEffect(() => {
    supabase
      .from('tournaments')
      .select('title, title_accent, date, slug')
      .in('status', ['registration_open', 'upcoming'])
      .order('date', { ascending: true })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (!data) return
        const dateStr = formatTickerDate(data.date)
        const label = data.title_accent ?? data.title
        setTournamentItem(
          <><em>{dateStr}</em> {label} — турнир Full Focus</>
        )
      })
  }, [])

  const items = tournamentItem
    ? [...STATIC_ITEMS, tournamentItem]
    : STATIC_ITEMS

  return (
    <div className="ff-ticker" role="region" aria-label="Акции и события">
      <div className="ff-ticker__track">
        {renderChunk(items, 'a')}
        {renderChunk(items, 'b')}
      </div>
    </div>
  )
}
