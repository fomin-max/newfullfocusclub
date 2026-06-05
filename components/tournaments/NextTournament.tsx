'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { supabase, type Tournament } from '@/lib/supabase'

function formatDate(iso: string) {
  const d = new Date(iso)
  const day = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', timeZone: 'Europe/Moscow' })
  const weekday = d.toLocaleDateString('ru-RU', { weekday: 'long', timeZone: 'Europe/Moscow' })
  const time = d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow' })
  return `${day.toUpperCase()} · ${weekday.toUpperCase()} · ${time}`
}

function calcTime(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  const s = Math.floor(diff / 1000)
  return {
    days:    Math.floor(s / 86400),
    hours:   Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    over:    diff === 0,
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

function Countdown({ target }: { target: string }) {
  const [t, setT] = useState(() => calcTime(target))
  useEffect(() => {
    const id = setInterval(() => setT(calcTime(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (t.over) return <div className="tn-count tn-count--over">ТУРНИР НАЧАЛСЯ · УДАЧИ ВСЕМ!</div>
  return (
    <div className="tn-count" role="timer">
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
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [loading, setLoading]       = useState(true)

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from('tournaments')
      .select('*')
      .in('status', ['registration_open', 'upcoming'])
      .order('date', { ascending: true })
      .limit(1)
      .single()
    setTournament(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  if (loading) return null
  if (!tournament) return null

  const details = [
    { icon: 'swords'  as const, lbl: 'Формат',     val: tournament.format.replace(/_/g, ' '),        accent: false },
    { icon: 'users'   as const, lbl: 'Участников',  val: `до ${tournament.max_participants}`,          accent: false },
    { icon: 'gamepad' as const, lbl: 'Дисциплина',  val: 'Counter-Strike 2',                          accent: false },
    { icon: 'trophy'  as const, lbl: 'Призовой',    val: `${tournament.prize_pool?.toLocaleString('ru')} ₽`, accent: true },
    { icon: 'ruble'   as const, lbl: 'Взнос',       val: `${tournament.entry_fee.toLocaleString('ru')} ₽ / игрок`, accent: false },
    { icon: 'pin'     as const, lbl: 'Место',       val: tournament.location_name ?? '',               accent: false },
  ]

  return (
    <section id="next" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">регистрация открыта</span>
          <h2 className="ff-section-head__title">БЛИЖАЙШИЙ ТУРНИР</h2>
          <p className="ff-section-head__sub">
            {tournament.subtitle ?? 'Регистрируйся прямо сейчас.'}
          </p>
        </Reveal>

        <Reveal>
          <div className="tn-next">
            <span className="tn-next__corner tn-next__corner--tl" />
            <span className="tn-next__corner tn-next__corner--tr" />
            <span className="tn-next__corner tn-next__corner--bl" />
            <span className="tn-next__corner tn-next__corner--br" />

            <div className="tn-next__main">
              <span className="tn-next__date">{formatDate(tournament.date)}</span>
              <h3 className="tn-next__title">{tournament.title}</h3>
              {tournament.location_name && (
                <div className="tn-next__venue">
                  <Icon name="pin" size={16} />
                  <span>{tournament.location_name}</span>
                </div>
              )}
              <Countdown target={tournament.date} />
              <div className="tn-next__ctas">
                <a className="ff-btn ff-btn--primary is-pulse"
                   href={`/tournaments/${tournament.slug}#registration`}>
                  ЗАРЕГИСТРИРОВАТЬСЯ <Icon name="arrowRight" size={14} />
                </a>
                <a className="ff-btn ff-btn--secondary"
                   href={`/tournaments/${tournament.slug}#participants`}>
                  СПИСОК УЧАСТНИКОВ <Icon name="users" size={14} />
                </a>
              </div>
            </div>

            <div className="tn-next__aside">
              <ul className="tn-next__specs">
                {details.filter(d => d.val).map((d, i) => (
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
            {tournament.participant_type === 'individual'
              ? 'Регистрируйся индивидуально. Команды формируются в день турнира.'
              : `Регистрация команды. Взнос ${tournament.entry_fee.toLocaleString('ru')} ₽ с игрока, оплачивается на месте.`
            }
          </p>
        </Reveal>
      </div>
    </section>
  )
}
