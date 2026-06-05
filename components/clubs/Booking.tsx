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

// duration is stored in minutes
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

function DurationPicker({ value, onChange }: { value: number | null, onChange: (v: number) => void }) {
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
  return new Date().toISOString().split('T')[0]
}

function slotMinutes(slot: string): number {
  const [h, min] = slot.split(':').map(Number)
  return h < 10 ? h * 60 + min + 24 * 60 : h * 60 + min
}

function minBookableMinutes(): number {
  const now = new Date()
  return Math.ceil((now.getHours() * 60 + now.getMinutes() + 1) / 30) * 30
}

function availableSlots(date: string): string[] {
  if (date !== todayStr()) return SLOTS
  const minMin = minBookableMinutes()
  return SLOTS.filter(s => slotMinutes(s) >= minMin)
}

// ─── TimePicker ───────────────────────────────────────────────────────────────
const ITEM_H = 48   // mobile item height px
const ITEM_W = 80   // desktop item width px

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

  // When slots change (new date) → reset to first slot
  useEffect(() => {
    const key = `${slots.length}:${slots[0] ?? ''}`
    if (key === slotsKey.current) return
    slotsKey.current = key
    if (!slots.length) return
    onSelect(slots[0])
    setTimeout(() => scrollToIdx(0, false), 16)
  }, [slots, onSelect, scrollToIdx])

  // On mount → scroll to initial selection
  useEffect(() => {
    const idx = selected ? slots.indexOf(selected) : 0
    setTimeout(() => scrollToIdx(Math.max(0, idx), false), 50)
  }, []) // eslint-disable-line

  // Mobile: detect centred item after scroll settles
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

function StickyCTA() {
  const { openBooking } = useBooking()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`cl-sticky ${show ? 'is-show' : ''}`}>
      <button className="ff-btn ff-btn--primary is-pulse" onClick={() => openBooking()}>
        ЗАБРОНИРОВАТЬ →
      </button>
    </div>
  )
}

function BookingModal() {
  const { CLUB, CLUB_ZONES } = useClubData()
  const { open, initialZone, closeBooking } = useBooking()
  const [step,     setStep]    = useState(1)
  const [zone,     setZone]    = useState<string | null>(null)
  const [date,     setDate]    = useState('')
  const [slot,     setSlot]    = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [name,     setName]    = useState('')
  const [contact,  setContact] = useState('')
  const [done,     setDone]    = useState(false)

  useEffect(() => { if (!date) setDate(new Date().toISOString().split('T')[0]) }, [])

  useEffect(() => {
    if (open) {
      setDone(false); setStep(1); setSlot(null); setDuration(null)
      if (initialZone && CLUB_ZONES.find(z => z.id === initialZone)) setZone(initialZone)
    }
  }, [open, initialZone, CLUB_ZONES])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="cl-modal is-open" role="dialog" aria-modal="true" aria-label="Бронирование">
      <div className="cl-modal__inner">
        <button className="cl-modal__close" onClick={closeBooking} aria-label="Закрыть">✕</button>

        {!done && (
          <>
            <div className="cl-modal__bar">
              {[1,2,3].map(n => <div key={n} className={step >= n ? 'on' : ''} />)}
            </div>
            <div className="cl-modal__step-label">
              <strong>0{step}</strong> / 03 · {STEP_LABELS[step - 1]}
            </div>
          </>
        )}

        {!done && step === 1 && (
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
            {slot && duration && (
              <div className="tp-summary">
                <span className="tp-summary__time">{slot}</span>
                <span className="tp-summary__arrow">→</span>
                <span className="tp-summary__time is-end">{addMinutes(slot, duration)}</span>
                <span className="tp-summary__dur">{formatDuration(duration)}</span>
              </div>
            )}
            <div className="cl-modal__nav">
              <button className="ff-btn ff-btn--ghost" onClick={() => setStep(1)}>← НАЗАД</button>
              <button className="ff-btn ff-btn--primary" disabled={!slot || !duration} onClick={() => setStep(3)}>ДАЛЕЕ →</button>
            </div>
          </>
        )}

        {!done && step === 3 && (
          <>
            <h3 className="cl-modal__title">КОНТАКТЫ</h3>
            <div className="cl-field">
              <label>Как тебя зовут?</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Имя" />
            </div>
            <div className="cl-field">
              <label>Телефон или Telegram</label>
              <input type="text" value={contact} onChange={e => setContact(e.target.value)} placeholder="+7 / @username" />
            </div>
            <div className="cl-modal__nav">
              <button className="ff-btn ff-btn--ghost" onClick={() => setStep(2)}>← НАЗАД</button>
              <button className="ff-btn ff-btn--primary is-pulse" disabled={!name || !contact} onClick={() => setDone(true)}>
                ОТПРАВИТЬ →
              </button>
            </div>
          </>
        )}

        {done && (
          <div className="cl-modal__success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <h3>ЗАЯВКА ПРИНЯТА</h3>
            <p>
              Свяжемся в течение 15 минут.<br />
              Если срочно — пиши в{' '}
              <a href={`https://t.me/${CLUB.TELEGRAM.replace('@', '')}`} target="_blank" rel="noopener"
                 style={{ color: 'var(--ff-neon-bloom)' }}>{CLUB.TELEGRAM}</a>.
            </p>
            <div style={{ marginTop: 24 }}>
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
