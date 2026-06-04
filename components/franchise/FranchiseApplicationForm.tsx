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
  const [contact, setContact] = useState('')
  const [comment, setComment] = useState('')
  const [done, setDone]       = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <section id="zayavka" className="ff-section ev-form-sec">
      <div className="ev-form-sec__bg" />
      <div className="ff-section__inner">
        <Reveal className="ff-section-head center">
          <span className="ff-tag">начни прямо сейчас</span>
          <h2 className="ff-section-head__title">ОСТАВИТЬ ЗАЯВКУ</h2>
          <p className="ff-section-head__sub">
            Свяжемся в течение одного рабочего дня. Обсудим детали и отправим презентацию франшизы.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="ev-form-card">
            {!done ? (
              <form className="ev-form" onSubmit={submit}>
                <div className="ev-form__col">
                  <div className="ev-field">
                    <label>Город</label>
                    <div className="ev-select">
                      <select value={city} onChange={e => setCity(e.target.value)}>
                        {CITIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <span className="ev-select__arr">▾</span>
                    </div>
                  </div>
                  <div className="ev-field">
                    <label>Планируемый бюджет</label>
                    <div className="ev-select">
                      <select value={budget} onChange={e => setBudget(e.target.value)}>
                        {BUDGETS.map(b => <option key={b}>{b}</option>)}
                      </select>
                      <span className="ev-select__arr">▾</span>
                    </div>
                  </div>
                  <div className="ev-field ev-field--grow">
                    <label>Опыт в бизнесе / комментарий</label>
                    <textarea placeholder="Расскажи о себе и своих планах" value={comment}
                              onChange={e => setComment(e.target.value)} />
                  </div>
                </div>

                <div className="ev-form__col">
                  <div className="ev-field">
                    <label>Имя</label>
                    <input type="text" placeholder="Как тебя зовут?" value={name}
                           onChange={e => setName(e.target.value)} required />
                  </div>
                  <div className="ev-field">
                    <label>Telegram или телефон</label>
                    <input type="text" placeholder="@username / +7" value={contact}
                           onChange={e => setContact(e.target.value)} required />
                  </div>
                </div>

                <div className="ev-form__submit">
                  <button type="submit" className="ff-btn ff-btn--primary ff-btn--lg is-pulse"
                          style={{ width: '100%' }}>
                    ОТПРАВИТЬ ЗАЯВКУ <Icon name="arrowRight" size={15} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="ev-form__success">
                <span className="ev-form__success-mark">
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
