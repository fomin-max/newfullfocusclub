import { NextResponse } from 'next/server'
import { SLUG_TO_DOMAIN, getClubId } from '@/lib/clubs/langame'

const PROXY_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/langame-proxy`

interface TariffGroup  { id: number; name: string; days: string }
interface TariffPacket { id: number; name: string }
interface TimePeriod   { tariff_groups: number; tariff_packet_id: number; packets_type_PC: number; club_id: number; price: number }
interface PcType       { id: number; name: string; sort: number }

async function langameGet<T>(domain: string, apiKey: string, path: string): Promise<T[]> {
  try {
    const res = await fetch(`${PROXY_BASE}/${domain}/${path}`, {
      headers: { 'x-api-key': apiKey },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.status ? (json.data ?? []) : []
  } catch {
    return []
  }
}

function parseDays(days: string): Set<number> {
  return new Set(days.split(',').map(Number))
}

// Strip " TV" suffix to get merged column name: "1 ЧАС TV" → "1 ЧАС"
function baseName(name: string): string {
  return name.replace(/\s+TV\s*$/i, '').trim()
}

// Column sort order
function packetOrder(name: string): number {
  const n = baseName(name).toLowerCase()
  if (/поминут/.test(n)) return 0
  if (/^1\s*ч/.test(n))  return 1
  if (/^3\s*ч/.test(n))  return 2
  if (/^5\s*ч/.test(n))  return 3
  if (/утро/.test(n))    return 4
  if (/ноч/.test(n))     return 5
  return 6
}

// Parse duration in minutes from packet name: "3 ЧАСА" → 180, "ПОМИНУТНЫЙ" → null
function packetDurationMin(name: string): number | null {
  const m = baseName(name).match(/^(\d+)\s*(ч|час)/i)
  return m ? parseInt(m[1]) * 60 : null
}

export interface ZonePricing {
  hourly:   number                   // 1h package price/hour
  perMin:   number                   // поминутный price/hour (for remaining minutes calc)
  packages: Record<number, number>   // duration_min → total price
}
export interface TariffRow   { zone: string; vals: ([number, number] | null)[] }
export interface TariffTable {
  cols:    string[]
  popular: number | null
  rows:    TariffRow[]
  byZone:  Record<string, { weekday: ZonePricing; weekend: ZonePricing }>
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const domain   = SLUG_TO_DOMAIN[slug]
  if (!domain) return NextResponse.json({ error: 'Unknown club' }, { status: 404 })

  const apiKey = process.env[`LANGAME_API_KEY_${slug.toUpperCase().replace(/-/g, '_')}`]
  if (!apiKey) return NextResponse.json(null)

  const clubId = getClubId(slug)

  const [groups, packets, timePeriods, pcTypes] = await Promise.all([
    langameGet<TariffGroup> (domain, apiKey, 'tariffs/groups/list'),
    langameGet<TariffPacket>(domain, apiKey, 'tariffs/types_groups/list'),
    langameGet<TimePeriod>  (domain, apiKey, 'tariffs/time_period/list'),
    langameGet<PcType>      (domain, apiKey, 'global/types_of_pc_in_clubs/list'),
  ])

  if (!groups.length || !packets.length || !pcTypes.length) return NextResponse.json(null)

  const weekdayGroup = groups.find(g => parseDays(g.days).has(0))
  const weekendGroup = groups.find(g => parseDays(g.days).has(6))
  const relevant     = timePeriods.filter(tp => tp.club_id === clubId)

  // Merge "1 ЧАС" + "1 ЧАС TV" → one column "1 ЧАС"
  type MergedCol = { label: string; packetIds: number[] }
  const colMap   = new Map<string, MergedCol>()
  for (const p of packets) {
    const key = baseName(p.name).toUpperCase()
    if (!colMap.has(key)) colMap.set(key, { label: baseName(p.name), packetIds: [] })
    colMap.get(key)!.packetIds.push(p.id)
  }
  const mergedCols = [...colMap.values()].sort((a, b) => packetOrder(a.label) - packetOrder(b.label))
  const cols       = mergedCols.map(c => c.label)
  const popularIdx = mergedCols.findIndex(c => /^3\s*ч/i.test(c.label))

  // IDs of TV-only packets (have " TV" in original name)
  const tvPacketIds = new Set(packets.filter(p => /\bTV\s*$/i.test(p.name)).map(p => p.id))

  // Classify zone: TV zone = has prices only for TV packets (no regular hourly packets)
  function zoneGroupByPackets(zoneId: number): number {
    const zonePrices = relevant.filter(tp => tp.packets_type_PC === zoneId)
    const hasRegular = zonePrices.some(tp => !tvPacketIds.has(tp.tariff_packet_id))
    const hasTV      = zonePrices.some(tp => tvPacketIds.has(tp.tariff_packet_id))
    if (/бильярд/i.test(pcTypes.find(z => z.id === zoneId)?.name ?? '')) return 2
    if (hasTV && !hasRegular) return 1  // TV/console zone
    return 0                             // PC zone
  }

  const hourlyCol  = mergedCols.find(c => /^1\s*ч/i.test(c.label))
  const perMinCol  = mergedCols.find(c => /поминут/i.test(c.label))

  const byZone: TariffTable['byZone'] = {}

  const unsortedRows = pcTypes.map(zone => {
    const vals: ([number, number] | null)[] = mergedCols.map(col => {
      let wdPrice: number | undefined
      let wePrice: number | undefined
      for (const pid of col.packetIds) {
        if (wdPrice == null && weekdayGroup)
          wdPrice = relevant.find(tp => tp.tariff_groups === weekdayGroup.id && tp.tariff_packet_id === pid && tp.packets_type_PC === zone.id)?.price
        if (wePrice == null && weekendGroup)
          wePrice = relevant.find(tp => tp.tariff_groups === weekendGroup.id && tp.tariff_packet_id === pid && tp.packets_type_PC === zone.id)?.price
        if (wdPrice != null && wePrice != null) break
      }
      if (wdPrice == null && wePrice == null) return null
      return [wdPrice ?? wePrice!, wePrice ?? wdPrice!]
    })

    // Build byZone pricing for the booking form
    const getPrice = (col: typeof mergedCols[0], side: 0 | 1) => {
      const idx = mergedCols.indexOf(col)
      return vals[idx]?.[side] ?? 0
    }
    const buildPricing = (side: 0 | 1): ZonePricing => {
      const hourly = hourlyCol ? getPrice(hourlyCol, side) : 0
      const perMin = perMinCol ? getPrice(perMinCol, side) : hourly
      const packages: Record<number, number> = {}
      for (const col of mergedCols) {
        const dur = packetDurationMin(col.label)
        if (dur) {
          const price = getPrice(col, side)
          if (price) packages[dur] = price
        }
      }
      return { hourly, perMin, packages }
    }

    if (hourlyCol) {
      byZone[zone.name] = { weekday: buildPricing(0), weekend: buildPricing(1) }
    }

    const hourlyPrice = hourlyCol ? getPrice(hourlyCol, 0) : 0

    return { zone: zone.name, vals, group: zoneGroupByPackets(zone.id), hourlyPrice }
  }).filter(r => r.vals.some(v => v !== null))

  const rows: TariffRow[] = unsortedRows
    .sort((a, b) => a.group !== b.group ? a.group - b.group : a.hourlyPrice - b.hourlyPrice)
    .map(({ zone, vals }) => ({ zone, vals }))

  return NextResponse.json({
    cols,
    popular: popularIdx >= 0 ? popularIdx : null,
    rows,
    byZone,
  } satisfies TariffTable)
}
