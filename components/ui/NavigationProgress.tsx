'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function NavigationProgress() {
  const pathname    = usePathname()
  const wrapRef     = useRef<HTMLDivElement>(null)
  const barRef      = useRef<HTMLDivElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)
  const prevPath    = useRef(pathname)
  const navigating  = useRef(false)

  // Intercept clicks on internal <a> tags (capture phase = fires before router)
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.target === '_blank' ||
        (href.startsWith('http') && !href.startsWith(window.location.origin))
      ) return

      // Same-page navigation — skip
      const dest = href.split('?')[0].split('#')[0]
      if (dest === window.location.pathname || dest === '') return

      start()
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  // Complete when pathname actually changes
  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname
      if (navigating.current) complete()
    }
  }, [pathname])

  function start() {
    navigating.current = true
    const bar     = barRef.current
    const wrap    = wrapRef.current
    const overlay = overlayRef.current
    if (!bar || !wrap || !overlay) return

    // Show progress bar
    wrap.style.transition = ''
    wrap.style.opacity = '1'

    // Dim the page immediately — instant feedback before server responds
    overlay.style.transition = 'opacity 0.15s ease'
    overlay.style.opacity = '1'

    // Reset bar without transition, then slow-crawl to 75 %
    bar.style.transition = 'none'
    bar.style.width = '0%'
    bar.getBoundingClientRect() // force reflow
    bar.style.transition = 'width 9s cubic-bezier(0.04, 0.8, 0.08, 1)'
    bar.style.width = '75%'
  }

  function complete() {
    navigating.current = false
    const bar     = barRef.current
    const wrap    = wrapRef.current
    const overlay = overlayRef.current
    if (!bar || !wrap || !overlay) return

    // Reveal new page / skeleton from under the overlay
    overlay.style.transition = 'opacity 0.2s ease'
    overlay.style.opacity = '0'

    // Snap to current rendered position, then sprint to 100 %
    const renderedW = bar.getBoundingClientRect().width
    const pct = window.innerWidth > 0 ? (renderedW / window.innerWidth) * 100 : 75
    bar.style.transition = 'none'
    bar.style.width = `${pct}%`
    bar.getBoundingClientRect()
    bar.style.transition = 'width 0.18s linear'
    bar.style.width = '100%'

    // Fade out bar after sprint finishes, then reset
    setTimeout(() => {
      wrap.style.transition = 'opacity 0.2s ease'
      wrap.style.opacity = '0'
      setTimeout(() => {
        wrap.style.transition = ''
        bar.style.transition = 'none'
        bar.style.width = '0%'
      }, 220)
    }, 200)
  }

  return (
    <>
      {/* Page dim overlay — appears instantly on click, fades when skeleton/page arrives */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(8,2,35,0.6)',
          zIndex: 9998, pointerEvents: 'none', opacity: 0,
        }}
      />

      {/* Progress bar */}
      <div
        ref={wrapRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: 3, zIndex: 9999, pointerEvents: 'none', opacity: 0,
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%', width: '0%',
            background: '#00FFB6',
            boxShadow: '0 0 8px rgba(0,255,182,0.8), 0 0 22px rgba(0,255,182,0.4)',
            borderRadius: '0 2px 2px 0',
          }}
        />
      </div>
    </>
  )
}
