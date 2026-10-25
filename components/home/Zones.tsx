'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { ALL_CLUBS } from '@/lib/clubs/shared'

// Фото зон из public/clubs/<slug>/zones/<file>
const ZONE_PHOTOS: Record<string, [slug: string, file: string][]> = {
  // Без Технологического (своих фото пока нет) и без файлов-дублей между клубами
  pro:      [['vasilyeostrovsky', 'pro.jpg'], ['elektrosila', 'pro.jpg'], ['komendantsky', 'pro.jpg'], ['prosvescheniya', 'pro.jpg'], ['sadovaya', 'pro.jpg']],
  max:      [['elektrosila', 'max.jpg'], ['komendantsky', 'max.jpg'], ['prosvescheniya', 'max.jpg'], ['sadovaya', 'max.jpg']],
  bootcamp: [['vasilyeostrovsky', 'bootcamp.jpg'], ['komendantsky', 'bootcamp.jpg'], ['makhachkala', 'bootcamp.jpg'], ['prosvescheniya', 'bootcamp.jpg']],
  rooms:    [['makhachkala', 'quadro.jpg'], ['makhachkala', 'trio.jpg'], ['prosvescheniya', 'trio.jpg'], ['vasilyeostrovsky', 'duo.jpg'], ['elektrosila', 'duo.jpg'], ['makhachkala', 'duo.jpg'], ['vasilyeostrovsky', 'solo.jpg'], ['makhachkala', 'solo.jpg'], ['prosvescheniya', 'solo.jpg']],
  lounge:   [['vasilyeostrovsky', 'ps5.jpg'], ['komendantsky', 'ps5.jpg'], ['prosvescheniya', 'ps5.jpg']],
  arena:    [['vasilyeostrovsky', 'arena.jpg']],
}

const clubName = (slug: string) => ALL_CLUBS.find(c => c.slug === slug)?.name ?? slug

const ZONES = [
  {
    slug: 'pro', name: 'PRO ZONE', icon: 'cpu' as const,
    desc: 'Открытый зал на большое количество ПК. Мониторы от 280 Гц и беспроводные мышки.',
    long: 'Основной зал клуба — опен спейс на большое количество ПК. Железо зависит от клуба, но везде беспроводные мышки ATK A9 Ultimate и мониторы от 280 Гц.',
    seats: 'Общий зал', gear: 'Мониторы от 280 Гц · ATK A9 Ultimate',
    tags: ['Опен спейс', 'С друзьями', '280+ Гц'],
  },
  {
    slug: 'max', name: 'MAX ZONE', icon: 'bolt' as const,
    desc: 'Полуприватная зона на несколько ПК. Отдельно от общего зала, мониторы от 300 Гц.',
    long: 'Полуприватная зона: отдельное пространство без двери на небольшое количество ПК, в стороне от общего зала. Мышки ATK A9 Ultimate и мониторы от 300 Гц.',
    seats: 'Несколько ПК · без двери', gear: 'Мониторы от 300 Гц · ATK A9 Ultimate',
    tags: ['Полуприват', 'Компания', '300+ Гц'],
  },
  {
    slug: 'bootcamp', name: 'BOOTCAMP', icon: 'users' as const,
    desc: 'Отдельная комната с дверью строго на 5 ПК. Для команды и скримов.',
    long: 'Полноценная отдельная комната с дверью ровно на 5 ПК — под полный состав. Беспроводные мышки ATK A9 Ultimate или Logitech G Pro X Superlight 2, мониторы от 300 Гц.',
    seats: '5 мест · комната с дверью', gear: 'От 300 Гц · ATK A9 Ultimate / Superlight 2',
    tags: ['Команда', 'Скримы', '5 мест'],
  },
  {
    slug: 'rooms', name: 'VIP ROOMS', icon: 'userPair' as const,
    desc: 'Отдельные комнаты на 1–4 человека: SOLO, DUO, TRIO, QUADRO. Лучшее железо в клубе.',
    long: 'Отдельные VIP-комнаты для компании от 1 до 4 человек: SOLO, DUO, TRIO и QUADRO. Обычно здесь лучшее железо клуба — RTX 4070, 5070 или 5070 Ti, мониторы до 500 Гц, в некоторых клубах OLED. Беспроводные наушники и Logitech G Pro X Superlight 2.',
    seats: 'От 1 до 4 человек', gear: 'RTX 4070 / 5070 / 5070 Ti · до 500 Гц · Superlight 2',
    tags: ['Приват', 'Топ-железо', 'OLED'],
  },
  {
    slug: 'arena', name: 'ARENA', icon: 'trophy' as const,
    desc: 'Киберспортивная арена 5×5 с проектором — как на настоящих турнирах.',
    long: 'Полноценная киберспортивная арена 5×5 с проектором, как на турнирах по киберспорту. Две команды друг напротив друга, мышки Logitech G Pro X Superlight 2.',
    seats: '5×5 · 10 мест', gear: 'Проектор · Superlight 2',
    tags: ['5×5', 'Турниры', 'Проектор'],
    only: '· Только в клубе на Василеостровской',
  },
  {
    slug: 'lounge', name: 'LOUNGE', icon: 'sofa' as const,
    desc: 'Лаунж с диваном, PS5 и TV 65″. Большая библиотека игр.',
    long: 'Лаунж-пространство с диваном, PlayStation 5 и телевизором 65″. Большая библиотека игр — для компании и спокойного вечера.',
    seats: 'Диван · компания', gear: 'PS5 · TV 65″ · библиотека игр',
    tags: ['PS5', 'Компания', 'Чилл'],
  },
]

