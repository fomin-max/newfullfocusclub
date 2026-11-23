import { NextRequest, NextResponse } from 'next/server'
import { portalEnabled } from '@/lib/portal/config'
import { checkPassword, registerFailure, sessionCookie, tooManyAttempts, COOKIE_NAMES, type Role } from '@/lib/portal/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function clientIp(req: NextRequest) {
  return req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local'
}

export async function POST(req: NextRequest) {
  if (!portalEnabled()) return new NextResponse(null, { status: 404 })

  const body = (await req.json().catch(() => null)) as { role?: string; password?: string; logout?: boolean } | null

  if (body?.logout) {
    const res = NextResponse.json({ ok: true })
    for (const name of COOKIE_NAMES) res.cookies.set(name, '', { path: '/', maxAge: 0 })
    return res
  }

  const role: Role = body?.role === 'admin' ? 'admin' : 'view'
  const ip = clientIp(req)
  if (tooManyAttempts(ip)) return NextResponse.json({ ok: false, error: 'too_many' }, { status: 429 })

  if (!checkPassword(role, String(body?.password ?? ''))) {
    registerFailure(ip)
    return NextResponse.json({ ok: false, error: 'wrong' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(sessionCookie(role))
  return res
}
