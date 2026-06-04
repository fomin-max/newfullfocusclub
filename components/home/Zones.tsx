'use client'

import { useState, useCallback, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'

const ZONES = [
  {
    slug: 'pro', name: 'PRO ZONE', icon: 'cpu' as const,
    desc: 'Соло-игра на топовом железе RTX 4080+. Стандарт сети.',
    long: 'Базовый стандарт сети — мощные ПК для соло-игры на максималках. Стабильные 240 Гц, быстрый отклик, ничего лишнего.',
    seats: 'Одиночное место', gear: 'RTX 4080 · 240 Гц · механика',
    tags: ['Соло', 'Рейтинг', 'Стандарт сети'],
  },
  {
    slug: 'max', name: 'MAX ZONE', icon: 'bolt' as const,
    desc: 'Улучшенные ПК и премиум-периферия для требовательных гостей.',
    long: 'Топовая конфигурация для тех, кто хочет максимум. RTX 4090, мониторы 360 Гц и премиум-периферия — преимущество в каждом кадре.',
    seats: 'Одиночное место', gear: 'RTX 4090 · 360 Гц · премиум-периферия',
    tags: ['Соло', 'Хайенд', 'Стрим'],
  },
  {
    slug: 'bootcamp', name: 'BOOTCAMP', icon: 'users' as const,
    desc: 'Командная зона на 5+ мест — тренировки, турниры, скримы.',
    long: 'Зона для команд: общий стол, голосовая связь, всё для скримов и тренировок. Идеально под подготовку к турнирам.',
    seats: '5+ мест', gear: 'Командная зона · общий стол · голосовая',
    tags: ['Команда', 'Тренировки', 'Скримы'],
  },
  {
    slug: 'duo', name: 'DUO ROOM', icon: 'userPair' as const,
    desc: 'Приватная комната на двоих. Тишина и собственный свет.',
    long: 'Отдельная комната на двоих со своим освещением и звукоизоляцией. Никто не мешает — только вы и игра.',
    seats: '2 места', gear: 'Приватная комната · свой свет',
    tags: ['Вдвоём', 'Приват', 'Тишина'],
  },
  {
    slug: 'trio', name: 'TRIO ROOM', icon: 'users' as const,
    desc: 'Приватная комната на троих. Идеально для стрима.',
    long: 'Приватная комната на троих с готовым стрим-сетапом. Собирайте пати, стримьте и играйте без отвлечений.',
    seats: '3 места', gear: 'Приватная комната · стрим-сетап',
    tags: ['Втроём', 'Приват', 'Стрим'],
  },
  {
    slug: 'solo', name: 'SOLO ROOM', icon: 'user' as const,
    desc: 'Полностью приватная комната для одного. Глубокая концентрация.',
    long: 'Полностью изолированная капсула для одного. Максимальная концентрация — ничего не отвлекает от игры.',
    seats: '1 место', gear: 'Приватная капсула · полная изоляция',
    tags: ['Соло', 'Приват', 'Фокус'],
  },
  {
    slug: 'lounge', name: 'LOUNGE', icon: 'sofa' as const,
    desc: 'PS5-зона с диванами и большими экранами. Файтинги, кооп.',
    long: 'Уютная PS5-зона с диванами и большими экранами. Файтинги, кооп и вечеринки в компании — заходи и расслабляйся.',
    seats: 'Диваны · компания', gear: 'PS5 · большие экраны · кооп',
    tags: ['Компания', 'PS5', 'Чилл'],
  },
  {
    slug: 'arena', name: 'ARENA', icon: 'trophy' as const,
    desc: 'Большая командная зона на 10+ мест. Турниры и LAN-вечера.',
    long: 'Турнирный зал на 10+ мест со сценой и экранами. Здесь проходят LAN-вечера, турниры и крупные ивенты сети.',
    seats: '10+ мест', gear: 'Турнирный зал · сцена · экраны',
    tags: ['Турниры', 'LAN', 'Ивенты'],
    only: '· Только в клубе на Василеостровской',
  },
]

type Zone = typeof ZONES[0]

function ZoneModal({ zone, onClose }: { zone: Zone; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="ff-zmodal"
      role="dialog"
      aria-modal="true"
      aria-label={zone.name}
      onClick={onClose}
    >
      <div className="ff-zmodal__card" onClick={e => e.stopPropagation()}>
        <button className="ff-zmodal__close" onClick={onClose} aria-label="Закрыть">✕</button>

        <div className="ff-zmodal__head">
          <span className="ff-zmodal__icon"><Icon name={zone.icon} size={24} /></span>
          <div>
            <h3 className="ff-zmodal__name">{zone.name}</h3>
            <div className="ff-zmodal__seats">{zone.seats}</div>
          </div>
        </div>

        <p className="ff-zmodal__desc">{zone.long}</p>

        <div className="ff-zmodal__specs">
          <div className="ff-zmodal__spec">
            <span className="ff-zmodal__spec-k">Места</span>
            <span className="ff-zmodal__spec-v">{zone.seats}</span>
          </div>
          <div className="ff-zmodal__spec">
            <span className="ff-zmodal__spec-k">Оснащение</span>
            <span className="ff-zmodal__spec-v">{zone.gear}</span>
          </div>
        </div>

        <div className="ff-zmodal__tags">
          {zone.tags.map(t => <span key={t} className="ff-zmodal__tag">{t}</span>)}
        </div>

        {zone.only && <p className="ff-zmodal__only">{zone.only}</p>}

        <a href="#find" className="ff-btn ff-btn--primary is-pulse ff-zmodal__cta" onClick={onClose}>
          Забронировать <Icon name="arrowRight" size={14} />
        </a>
      </div>
    </div>
  )
}

export default function Zones() {
  const [openZone, setOpenZone] = useState<Zone | null>(null)
  const closeZone = useCallback(() => setOpenZone(null), [])

  return (
    <section id="zones" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Зоны и форматы</span>
          <h2 className="ff-section-head__title">Для любой компании</h2>
          <p className="ff-section-head__sub">
            Восемь форматов под любой сценарий — от одиночного гринда до командного турнира. Тарифы — на странице клуба.
          </p>
        </Reveal>

        <div className="ff-zones__grid">
          {ZONES.map((z, i) => (
            <Reveal key={z.name} delay={(i % 4) * 80}>
              <Card className="ff-zone" brackets>
                <span className="ff-zone__icon"><Icon name={z.icon} size={22} /></span>
                <h3 className="ff-zone__name">{z.name}</h3>
                <p className="ff-zone__desc">{z.desc}</p>
                {z.only && <p className="ff-zone__only">{z.only}</p>}
                <button className="ff-zone__more" onClick={() => setOpenZone(z)}>
                  Подробнее <Icon name="arrowRight" size={14} />
                </button>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {openZone && <ZoneModal zone={openZone} onClose={closeZone} />}
    </section>
  )
}
