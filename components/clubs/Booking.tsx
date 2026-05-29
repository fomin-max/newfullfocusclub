'use client'

import { useState, useEffect } from 'react'
import { useClubData } from './ClubDataContext'
import { useBooking } from './BookingContext'

const SLOTS = ['10:00','12:00','14:00','16:00','18:00','20:00','22:00','00:00','02:00','04:00','06:00','08:00']
const STEP_LABELS = ['ВЫБЕРИ ЗОНУ', 'ДАТА И ВРЕМЯ', 'КОНТАКТЫ']

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
  const [step,    setStep]    = useState(1)
  const [zone,    setZone]    = useState<string | null>(null)
  const [date,    setDate]    = useState('')
  const [slot,    setSlot]    = useState<string | null>(null)
  const [name,    setName]    = useState('')
  const [contact, setContact] = useState('')
  const [done,    setDone]    = useState(false)

  useEffect(() => { if (!date) setDate(new Date().toISOString().split('T')[0]) }, [])

  useEffect(() => {
    if (open) {
      setDone(false); setStep(1)
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
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <label style={{ fontFamily: 'var(--ff-font-heading)', fontWeight: 600, fontSize: 10,
              letterSpacing: 'var(--ff-track-label)', textTransform: 'uppercase',
              color: 'var(--ff-system-fog)', display: 'block', marginBottom: 8 }}>Время</label>
            <div className="cl-modal__slots">
              {SLOTS.map(s => (
                <button key={s} className={`cl-modal__slot ${slot === s ? 'is-on' : ''}`} onClick={() => setSlot(s)}>{s}</button>
              ))}
            </div>
            <div className="cl-modal__nav">
              <button className="ff-btn ff-btn--ghost" onClick={() => setStep(1)}>← НАЗАД</button>
              <button className="ff-btn ff-btn--primary" disabled={!slot} onClick={() => setStep(3)}>ДАЛЕЕ →</button>
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
