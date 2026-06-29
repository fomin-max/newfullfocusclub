'use client'

import { useEffect, useState, useCallback } from 'react'
import Icon from '@/components/ui/Icon'
import { supabase, submitRegistration, getRegistrations, type Tournament, type TournamentRegistration } from '@/lib/supabase'

interface Props {
  tournament: Tournament
}

export default function DraftRegistrationForm({ tournament }: Props) {
  const [registrations, setRegistrations] = useState<TournamentRegistration[]>([])
  const [loading, setLoading] = useState(true)

  const [name, setName]           = useState('')
  const [nickname, setNickname]   = useState('')
  const [telegram, setTelegram]   = useState('')
  const [rating, setRating]       = useState('')
  const [faceit, setFaceit]       = useState('')
  const [steam, setSteam]         = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]           = useState(false)
  const [error, setError]         = useState<string | null>(null)

  const fetchRegistrations = useCallback(async () => {
    const data = await getRegistrations(tournament.id)
    setRegistrations(data)
    setLoading(false)
  }, [tournament.id])

  useEffect(() => {
    fetchRegistrations()

    // Realtime — обновляем счётчик при новой заявке
    const channel = supabase
      .channel(`registrations:${tournament.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'tournament_registrations',
        filter: `tournament_id=eq.${tournament.id}`,
      }, () => fetchRegistrations())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [tournament.id, fetchRegistrations])

  const count    = registrations.length
  const max      = tournament.max_participants
  const isFull   = count >= max
  const isOpen   = tournament.status === 'registration_open' && !isFull
  const fillPct  = Math.min(100, Math.round((count / max) * 100))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const tg = telegram.startsWith('@') ? telegram : `@${telegram}`
    const { error: err } = await submitRegistration(
      tournament.id,
      nickname.trim(),
      tg,
      {
        name:   name.trim(),
        rating: rating.trim(),
        faceit: faceit.trim(),
        steam:  steam.trim(),
      },
    )

    if (err) {
      setError(`Ошибка: ${err}. Попробуй ещё раз или напиши в Telegram.`)
      setSubmitting(false)
    } else {
      setDone(true)
    }
  }

  return (
    <div className="tp-reg" id="registration">
      <p className="tp-reg__title">
        {isOpen ? 'РЕГИСТРАЦИЯ' : isFull ? 'МЕСТ НЕТ' : 'РЕГИСТРАЦИЯ ЗАКРЫТА'}
      </p>

      {loading ? (
        <p className="tp-reg__spots">Загрузка...</p>
      ) : (
        <>
          <p className={`tp-reg__spots${isFull ? ' tp-reg__spots--full' : ''}`}>
            Занято: <span>{count} / {max}</span> мест
          </p>
          <div className="tp-reg__progress">
            <div className="tp-reg__progress-fill" style={{ width: `${fillPct}%` }} />
          </div>
        </>
      )}

      {done ? (
        <div className="ev-form__success">
          <span className="ev-form__success-mark"><Icon name="check" size={36} /></span>
          <h3>ЗАЯВКА ПРИНЯТА!</h3>
          <p>Свяжемся с тобой в Telegram перед турниром.</p>
          <a href="https://t.me/fullfocusclubru?direct" target="_blank" rel="noopener noreferrer"
             className="ff-btn ff-btn--secondary">
            НАПИСАТЬ В TELEGRAM <Icon name="telegram" size={14} />
          </a>
        </div>
      ) : isOpen ? (
        <form className="tp-reg__form" onSubmit={handleSubmit}>
          <div className="ev-field">
            <label>Имя</label>
            <input type="text" placeholder="Ваше имя" value={name}
                   onChange={e => setName(e.target.value)} required />
          </div>
          <div className="ev-field">
            <label>Никнейм</label>
            <input type="text" placeholder="Никнейм в CS2" value={nickname}
                   onChange={e => setNickname(e.target.value)} required />
          </div>
          <div className="ev-field">
            <label>Premier Rating / ELO</label>
            <input type="text" placeholder="Например: 14200 или 2500 ELO" value={rating}
                   onChange={e => setRating(e.target.value)} required />
          </div>
          <div className="ev-field">
            <label>Ваш Телеграмм для связи</label>
            <input type="text" placeholder="@username" value={telegram}
                   onChange={e => setTelegram(e.target.value)} required />
          </div>
          <div className="ev-field">
            <label>Ссылка на FACEIT</label>
            <input type="text" placeholder="faceit.com/en/players/..."
                   value={faceit} onChange={e => setFaceit(e.target.value)} />
          </div>
          <div className="ev-field">
            <label>Ссылка на STEAM</label>
            <input type="text" placeholder="steamcommunity.com/id/..."
                   value={steam} onChange={e => setSteam(e.target.value)} />
          </div>

          {error && (
            <p style={{ margin: 0, fontSize: 13, color: '#f5a623', fontFamily: 'var(--ff-font-body)' }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting}
                  className="ff-btn ff-btn--primary ff-btn--lg is-pulse"
                  style={{ width: '100%', marginTop: 4 }}>
            {submitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ'} <Icon name="arrowRight" size={14} />
          </button>

          <p style={{ margin: 0, fontSize: 12, color: 'var(--ff-system-fog)', fontFamily: 'var(--ff-font-body)', lineHeight: 1.5 }}>
            Взнос {tournament.entry_fee.toLocaleString('ru')} ₽ оплачивается на месте в день турнира.
          </p>
        </form>
      ) : (
        <div className="tp-reg__closed">
          <p>{isFull ? 'Все 20 мест заняты. Следи за анонсами следующего турнира.' : 'Регистрация закрыта.'}</p>
          <a href="https://t.me/fullfocusclubru?direct" target="_blank" rel="noopener noreferrer"
             className="ff-btn ff-btn--secondary">
            НАПИСАТЬ В TELEGRAM <Icon name="telegram" size={14} />
          </a>
        </div>
      )}
    </div>
  )
}
