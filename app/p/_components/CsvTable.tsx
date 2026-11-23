'use client'

import { useMemo, useState } from 'react'

/** Таблица из CSV с поиском по всем столбцам (например, по ID точки T087 или группе Q14). */
export default function CsvTable({ rows, searchLabel, rowsLabel }: { rows: string[][]; searchLabel: string; rowsLabel: string }) {
  const [q, setQ] = useState('')
  const [head, ...body] = rows
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return body
    return body.filter((r) => r.some((c) => c.toLowerCase().includes(s)))
  }, [q, body])

  if (!head) return null
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <input
          type="search"
          className="ffp-input max-w-xs"
          placeholder={searchLabel}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="ffp-muted text-sm">
          {shown.length} / {body.length} {rowsLabel}
        </span>
      </div>
      <div className="ffp-card max-h-[75vh] overflow-auto">
        <table className="ffp-table">
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r, i) => (
              <tr key={i}>
                {head.map((_, j) => (
                  <td key={j}>{r[j] ?? ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
