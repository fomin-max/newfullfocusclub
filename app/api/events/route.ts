import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const EVENTS_CHAT_ID = '-1004220927431'

interface EventPayload {
  event_type: string
  club:       string
  date?:      string
  people?:    number | string
  name:       string
  contact:    string
  comment?:   string
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOOKING_BOT_TOKEN
  if (!token) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: EVENTS_CHAT_ID, text, parse_mode: 'HTML' }),
  })
}

export async function POST(req: Request) {
  let body: EventPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { event_type, club, date, people, name, contact, comment } = body

  if (!event_type || !club || !name || !contact) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('event_requests')
    .insert({
      event_type,
      club,
      date:    date || null,
      people:  people ? Number(people) : null,
      name,
      contact,
      comment: comment || null,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  const dateLine  = date    ? `\n📅 Дата: <b>${date}</b>`                  : ''
  const peopleLine = people ? `\n👥 Человек: <b>${people}</b>`              : ''
  const commentLine = comment ? `\n💬 Комментарий: <i>${comment}</i>`       : ''

  const msg = [
    `🎉 <b>Новая заявка на мероприятие</b>`,
    ``,
    `📌 Тип: <b>${event_type}</b>`,
    `🏢 Клуб: <b>${club}</b>${dateLine}${peopleLine}`,
    ``,
    `👤 Имя: <b>${name}</b>`,
    `📞 Контакт: <b>${contact}</b>${commentLine}`,
    ``,
    `#мероприятие`,
  ].join('\n')

  await sendTelegram(msg)

  return NextResponse.json({ ok: true, id: data.id })
}
