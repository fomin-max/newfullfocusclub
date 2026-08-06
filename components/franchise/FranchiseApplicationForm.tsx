'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const CITIES = ['Санкт-Петербург', 'Москва', 'Другой город']
const BUDGETS = ['до 7 млн ₽', '7–12 млн ₽', 'более 12 млн ₽']

export default function FranchiseApplicationForm() {
  const [city, setCity]       = useState(CITIES[0])
  const [budget, setBudget]   = useState(BUDGETS[0])
  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [username, setUsername] = useState('')
  const [comment, setComment] = useState('')
  const [done, setDone]       = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, username, budget, city, comment, source: 'application' }),
      })
    } finally {
      setLoading(false)
      setDone(true)
    }
  }

  return (
    <section id="zayavka" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head center">
          <span className="ff-tag">начни прямо сейчас</span>
          <h2 className="ff-section-head__title">ОСТАВИТЬ ЗАЯВКУ</h2>
          <p className="ff-section-head__sub">
            Свяжемся в течение одного рабочего дня. Обсудим детали и отправим презентацию франшизы.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="ff-appform-card">
            {!done ? (
              <form className="ff-appform" onSubmit={submit}>
                <div className="ff-appform__col">
                  <div className="ff-field">
                    <label>Город</label>
                    <div className="ff-select">
                      <select value={city} onChange={e => setCity(e.target.value)}>
                        {CITIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <span className="ff-select__arr">▾</span>
                    </div>
                  </div>
                  <div className="ff-field">
                    <label>Планируемый бюджет</label>
                    <div className="ff-select">
                      <select value={budget} onChange={e => setBudget(e.target.value)}>
                        {BUDGETS.map(b => <option key={b}>{b}</option>)}
                      </select>
                      <span className="ff-select__arr">▾</span>
                    </div>
                  </div>
                  <div className="ff-field ff-appform__grow">
                    <label>Опыт в бизнесе / комментарий</label>
                    <textarea className="ff-input" placeholder="Расскажи о себе и своих планах" value={comment}
                              onChange={e => setComment(e.target.value)} />
                  </div>
                </div>

                <div className="ff-appform__col">
                  <div className="ff-field">
                    <label>Имя</label>
                    <input type="text" className="ff-input" placeholder="Как тебя зовут?" value={name}
                           onChange={e => setName(e.target.value)} required />
                  </div>
                  <div className="ff-field">
                    <label>Телефон</label>
                    <input type="tel" className="ff-input" placeholder="+7 ___ ___-__-__" value={phone}
                           onChange={e => setPhone(e.target.value)} required />
                  </div>
                  <div className="ff-field">
                    <label>Username в Telegram (необязательно)</label>
                    <input type="text" className="ff-input" placeholder="@username" value={username}
                           onChange={e => setUsername(e.target.value)} />
                  </div>
                </div>

                <div className="ff-appform__submit">
                  <button type="submit" disabled={loading}
                          className="ff-btn ff-btn--primary ff-btn--lg is-pulse"
                          style={{ width: '100%' }}>
                    {loading ? 'ОТПРАВЛЯЕМ...' : <><span>ОТПРАВИТЬ ЗАЯВКУ</span><Icon name="arrowRight" size={15} /></>}
                  </button>
                </div>
              </form>
            ) : (
              <div className="ff-appform__success">
                <span className="ff-appform__success-mark">
                  <Icon name="check" size={40} />
                </span>
                <h3>ЗАЯВКА ПРИНЯТА!</h3>
                <p>Свяжемся в течение одного рабочего дня.</p>
                <a className="ff-btn ff-btn--secondary" href="https://t.me/fullfocusclub"
                   target="_blank" rel="noopener noreferrer">
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
