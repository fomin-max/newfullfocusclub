// Простая защита портала паролем. Два пароля в .env:
//   PORTAL_PASSWORD        — для рабочих (просмотр). Пустой → страница открыта без пароля.
//   PORTAL_ADMIN_PASSWORD  — для владельца (загрузка версий). Пустой → админка выключена.
//   PORTAL_SECRET          — ключ подписи cookie (длинная случайная строка).
// В cookie лежит HMAC от роли и пароля: смена пароля сразу разлогинивает всех.
import crypto from 'node:crypto'
import { cookies } from 'next/headers'

export type Role = 'view' | 'admin'

const COOKIE: Record<Role, string> = { view: 'ffp_view', admin: 'ffp_admin' }
const MAX_AGE: Record<Role, number> = { view: 60 * 60 * 24 * 30, admin: 60 * 60 * 24 * 7 }

function secret() {
  return process.env.PORTAL_SECRET || ''
}
function password(role: Role) {
  return (role === 'view' ? process.env.PORTAL_PASSWORD : process.env.PORTAL_ADMIN_PASSWORD) || ''
}
function sha(s: string) {
  return crypto.createHash('sha256').update(s).digest()
}
function token(role: Role) {
  return crypto.createHmac('sha256', secret()).update(`${role}:${password(role)}`).digest('base64url')
}
function safeEq(a: string, b: string) {
  return crypto.timingSafeEqual(sha(a), sha(b))
}

export function adminConfigured() {
  return Boolean(secret() && password('admin'))
}
export function viewIsOpen() {
  return !password('view')
}

export function checkPassword(role: Role, input: string) {
  const pw = password(role)
  if (!pw || !secret()) return false
  return safeEq(input, pw)
}

export async function hasRole(role: Role): Promise<boolean> {
  if (role === 'view') {
    if (viewIsOpen()) return true
    if (await hasRole('admin')) return true
  }
  if (role === 'admin' && !adminConfigured()) return false
  if (!secret()) return false
  const jar = await cookies()
  const value = jar.get(COOKIE[role])?.value
  return Boolean(value) && safeEq(value as string, token(role))
}

export function sessionCookie(role: Role) {
  return {
    name: COOKIE[role],
    value: token(role),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: MAX_AGE[role],
  }
}

export const COOKIE_NAMES = Object.values(COOKIE)

// ── Ограничение попыток входа: 10 неверных паролей за 15 минут с одного IP ──
const attempts = new Map<string, { n: number; until: number }>()

export function tooManyAttempts(ip: string) {
  const a = attempts.get(ip)
  return Boolean(a && a.until > Date.now() && a.n >= 10)
}
export function registerFailure(ip: string) {
  const now = Date.now()
  const a = attempts.get(ip)
  if (!a || a.until < now) attempts.set(ip, { n: 1, until: now + 15 * 60 * 1000 })
  else a.n += 1
  if (attempts.size > 5000) attempts.clear()
}
