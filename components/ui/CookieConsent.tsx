'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ff_cookie_consent'

interface ConsentState {
  analytics: boolean
  marketing: boolean
  settled: boolean
}

function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

function saveConsent(state: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const existing = loadConsent()
    if (!existing?.settled) {
      setVisible(true)
    } else {
      setAnalytics(existing.analytics)
      setMarketing(existing.marketing)
    }

    const handler = () => {
      const current = loadConsent()
      if (current) {
        setAnalytics(current.analytics)
        setMarketing(current.marketing)
      }
      setExpanded(true)
      setVisible(true)
    }
    window.addEventListener('ff:cookie-settings', handler)
    return () => window.removeEventListener('ff:cookie-settings', handler)
  }, [])

  if (!visible) return null

  function acceptAll() {
    const state = { analytics: true, marketing: true, settled: true }
    saveConsent(state)
    setAnalytics(true)
    setMarketing(true)
    setVisible(false)
  }

  function saveSettings() {
    const state = { analytics, marketing, settled: true }
    saveConsent(state)
    setVisible(false)
  }

  return (
    <div className="ff-cookie" role="dialog" aria-label="Настройки cookie">
      <p className="ff-cookie__text">
        Мы используем cookies для аналитики и персонализации. Вы можете принять все или настроить
        параметры. Подробнее —&nbsp;
        <a href="/privacy" className="ff-cookie__link">Политика конфиденциальности</a>.
      </p>

      {expanded && (
        <div className="ff-cookie__cats">
          <label className="ff-cookie__cat ff-cookie__cat--disabled">
            <span className="ff-cookie__cat-name">Обязательные</span>
            <span className="ff-cookie__toggle ff-cookie__toggle--on" aria-hidden="true" />
          </label>
          <label className="ff-cookie__cat">
            <input
              type="checkbox"
              className="ff-cookie__checkbox"
              checked={analytics}
              onChange={e => setAnalytics(e.target.checked)}
            />
            <span className="ff-cookie__cat-name">Аналитические (Яндекс.Метрика)</span>
            <span className={`ff-cookie__toggle ${analytics ? 'ff-cookie__toggle--on' : ''}`} aria-hidden="true" />
          </label>
          <label className="ff-cookie__cat">
            <input
              type="checkbox"
              className="ff-cookie__checkbox"
              checked={marketing}
              onChange={e => setMarketing(e.target.checked)}
            />
            <span className="ff-cookie__cat-name">Маркетинговые</span>
            <span className={`ff-cookie__toggle ${marketing ? 'ff-cookie__toggle--on' : ''}`} aria-hidden="true" />
          </label>
        </div>
      )}

      <div className="ff-cookie__actions">
        {!expanded && (
          <button className="ff-cookie__btn ff-cookie__btn--ghost" onClick={() => setExpanded(true)}>
            Настроить
          </button>
        )}
        {expanded ? (
          <button className="ff-cookie__btn ff-cookie__btn--accent" onClick={saveSettings}>
            Сохранить
          </button>
        ) : (
          <button className="ff-cookie__btn ff-cookie__btn--accent" onClick={acceptAll}>
            Принять все
          </button>
        )}
      </div>
    </div>
  )
}
