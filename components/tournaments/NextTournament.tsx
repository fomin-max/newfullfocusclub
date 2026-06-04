'use client'

import { useState, useEffect, useRef } from 'react'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const TARGET_DATE = '2026-06-14T14:00:00+03:00'

const DETAILS = [
  { icon: 'swords'    as const, lbl: 'Формат',     val: '5 × 5',                    accent: false },
  { icon: 'list'      as const, lbl: 'Слотов',     val: '16 команд',                accent: false },
  { icon: 'gamepad'   as const, lbl: 'Дисциплина', val: 'Counter-Strike 2',         accent: false },
  { icon: 'trophy'    as const, lbl: 'Призовой',   val: '100 000 ₽',               accent: true  },
  { icon: 'ruble'     as const, lbl: 'Взнос',      val: '500 ₽ / игрок',           accent: false },
  { icon: 'broadcast' as const, lbl: 'Эфир',       val: 'twitch · fullfocus',       accent: false },
  { icon: 'pin'       as const, lbl: 'Место',      val: 'ARENA 5×5 · Василеостровская', accent: false },
]

function calcTime(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  const s = Math.floor(diff / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    over: diff === 0,
  }
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(value)
  const [flip, setFlip]       = useState(false)
  const prev = useRef(value)

  useEffect(() => {
    if (prev.current === value) return
    prev.current = value
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(value); return }
    setFlip(true)
    const t = setTimeout(() => { setDisplay(value); setFlip(false) }, 240)
    return () => clearTimeout(t)
  }, [value])

  return (
    <div className="tn-count__unit">
      <span className={`tn-count__num${flip ? ' is-flip' : ''}`}>
        {String(display).padStart(2, '0')}
      </span>
      <span className="tn-count__lbl">{label}</span>
    </div>
  )
}

function Countdown() {
  const [t, setT] = useState(() => calcTime(TARGET_DATE))
  useEffect(() => {
    const id = setInterval(() => setT(calcTime(TARGET_DATE)), 1000)
    return () => clearInterval(id)
  }, [])

  if (t.over) {
    return <div className="tn-count tn-count--over">ТУРНИР НАЧАЛСЯ · СЛЕДИ ЗА ЭФИРОМ</div>
  }
  return (
    <div className="tn-count" role="timer" aria-label="До старта турнира">
      <FlipUnit value={t.days}    label="дней"   />
      <span className="tn-count__sep">:</span>
      <FlipUnit value={t.hours}   label="часов"  />
      <span className="tn-count__sep">:</span>
      <FlipUnit value={t.minutes} label="минут"  />
      <span className="tn-count__sep">:</span>
      <FlipUnit value={t.seconds} label="секунд" />
    </div>
  )
}

export default function NextTournament() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="next" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">регистрация открыта</span>
          <h2 className="ff-section-head__title">БЛИЖАЙШИЙ ТУРНИР</h2>
          <p className="ff-section-head__sub">
            Полная команда, полный фокус. Регистрация открыта прямо сейчас.
          </p>
        </Reveal>

        <Reveal>
          <div className="tn-next">
            <span className="tn-next__corner tn-next__corner--tl" />
            <span className="tn-next__corner tn-next__corner--tr" />
            <span className="tn-next__corner tn-next__corner--bl" />
            <span className="tn-next__corner tn-next__corner--br" />

            <div className="tn-next__main">
              <span className="tn-next__date">14 ИЮНЯ · СУББОТА · 14:00</span>
              <h3 className="tn-next__title">
                CS2 5×5 —<br />КУБОК ВАСИЛЕОСТРОВСКОЙ
              </h3>
              <div className="tn-next__venue">
                <Icon name="pin" size={16} />
                <span>Full Focus Василеостровская · Бугский переулок, 3</span>
              </div>
              <Countdown />
              <div className="tn-next__ctas">
                <button className="ff-btn ff-btn--primary is-pulse"
                        onClick={() => scrollTo('form')}>
                  ЗАРЕГИСТРИРОВАТЬ КОМАНДУ <Icon name="arrowRight" size={14} />
                </button>
                <a className="ff-btn ff-btn--secondary" href="https://twitch.tv/fullfocus"
                   target="_blank" rel="noopener noreferrer">
                  СМОТРЕТЬ НА TWITCH <Icon name="broadcast" size={14} />
                </a>
              </div>
            </div>

            <div className="tn-next__aside">
              <ul className="tn-next__specs">
                {DETAILS.map((d, i) => (
                  <li key={i} className={`tn-spec${d.accent ? ' is-accent' : ''}`}>
                    <span className="tn-spec__icon"><Icon name={d.icon} size={16} /></span>
                    <span className="tn-spec__lbl">{d.lbl}</span>
                    <span className="tn-spec__val">{d.val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="tn-next__note">
            <Icon name="info" size={15} />
            Взнос оплачивается на месте в день турнира. Регистрация подтверждается в течение 15 минут в Telegram.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
