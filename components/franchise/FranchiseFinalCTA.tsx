'use client'

import { useRef, useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const CHECKLIST = [
  'Финансовая модель',
  'Презентация франшизы',
  'Разбор топ-городов РФ',
  'Личная консультация с основателем',
]

export default function FranchiseFinalCTA() {
  const [messenger, setMessenger] = useState<'telegram' | 'whatsapp' | 'max'>('telegram')
  const [name, setName]     = useState('')
  const [phone, setPhone]   = useState('')
  const [city, setCity]     = useState('')
  const [done, setDone]     = useState(false)

  const phoneRef = useRef<HTMLInputElement>(null)

  // Cursor positions right after each digit in "+7 XXX XXX-XX-XX"
  // Indices:  +  7     d0 d1 d2    d3 d4 d5 -  d6 d7 -  d8 d9
  //           0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
  const CURSOR_MAP = [0, 4, 5, 6, 8, 9, 10, 12, 13, 15, 16]

  const handlePhone = (raw: string) => {
    let digits = raw.replace(/\D/g, '')
    if (digits.startsWith('7') || digits.startsWith('8')) digits = digits.slice(1)
    digits = digits.slice(0, 10)
    if (!digits) { setPhone(''); return }
    const d = (i: number) => digits[i] ?? '_'
    setPhone(`+7 ${d(0)}${d(1)}${d(2)} ${d(3)}${d(4)}${d(5)}-${d(6)}${d(7)}-${d(8)}${d(9)}`)
    const pos = CURSOR_MAP[digits.length] ?? 16
    requestAnimationFrame(() => {
      phoneRef.current?.setSelectionRange(pos, pos)
    })
  }

  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, city, messenger, source: 'hero' }),
      })
    } finally {
      setLoading(false)
      setDone(true)
    }
  }

  return (
    <section className="ff-final" id="contacts">
      <div className="ff-final__halo" />
      <div className="ff-final__inner">

        <Reveal>
          <div className="ff-final__left">
            <span className="ff-tag">Контакты</span>
            <h2 className="ff-final__title" style={{ marginTop: 18 }}>
              ТЫ ОТКРЫВАЕШЬ КЛУБ.<br />
              <span className="accent">МЫ — ВСЁ ОСТАЛЬНОЕ.</span>
            </h2>
            <p className="ff-final__sub">
              Оставь заявку — пришлём финмодель, презентацию и подобранные
              города. Без звонков с подменных номеров.
            </p>
            <ul className="ff-checklist">
              {CHECKLIST.map(t => (
                <li className="ff-checklist__item" key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="ff-final__card">
            <p className="ff-final__card-title">Получить материалы</p>
            {!done ? (
              <form className="ff-form" onSubmit={submit}>
                <div className="ff-form__row">
                  <div className="ff-field">
                    <label htmlFor="fr-name">Имя</label>
                    <input id="fr-name" className="ff-input" placeholder="Ваше имя"
                           value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div className="ff-field">
                    <label htmlFor="fr-phone">Телефон</label>
                    <input id="fr-phone" ref={phoneRef} className="ff-input"
                           placeholder="+7 ___ ___-__-__"
                           value={phone} onChange={e => handlePhone(e.target.value)}
                           inputMode="numeric" required />
                  </div>
                </div>
                <div className="ff-field">
                  <label htmlFor="fr-city">Город</label>
                  <input id="fr-city" className="ff-input" placeholder="Ваш город"
                         value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div className="ff-field">
                  <label>Удобный мессенджер</label>
                  <div className="ff-toggle" role="tablist">
                    <button type="button"
                            className={messenger === 'telegram' ? 'is-active' : ''}
                            onClick={() => setMessenger('telegram')}>
                      Telegram
                    </button>
                    <button type="button"
                            className={messenger === 'whatsapp' ? 'is-active' : ''}
                            onClick={() => setMessenger('whatsapp')}>
                      WhatsApp
                    </button>
                    <button type="button"
                            className={messenger === 'max' ? 'is-active' : ''}
                            onClick={() => setMessenger('max')}>
                      MAX
                    </button>
                  </div>
                </div>
                <div>
                  <button type="submit" disabled={loading}
                          className="ff-btn ff-btn--primary ff-btn--lg ff-btn--block is-pulse">
                    {loading ? 'ОТПРАВЛЯЕМ...' : 'Получить презентацию и финмодель'}
                  </button>
                </div>
                <p className="ff-finecount">Свяжемся в течение 24 часов · Без спама</p>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{
                  display: 'flex', gap: 14, alignItems: 'center',
                  padding: '24px', background: 'rgba(0,255,182,0.08)',
                  border: '1px solid rgba(0,255,182,0.35)', borderRadius: 'var(--ff-radius-lg)',
                }}>
                  <div style={{ color: 'var(--ff-neon-bloom)' }}>
                    <Icon name="check" size={28} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--ff-font-heading)', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ff-softlight)' }}>
                      Заявка принята!
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--ff-system-fog)', marginTop: 4 }}>
                      Свяжемся в течение 24 часов.
                    </div>
                  </div>
                </div>
                <a href="https://t.me/fullfocusclubru?direct" target="_blank" rel="noopener noreferrer"
                   className="ff-btn ff-btn--secondary">
                  НАПИСАТЬ СЕЙЧАС <Icon name="telegram" size={15} />
                </a>
              </div>
            )}
          </div>
        </Reveal>

      </div>
    </section>
  )
}
