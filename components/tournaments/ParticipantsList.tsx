'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase, getRegistrations, type Tournament, type TournamentRegistration } from '@/lib/supabase'
import Reveal from '@/components/ui/Reveal'

interface Props { tournament: Tournament }

export default function ParticipantsList({ tournament }: Props) {
  const [registrations, setRegistrations] = useState<TournamentRegistration[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const data = await getRegistrations(tournament.id)
    setRegistrations(data)
    setLoading(false)
  }, [tournament.id])

  useEffect(() => {
    fetch()
    const channel = supabase
      .channel(`participants:${tournament.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tournament_registrations',
        filter: `tournament_id=eq.${tournament.id}`,
      }, fetch)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [tournament.id, fetch])

  if (!tournament.show_participants) return null

  if (loading) return (
    <p className="cd-players__empty">Загрузка участников...</p>
  )

  const remaining = tournament.max_participants - registrations.length

  return (
    <>
      {registrations.length > 0 ? (
        <div className="cd-players">
          {registrations.map((r, i) => {
            const rank = (r.registration_data as Record<string, string>)?.rating
            return (
              <Reveal key={r.id} className={`cd-player${r.status === 'pending' ? ' cd-player--pending' : ''}`} delay={30 * i}>
                <span className="cd-player__idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="cd-player__name">{r.participant_name}</span>
                {rank && <span className="cd-player__elo">{rank}</span>}
              </Reveal>
            )
          })}
        </div>
      ) : (
        <p className="cd-players__empty">Пока никто не зарегистрировался. Будь первым!</p>
      )}
      {remaining > 0 && (
        <p className="cd-players__empty">
          Осталось {remaining} {remaining === 1 ? 'место' : remaining < 5 ? 'места' : 'мест'} — присоединяйся к драфту.
        </p>
      )}
    </>
  )
}
