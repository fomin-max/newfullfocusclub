'use client'

import { useState, useMemo } from 'react'
import Reveal from '@/components/ui/Reveal'
import { useClubData } from './ClubDataContext'
import { useBooking } from './BookingContext'
import type { Seat } from '@/lib/clubs/types'

interface FlatSeat extends Seat {
  zone: string
  zoneLabel: string
}

export default function LiveMap() {
  const { FLOOR }       = useClubData()
  const { openBooking } = useBooking()
  const [filter, setFilter] = useState('all')

  const allSeats = useMemo<FlatSeat[]>(() =>
    FLOOR.zones.flatMap(z => z.seats.map(s => ({ ...s, zone: z.zone, zoneLabel: z.label }))),
  [FLOOR])

  const counts = useMemo(() => {
    const c: Record<string, { free: number; total: number }> = { all: { free: 0, total: 0 } }
    for (const s of allSeats) {
      c[s.zone] = c[s.zone] || { free: 0, total: 0 }
      if (s.status !== 'off') {
        c.all.total++; c[s.zone].total++
        if (s.status === 'free') { c.all.free++; c[s.zone].free++ }
      }
    }
    return c
  }, [allSeats])

  const isActiveFor = (s: FlatSeat, filterId: string) => {
    if (filterId === 'all') return true
    const f = FLOOR.filters.find(x => x.id === filterId)
    return (f?.match ?? [filterId]).includes(s.zone)
  }

  return (
    <section id="live" className="ff-section cl-live" data-screen-label="02 · LIVE">
      <div className="ff-section__inner">
        <Reveal>
          <div className="cl-live__head">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span className="ff-tag">live · обновлено сейчас</span>
              <h2 className="ff-section-head__title">СВОБОДНЫЕ МЕСТА<br />ПРЯМО СЕЙЧАС</h2>
            </div>
            <div className="cl-live__status">
              <span className="cl-status-dot" /> Клуб открыт · принимаем гостей
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="cl-live__filters">
            {FLOOR.filters.map(f => {
              const keys = f.match ?? [f.id]
              const c    = f.id === 'all' ? counts.all
                : keys.reduce((acc, k) => ({ free: acc.free + (counts[k]?.free||0), total: acc.total + (counts[k]?.total||0) }), { free: 0, total: 0 })
              return (
                <button key={f.id}
                        className={`cl-live__filter ${filter === f.id ? 'is-active' : ''}`}
                        onClick={() => setFilter(f.id)}>
                  {f.name}<sup>{c.free}/{c.total}</sup>
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="cl-floor">
            <div className="cl-floor__legend">
              <span style={{ color: 'var(--ff-neon-bloom)' }}><i />свободно</span>
              <span style={{ color: 'var(--ff-danger)' }}><i />занято</span>
              <span style={{ color: 'var(--ff-system-fog)' }}><i />недоступно</span>
            </div>
            {FLOOR.outlines.map((o, i) => (
              <div key={i}
                   className={`cl-floor__zone ${o.highlightFor && filter === o.highlightFor ? 'is-highlight' : ''}`}
                   style={{ left: o.left, top: o.top, width: o.width, height: o.height }}>
                {o.label}
              </div>
            ))}
            <div className="cl-floor__entrance">▼ ВХОД</div>
            {allSeats.map(s => (
              <span key={s.id}
                    className={['cl-seat', `cl-seat--${s.status}`, !isActiveFor(s, filter) && 'cl-seat--dim'].filter(Boolean).join(' ')}
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                    title={`${s.zoneLabel} · ${s.status}`} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="cl-live__count">
            <strong>{counts.all.free}</strong>
            <em>из <strong>{counts.all.total}</strong> мест свободно сейчас</em>
            <div className="cl-live__action">
              <button className="ff-btn ff-btn--primary is-pulse" onClick={() => openBooking()}>
                ЗАБРОНИРОВАТЬ МЕСТО →
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
