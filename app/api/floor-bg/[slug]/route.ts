import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SLUG_TO_ASSET_CODE } from '@/lib/clubs/langame'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// Proxies the club floor-plan image from Supabase Storage through our own
// RU-hosted server so browsers never hit Supabase directly (slow/unreliable
// from Russia). Next's fetch cache keeps the Supabase round-trip to once/hour.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const code = SLUG_TO_ASSET_CODE[slug]
  if (!code) return new NextResponse(null, { status: 404 })

  const { data } = await supabaseAdmin
    .from('asset_clubs')
    .select('floor_bg_url')
    .eq('code', code)
    .single()

  const sourceUrl = data?.floor_bg_url
  if (!sourceUrl) return new NextResponse(null, { status: 404 })

  const imgRes = await fetch(sourceUrl, { next: { revalidate: 3600 } })
  if (!imgRes.ok) return new NextResponse(null, { status: 502 })

  const buf = await imgRes.arrayBuffer()

  return new NextResponse(buf, {
    headers: {
      'Content-Type': imgRes.headers.get('content-type') ?? 'image/webp',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
