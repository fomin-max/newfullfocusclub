# Changelog

## Формат
```
### Added     — новые страницы и функции
### Changed   — изменения существующего
### Fixed     — исправления багов
### Optimized — оптимизации производительности
### SEO       — SEO правки
```

---

## [0.2.0] — 2026-05-30

### Added — Все 8 страниц клубов (Фаза 3)

**Архитектура клубных страниц:**
- `lib/clubs/types.ts` — единый тип `ClubData` (ClubMeta, ClubZone, Tariffs, Hardware, Feature, FloorPlan, Review, FAQItem, EventItem, MapConfig)
- `lib/clubs/schema.ts` — `buildClubSchema()` (Schema.org @graph) + `buildClubMetadata()` (Next.js Metadata) — один раз для всех клубов
- `lib/clubs/shared.ts` — `ALL_CLUBS` (список всех 8 клубов сети)
- `components/clubs/ClubDataContext.tsx` — `ClubDataProvider` + `useClubData()` hook
- `components/clubs/BookingContext.tsx` — `BookingProvider` + `useBooking()` hook
- `app/clubs/club.css` — CSS клубных страниц (из handoff) + FAQ-стили
- `app/clubs/layout.tsx` — layout для `/clubs/*`

**13 shared компонентов** (`components/clubs/`):
- `ClubNavbar.tsx` — навбар + хлебные крошки, scroll-tracking
- `ClubHero.tsx` — hero split-layout, cursor glow, FACTS из данных клуба
- `LiveMap.tsx` — схема мест с фильтрами (mock, Langame API подключим позже)
- `ClubZones.tsx` — горизонтальный scroll-hijack (десктоп) + games accordion
- `Hardware.tsx` — железо по вкладкам
- `Tariffs.tsx` — таблица тарифов будни/выходные с flip-анимацией, `bestNote`
- `Features.tsx` — bento-сетка с заголовками из данных клуба
- `ClubEvents.tsx` — карточки мероприятий из данных клуба
- `ClubReviews.tsx` — двойной marquee отзывов
- `MapContact.tsx` — SVG-карта из данных клуба + контакты + другие клубы сети
- `ClubFAQ.tsx` — accordion FAQ (AEO-секция)
- `Booking.tsx` — 3-шаговый modal + sticky CTA (без Telegram пока)
- `components/ui/Icon.tsx` — добавлены 16 новых иконок для клубных страниц

**8 страниц клубов** (каждая = `lib/clubs/[slug].ts` + `app/clubs/[slug]/page.tsx`):
- `/clubs/vasilyeostrovsky` — флагман, 7 зон, ARENA 5×5, кухня, бильярд, покер, Yamaguchi
- `/clubs/elektrosila` — 5 зон, GREEN/SPACE ROOM PS5 с играми, MAX ZONE
- `/clubs/komendantsky` — 5 зон, PRO 15 мест (крупнейший), PS5 + VIP
- `/clubs/prosvescheniya` — 7 зон, самые доступные цены, PS4 Pro (уникально в сети)
- `/clubs/begovaya` — 6 зон, 4× TRIO ROOM, ночь 12ч, утро с 08:00
- `/clubs/sadovaya` — 5 зон, центр СПб, рядом с Невским
- `/clubs/tekhnologichesky` — 4 зоны, студенческий район, рядом с вузами
- `/clubs/makhachkala` — 7 зон, единственный вне СПб, QUADRO ROOM (уникален в сети)

### SEO — Schema.org на каждой странице клуба

Каждый клуб генерирует полный `@graph` через `buildClubSchema()`:
- `GameStore + LocalBusiness` (адрес, телефон, GeoCoordinates, priceRange, amenityFeature)
- `OpeningHoursSpecification` (Mo-Su 00:00-23:59)
- `AggregateRating` (ratingValue: 5.0, reviewCount)
- `BreadcrumbList` (главная → клубы → клуб)
- `FAQPage` — 8 уникальных AEO-вопросов на каждый клуб

`buildClubMetadata()` генерирует `metadata` для Next.js с title, description, canonical, OG.

### Added — Данные клубов из контент-базы

Полные данные для всех 8 клубов:
- Уникальные зоны и тарифы (будни/выходные; Беговая — 6ч/12ч пакеты; Махачкала — единый тариф)
- Уникальные железо-вкладки по зонам
- Уникальные FEATURES bento: у каждого клуба свои особенности
- Уникальные EVENTS (например, на Василеостровской — "ТОЛЬКО ЗДЕСЬ" у ARENA)
- SVG-карта (MAP config) с улицами для каждого района
- 6–8 отзывов на клуб
- 8 AEO-FAQ на клуб с SEO-ключами из контент-базы

---

## [0.1.0] — 2026-05-29

### Added — Главная страница (Фаза 2)

- Реализована главная страница (`app/page.tsx`) — полный перенос дизайна из Claude Design
- Подключены шрифты: Grandis Extended + Magistral через `next/font/local`, Audiowide через Google Fonts
- Orbitron заменён на Magistral во всех font-stack CSS-переменных
- Скопированы ассеты из handoff в `public/assets/` и `public/fonts/`
- Реализованы UI-примитивы: `Icon`, `Card`, `Reveal`, `Header`, `Footer`, `Ticker`, `ProgressBar`, `MobileStickyBar`
- Реализованы хуки в `lib/hooks.ts`: `useScramble`, `useCountUp`, `useCountFromTo`, `useTilt`, `useReveal`, `useScrolled`, `useActiveSection`, `useCardGlow`
- Реализованы все секции главной: Hero, FindClub (SVG-карта), SocialStats, HowItWorks, Zones, Promos, Loyalty, Tournament, Reviews, FranchiseSection, FFPay, EventsBanner, FAQ
- Schema.org: Organization + WebSite + FAQPage
- Дизайн-система (`ff-*` токены) в `app/globals.css`
- Создан мастер-документ `/docs/PROJECT.md`, SEO-стратегия `/docs/SEO.md`, роадмап `/docs/ROADMAP.md`

### Added — Инфраструктура (Фаза 1)

- Инициализирован проект: Next.js 15 + TypeScript + Tailwind CSS + App Router
- Настроен стек деплоя: Timeweb VPS + Nginx + PM2 + swap 2GB
- Настроена система памяти (memory-файлы для Claude)

---

## Статус сборки

| Версия | Страниц | First Load JS | Ошибок |
|--------|---------|--------------|--------|
| 0.2.0  | 13 (1 главная + 8 клубов + 3 служебных) | 136 kB | 0 |
| 0.1.0  | 3 (1 главная + 2 служебных) | 132 kB | 0 |
