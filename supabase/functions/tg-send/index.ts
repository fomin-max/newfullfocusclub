// Relay в Telegram Bot API. Работает во Франкфурте (eu-central-1):
// с российского VPS api.telegram.org блокируется, отсюда — нет.
// Вызывается только с service_role ключом (сайт и мониторинг на VPS).

const TOKEN = Deno.env.get('TELEGRAM_BOOKING_BOT_TOKEN')

function isServiceRole(req: Request): boolean {
  // Подпись JWT уже проверил шлюз (verify_jwt), здесь проверяем только роль:
  // anon-ключ публичный и есть в браузере — им слать нельзя.
  const jwt = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '') ?? ''
  try {
    const payload = JSON.parse(atob(jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    return payload.role === 'service_role'
  } catch {
    return false
  }
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  if (!isServiceRole(req)) return new Response('Forbidden', { status: 403 })
  if (!TOKEN) return new Response('TELEGRAM_BOOKING_BOT_TOKEN not set', { status: 500 })

  let body: { chat_id?: string; text?: string; parse_mode?: string }
  try {
    body = await req.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }
  if (!body.chat_id || !body.text) return new Response('chat_id and text required', { status: 400 })

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: body.chat_id,
      text: body.text,
      ...(body.parse_mode ? { parse_mode: body.parse_mode } : {}),
    }),
  })

  return new Response(await res.text(), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  })
})
