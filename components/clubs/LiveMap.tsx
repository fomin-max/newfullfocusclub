'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Reveal from '@/components/ui/Reveal'
import { useClubData } from './ClubDataContext'
import { useBooking } from './BookingContext'
import type { LiveSeat } from '@/lib/clubs/langame'
import type { FloorPOIIcon } from '@/lib/clubs/types'

const POI_ICON: Record<FloorPOIIcon, string> = {
  wc:       '🚻',
  bar:      '☕',
  admin:    '💬',
  entrance: '🚪',
  sofa:     '🛋',
  hanger:   '🪝',
}

const POLL_MS = 30_000

// Sort order: PC zones cheapest→expensive, then PS zones, then POKER/БИЛЬЯРД
// TV + PS5 VIP must come before TV + PS5 so the includes-check matches correctly
const ZONE_ORDER = [
  'PRO ZONE', 'BOOTCAMP', 'ARENA',
  'DUO ROOM', 'SOLO ROOM',
  'TV + PS5', 'TV + PS5 VIP',
  'POKER', 'БИЛЬЯРД',
]
function zonePriority(name: string): number {
  const upper = name.toUpperCase()
  let bestIdx = ZONE_ORDER.length
  let bestLen = -1
  ZONE_ORDER.forEach((p, i) => {
    if (upper.includes(p) && p.length > bestLen) { bestIdx = i; bestLen = p.length }
  })
  return bestIdx
}

