'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase, getRegistrations, type Tournament, type TournamentRegistration } from '@/lib/supabase'
import Reveal from '@/components/ui/Reveal'

interface Props { tournament: Tournament }

export default function ParticipantsList({ tournament }: Props) {
  const [registrations, setRegistrations] = useState<TournamentRegistration[]>([])
  const [loading, setLoading] = useState(true)

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
    return () => { supabase.removeChannel(channel) }
  }, [tournament.id, load])

  if (!tournament.show_participants) return null

  if (loading) return (
    <p className="cd-players__empty">Загрузка участников...</p>
  )

  const confirmed = registrations.filter(r => r.status === 'confirmed')
  const pending = registrations.filter(r => r.status === 'pending')
  const remaining = tournament.max_participants - registrations.length

  if (registrations.length === 0) return (
    <p className="cd-players__empty">Пока никто не зарегистрировался. Будь первым!</p>
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
                  {rank && <span className="cd-player__elo">{rank}</span>}
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
                  {rank && <span className="cd-player__elo">{rank}</span>}
                </Reveal>
              )
            })}
          </div>
        </>
      )}

      {remaining > 0 && (
        <p className="cd-players__empty">
          Осталось {remaining} {remaining === 1 ? 'место' : remaining < 5 ? 'места' : 'мест'} — присоединяйся к драфту.
        </p>
      )}
    </>
  )
}
