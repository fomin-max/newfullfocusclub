'use client'

import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

export default function FranchiseHero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="ff-hero" id="hero">
      <video
        className="ff-hero__video"
        autoPlay muted loop playsInline preload="auto"
        poster="/assets/club-background.jpg"
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="ff-hero__overlay" />
      <div className="ff-hero__mesh" />
      <div className="ff-hero__scan" />

      <div className="ff-hero__inner">
        <div className="ff-hero__left">
          <Reveal>
            <span className="ff-tag">Франшиза · Full Focus</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="ff-hero__title">
              <span className="accent">ОТКРОЙ КЛУБ</span><br />
              НОВОГО ПОКОЛЕНИЯ
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="ff-hero__sub">
              Высокотехнологичная сеть Full Focus —&nbsp;готовая
              бизнес-модель, собственная IT-система и&nbsp;реальная
              поддержка на&nbsp;каждом шаге.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="ff-hero__ctas">
              <a href="#contacts" className="ff-btn ff-btn--primary ff-btn--lg is-pulse">
                ПОЛУЧИТЬ ПРЕЗЕНТАЦИЮ
              </a>
              <button
                className="ff-btn ff-btn--secondary ff-btn--lg"
                onClick={() => scrollTo('formats')}
              >
                СМОТРЕТЬ КЛУБЫ <Icon name="arrowDown" size={14} />
              </button>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div className="ff-hero__strip">
              <span>7 клубов</span>
              <span>Санкт-Петербург &amp; Махачкала</span>
              <span>С 2022 года</span>
              <span>Собственная IT-экосистема</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
