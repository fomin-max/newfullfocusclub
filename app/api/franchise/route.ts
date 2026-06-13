import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const FRANCHISE_CHAT_ID = process.env.FRANCHISE_CHAT_ID ?? ''

interface FranchisePayload {
  name:      string
  phone:     string
  city?:     string
  messenger: string
  budget?:   string
  comment?:  string
  source?:   string
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOOKING_BOT_TOKEN
  if (!token || !FRANCHISE_CHAT_ID) return
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: FRANCHISE_CHAT_ID, text, parse_mode: 'HTML' }),
    })
  } catch (err) {
    console.error('Telegram send error:', err)
  }
}

async function sendEmail(subject: string, html: string) {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) return
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.hosting.reg.ru',
      port: 465,
      secure: true,
      auth: { user, pass },
    })
    await transporter.sendMail({
      from: `"Full Focus Франшиза" <${user}>`,
      to: 'franchise@fullfocusclub.ru',
      subject,
      html,
    })
  } catch (err) {
    console.error('Email send error:', err)
  }
}

export async function POST(req: Request) {
  let body: FranchisePayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, phone, city, messenger, budget, comment, source = 'hero' } = body

  if (!name || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('franchise_leads')
    .insert({ name, phone, city: city || null, messenger, budget: budget || null, comment: comment || null, source })
    .select('id')
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  const cityLine    = city    ? `\n🏙 Город: <b>${city}</b>`          : ''
  const budgetLine  = budget  ? `\n💰 Бюджет: <b>${budget}</b>`       : ''
  const commentLine = comment ? `\n💬 Комментарий: <i>${comment}</i>` : ''
  const sourceLine  = source !== 'hero' ? `\n📋 Форма: <b>${source}</b>` : ''

  const tgMsg = [
    `🚀 <b>Новая заявка на франшизу</b>`,
    ``,
    `👤 Имя: <b>${name}</b>`,
    `📞 Телефон: <b>${phone}</b>${cityLine}${budgetLine}`,
    `${messenger === 'whatsapp' ? '📱' : '✈️'} Мессенджер: <b>${messenger}</b>${commentLine}${sourceLine}`,
    ``,
    `#франшиза`,
  ].join('\n')

  const emailHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <h2 style="color:#1a1a2e;border-bottom:2px solid #7c3aed;padding-bottom:8px">
        🚀 Новая заявка на франшизу
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        <tr><td style="padding:8px 0;color:#666;width:140px">Имя</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Телефон</td><td style="padding:8px 0;font-weight:600">${phone}</td></tr>
        ${city    ? `<tr><td style="padding:8px 0;color:#666">Город</td><td style="padding:8px 0">${city}</td></tr>` : ''}
        ${budget  ? `<tr><td style="padding:8px 0;color:#666">Бюджет</td><td style="padding:8px 0">${budget}</td></tr>` : ''}
        <tr><td style="padding:8px 0;color:#666">Мессенджер</td><td style="padding:8px 0">${messenger}</td></tr>
        ${comment ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top">Комментарий</td><td style="padding:8px 0">${comment}</td></tr>` : ''}
      </table>
      <p style="margin-top:24px;font-size:12px;color:#999">
        Заявка #${data.id} · Full Focus Club
      </p>
    </div>
  `

  await Promise.all([
    sendTelegram(tgMsg),
    sendEmail(`Заявка на франшизу — ${name}`, emailHtml),
  ])

  return NextResponse.json({ ok: true, id: data.id })
}
