# Страницы клубов — память

## Статус по клубам

| Клуб | Страница | SEO/Schema | FAQ (AEO) | Данные | Интеграции |
|------|----------|-----------|-----------|--------|------------|
| Василеостровская | ✅ готова | ✅ полный @graph | ✅ 8 вопросов | ✅ все данные | ⏳ ждём токены |
| Электросила | ✅ готова | ✅ полный @graph | ✅ 8 вопросов | ✅ все данные | ⏳ ждём токены |
| Комендантский | ❌ не начат | ❌ | ❌ | ❌ нужны данные | ❌ |
| Просвещения | ❌ не начат | ❌ | ❌ | ❌ нужны данные | ❌ |
| Садовая | ❌ не начат | ❌ | ❌ | ❌ нужны данные | ❌ |
| Технологический | ❌ не начат | ❌ | ❌ | ❌ нужны данные | ❌ |
| Махачкала | ❌ не начат | ❌ | ❌ | ❌ нужны данные | ❌ |

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
- `AggregateRating` (ratingValue: 5.0, reviewCount)
- `BreadcrumbList` (главная → клубы → клуб)
- `FAQPage` (8 AEO-вопросов, уникальных для каждого клуба)
- `amenityFeature` из FEATURES

## SEO metadata (buildClubMetadata)

Title: `Full Focus · [NAME] — [ADDRESS] · Круглосуточно`
Description: автогенерация из данных (метро, кол-во зон, мин. цена, режим, адрес)
Canonical: `/clubs/[slug]`
OG: title, description, url, locale ru_RU

## Данные для ещё не созданных клубов

У нас нет данных (адреса уточнены в PROJECT.md, остальное нужно от клиента):
- Комендантский: Проспект Испытателей, 33
- Просвещения: Проспект Просвещения, 43
- Садовая: Улица Казанская, 33
- Технологический: 3-я Красноармейская, 10
- Махачкала: Улица Манташева, 107Б

Нужно получить: зоны, тарифы, железо, фичи, план этажа, отзывы, фото.

## Интеграции (ждём от клиента)

- **Langame API** — подключить в LiveMap (polling 60s, сейчас mock-данные)
- **Telegram Bot** — подключить в Booking.tsx (сейчас submit → success без отправки)
- **Яндекс.Карты** — заменить SVG-схему в MapContact (сейчас декоративная)
- **Яндекс.Метрика** — подключить в layout.tsx

## TODO

- [ ] Создать 5 оставшихся клубов (Комендантский, Просвещения, Садовая, Технологический, Махачкала)
- [ ] Создать `/clubs` — SEO-агрегатор всех клубов
- [ ] Получить данные клубов от клиента
- [ ] Подключить Langame API в LiveMap
- [ ] Подключить Telegram Bot webhook в Booking
- [ ] Подключить Яндекс.Карты API ключ в MapContact
- [ ] Проверить мобайл 375px на страницах клубов
- [ ] Проверить PageSpeed (цель: 90+ mobile)
- [ ] Добавить `sitemap.xml` — клубы с priority 0.9
