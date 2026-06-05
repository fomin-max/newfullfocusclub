'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Icon from '@/components/ui/Icon'

interface Props {
  label: string
  embedSrc: string
}

export default function ProofVideoButton({ label, embedSrc }: Props) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const modal = open && (
    <div className="ev-video-backdrop" onClick={() => setOpen(false)}>
      <div className="ev-video-modal" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="ev-video-modal__close"
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
        >
          ✕
        </button>
        <div className="ev-video-modal__frame">
          <iframe
            src={embedSrc}
            allow="clipboard-write; autoplay"
            allowFullScreen
            title="Видео"
          />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ev-proof__cta"
      >
        {label} <Icon name="arrowRight" size={13} />
      </button>

      {mounted && createPortal(modal, document.body)}
    </>
  )
}
