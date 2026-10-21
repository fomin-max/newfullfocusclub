'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'

interface Props {
  photos: string[]
  index: number
  alt: string
  onIndex: (i: number) => void
  onClose: () => void
}

export default function Lightbox({ photos, index, alt, onIndex, onClose }: Props) {
  const touchStartX = useRef<number | null>(null)
  const many = photos.length > 1

  const prev = useCallback(() => onIndex((index - 1 + photos.length) % photos.length), [index, photos.length, onIndex])
  const next = useCallback(() => onIndex((index + 1) % photos.length), [index, photos.length, onIndex])

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !many) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
    touchStartX.current = null
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')             onClose()
      if (e.key === 'ArrowLeft'  && many) prev()
      if (e.key === 'ArrowRight' && many) next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose, prev, next, many])

  return (
    <div className="cl-lb" role="dialog" aria-modal="true"
         onClick={onClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button className="cl-lb__close" onClick={onClose} aria-label="Закрыть">×</button>
      {many && (
        <button className="cl-lb__arrow cl-lb__arrow--prev" aria-label="Предыдущее фото"
                onClick={e => { e.stopPropagation(); prev() }}>‹</button>
      )}
      <div className="cl-lb__img" onClick={e => e.stopPropagation()}>
        <Image src={photos[index]} alt={many ? `${alt} — фото ${index + 1}` : alt}
               fill sizes="100vw" style={{ objectFit: 'contain' }} priority />
      </div>
      {many && (
        <button className="cl-lb__arrow cl-lb__arrow--next" aria-label="Следующее фото"
                onClick={e => { e.stopPropagation(); next() }}>›</button>
      )}
      {many && <div className="cl-lb__counter">{index + 1} / {photos.length}</div>}
    </div>
  )
}