type Zone = typeof ZONES[0]

function ZoneModal({ zone, onClose }: { zone: Zone; onClose: () => void }) {
  const photos = ZONE_PHOTOS[zone.slug] ?? []
  const [idx, setIdx] = useState(0)
  const step = useCallback((d: number) => {
    setIdx(i => (i + d + photos.length) % photos.length)
  }, [photos.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (photos.length > 1 && e.key === 'ArrowLeft') step(-1)
      else if (photos.length > 1 && e.key === 'ArrowRight') step(1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, step, photos.length])

  // Держим активную миниатюру по центру ленты (scrollTo, а не scrollIntoView — чтобы не дёргать вертикальный скролл модалки)
  const thumbsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const strip = thumbsRef.current
    const thumb = strip?.children[idx] as HTMLElement | undefined
    if (!strip || !thumb) return
    strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: 'smooth' })
  }, [idx])

  const current = photos[idx]

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

        {current && (
          <div className="ff-zmodal__gallery">
            <div className="ff-zmodal__photo">
              <Image
                key={current.join('/')}
                src={`/clubs/${current[0]}/zones/${current[1]}`}
                alt={`${zone.name} — ${clubName(current[0])}`}
                fill
                sizes="(max-width: 720px) 100vw, 640px"
                style={{ objectFit: 'cover' }}
              />
              <span className="ff-zmodal__photo-club">{clubName(current[0])}</span>
              {photos.length > 1 && (
                <>
                  <button className="ff-zmodal__nav ff-zmodal__nav--prev" onClick={() => step(-1)} aria-label="Предыдущее фото">
                    <Icon name="arrowRight" size={16} />
                  </button>
                  <button className="ff-zmodal__nav ff-zmodal__nav--next" onClick={() => step(1)} aria-label="Следующее фото">
                    <Icon name="arrowRight" size={16} />
                  </button>
                </>
              )}
            </div>
            {photos.length > 1 && (
              <div className="ff-zmodal__thumbs" ref={thumbsRef}>
                {photos.map(([slug, file], i) => (
                  <button
                    key={slug + file}
                    className={`ff-zmodal__thumb${i === idx ? ' is-active' : ''}`}
                    onClick={() => setIdx(i)}
                    aria-label={clubName(slug)}
                  >
                    <Image src={`/clubs/${slug}/zones/${file}`} alt="" fill sizes="96px" style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

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
            <span className="ff-zmodal__spec-k">Формат</span>
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
            Шесть форматов под любой сценарий — от одиночной игры до турнира 5×5. Набор зон и железо зависят от клуба, тарифы — на странице клуба.
          </p>
        </Reveal>

        <div className="ff-zones__grid">
          {ZONES.map((z, i) => (
            <Reveal key={z.name} delay={(i % 3) * 80}>
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
