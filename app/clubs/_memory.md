# Страницы клубов — память

## Статус по клубам (обновлено 2026-10-12)

Все 8 клубов сети имеют полные страницы: Василеостровская, Электросила, Комендантский, Просвещения, Садовая, Технологический, Махачкала, **Шушары** (открыт 2026-10-11).

### Шушары (`shushary`)
- Вилеровский пер., 6, ЖК «Юнион», пос. Шушары. Метро нет → `HAS_METRO: false`, `LOCATION: 'в посёлке Шушары'`, в пилюле метро — «ЖК «Юнион»».
- Langame `ff52shush` (тарифы live). Live-схема мест пустая, пока клуб не заведён в fullfocushub (`asset_clubs` + `pc_positions`).
- Фото: hero (ресепшен) + галерея 6 шт. — свои, в `public/clubs/shushary/`. В карточках зон пока плейсхолдеры Махачкалы/Комендантского (`TODO(shushary)`). Отзывы скрыты (реальных нет — не придумывать).
- Склонение мест — `seatsLabel`/`placesWord` в `lib/utils.ts`.
- TG брони: `-1004363249801`, аккаунт `@FullFocusShushary`.

### Клубы без метро
`ClubMeta.HAS_METRO: false` + `CITY` (по умолчанию СПб) + `LOCATION` («в посёлке Шушары», «в центре Махачкалы») — используются в `schema.ts` для FAQ/title/description/addressLocality.

## Архитектура (✅ реализована)

```
lib/clubs/
  types.ts          ← ClubData, ClubMeta, ClubZone, Feature, FloorPlan, FAQItem, EventItem...
  schema.ts         ← buildClubSchema() + buildClubMetadata() — для всех клубов
  shared.ts         ← ALL_CLUBS (список всех 8 клубов сети)
  vasilyeostrovsky.ts ← CLUB_DATA: ClubData
  elektrosila.ts      ← CLUB_DATA: ClubData

components/clubs/   ← 13 shared компонентов, все читают из ClubDataContext
  ClubDataContext.tsx
  BookingContext.tsx
  ClubNavbar.tsx / ClubCrumbs → читают из useClubData()
  ClubHero.tsx       — CLUB.FACTS, CLUB.MEDIA_LABEL из данных
  LiveMap.tsx        — FLOOR из данных (заглушка, Langame подключим позже)
  ClubZones.tsx      — CLUB_ZONES + games-accordion
  Hardware.tsx       — HARDWARE из данных
  Tariffs.tsx        — TARIFFS из данных
  Features.tsx       — FEATURES + CLUB.FEATURES_TAG/TITLE/SUB из данных
  ClubEvents.tsx     — EVENTS из данных (уникальны для каждого клуба)
  ClubReviews.tsx    — REVIEWS из данных
  MapContact.tsx     — CLUB.MAP (roads/labels/pin/river) из данных
  ClubFAQ.tsx        — FAQ из данных (AEO-секция)
  Booking.tsx        — modal 3 шага + sticky CTA (заглушка, Telegram подключим позже)

app/clubs/
  club.css          ← CSS клубных страниц + FAQ стили
  layout.tsx        ← подключает club.css для всех /clubs/*
  vasilyeostrovsky/page.tsx ← 25 строк: import CLUB_DATA → providers
  elektrosila/page.tsx      ← 25 строк: import CLUB_DATA → providers
```

**Для нового клуба нужно создать только 2 файла:**
- `lib/clubs/[slug].ts` — данные (CLUB, ZONES, TARIFFS, HARDWARE, FEATURES, FLOOR, REVIEWS, FAQ, EVENTS, MAP)
- `app/clubs/[slug]/page.tsx` — 25 строк (идентично elektrosila/page.tsx, только import другой)

## Schema.org (реализовано в buildClubSchema)

Каждая страница клуба генерирует `@graph` с:
- `GameStore + LocalBusiness` (адрес, телефон, GeoCoordinates, priceRange)
- `OpeningHoursSpecification` (Mo-Su 00:00-23:59)
- `AggregateRating` (ratingValue: 5.0, reviewCount) — только если `REVIEWS_COUNT_NUM > 0`
- `BreadcrumbList` (главная → клубы → клуб)
- `FAQPage` (8 AEO-вопросов, уникальных для каждого клуба)
- `amenityFeature` из FEATURES

## SEO metadata (buildClubMetadata)

Title: `Full Focus · [NAME] — [ADDRESS] · Круглосуточно`
Description: автогенерация из данных (метро, кол-во зон, мин. цена, режим, адрес)
Canonical: `/clubs/[slug]`
OG: title, description, url, locale ru_RU

## Интеграции (ждём от клиента)

- **Langame API** — подключить в LiveMap (polling 60s, сейчас mock-данные)
- **Telegram Bot** — подключить в Booking.tsx (сейчас submit → success без отправки)
- **Яндекс.Карты** — заменить SVG-схему в MapContact (сейчас декоративная)
- **Яндекс.Метрика** — подключить в layout.tsx

## TODO

- [x] Все 8 клубов созданы, `/clubs` агрегатор готов
- [ ] Шушары: свои фото, oid Яндекс-карточки (кнопка отзывов), клуб в fullfocushub
- [ ] Подключить Langame API в LiveMap
- [ ] Подключить Telegram Bot webhook в Booking
- [ ] Подключить Яндекс.Карты API ключ в MapContact
- [ ] Проверить мобайл 375px на страницах клубов
- [ ] Проверить PageSpeed (цель: 90+ mobile)
- [ ] Добавить `sitemap.xml` — клубы с priority 0.9
