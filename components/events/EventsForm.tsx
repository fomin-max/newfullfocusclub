'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const FORM_TYPES = ['Корпоратив', 'День рождения', 'Закрытый турнир', 'Другое']
const FORM_CLUBS = [
  'Василеостровская',
  'Комендантский проспект',
  'Электросила',
  'Просвещения',
  'Садовая',
  'Технологический',
  'Махачкала',
  'Другой клуб сети',
]

export default function EventsForm() {
  const [type, setType]       = useState(FORM_TYPES[0])
  const [club, setClub]       = useState(FORM_CLUBS[0])
  const [date, setDate]       = useState('')
  const [people, setPeople]   = useState('')
  const [name, setName]       = useState('')
  const [contact, setContact] = useState('')
  const [comment, setComment] = useState('')
  const [done, setDone]       = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <section id="form" className="ff-section ev-form-sec">
      <div className="ev-form-sec__bg" />
      <div className="ff-section__inner">
        <Reveal className="ff-section-head center">
          <span className="ff-tag">свяжемся за 15 минут</span>
          <h2 className="ff-section-head__title">ОСТАВИТЬ ЗАЯВКУ</h2>
          <p className="ff-section-head__sub">Свяжемся в течение 15 минут в Telegram.</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="ev-form-card">
            {!done ? (
              <form className="ev-form" onSubmit={submit}>
                <div className="ev-form__col">
                  <div className="ev-field">
                    <label>Тип мероприятия</label>
                    <div className="ev-select">
                      <select value={type} onChange={e => setType(e.target.value)}>
                        {FORM_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                      <span className="ev-select__arr">▾</span>
                    </div>
                  </div>
                  <div className="ev-field">
                    <label>Клуб</label>
                    <div className="ev-select">
                      <select value={club} onChange={e => setClub(e.target.value)}>
                        {FORM_CLUBS.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <span className="ev-select__arr">▾</span>
                    </div>
                  </div>
                  <div className="ev-field-row">
                    <div className="ev-field">
                      <label>Дата</label>
                      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div className="ev-field">
                      <label>Количество человек</label>
                      <input type="number" min="1" placeholder="20" value={people}
                             onChange={e => setPeople(e.target.value)} />
                    </div>
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
                  <div className="ev-field ev-field--grow">
                    <label>Комментарий</label>
                    <textarea placeholder="Расскажи подробнее о мероприятии" value={comment}
                              onChange={e => setComment(e.target.value)} />
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
                <p>Свяжемся в течение 15 минут в Telegram.</p>
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
