import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(url, key)

// ─── Types ────────────────────────────────────────────────────────────────────

// format — свободный текст: 'captain_draft', 'CS2 5×5', 'Dota 2 2×2', etc.
export type TournamentStatus =
  | 'draft' | 'upcoming' | 'registration_open'
  | 'registration_closed' | 'ongoing' | 'completed' | 'cancelled'
export type ParticipantType = 'individual' | 'team'
export type RegistrationStatus = 'pending' | 'confirmed' | 'waitlist' | 'cancelled'

export interface Tournament {
  id: string
  slug: string
  title: string
  title_accent: string | null
  subtitle: string | null
  format: string                  // свободный текст, без enum
  participant_type: ParticipantType
  team_size: number               // 1 = solo/draft, 2 = duo, 5 = 5v5
  status: TournamentStatus
  location_name: string | null
  date: string
  registration_deadline: string | null
  max_participants: number
  entry_fee: number
  prize_pool: number | null
  prize_breakdown: Record<string, string | number> | null
  description: string | null
  rules: string | null
  format_steps: string[] | null
  partners: { name: string; logo_url?: string; description?: string }[] | null
  show_participants: boolean
  created_at: string
}

export interface TournamentRegistration {
  id: string
  tournament_id: string
  status: RegistrationStatus
  participant_name: string
  contact_telegram: string
  registration_data: Record<string, unknown>
  created_at: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export async function getTournament(slug: string): Promise<Tournament | null> {
  const { data } = await supabase
    .from('tournaments')
    .select('*')
    .eq('slug', slug)
    .neq('status', 'draft')
    .single()
  return data
}

export async function getTournaments(): Promise<Tournament[]> {
  const { data } = await supabase
    .from('tournaments')
    .select('*')
    .neq('status', 'draft')
    .order('date', { ascending: true })
  return data ?? []
}

export async function getRegistrations(tournamentId: string): Promise<TournamentRegistration[]> {
  const { data } = await supabase
    .from('tournament_registrations')
    .select('id, tournament_id, status, participant_name, contact_telegram, registration_data, created_at')
    .eq('tournament_id', tournamentId)
    .in('status', ['confirmed', 'pending'])
    .order('created_at', { ascending: true })
  return data ?? []
}

export async function submitRegistration(
  tournamentId: string,
  participantName: string,
  contactTelegram: string,
  registrationData: Record<string, unknown>,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('tournament_registrations')
    .insert({
      tournament_id: tournamentId,
      participant_name: participantName,
      contact_telegram: contactTelegram,
      registration_data: registrationData,
      status: 'pending',
    })
  if (error) console.error('[submitRegistration]', error)
  return { error: error?.message ?? null }
}
