'use client'

import { useEffect, useState, useCallback } from 'react'
import Icon from '@/components/ui/Icon'
import { supabase, submitRegistration, getRegistrations, REGISTRATION_ADDED_EVENT, type Tournament, type TournamentRegistration } from '@/lib/supabase'

interface Props {
  tournament: Tournament
}

interface PlayerField {
  nickname: string
  faceit_url: string
}

function normalizeUrl(v: string): string {
  const trimmed = v.trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

function isValidHttpUrl(v: string): boolean {
  try {
    const u = new URL(v)
    return (u.protocol === 'http:' || u.protocol === 'https:') && u.hostname.includes('.')
  } catch {
    return false
  }
}

export default function TeamRegistrationForm({ tournament }: Props) {
  const [registrations, setRegistrations] = useState<TournamentRegistration[]>([])
  const [loading, setLoading] = useState(true)

  const [teamName, setTeamName]     = useState('')
  const [telegram, setTelegram]     = useState('')
  const [captain, setCaptain]       = useState<PlayerField>({ nickname: '', faceit_url: '' })
  const [players, setPlayers]       = useState<PlayerField[]>(
    Array.from({ length: Math.max(0, tournament.team_size - 1) }, () => ({ nickname: '', faceit_url: '' })),
  )
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]             = useState(false)
  const [error, setError]           = useState<string | null>(null)

  const updatePlayer = (i: number, field: keyof PlayerField, v: string) =>
    setPlayers(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: v } : p))

  const fetchRegistrations = useCallback(async () => {
    const data = await getRegistrations(tournament.id)
    setRegistrations(data)
    setLoading(false)
  }, [tournament.id])

  useEffect(() => {
    fetchRegistrations()

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
    setError(null)

    const captainFaceit = normalizeUrl(captain.faceit_url)
    const normalizedPlayers = players.map(p => ({ nickname: p.nickname.trim(), faceit_url: normalizeUrl(p.faceit_url) }))

    if (!isValidHttpUrl(captainFaceit) || normalizedPlayers.some(p => !isValidHttpUrl(p.faceit_url))) {
      setError('Проверь ссылки на FACEIT — они должны быть заполнены и корректны у всех игроков.')
      return
    }

    setSubmitting(true)

    const tg = telegram.startsWith('@') ? telegram : `@${telegram}`
    const { error: err } = await submitRegistration(
      tournament.id,
      teamName.trim(),
      tg,
      {
        captain_nick: captain.nickname.trim(),
        captain_faceit_url: captainFaceit,
        players: normalizedPlayers,
        source: 'site',
      },
    )

    if (err) {
      setError(`Ошибка: ${err}. Попробуй ещё раз или напиши в Telegram.`)
      setSubmitting(false)
    } else {
      setDone(true)
      fetchRegistrations()
      window.dispatchEvent(new CustomEvent(REGISTRATION_ADDED_EVENT, { detail: { tournamentId: tournament.id } }))
    }
  }

  return (
    <div className="tp-reg" id="registration">
      <p className="tp-reg__title">
        {isOpen ? 'РЕГИСТРАЦИЯ КОМАНДЫ' : isFull ? 'МЕСТ НЕТ' : 'РЕГИСТРАЦИЯ ЗАКРЫТА'}
      </p>

      {loading ? (
        <p className="tp-reg__spots">Загрузка...</p>
      ) : (
        <>
          <p className={`tp-reg__spots${isFull ? ' tp-reg__spots--full' : ''}`}>
            Занято: <span>{count} / {max}</span> команд
          </p>
          <div className="tp-reg__progress">
            <div className="tp-reg__progress-fill" style={{ width: `${fillPct}%` }} />
          </div>
        </>
      )}

      {done ? (
        <div className="ev-form__success">
          <span className="ev-form__success-mark"><Icon name="check" size={36} /></span>
          <h3>КОМАНДА ЗАРЕГИСТРИРОВАНА!</h3>
          <p>Свяжемся с капитаном в Telegram перед турниром.</p>
          <a href="https://t.me/fullfocusclubru?direct" target="_blank" rel="noopener noreferrer"
             className="ff-btn ff-btn--secondary">
            НАПИСАТЬ В TELEGRAM <Icon name="telegram" size={14} />
          </a>
        </div>
      ) : isOpen ? (
        <form className="tp-reg__form" onSubmit={handleSubmit}>
          <div className="ev-field">
            <label>Название команды</label>
            <input type="text" placeholder="Например: Focus Five" value={teamName}
                   onChange={e => setTeamName(e.target.value)} required />
          </div>
          <div className="ev-field">
            <label>Telegram капитана</label>
            <input type="text" placeholder="@username" value={telegram}
                   onChange={e => setTelegram(e.target.value)} required />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ margin: '4px 0 0', fontSize: 12, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ff-system-fog)', fontFamily: 'var(--ff-font-heading)', fontWeight: 700 }}>
              Капитан
            </p>
            <div className="ev-field">
              <label>Никнейм капитана</label>
              <input type="text" placeholder="Никнейм в игре" value={captain.nickname}
                     onChange={e => setCaptain(prev => ({ ...prev, nickname: e.target.value }))} required />
            </div>
            <div className="ev-field">
              <label>Ссылка на FACEIT капитана</label>
              <input type="text" placeholder="faceit.com/en/players/..." value={captain.faceit_url}
                     onChange={e => setCaptain(prev => ({ ...prev, faceit_url: e.target.value }))} required />
            </div>
          </div>

          {players.map((p, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ margin: '4px 0 0', fontSize: 12, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ff-system-fog)', fontFamily: 'var(--ff-font-heading)', fontWeight: 700 }}>
                Игрок {i + 1}
              </p>
              <div className="ev-field">
                <label>Никнейм игрока {i + 1}</label>
                <input type="text" placeholder="Никнейм в игре" value={p.nickname}
                       onChange={e => updatePlayer(i, 'nickname', e.target.value)} required />
              </div>
              <div className="ev-field">
                <label>Ссылка на FACEIT игрока {i + 1}</label>
                <input type="text" placeholder="faceit.com/en/players/..." value={p.faceit_url}
                       onChange={e => updatePlayer(i, 'faceit_url', e.target.value)} required />
              </div>
            </div>
          ))}

          {error && (
            <p style={{ margin: 0, fontSize: 13, color: '#f5a623', fontFamily: 'var(--ff-font-body)' }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting}
                  className="ff-btn ff-btn--primary ff-btn--lg is-pulse"
                  style={{ width: '100%', marginTop: 4 }}>
            {submitting ? 'ОТПРАВКА...' : 'ЗАРЕГИСТРИРОВАТЬ КОМАНДУ'} <Icon name="arrowRight" size={14} />
          </button>

          <p style={{ margin: 0, fontSize: 12, color: 'var(--ff-system-fog)', fontFamily: 'var(--ff-font-body)', lineHeight: 1.5 }}>
            Взнос {tournament.entry_fee.toLocaleString('ru')} ₽ с команды оплачивается до турнира.
          </p>
        </form>
      ) : (
        <div className="tp-reg__closed">
          <p>{isFull ? 'Все места заняты. Следи за анонсами следующего турнира.' : 'Регистрация закрыта.'}</p>
          <a href="https://t.me/fullfocusclubru?direct" target="_blank" rel="noopener noreferrer"
             className="ff-btn ff-btn--secondary">
            НАПИСАТЬ В TELEGRAM <Icon name="telegram" size={14} />
          </a>
        </div>
      )}
    </div>
  )
}
