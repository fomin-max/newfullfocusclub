'use client'

import { useState, useEffect, useRef } from 'react'
import Reveal from '@/components/ui/Reveal'
import { useClubData } from './ClubDataContext'
import type { TariffTable } from '@/app/api/tariffs/[slug]/route'

export default function Tariffs() {
  const { TARIFFS, CLUB } = useClubData()
  const [mode, setMode]     = useState<'weekday' | 'weekend'>('weekday')
  const [flipKey, setFlipKey] = useState(0)
  const [live, setLive]         = useState<TariffTable | null>(null)
  const [loading, setLoading]   = useState(true)
  const isFirst                 = useRef(true)

  useEffect(() => {
    fetch(`/api/tariffs/${CLUB.SLUG}`)
      .then(r => r.json())
      .then(d => { if (d?.rows?.length) setLive(d) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [CLUB.SLUG])

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }
    setFlipKey(k => k + 1)
  }, [mode])

  // Use live data if available, fall back to hardcoded
  const cols    = live?.cols    ?? TARIFFS.cols
  const popular = live?.popular ?? TARIFFS.popular
  const rows    = live?.rows    ?? TARIFFS.rows

  const valueOf = (pair: [number, number] | null) => {
    if (!pair) return null
    return mode === 'weekday' ? pair[0] : pair[1]
  }

  return (
    <section id="tariffs" className="ff-section" data-screen-label="05 · ТАРИФЫ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="cl-tariffs__head">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span className="ff-tag">цены в рублях</span>
              <h2 className="ff-section-head__title" style={{ margin: 0 }}>ТАРИФЫ</h2>
            </div>
            <div className="cl-tariffs__toggle" role="tablist" aria-label="День недели">
              <button className={mode === 'weekday' ? 'is-on' : ''} onClick={() => setMode('weekday')}>БУДНИ</button>
              <button className={mode === 'weekend' ? 'is-on' : ''} onClick={() => setMode('weekend')}>ВЫХОДНЫЕ</button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="cl-tariffs__wrap">
          {loading && (
            <div className="cl-tariffs__skeleton">
              <div className="cl-tariffs__sk-head">
                {[140, 80, 80, 80, 100, 100].map((w, i) => (
                  <div key={i} className="cl-tariffs__sk-cell" style={{ width: w }} />
                ))}
              </div>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="cl-tariffs__sk-row">
                  {[120, 60, 60, 60, 60, 60].map((w, j) => (
                    <div key={j} className="cl-tariffs__sk-cell"
                         style={{ width: w, animationDelay: `${i * 0.08 + j * 0.03}s` }} />
                  ))}
                </div>
              ))}
            </div>
          )}
          {!loading && (
            <>
              <div className="cl-tariffs__scroll">
                <table className="cl-tariffs__table">
                  <thead>
                    <tr>
                      <th>Зона</th>
                      {cols.map((c, i) => (
                        <th key={c} className={i === popular ? 'popular' : ''}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, ri) => (
                      <tr key={row.zone}>
                        <th scope="row">{row.zone}</th>
                        {row.vals.map((pair, ci) => {
                          const v = valueOf(pair)
                          return (
                            <td key={ci}>
                              {v === null ? (
                                <span className="cl-tariffs__empty">—</span>
                              ) : (
                                <span key={flipKey} className="cl-tariffs__cell is-flip"
                                      style={{ animationDelay: `${ri * 0.02 + ci * 0.04}s` }}>
                                  {v} ₽
                                </span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                    <tr className="best">
                      <th scope="row" colSpan={6} style={{ padding: '14px 16px' }}>
                        {TARIFFS.bestNote ?? '↑ Ночь 10ч — самая низкая цена за час сессии'}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="cl-tariffs__student">
                <strong>🎓 БОНУС</strong>
                <span>{TARIFFS.student}</span>
              </div>
            </>
          )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
