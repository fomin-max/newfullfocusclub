'use client'

import { useEffect, useRef } from 'react'

const SESSION_KEY = 'ff_loader_seen'
const MSG = 'FULL_FOCUS://LOADING...'
const TYPE_INTERVAL = 55   // ms per character
const GLITCH_DURATION = 560
const SEAM_DELAY = 180
const SHUTTER_DURATION = 950
const FADE_OUT = 360
const MAX_WAIT_MS = 6000   // safety: open shutters no later than this after glitch starts

export default function PageLoader() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loader = ref.current
    if (!loader) return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let seen = false
    try { seen = sessionStorage.getItem(SESSION_KEY) === '1' } catch {}

    if (reduce || seen) {
      loader.style.display = 'none'
      return
    }

    document.body.style.overflow = 'hidden'
    try { sessionStorage.setItem(SESSION_KEY, '1') } catch {}

    const termEl   = loader.querySelector<HTMLElement>('.ff-term')!
    const termText = loader.querySelector<HTMLElement>('#ff-term-text')!
    const seam     = loader.querySelector<HTMLElement>('.ff-seam')!

    // Resolves when all page resources are loaded
    const windowLoaded = new Promise<void>(resolve => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', () => resolve(), { once: true })
    })

    let safetyTimer: ReturnType<typeof setTimeout>
    let i = 0

    function reveal() {
      loader!.classList.add('is-done')
      setTimeout(() => {
        loader!.style.display = 'none'
        document.body.style.overflow = ''
      }, FADE_OUT)
    }

    function powerOn() {
      clearTimeout(safetyTimer)
      termEl.classList.remove('is-glitch')
      termEl.classList.add('is-hidden')
      seam.classList.add('is-on')
      setTimeout(() => loader!.classList.add('is-open'), SEAM_DELAY)
      setTimeout(reveal, SEAM_DELAY + SHUTTER_DURATION)
    }

    function glitchPhase() {
      termEl.classList.add('is-glitch')
      // open shutters once window is loaded, but cap the wait
      safetyTimer = setTimeout(powerOn, MAX_WAIT_MS)
      windowLoaded.then(powerOn)
    }

    function type() {
      if (i <= MSG.length) {
        termText.textContent = MSG.slice(0, i)
        i++
        setTimeout(type, TYPE_INTERVAL)
      } else {
        setTimeout(glitchPhase, 350)
      }
    }

    setTimeout(type, 280)
  }, [])

  return (
    <div ref={ref} id="ff-loader" role="status" aria-label="Загрузка">
      <div className="ff-shutter top"    aria-hidden="true" />
      <div className="ff-shutter bottom" aria-hidden="true" />
      <div className="ff-seam"          aria-hidden="true" />
      <div className="ff-term">
        <span id="ff-term-text" />
        <span className="ff-caret" aria-hidden="true" />
      </div>
      <div className="ff-scanlines" aria-hidden="true" />
    </div>
  )
}
