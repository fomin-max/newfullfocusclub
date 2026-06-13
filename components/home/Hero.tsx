'use client'

import { useScramble } from '@/lib/hooks'
import Icon from '@/components/ui/Icon'

export default function Hero() {
  const line1  = useScramble('ТВОЯ ИГРА')
  const line2a = useScramble('НАЧИНАЕТСЯ')
  const line2b = useScramble(' ЗДЕСЬ')

  return (
    <section id="hero" className="ff-hero">
      <video
        className="ff-hero__video"
        src="/assets/hero-video.mp4"
        autoPlay muted loop playsInline
        poster="/assets/club-interior.jpg"
        preload="none"
      />
      <div className="ff-hero__overlay" />
      <div className="ff-hero__mesh" />
      <div className="ff-hero__noise" />
      <div className="ff-hero__scan" />
      <div className="ff-hero__hash" aria-hidden="true">////&nbsp;&nbsp;FULL FOCUS&nbsp;&nbsp;//&nbsp;&nbsp;SPB&nbsp;&nbsp;//&nbsp;&nbsp;MKH&nbsp;&nbsp;//&nbsp;&nbsp;2026</div>

      <div className="ff-hero__inner">
        <div className="ff-hero__top">
          <span className="ff-tag">Сеть киберспортивных клубов</span>

          <h1 className="ff-hero__title" aria-label="Твоя игра начинается здесь">
            <span className="line">{line1}</span>
            <span className="line">
              <span className="accent">{line2a}</span>{line2b}
            </span>
          </h1>

          <p className="ff-hero__sub">
            7 клубов нового поколения — топовое железо, атмосфера и технологии,
            которые работают на тебя. Круглосуточно, в&nbsp;шаге от метро.
          </p>

          <div className="ff-hero__ctas">
            <a href="#find" className="ff-btn ff-btn--primary ff-btn--lg is-pulse">
              Найти ближайший клуб <Icon name="arrowRight" size={16} />
            </a>
            <a href="#promos" className="ff-btn ff-btn--secondary ff-btn--lg">
              <Icon name="gift" size={16} /> Получить 500₽
            </a>
          </div>
        </div>

        <div className="ff-hero__strip" role="list">
          <span><strong>7</strong> клубов</span>
          <span>С <strong>2022</strong> года</span>
          <span>от <strong>120₽</strong>/час</span>
          <span><strong>3000+</strong> отзывов</span>
          <span className="ff-hero__star"><strong>★ 5.0</strong></span>
        </div>
      </div>
    </section>
  )
}
