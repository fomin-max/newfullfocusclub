'use client'

import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import { useClubData } from './ClubDataContext'
import type { IconName } from '@/components/ui/Icon'

export default function Features() {
  const { CLUB, FEATURES } = useClubData()
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
              const cls   = ['cl-bento__cell', `cl-bento__cell--${f.size}`, f.image && 'cl-bento__cell--media'].filter(Boolean).join(' ')
              const style = f.image ? { '--bg': `url(${f.image})` } as React.CSSProperties : {}
              return (
                <div key={f.id} className={cls} style={style}>
                  {f.tag  && <span className="cl-bento__tag">★ {f.tag}</span>}
                  {f.icon && <span className="cl-bento__icon"><Icon name={f.icon as IconName} size={22} /></span>}
                  <h3 className="cl-bento__name">{f.name}</h3>
                  <p className="cl-bento__desc">{f.desc}</p>
                  {f.note && <p className="cl-bento__note">{f.note}</p>}
                </div>
              )
            })}
            <div className="cl-bento__cell cl-bento__cell--deco">
              <span className="cl-bento__hash">// 01 / 07</span>
              <h3 className="cl-bento__name" style={{ fontSize: 18 }}>ОДИН ИЗ СЕМИ КЛУБОВ FF</h3>
              <p className="cl-bento__desc">
                Сеть с 2022 — топовое железо, единые стандарты, программа лояльности действует во всех клубах.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