export default function LiveMap() {
  const { FLOOR, CLUB }  = useClubData()
  const { openBooking }  = useBooking()

  const [seats,   setSeats]   = useState<LiveSeat[]>([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState('all')
  const [floorBg, setFloorBg] = useState<string | null>(FLOOR.bg ?? null)

  const fetchSeats = useCallback(async () => {
    try {
      const res  = await fetch(`/api/seats/${CLUB.SLUG}`, { cache: 'no-store' })
      const json = await res.json()
      if (Array.isArray(json.seats)) setSeats(json.seats)
      if (json.floorBg) setFloorBg(json.floorBg)
    } catch {
      // keep previous data on network error
    } finally {
      setLoading(false)
    }
  }, [CLUB.SLUG])

  useEffect(() => {
    fetchSeats()
    const id = setInterval(fetchSeats, POLL_MS)
    return () => clearInterval(id)
  }, [fetchSeats])

  // dynamic zone filters derived from real data
  const zones = useMemo(() => {
    const map = new Map<number, string>()
    seats.forEach(s => map.set(s.zoneId, s.zoneName))
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => zonePriority(a.name) - zonePriority(b.name))
  }, [seats])

  const counts = useMemo(() => {
    const c: Record<string, { free: number; total: number }> = { all: { free: 0, total: 0 } }
    for (const s of seats) {
      if (s.status === 'off') continue
      const key = String(s.zoneId)
      c[key] = c[key] ?? { free: 0, total: 0 }
      c.all.total++
      c[key].total++
      if (s.status === 'free') { c.all.free++; c[key].free++ }
    }
    return c
  }, [seats])

  const visibleSeats = useMemo(() =>
    filter === 'all' ? seats : seats.filter(s => String(s.zoneId) === filter),
  [seats, filter])

  function handleSeatClick(seat: LiveSeat) {
    if (seat.status !== 'free') return
    openBooking({ seatId: seat.uuid, seatLabel: `${seat.number} · ${seat.zoneName}` })
  }

  const freeCount  = counts.all.free  ?? 0
  const totalCount = counts.all.total ?? 0

  return (
    <section id="live" className="ff-section cl-live" data-screen-label="02 · LIVE">
      <div className="ff-section__inner">
        <Reveal>
          <div className="cl-live__head">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span className="ff-tag">live · обновляется каждые 30 сек</span>
              <h2 className="ff-section-head__title">СВОБОДНЫЕ МЕСТА<br />ПРЯМО СЕЙЧАС</h2>
            </div>
            <div className="cl-live__status">
              <span className="cl-status-dot" /> Клуб открыт · принимаем гостей
            </div>
          </div>
        </Reveal>

        {/* Zone filters */}
        {loading && zones.length === 0 && (
          <div className="cl-live__filters" style={{ pointerEvents: 'none' }}>
            {[60, 100, 80, 90, 70, 85].map((w, i) => (
              <div key={i} className="cl-skeleton-bar" style={{ width: w, height: 32, borderRadius: 6, animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
        )}
        {zones.length > 0 && (
          <Reveal delay={80}>
            <div className="cl-live__filters">
              <button
                className={`cl-live__filter ${filter === 'all' ? 'is-active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Все<sup>{counts.all.free}/{counts.all.total}</sup>
              </button>
              {zones.map(z => {
                const c = counts[String(z.id)] ?? { free: 0, total: 0 }
                return (
                  <button
                    key={z.id}
                    className={`cl-live__filter ${filter === String(z.id) ? 'is-active' : ''}`}
                    onClick={() => setFilter(String(z.id))}
                  >
                    {z.name}<sup>{c.free}/{c.total}</sup>
                  </button>
                )
              })}
            </div>
          </Reveal>
        )}

        {!loading && seats.length > 0 && (
          <p className="cl-floor__book-hint">
            Нажми на свободное место, чтобы забронировать
          </p>
        )}

        <Reveal delay={140}>
          <div className="cl-floor__scroll">
          <div className={`cl-floor${floorBg ? ' cl-floor--has-bg' : ''}`} style={floorBg ? { '--floor-bg': `url(${floorBg})` } as React.CSSProperties : undefined}>
            {floorBg && <img src={floorBg} alt="" aria-hidden="true" className="cl-floor__bg-sizer" />}
            <div className="cl-floor__legend">
              <span style={{ color: 'var(--ff-neon-bloom)' }}><i />свободно</span>
              <span style={{ color: 'var(--ff-danger)' }}><i />занято</span>
              <span style={{ color: 'var(--ff-system-fog)' }}><i />недоступно</span>
            </div>

            {/* Zone outlines — only when no background image (bg already shows zones) */}
            {!floorBg && FLOOR.outlines.map((o, i) => (
              <div
                key={i}
                className="cl-floor__zone"
                style={{
                  left: o.left, top: o.top, width: o.width, height: o.height,
                  ...(o.accent ? { '--zone-accent': o.accent } as React.CSSProperties : {}),
                }}
              >
                {o.label}
              </div>
            ))}

            {/* POI markers (WC, bar, admin, entrance…) */}
            {FLOOR.poi?.map((p, i) => (
              <div key={i} className={`cl-floor__poi cl-floor__poi--${p.icon}`} style={{ left: p.left, top: p.top }}>
                {POI_ICON[p.icon]}
                <span>{p.label}</span>
              </div>
            ))}

            {loading && seats.length === 0 && (
              <div className="cl-floor__skeleton">
                <div className="cl-floor__skeleton-zones">
                  {[80, 110, 90, 100, 70].map((w, i) => (
                    <div key={i} className="cl-skeleton-bar" style={{ width: w, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <div className="cl-floor__skeleton-seats">
                  {Array.from({ length: 34 }).map((_, i) => (
                    <div key={i} className="cl-skeleton-seat" style={{ '--d': `${(i * 0.05) % 0.8}s` } as React.CSSProperties} />
                  ))}
                </div>
              </div>
            )}

            {/* Real seats from Langame */}
            {visibleSeats.map(s => (
              <button
                key={s.uuid}
                className={`cl-seat cl-seat--${s.status}`}
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                title={`${s.number} · ${s.zoneName}`}
                onClick={() => handleSeatClick(s)}
                disabled={s.status !== 'free'}
                aria-label={`Место ${s.number}, ${s.zoneName}, ${s.status === 'free' ? 'свободно' : 'занято'}`}
              >
                {s.number}
              </button>
            ))}
          </div>
          </div>
          <p className="cl-floor__swipe-hint" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            Листай вбок — колесом или свайпом
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="cl-live__count">
            <strong>{freeCount}</strong>
            <em>из <strong>{totalCount}</strong> мест свободно сейчас</em>
            {!loading && seats.length === 0 && (
              <div className="cl-live__action">
                <button
                  className="ff-btn ff-btn--primary is-pulse"
                  onClick={() => openBooking({})}
                >
                  ЗАБРОНИРОВАТЬ →
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
