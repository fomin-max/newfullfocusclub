'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useClubData } from './ClubDataContext'
import { useBooking } from './BookingContext'

// 30-min slots 10:00 → 08:00 (next day), 45 entries
const SLOTS: string[] = Array.from({ length: 45 }, (_, i) => {
  const totalMin = (10 * 60 + i * 30) % (24 * 60)
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
})

const STEP_LABELS = ['ВЫБЕРИ ЗОНУ', 'ДАТА И ВРЕМЯ', 'КОНТАКТЫ']

const QUICK_PICKS = [
  { min: 60,  label: '1 ЧАС'  },
  { min: 120, label: '2 ЧАСА' },
  { min: 180, label: '3 ЧАСА' },
  { min: 300, label: '5 ЧАСОВ' },
]
const DUR_STEP = 30
const DUR_MIN  = 30
const DUR_MAX  = 12 * 60

function addMinutes(start: string, minutes: number): string {
  const [h, m] = start.split(':').map(Number)
  const total = (h * 60 + m + minutes) % (24 * 60)
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

function formatDuration(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  const hStr = h > 0 ? `${h} ${h === 1 ? 'час' : h < 5 ? 'часа' : 'часов'}` : ''
  const mStr = m > 0 ? `${m} мин` : ''
  return [hStr, mStr].filter(Boolean).join(' ')
}

function DurationPicker({ value, onChange }: { value: number, onChange: (v: number) => void }) {
  const cur = value ?? 60
  return (
    <div className="tp-dur-wrap">
      <div className="tp-quick-picks">
        {QUICK_PICKS.map(({ min, label }) => (
          <button
            key={min}
            className={`tp-quick-pick${cur === min ? ' is-on' : ''}`}
            onClick={() => onChange(min)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tp-dur-row">
        <button
          className="tp-dur-btn"
          onClick={() => onChange(Math.max(DUR_MIN, cur - DUR_STEP))}
          disabled={cur <= DUR_MIN}
        >−</button>
        <span className="tp-dur-value">{formatDuration(cur)}</span>
        <button
          className="tp-dur-btn"
          onClick={() => onChange(Math.min(DUR_MAX, cur + DUR_STEP))}
          disabled={cur >= DUR_MAX}
        >+</button>
      </div>
    </div>
  )
}

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function slotMinutes(slot: string): number {
  const [h, min] = slot.split(':').map(Number)
  return h < 10 ? h * 60 + min + 24 * 60 : h * 60 + min
}

function minBookableMinutes(): number {
  const now = new Date()
  const raw = Math.ceil((now.getHours() * 60 + now.getMinutes() + 1) / 30) * 30
  const h = Math.floor(raw / 60)
  return h < 10 ? raw + 24 * 60 : raw
}

function availableSlots(date: string): string[] {
  if (date !== todayStr()) return SLOTS
  const minMin = minBookableMinutes()
  return SLOTS.filter(s => slotMinutes(s) >= minMin)
}

// ─── TimePicker ───────────────────────────────────────────────────────────────
const ITEM_H = 48
const ITEM_W = 80

function TimePicker({ slots, selected, onSelect }: {
  slots: string[]
  selected: string | null
  onSelect: (s: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const slotsKey = useRef('')

  const isMob = () => typeof window !== 'undefined' && window.innerWidth < 768

  const scrollToIdx = useCallback((idx: number, smooth = true) => {
    const el = ref.current
    if (!el) return
    if (isMob()) {
      el.scrollTo({ top: idx * ITEM_H, behavior: smooth ? 'smooth' : 'instant' })
    } else {
      const left = idx * ITEM_W - (el.clientWidth / 2 - ITEM_W / 2)
      el.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'instant' })
    }
  }, [])

  useEffect(() => {
    const key = `${slots.length}:${slots[0] ?? ''}`
    if (key === slotsKey.current) return
    slotsKey.current = key
    if (!slots.length) return
    onSelect(slots[0])
    setTimeout(() => scrollToIdx(0, false), 16)
  }, [slots, onSelect, scrollToIdx])

  useEffect(() => {
    const idx = selected ? slots.indexOf(selected) : 0
    setTimeout(() => scrollToIdx(Math.max(0, idx), false), 50)
  }, []) // eslint-disable-line

  const handleScroll = () => {
    if (!isMob()) return
    if (scrollTimer.current) clearTimeout(scrollTimer.current)
    scrollTimer.current = setTimeout(() => {
      const el = ref.current
      if (!el) return
      const idx = Math.round(el.scrollTop / ITEM_H)
      const s = slots[Math.max(0, Math.min(idx, slots.length - 1))]
      if (s) onSelect(s)
    }, 150)
  }

  const arrowScroll = (dir: -1 | 1) => {
    ref.current?.scrollBy({ left: dir * ITEM_W * 3, behavior: 'smooth' })
  }

  return (
    <div className="tp-wrap">
      <button className="tp-arrow" onClick={() => arrowScroll(-1)} tabIndex={-1} aria-hidden="true">‹</button>
      <div className="tp-drum" ref={ref} onScroll={handleScroll}>
        <div className="tp-sentinel" aria-hidden="true" />
        {slots.map((s, i) => (
          <div
            key={s}
            className={`tp-item${selected === s ? ' is-on' : ''}`}
            onClick={() => { onSelect(s); scrollToIdx(i) }}
          >
            {s}
          </div>
        ))}
        <div className="tp-sentinel" aria-hidden="true" />
      </div>
      <button className="tp-arrow" onClick={() => arrowScroll(1)} tabIndex={-1} aria-hidden="true">›</button>
    </div>
  )
}

const scrollToLive = () =>
  document.getElementById('live')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

function StickyCTA() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`cl-sticky ${show ? 'is-show' : ''}`}>
      <button className="ff-btn ff-btn--primary is-pulse" onClick={scrollToLive}>
        ЗАБРОНИРОВАТЬ →
      </button>
    </div>
  )
}

function BookingModal() {
  const { CLUB, CLUB_ZONES } = useClubData()
  const { open, target, closeBooking } = useBooking()

  // if seat is pre-selected from LiveMap — skip step 1
  const hasSeat   = Boolean(target.seatId)
  const startStep = hasSeat ? 2 : 1

  const [step,     setStep]    = useState(startStep)
  const [zone,     setZone]    = useState<string | null>(target.zone ?? null)
  const [date,     setDate]    = useState('')
  const [slot,     setSlot]    = useState<string | null>(null)
  const [duration, setDuration] = useState<number>(60)
  const [name,     setName]    = useState('')
  const [contact,  setContact] = useState('')
  const [done,     setDone]    = useState(false)
  const [loading,  setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  type ZonePricing = { hourly: number; perMin: number; packages: Record<number, number> }
  type ByZone = Record<string, { weekday: ZonePricing; weekend: ZonePricing }>
  const [tariffs, setTariffs] = useState<ByZone>({})

  useEffect(() => { if (!date) setDate(todayStr()) }, [])

  useEffect(() => {
    if (!open) return
    fetch(`/api/tariffs/${CLUB.SLUG}`)
      .then(r => r.json())
      .then(d => setTariffs(d.byZone ?? {}))
      .catch(() => {})
  }, [open, CLUB.SLUG])

  useEffect(() => {
    if (open) {
      setDone(false)
      setLoading(false)
      setSubmitError(null)
      const today = todayStr()
      if (!date) setDate(today)
      const firstSlot = availableSlots(date || today)[0] ?? null
      setSlot(firstSlot)
      setDuration(60)
      if (target.seatId) {
        setStep(2)
      } else {
        setStep(1)
        setZone(target.zone && CLUB_ZONES.find(z => z.id === target.zone) ? target.zone : null)
      }
    }
  }, [open, target, CLUB_ZONES])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function estimatedPrice(): number | null {
    let zoneName: string | undefined
    if (hasSeat && target.seatLabel) {
      zoneName = target.seatLabel.split(' · ').slice(1).join(' · ')
    } else if (zone) {
      zoneName = CLUB_ZONES.find(z => z.id === zone)?.name
    }
    if (!zoneName) return null
    const zoneData = tariffs[zoneName]
    if (!zoneData) return null
    const jsDay = new Date(date || todayStr()).getDay()
    const p = jsDay === 0 || jsDay === 6 ? zoneData.weekend : zoneData.weekday
    if (!p.hourly) return null
    // Exact package match (1ч, 3ч, 5ч …)
    if (p.packages[duration] != null) return p.packages[duration]
    // Otherwise: full hours × hourly + remaining minutes × per-minute rate
    const hours      = Math.floor(duration / 60)
    const remainMin  = duration % 60
    return Math.round(hours * p.hourly + remainMin * (p.perMin / 60))
  }

  if (!open) return null

  const totalSteps = hasSeat ? 2 : 3
  const stepLabel  = hasSeat
    ? ['ДАТА И ВРЕМЯ', 'КОНТАКТЫ'][step - 2]
    : STEP_LABELS[step - 1]

  return (
    <div className="cl-modal is-open" role="dialog" aria-modal="true" aria-label="Бронирование">
      <div className="cl-modal__inner">
        <button className="cl-modal__close" onClick={closeBooking} aria-label="Закрыть">✕</button>

        {!done && (
          <>
            <div className="cl-modal__bar">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className={(hasSeat ? step - 1 : step) > i ? 'on' : ''} />
              ))}
            </div>
            <div className="cl-modal__step-label">
              <strong>0{hasSeat ? step - 1 : step}</strong> / 0{totalSteps} · {stepLabel}
            </div>
          </>
        )}

        {/* Seat pre-selected badge */}
        {!done && hasSeat && (
          <div className="cl-modal__seat-badge">
            ✓ Место <strong>{target.seatLabel}</strong>
          </div>
        )}

        {/* Step 1 — zone selection (only when no seat pre-selected) */}
        {!done && !hasSeat && step === 1 && (
          <>
            <h3 className="cl-modal__title">КУДА БРОНИРУЕМ?</h3>
            <div className="cl-modal__zones">
              {CLUB_ZONES.map(z => (
                <button key={z.id} className={`cl-modal__zone ${zone === z.id ? 'is-on' : ''}`} onClick={() => setZone(z.id)}>
                  <strong>{z.name}</strong>
                  <span>от {z.priceFrom} ₽/час · {z.seats} мест</span>
                </button>
              ))}
            </div>
            <div className="cl-modal__nav">
              <button className="ff-btn ff-btn--ghost" onClick={closeBooking}>ОТМЕНА</button>
              <button className="ff-btn ff-btn--primary" disabled={!zone} onClick={() => setStep(2)}>ДАЛЕЕ →</button>
            </div>
          </>
        )}

        {/* Step 2 — date & time */}
        {!done && step === 2 && (
          <>
            <h3 className="cl-modal__title">КОГДА?</h3>
            <div className="cl-field">
              <label>Дата</label>
              <input
                type="date"
                value={date}
                min={todayStr()}
                onChange={e => { setDate(e.target.value); setSlot(null) }}
              />
            </div>
            <label className="cl-field__label">Время начала</label>
            <TimePicker
              slots={availableSlots(date)}
              selected={slot}
              onSelect={setSlot}
            />
            <label className="cl-field__label">Продолжительность</label>
            <DurationPicker value={duration} onChange={setDuration} />
            {slot && (
              <div className="tp-summary">
                <span className="tp-summary__time">{slot}</span>
                <span className="tp-summary__arrow">→</span>
                <span className="tp-summary__time is-end">{addMinutes(slot, duration)}</span>
                <span className="tp-summary__dur">{formatDuration(duration)}</span>
                {estimatedPrice() !== null && (
                  <span className="tp-summary__price">~{estimatedPrice()} ₽</span>
                )}
              </div>
            )}
            <div className="cl-modal__nav">
              {hasSeat
                ? <button className="ff-btn ff-btn--ghost" onClick={closeBooking}>ОТМЕНА</button>
                : <button className="ff-btn ff-btn--ghost" onClick={() => setStep(1)}>← НАЗАД</button>
              }
              <button className="ff-btn ff-btn--primary" disabled={!slot} onClick={() => setStep(3)}>ДАЛЕЕ →</button>
            </div>
          </>
        )}

        {/* Step 3 — contacts */}
        {!done && step === 3 && (
          <>
            <h3 className="cl-modal__title">КОНТАКТЫ</h3>
            <div className="cl-field">
              <label>Как тебя зовут?</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Имя" />
            </div>
            <div className="cl-field">
              <label>Телефон или Telegram</label>
              <input
                type="text"
                inputMode="tel"
                autoComplete="tel"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="+7 912 345-67-89 или @username"
                className={contact && !/^[\+\d\s\-\(\)@a-zA-Z0-9_\.]+$/.test(contact) ? 'is-error' : ''}
              />
              {contact && !/^[\+\d\s\-\(\)@a-zA-Z0-9_\.]+$/.test(contact) && (
                <span className="cl-field__error">Введи номер телефона (+7...) или Telegram (@username)</span>
              )}
            </div>
            {submitError && (
              <p className="cl-modal__error">{submitError}</p>
            )}
            <div className="cl-modal__nav">
              <button className="ff-btn ff-btn--ghost" onClick={() => setStep(2)}>← НАЗАД</button>
              <button
                className="ff-btn ff-btn--primary is-pulse"
                disabled={loading || !name || !contact || !/^[\+\d\s\-\(\)@a-zA-Z0-9_\.]+$/.test(contact)}
                onClick={async () => {
                  setLoading(true)
                  setSubmitError(null)
                  try {
                    const res = await fetch('/api/booking', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        club_slug:    CLUB.SLUG,
                        seat_id:      target.seatId,
                        seat_label:   target.seatLabel,
                        zone:         zone ?? undefined,
                        date,
                        time_start:   slot!,
                        time_end:     addMinutes(slot!, duration),
                        duration_min: duration,
                        name,
                        contact,
                      }),
                    })
                    if (!res.ok) throw new Error('server')
                    setDone(true)
                  } catch {
                    setSubmitError('Ошибка отправки. Попробуй ещё раз или свяжись с нами напрямую.')
                  } finally {
                    setLoading(false)
                  }
                }}
              >
                {loading ? 'ОТПРАВЛЯЕМ…' : 'ОТПРАВИТЬ →'}
              </button>
            </div>
          </>
        )}

        {done && (
          <div className="cl-modal__success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <h3>ЗАЯВКА ПРИНЯТА</h3>
            <p>Свяжемся в течение 15 минут.</p>
            <div className="cl-modal__success__actions">
              <a className="ff-btn ff-btn--ghost"
                 href={`https://t.me/${CLUB.TELEGRAM.replace('@', '')}`}
                 target="_blank" rel="noopener">
                НАПИСАТЬ В TELEGRAM →
              </a>
              <a className="ff-btn ff-btn--ghost"
                 href={`tel:${CLUB.PHONE.replace(/\s|\(|\)|-/g, '')}`}>
                📞 {CLUB.PHONE}
              </a>
              <button className="ff-btn ff-btn--primary" onClick={closeBooking}>ХОРОШО →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Booking() {
  return (
    <>
      <StickyCTA />
      <BookingModal />
    </>
  )
}
