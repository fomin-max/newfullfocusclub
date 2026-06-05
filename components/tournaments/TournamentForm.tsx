'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const DISCIPLINES = ['Counter-Strike 2']
const SOURCES     = ['Из соцсетей', 'От друга', 'Был в клубе', 'Другое']

export default function TournamentForm() {
  const [discipline, setDiscipline]   = useState(DISCIPLINES[0])
  const [teamName, setTeamName]       = useState('')
  const [captain, setCaptain]         = useState('')
  const [captainNick, setCaptainNick] = useState('')
  const [players, setPlayers]         = useState(['', '', '', ''])
  const [steam, setSteam]             = useState('')
  const [source, setSource]           = useState(SOURCES[0])
  const [done, setDone]               = useState(false)

  const updatePlayer = (i: number, v: string) =>
    setPlayers(prev => prev.map((p, idx) => idx === i ? v : p))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <section id="form" className="ff-section tn-form-sec">
      <div className="tn-form-sec__bg" />
      <div className="ff-section__inner">
        <Reveal className="ff-section-head center">
          <span className="ff-tag">зарегистрируй команду</span>
          <h2 className="ff-section-head__title">ЗАРЕГИСТРИРОВАТЬ КОМАНДУ</h2>
          <p className="ff-section-head__sub">
            Заполни форму — подтвердим слот в течение 15 минут в Telegram.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="tn-form-card">
            {!done ? (
              <form className="tn-form" onSubmit={submit}>
                {/* LEFT — команда */}
                <div className="tn-form__col">
                  <span className="tn-form__col-title">КОМАНДА</span>
                  <div className="ev-field">
                    <label>Название команды</label>
                    <input type="text" placeholder="Например: Focus Five" value={teamName}
                           onChange={e => setTeamName(e.target.value)} required />
                  </div>
                  <div className="ev-field">
                    <label>Telegram капитана</label>
                    <input type="text" placeholder="@username" value={captain}
                           onChange={e => setCaptain(e.target.value)} required />
                  </div>
                  <div className="ev-field">
                    <label>Дисциплина</label>
                    <div className="ev-select">
                      <select value={discipline} onChange={e => setDiscipline(e.target.value)}>
                        {DISCIPLINES.map(d => <option key={d}>{d}</option>)}
                      </select>
                      <span className="ev-select__arr">▾</span>
                    </div>
                  </div>
                  <div className="ev-field">
                    <label>Откуда узнали о турнире</label>
                    <div className="ev-select">
                      <select value={source} onChange={e => setSource(e.target.value)}>
                        {SOURCES.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <span className="ev-select__arr">▾</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT — состав */}
                <div className="tn-form__col">
                  <span className="tn-form__col-title">СОСТАВ · 5 ИГРОКОВ</span>
                  <div className="ev-field">
                    <label>Игрок 1 (Капитан)</label>
                    <input type="text" placeholder="Никнейм капитана" value={captainNick}
                           onChange={e => setCaptainNick(e.target.value)} required />
                  </div>
                  {players.map((p, i) => (
                    <div className="ev-field" key={i}>
                      <label>Игрок {i + 2}</label>
                      <input type="text" placeholder="Никнейм" value={p}
                             onChange={e => updatePlayer(i, e.target.value)} />
                    </div>
                  ))}
                  <div className="ev-field">
                    <label>Steam профиль капитана</label>
                    <input type="text" placeholder="steamcommunity.com/id/..." value={steam}
                           onChange={e => setSteam(e.target.value)} />
                  </div>
                </div>

                {/* Info note */}
                <div className="tn-form__info">
                  <span className="tn-form__info-icon"><Icon name="info" size={18} /></span>
                  <p>
                    Взнос 500 ₽ с каждого игрока оплачивается на месте в день турнира.
                    Чек-ин с 13:30, старт в 14:00 на ARENA 5×5 (Василеостровская).
                  </p>
                </div>

                <div className="tn-form__submit">
                  <button type="submit" className="ff-btn ff-btn--primary ff-btn--lg is-pulse"
                          style={{ width: '100%' }}>
                    ЗАРЕГИСТРИРОВАТЬ КОМАНДУ <Icon name="arrowRight" size={15} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="ev-form__success">
                <span className="ev-form__success-mark">
                  <Icon name="check" size={40} />
                </span>
                <h3>КОМАНДА ЗАРЕГИСТРИРОВАНА!</h3>
                <p>Свяжемся с капитаном в течение 15 минут в Telegram.</p>
                <a className="ff-btn ff-btn--secondary" href="https://t.me/fullfocusclub"
                   target="_blank" rel="noopener noreferrer">
                  НАПИСАТЬ В TELEGRAM <Icon name="telegram" size={15} />
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
