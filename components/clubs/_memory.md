# Компоненты клубов — память

## Статус

✅ Все 13 компонентов реализованы и работают как shared (один раз для всех клубов).

## Компоненты в components/clubs/

| Компонент | Статус | Описание |
|-----------|--------|----------|
| `ClubDataContext.tsx` | ✅ | Provider + useClubData() hook |
| `BookingContext.tsx` | ✅ | Provider + useBooking() hook |
| `ClubNavbar.tsx` | ✅ | Navbar + ClubCrumbs, scroll-tracking |
| `ClubHero.tsx` | ✅ | Hero split, cursor glow, FACTS из данных |
| `LiveMap.tsx` | ✅ | Схема мест с фильтрами (mock, Langame позже) |
| `ClubZones.tsx` | ✅ | Горизонтальный scroll-hijack + games accordion |
| `Hardware.tsx` | ✅ | Железо по вкладкам |
| `Tariffs.tsx` | ✅ | Таблица тарифов, будни/выходные с flip |
| `Features.tsx` | ✅ | Bento-сетка, заголовки из данных |
| `ClubEvents.tsx` | ✅ | Карточки мероприятий из данных |
| `ClubReviews.tsx` | ✅ | Двойной marquee |
| `MapContact.tsx` | ✅ | SVG-карта из данных + контакты + другие клубы |
| `ClubFAQ.tsx` | ✅ | Accordion FAQ (AEO-секция) |
| `Booking.tsx` | ✅ | StickyCTA + 3-шаговый modal (без Telegram пока) |

## Принцип работы

Каждый компонент читает данные через `useClubData()`:
```tsx
const { CLUB, CLUB_ZONES, TARIFFS, ... } = useClubData()
```

Данные провайдятся из page.tsx через `<ClubDataProvider data={CLUB_DATA}>`.
Бронирование провайдится через `<BookingProvider>`.

## Что НЕ реализовано

- Langame API в LiveMap (сейчас статические mock-данные из data-файла)
- Telegram Bot в Booking.tsx (сейчас submit → success без реальной отправки)
- Яндекс.Карты в MapContact (сейчас декоративная SVG по данным из CLUB.MAP)

## Добавить в будущем

- [ ] `app/clubs/club.css` → добавить responsive-правила если найдём проблемы на 375px
- [ ] Подключить Langame API в LiveMap при получении endpoint
- [ ] Подключить Telegram Bot webhook в Booking при получении токена
- [ ] Подключить Яндекс.Карты в MapContact при получении API ключа
