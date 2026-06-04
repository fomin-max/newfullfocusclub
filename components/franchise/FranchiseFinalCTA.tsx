'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const CHECKLIST = [
  'Финансовая модель',
  'Презентация франшизы',
  'Разбор топ-городов РФ',
  'Личная консультация с основателем',
]

export default function FranchiseFinalCTA() {
  const [messenger, setMessenger] = useState<'telegram' | 'whatsapp'>('telegram')
  const [name, setName]     = useState('')
  const [phone, setPhone]   = useState('')
  const [city, setCity]     = useState('')
  const [done, setDone]     = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <section className="ff-final" id="contacts">
      <div className="ff-final__halo" />
      <div className="ff-final__inner">
        <Reveal>
          <div>
            <span className="ff-tag">Контакты</span>
            <h2 className="ff-final__title" style={{ marginTop: 18 }}>
              ТЫ ОТКРЫВАЕШЬ КЛУБ.<br />
              <span className="accent">МЫ — ВСЁ ОСТАЛЬНОЕ.</span>
            </h2>
            <p className="ff-final__sub">
              Оставь заявку — пришлём финмодель, презентацию и подобранные
              города. Без звонков с подменных номеров.
            </p>

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
                    <input id="fr-phone" className="ff-input" placeholder="+7 ___ ___-__-__"
                           value={phone} onChange={e => setPhone(e.target.value)} required />
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
                  </div>
                </div>
                <div>
                  <button type="submit"
                          className="ff-btn ff-btn--primary ff-btn--lg ff-btn--block is-pulse">
                    ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ И ФИНМОДЕЛЬ
                  </button>
                </div>
                <p className="ff-finecount">Свяжемся в течение 24 часов · Без спама</p>
              </form>
            ) : (
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                <a href="https://t.me/fullfocusclub" target="_blank" rel="noopener noreferrer"
                   className="ff-btn ff-btn--secondary">
                  НАПИСАТЬ СЕЙЧАС <Icon name="telegram" size={15} />
                </a>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <ul className="ff-checklist">
            {CHECKLIST.map(t => (
              <li className="ff-checklist__item" key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
