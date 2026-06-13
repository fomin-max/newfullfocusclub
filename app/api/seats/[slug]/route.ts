import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SLUG_TO_DOMAIN, SLUG_TO_ASSET_CODE } from '@/lib/clubs/langame'
import type { LiveSeat } from '@/lib/clubs/langame'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

interface LangamePc      { UUID: string; name: string | null; packets_type_PC: number | null }
interface LangamePcType  { id: number; name: string }
interface LangameSession { UUID: string; date_stop: string | null; packet: number }
interface PcPosition     { pc_uuid: string; x: number; y: number }

async function langameGet<T>(domain: string, apiKey: string, path: string): Promise<T[]> {
  try {
    const res = await fetch(`https://${domain}.langame.ru/public_api/${path}`, {
      headers: { 'X-API-KEY': apiKey },
      next: { revalidate: 30 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.status ? (json.data ?? []) : []
  } catch {
    return []
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const domain = SLUG_TO_DOMAIN[slug]
  if (!domain) return NextResponse.json({ error: 'Unknown club' }, { status: 404 })

  const apiKey = process.env[`LANGAME_API_KEY_${slug.toUpperCase().replace(/-/g, '_')}`]
  if (!apiKey) {
    return NextResponse.json(
      { seats: [], warning: 'API key not configured for this club' },
      { status: 200 },
    )
  }

  const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0]
  const today     = new Date().toISOString().split('T')[0]

  const [pcs, pcTypes, sessions, posRes, bgRes] = await Promise.all([
    langameGet<LangamePc>     (domain, apiKey, 'global/linking_pc_by_type/list'),
    langameGet<LangamePcType> (domain, apiKey, 'global/types_of_pc_in_clubs/list'),
    langameGet<LangameSession>(domain, apiKey, `guests/sessions?date_from=${yesterday}&date_to=${today}&page_limit=500`),
    supabase.from('pc_positions').select('pc_uuid, x, y').like('club_key', `${domain}:%`),
    SLUG_TO_ASSET_CODE[slug]
      ? supabaseAdmin.from('asset_clubs').select('floor_bg_url').eq('code', SLUG_TO_ASSET_CODE[slug]).single()
      : Promise.resolve({ data: null }),
  ])

  const positions: PcPosition[] = posRes.data ?? []
  const posMap  = new Map(positions.map(p => [p.pc_uuid, { x: p.x, y: p.y }]))
  const typeMap = new Map(pcTypes.map(t => [t.id, t.name]))

  const activeSessions = sessions.filter(s => s.date_stop === null)
  const busyUUIDs = new Set(activeSessions.map(s => s.UUID))
  const techUUIDs = new Set(activeSessions.filter(s => s.packet === -1).map(s => s.UUID))

  const seats: LiveSeat[] = pcs.reduce<LiveSeat[]>((acc, pc) => {
    const pos = posMap.get(pc.UUID)
    if (!pos) return acc

    const zoneId   = pc.packets_type_PC ?? 0
    const zoneName = pc.packets_type_PC != null
      ? (typeMap.get(pc.packets_type_PC) ?? 'Стандарт')
      : 'Стандарт'

    const status: LiveSeat['status'] =
      techUUIDs.has(pc.UUID) ? 'tech'
      : busyUUIDs.has(pc.UUID) ? 'busy'
      : 'free'

    acc.push({ uuid: pc.UUID, number: pc.name ?? pc.UUID, zoneId, zoneName, x: pos.x, y: pos.y, status })
    return acc
  }, [])

  return NextResponse.json({ seats, floorBg: bgRes.data?.floor_bg_url ?? null })
}
