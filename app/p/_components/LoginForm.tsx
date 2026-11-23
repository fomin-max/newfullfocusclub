'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Dict } from '@/lib/portal/i18n'

export default function LoginForm({ role, t, title }: { role: 'view' | 'admin'; t: Dict; title: string }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/p/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, password }),
      })
      if (res.ok) {
        router.refresh()
        return
      }
      setError(res.status === 429 ? t.tooMany : t.wrongPassword)
    } catch {
      setError(t.wrongPassword)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="ffp-wrap flex min-h-screen items-center justify-center py-10">
      <form onSubmit={submit} className="ffp-card w-full max-w-sm p-6">
        <div className="ffp-head mb-1 text-xs tracking-[0.2em] text-[var(--ff-neon-bloom)]">FULL FOCUS</div>
        <h1 className="mb-2 text-xl font-bold">{title}</h1>
        {role === 'view' && <p className="ffp-muted mb-4 text-sm">{t.loginHint}</p>}
        <label className="mb-1 block text-sm" htmlFor="ffp-pw">
          {t.password}
        </label>
        <input
          id="ffp-pw"
          type="password"
          autoComplete="current-password"
          className="ffp-input mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
        />
        {error && <p className="mb-3 text-sm text-[var(--ff-danger)]">{error}</p>}
        <button type="submit" className="ffp-btn ffp-btn-primary w-full justify-center" disabled={busy || !password}>
          {t.enter}
        </button>
      </form>
    </div>
  )
}
