'use client'

import { useState } from 'react'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import { useClubData } from './ClubDataContext'
import Lightbox from './Lightbox'
import type { IconName } from '@/components/ui/Icon'
import type { Feature } from '@/lib/clubs/types'

export default function Features() {
  const { CLUB, FEATURES } = useClubData()
  const [open, setOpen] = useState<{ f: Feature; i: number } | null>(null)

  return (
    <section id="features" className="ff-section" data-screen-label="06 · ОСОБЕННОСТИ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-section-head">
            <span className="ff-tag">{CLUB.FEATURES_TAG}</span>
            <h2 className="ff-section-head__title">{CLUB.FEATURES_TITLE}</h2>
            <p className="ff-section-head__sub">{CLUB.FEATURES_SUB}</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="cl-bento">
            {FEATURES.map(f => {
              const hasPhotos = !!f.photos?.length
              const cls   = ['cl-bento__cell', `cl-bento__cell--${f.size}`, f.image && 'cl-bento__cell--media', hasPhotos && 'cl-bento__cell--clickable'].filter(Boolean).join(' ')
              const style = f.image ? { '--bg': `url(${f.image})` } as React.CSSProperties : {}
              const content = (
                <>
                  {f.tag  && <span className="cl-bento__tag">★ {f.tag}</span>}
                  {f.icon && <span className="cl-bento__icon"><Icon name={f.icon as IconName} size={22} /></span>}
                  <h3 className="cl-bento__name">{f.name}</h3>
                  <p className="cl-bento__desc">{f.desc}</p>
                  {f.note && <p className="cl-bento__note">{f.note}</p>}
                  {hasPhotos && (
                    <span className="cl-bento__more">
                      {f.photosLabel ?? 'СМОТРЕТЬ ФОТО'}
                      {f.photos!.length > 1 && <em> · {f.photos!.length}</em>} →
                    </span>
                  )}
                </>
              )
              return hasPhotos ? (
                <button key={f.id} type="button" className={cls} style={style}
                        onClick={() => setOpen({ f, i: 0 })}>
                  {content}
                </button>
              ) : (
                <div key={f.id} className={cls} style={style}>{content}</div>
              )
            })}
            <div className="cl-bento__cell cl-bento__cell--deco">
              <span className="cl-bento__hash">// 01 / 08</span>
              <h3 className="cl-bento__name" style={{ fontSize: 18 }}>ОДИН ИЗ ВОСЬМИ КЛУБОВ FF</h3>
              <p className="cl-bento__desc">
                Сеть с 2022 — топовое железо, единые стандарты, программа лояльности действует во всех клубах.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {open && (
        <Lightbox photos={open.f.photos!} index={open.i} alt={`${CLUB.NAME} — ${open.f.name.toLowerCase()}`}
                  onIndex={i => setOpen({ f: open.f, i })} onClose={() => setOpen(null)} />
      )}
    </section>
  )
}
