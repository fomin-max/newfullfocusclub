'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import { useClubData } from './ClubDataContext'
const scrollToLive = () =>
  document.getElementById('live')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
import type { IconName } from '@/components/ui/Icon'

export default function ClubHero() {
  const { CLUB, CLUB_ZONES } = useClubData()

  const topGpu = CLUB_ZONES
    .map(z => { const m = z.specShort.match(/RTX (\d+)/); return m ? parseInt(m[1]) : 0 })
    .reduce((a, b) => Math.max(a, b), 0)
  const mediaStat = `● ${CLUB_ZONES.length + (CLUB.ZONES_EXTRA ?? 0)} ЗОН · RTX ${topGpu}`
  const mediaRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = mediaRef.current
    if (!el || window.innerWidth < 1024) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const isDesktop = window.innerWidth >= 1024
    // Desktop без горизонтального видео — только постер
    if (isDesktop && !CLUB.VIDEO_URL_DESKTOP) return
    const id = requestAnimationFrame(() => {
      video.load()
      video.play().catch(() => {})
    })
    return () => cancelAnimationFrame(id)
  }, [CLUB.VIDEO_URL_DESKTOP])

  return (
    <section id="hero" className="cl-hero" data-screen-label="01 · HERO">
      <div className="cl-hero__media" ref={mediaRef}>
        {/* Poster as prioritized Image — preloaded by Next.js for fast LCP */}
        <Image
          src={CLUB.POSTER_URL}
          alt={`${CLUB.NAME} — интерьер компьютерного клуба Full Focus`}
          fill
          priority
          sizes="60vw"
          className="cl-hero__poster"
        />
        <video ref={videoRef} className="cl-hero__video" muted loop playsInline preload="none"
               {...(CLUB.VIDEO_URL_DESKTOP ? { 'data-has-desktop': '' } : {})}>
          {CLUB.VIDEO_URL_DESKTOP ? (<>
            <source media="(min-width: 1024px)" src={CLUB.VIDEO_URL_DESKTOP.replace(/\.mp4$/, '.webm')} type="video/webm" />
            <source media="(min-width: 1024px)" src={CLUB.VIDEO_URL_DESKTOP} type="video/mp4" />
          </>) : null}
          <source src={CLUB.VIDEO_URL.replace(/\.mp4$/, '.webm')} type="video/webm" />
          <source src={CLUB.VIDEO_URL} type="video/mp4" />
        </video>
        <span className="cl-hero__cursor" />
        <div className="cl-hero__media-coord">{mediaStat}</div>
        <div className="cl-hero__media-meta">
          <span>{CLUB.MEDIA_LABEL}</span>
          <span><strong>● LIVE</strong> · Санкт-Петербург</span>
        </div>
      </div>

      <div className="cl-hero__panel">
        <Reveal>
          <span className="cl-hero__badge">{CLUB.NAME.toUpperCase()}</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="cl-hero__title">
            FULL FOCUS
            <span className="accent">{CLUB.NAME}</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <div className="cl-hero__meta">
            <div className="cl-meta-row">
              <span className="cl-metro-pill" style={{ '--metro-color': CLUB.METRO_COLOR } as React.CSSProperties}>
                {CLUB.HAS_METRO !== false && <span className="cl-metro-pill__dot">М</span>}
                <strong>{CLUB.METRO}</strong>
              </span>
              <span>{CLUB.METRO_TIME}</span>
            </div>
            <div className="cl-meta-row">
              <span className="cl-icon-cell"><Icon name="pin" size={18} /></span>
              <span><strong>{CLUB.ADDRESS}</strong></span>
            </div>
            <div className="cl-meta-row">
              <span className="cl-icon-cell"><Icon name="clock" size={18} /></span>
              <span><span className="cl-status-dot" />{CLUB.HOURS}</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={220}>
          <div className="cl-hero__ctas">
            <button className="ff-btn ff-btn--primary is-pulse" onClick={scrollToLive}>
              ЗАБРОНИРОВАТЬ <Icon name="arrowRight" size={14} />
            </button>
            <button className="ff-btn ff-btn--secondary"
                    onClick={() => document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              СМОТРЕТЬ ЗОНЫ <Icon name="arrowDown" size={14} />
            </button>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="cl-hero__facts">
            {CLUB.FACTS.map((f, i) => (
              <div className="cl-fact" key={i}>
                <span className="cl-fact__icon"><Icon name={f.icon as IconName} size={18} /></span>
                <span className="cl-fact__val">{f.val}</span>
                <span className="cl-fact__lbl">{f.lbl}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
