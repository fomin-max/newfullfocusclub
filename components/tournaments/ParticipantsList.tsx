'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase, getRegistrations, REGISTRATION_ADDED_EVENT, type Tournament, type TournamentRegistration } from '@/lib/supabase'
import Reveal from '@/components/ui/Reveal'

interface Props { tournament: Tournament }

interface TeamPlayer { nickname: string; faceit_url?: string }

function isValidUrl(value: string | undefined): value is string {
  if (!value) return false
  try {
    const u = new URL(value)
    return (u.protocol === 'http:' || u.protocol === 'https:') && u.hostname.includes('.')
  } catch {
    return false
  }
}

function TeamRoster({ registration }: { registration: TournamentRegistration }) {
  const data = registration.registration_data as {
    captain_nick?: string
    captain_faceit_url?: string
    players?: (TeamPlayer | string)[]
  }
  const players = (data.players ?? []).map(p => typeof p === 'string' ? { nickname: p } : p)

  return (
    <ul className="cd-team__roster">
      {data.captain_nick && (
        <li>
          {isValidUrl(data.captain_faceit_url)
            ? <a href={data.captain_faceit_url} target="_blank" rel="noopener noreferrer">{data.captain_nick}</a>
            : <span>{data.captain_nick}</span>}
          <span className="cd-team__badge">Капитан</span>
        </li>
      )}
      {players.map((p, i) => (
        <li key={i}>
          {isValidUrl(p.faceit_url)
            ? <a href={p.faceit_url} target="_blank" rel="noopener noreferrer">{p.nickname}</a>
            : <span>{p.nickname}</span>}
        </li>
      ))}
    </ul>
  )
}

export default function ParticipantsList({ tournament }: Props) {
  const [registrations, setRegistrations] = useState<TournamentRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const isTeam = tournament.participant_type === 'team'

  const load = useCallback(async () => {
    const data = await getRegistrations(tournament.id)
    setRegistrations(data)
    setLoading(false)
  }, [tournament.id])

  useEffect(() => {
    load()
    const channel = supabase
      .channel(`participants:${tournament.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tournament_registrations',
        filter: `tournament_id=eq.${tournament.id}`,
      }, load)
      .subscribe()

    // Не полагаемся только на realtime — сразу обновляем список после
    // успешной отправки заявки на этой же странице.
    const onRegistrationAdded = (e: Event) => {
      const detail = (e as CustomEvent<{ tournamentId: string }>).detail
      if (detail?.tournamentId === tournament.id) load()
    }
    window.addEventListener(REGISTRATION_ADDED_EVENT, onRegistrationAdded)

    return () => {
      supabase.removeChannel(channel)
      window.removeEventListener(REGISTRATION_ADDED_EVENT, onRegistrationAdded)
    }
  }, [tournament.id, load])

  if (!tournament.show_participants) return null

  if (loading) return (
    <p className="cd-players__empty">{isTeam ? 'Загрузка команд...' : 'Загрузка участников...'}</p>
  )

  const confirmed = registrations.filter(r => r.status === 'confirmed')
  const pending = registrations.filter(r => r.status === 'pending')
  const remaining = tournament.max_participants - registrations.length

  if (registrations.length === 0) return (
    <p className="cd-players__empty">
      {isTeam ? 'Пока ни одна команда не зарегистрировалась. Будьте первыми!' : 'Пока никто не зарегистрировался. Будь первым!'}
    </p>
  )

  return (
    <>
      {confirmed.length > 0 && (
        <>
          <div className="cd-players__group-head">
            <span className="cd-players__group-label">Подтверждены</span>
            <span className="cd-players__group-count">· {confirmed.length}</span>
          </div>
          <div className="cd-players">
            {confirmed.map((r, i) => {
              const rank = (r.registration_data as Record<string, string>)?.rating
              return (
                <Reveal key={r.id} className="cd-player cd-player--confirmed" delay={30 * i}>
                  <span className="cd-player__idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cd-player__name">{r.participant_name}</span>
                  {isTeam ? <TeamRoster registration={r} /> : (rank && <span className="cd-player__elo">{rank}</span>)}
                </Reveal>
              )
            })}
          </div>
        </>
      )}

      {pending.length > 0 && (
        <>
          <div className="cd-players__sep">
            <span className="cd-players__sep-label">
              Ожидают подтверждения · {pending.length}
            </span>
          </div>
          <div className="cd-players">
            {pending.map((r, i) => {
              const rank = (r.registration_data as Record<string, string>)?.rating
              return (
                <Reveal key={r.id} className="cd-player cd-player--pending" delay={30 * i}>
                  <span className="cd-player__idx">{String(confirmed.length + i + 1).padStart(2, '0')}</span>
                  <span className="cd-player__name">{r.participant_name}</span>
                  {isTeam ? <TeamRoster registration={r} /> : (rank && <span className="cd-player__elo">{rank}</span>)}
                </Reveal>
              )
            })}
          </div>
        </>
      )}

      {remaining > 0 && (
        <p className="cd-players__empty">
          {isTeam
            ? `Осталось ${remaining} ${remaining === 1 ? 'место' : remaining < 5 ? 'места' : 'мест'} для команд — регистрируйтесь.`
            : `Осталось ${remaining} ${remaining === 1 ? 'место' : remaining < 5 ? 'места' : 'мест'} — присоединяйся к драфту.`}
        </p>
      )}
    </>
  )
}
