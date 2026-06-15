'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Stale JS bundle after redeploy — hard reload fixes it
    if (error.message?.includes('Server Action') || error.message?.includes('older or newer deployment')) {
      window.location.reload()
      return
    }
    console.error(error)
  }, [error])

  return (
    <html lang="ru">
      <body style={{ background: '#080223', color: '#F2F2F7', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', margin: 0, textAlign: 'center' }}>
        <div>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Что-то пошло не так</p>
          <button onClick={reset} style={{ background: '#6632FA', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
            Попробовать снова
          </button>
        </div>
      </body>
    </html>
  )
}
