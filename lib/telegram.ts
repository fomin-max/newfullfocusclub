// Отправка в Telegram через Supabase Edge Function `tg-send` (Франкфурт):
// с VPS напрямую api.telegram.org недоступен (блокировка на маршруте).
// Только для серверного кода — использует service_role ключ.
export async function sendTelegram(chatId: string, text: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key || !chatId) return
  // Заявка уже в БД — сбой уведомления не должен ронять ответ клиенту
  try {
    const res = await fetch(`${url}/functions/v1/tg-send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) console.error('Telegram send error:', res.status, await res.text())
  } catch (err) {
    console.error('Telegram send error:', err)
  }
}
