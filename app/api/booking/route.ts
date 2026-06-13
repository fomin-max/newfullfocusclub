import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// @username для публичного канала/супергруппы — бот должен быть admin в каждом
const CLUB_TG_CHATS: Record<string, string> = {
  elektrosila:      '-1001734082333',
  komendantsky:     '-1002229802061',
  prosvescheniya:   '-1002191860439',
  vasilyeostrovsky: '-1002399034047',
  sadovaya:         '-1003877995836',
  tekhnologichesky: '-1003345840480',
  makhachkala:      '-1003805879958',
}

const CLUB_NAMES: Record<string, string> = {
  elektrosila:      'Электросила',
  komendantsky:     'Комендантский',
  prosvescheniya:   'Просвещения',
  vasilyeostrovsky: 'Васильевский',
  tekhnologichesky: 'Технологический',
  sadovaya:         'Садовая',
  makhachkala:      'Махачкала',
}

const CLUB_TG_ACCOUNTS: Record<string, string> = {
  elektrosila:      '@fullfocusclub',
  komendantsky:     '@fullfocuskomenda',
  prosvescheniya:   '@fullfocusprosvet',
  vasilyeostrovsky: '@fullfocusvo',
  tekhnologichesky: '@fullfocustehno',
  sadovaya:         '@fullfocussadovaya',
  makhachkala:      '@fullfocusmhk',
}

interface BookingPayload {
  club_slug:    string
  seat_id?:     string
  seat_label?:  string
  zone?:        string
  date:         string
  time_start:   string
  time_end:     string
  duration_min: number
  name:         string
  contact:      string
}

async function sendTelegram(chatId: string, text: string) {
  const token = process.env.TELEGRAM_BOOKING_BOT_TOKEN
  if (!token) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })
}

export async function POST(req: Request) {
  let body: BookingPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { club_slug, seat_id, seat_label, zone, date, time_start, time_end, duration_min, name, contact } = body

  if (!club_slug || !date || !time_start || !time_end || !duration_min || !name || !contact) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('bookings')
    .insert({ club_slug, seat_id, seat_label, zone, date, time_start, time_end, duration_min, name, contact })
    .select('id')
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  const chatId = CLUB_TG_CHATS[club_slug]
  if (chatId) {
    const clubName = CLUB_NAMES[club_slug] ?? club_slug
    const account  = CLUB_TG_ACCOUNTS[club_slug] ?? ''
    const seatLine = seat_label ? `\n🎮 Место: <b>${seat_label}</b>` : zone ? `\n📍 Зона: <b>${zone}</b>` : ''
    const msg = [
      `📋 <b>Новая заявка на бронирование — ${clubName}</b>${account ? ` ${account}` : ''}`,
      ``,
      `👤 Имя: <b>${name}</b>`,
      `📞 Контакт: <b>${contact}</b>`,
      `📅 Дата: <b>${date}</b>`,
      `⏰ Время: <b>${time_start} → ${time_end}</b> (${duration_min} мин)${seatLine}`,
      ``,
      `#бронирование #${club_slug}`,
    ].join('\n')
    await sendTelegram(chatId, msg)
  }

  return NextResponse.json({ ok: true, id: data.id })
}
