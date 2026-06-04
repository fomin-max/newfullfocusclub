'use client'

import { useRef, useCallback } from 'react'
import { useScramble, useCountFromTo } from '@/lib/hooks'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const ADV = [
  { icon: 'bolt'  as const, title: 'Готовая модель', desc: 'Не надо изобретать с нуля' },
  { icon: 'cpu'   as const, title: 'IT-экосистема',  desc: 'Собственный софт и интеграции' },
  { icon: 'users' as const, title: 'Поддержка',      desc: 'Сопровождение на каждом этапе' },
]

export default function FranchiseSection() {
  const line1 = useScramble('ОТКРОЙ СВОЙ', { duration: 600, delay: 120 })
  const line2 = useScramble('FULL FOCUS',  { duration: 600, delay: 260 })
  const [clubs,  clubsRef]  = useCountFromTo(0, 8)
  const [money,  moneyRef]  = useCountFromTo(0, 7)
  const [months, monthsRef] = useCountFromTo(30, 18)

  const secRef = useRef<HTMLElement>(null)
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = secRef.current; if (!el) return
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])

  return (
    <section
      className="ff-fr"
      id="franchise"
      ref={secRef}
      onMouseMove={onMove}
    >
      <span className="ff-fr__glow" aria-hidden="true" />
      <div className="ff-fr__inner">
        <div className="ff-fr__left">
          <Reveal><span className="ff-fr__hash">//// ФРАНШИЗА</span></Reveal>
          <h2 className="ff-fr__title">
            <span className="ff-fr__title-cyr">{line1}</span>
            <span className="ff-fr__title-lat">{line2}</span>
          </h2>
          <Reveal delay={120}>
            <p className="ff-fr__sub">
              Готовая IT-экосистема, проверенная бизнес-модель и поддержка на каждом шаге.
              Клубы открываются — места ограничены.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="ff-fr__ctas">
              <a href="/franchise" className="ff-btn ff-btn--primary is-pulse">
                Условия франшизы <Icon name="arrowRight" size={14} />
              </a>
              <a href="/franchise#zayavka" className="ff-btn ff-btn--secondary ff-btn--on-purple">
                Оставить заявку
              </a>
            </div>
          </Reveal>
        </div>

        <div className="ff-fr__right">
          <div className="ff-fr__stats">
            <div className="ff-fr__stat" ref={clubsRef as React.RefObject<HTMLDivElement>}>
              <span className="ff-fr__num">{clubs}</span>
              <span className="ff-fr__num-label">клубов уже работают</span>
            </div>
            <div className="ff-fr__stat" ref={moneyRef as React.RefObject<HTMLDivElement>}>
              <span className="ff-fr__num">от {money} млн&nbsp;₽</span>
              <span className="ff-fr__num-label">инвестиции</span>
            </div>
            <div className="ff-fr__stat" ref={monthsRef as React.RefObject<HTMLDivElement>}>
              <span className="ff-fr__num">&lt; {months} мес</span>
              <span className="ff-fr__num-label">окупаемость</span>
            </div>
          </div>
          <div className="ff-fr__adv">
            {ADV.map((a, i) => (
              <Reveal key={a.title} delay={150 * i} className="ff-fr__adv-item">
                <span className="ff-fr__adv-icon"><Icon name={a.icon} size={22} /></span>
                <span className="ff-fr__adv-title">{a.title}</span>
                <span className="ff-fr__adv-desc">{a.desc}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
