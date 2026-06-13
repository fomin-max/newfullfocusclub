'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'
import { useClubData } from './ClubDataContext'

function distributeColumns(ratios: (number | null)[], count: number): number[][] {
  const cols: number[][] = Array.from({ length: count }, () => [])
  const heights = new Array(count).fill(0)
  ratios.forEach((r, i) => {
    const shortest = heights.indexOf(Math.min(...heights))
    cols[shortest].push(i)
    heights[shortest] += r ?? 0.75
  })
  return cols
}

export default function ClubGallery() {
  const { CLUB } = useClubData()
  const photos = CLUB.GALLERY ?? []
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [ratios, setRatios] = useState<(number | null)[]>(() => photos.map(() => null))
  const [colCount, setColCount] = useState(3)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const update = () => setColCount(window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const onImgLoad = useCallback((i: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const r = img.naturalHeight / (img.naturalWidth || 1)
    setRatios(prev => { const next = [...prev]; next[i] = r; return next })
  }, [])

  const columns = useMemo(
    () => distributeColumns(ratios, colCount),
    [ratios, colCount]
  )

  const close = useCallback(() => setLightbox(null), [])
  const prev  = useCallback(() => setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null), [photos.length])
  const next  = useCallback(() => setLightbox(i => i !== null ? (i + 1) % photos.length : null), [photos.length])

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
    touchStartX.current = null
  }

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     close()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, close, prev, next])

  if (photos.length === 0) return null

  return (
    <>
      <section id="gallery" className="ff-section cl-gallery" data-screen-label="ГАЛЕРЕЯ">
        <div className="ff-section__inner">
          <Reveal>
            <div className="ff-section-head">
              <span className="ff-tag">фото клуба</span>
              <h2 className="ff-section-head__title">АТМОСФЕРА</h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="cl-gallery__cols" style={{ '--col-count': colCount } as React.CSSProperties}>
              {columns.map((col, ci) => (
                <div key={ci} className="cl-gallery__col">
                  {col.map(i => (
                    <button key={i} className="cl-gallery__item"
                            onClick={() => setLightbox(i)}
                            aria-label={`Фото ${i + 1} — ${CLUB.NAME}`}>
                      <Image
                        src={photos[i]}
                        alt={`${CLUB.NAME} — фото ${i + 1}`}
                        width={0} height={0}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        onLoad={e => onImgLoad(i, e)}
                      />
                      <span className="cl-gallery__overlay">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                          <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {lightbox !== null && (
        <div className="cl-lb" role="dialog" aria-modal="true"
             onClick={close} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button className="cl-lb__close" onClick={close} aria-label="Закрыть">×</button>
          <button className="cl-lb__arrow cl-lb__arrow--prev" aria-label="Предыдущее фото"
                  onClick={e => { e.stopPropagation(); prev() }}>‹</button>
          <div className="cl-lb__img" onClick={e => e.stopPropagation()}>
            <Image src={photos[lightbox]} alt={`${CLUB.NAME} — фото ${lightbox + 1}`}
                   fill sizes="100vw" style={{ objectFit: 'contain' }} priority />
          </div>
          <button className="cl-lb__arrow cl-lb__arrow--next" aria-label="Следующее фото"
                  onClick={e => { e.stopPropagation(); next() }}>›</button>
          <div className="cl-lb__counter">{lightbox + 1} / {photos.length}</div>
        </div>
      )}
    </>
  )
}
