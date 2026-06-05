# Roadmap — Full Focus Club

## Статусы
`✅ Готово` `🔄 В работе` `⏳ Ждёт` `🔑 Ждёт данных от клиента`

---

## Фаза 0 — Инфраструктура
> Сделать до деплоя

- [ ] Купить Timeweb VPS (1 vCPU, 1 GB RAM, нода СПб)
- [ ] Подключиться по SSH, настроить swap 2GB
- [ ] Установить Node.js (LTS), PM2, Nginx
- [ ] Настроить A-записи в DNS reg.ru → IP Timeweb VPS
- [ ] Настроить SSL через Let's Encrypt (certbot)
- [ ] Создать git репозиторий (GitHub/Gitea)

---

## Фаза 1 — Инициализация проекта ✅
> Next.js 15 + дизайн-система — **ГОТОВО**

- [x] Next.js 15 + TypeScript + Tailwind + App Router
- [x] Шрифты: Grandis Extended + Magistral (local) + Audiowide (Google)
- [x] CSS-переменные в `globals.css` (все токены дизайн-системы)
- [x] Базовые компоненты: Header, Footer, Reveal, Icon, ProgressBar, Ticker

---

## Фаза 2 — Главная страница ✅
> **ГОТОВО**

- [x] Все 13 компонентов главной перенесены из handoff
- [x] SEO: title, description, canonical, og:*, robots
- [x] Schema.org: Organization + WebSite + FAQPage
- [ ] Мобайл 375px — не проверен
- [ ] PageSpeed — не проверен

---

## Фаза 3 — Страницы клубов 🔄
> **2 из 7 клубов готовы**

### Архитектура (✅ реализована)
- [x] `lib/clubs/types.ts` — единый тип ClubData
- [x] `lib/clubs/schema.ts` — buildClubSchema() + buildClubMetadata()
- [x] `lib/clubs/shared.ts` — ALL_CLUBS
- [x] `components/clubs/` — 13 shared компонентов
- [x] `ClubDataContext` + `BookingContext`
- [x] `app/clubs/club.css` + FAQ стили

### Клубы
- [x] Василеостровская — страница, SEO/Schema (@graph полный), 8 AEO-FAQ
- [x] Электросила — страница, SEO/Schema (@graph полный), 8 AEO-FAQ
- [ ] Комендантский — нужны данные от клиента
- [ ] Просвещения — нужны данные от клиента
- [ ] Садовая — нужны данные от клиента
- [ ] Технологический — нужны данные от клиента
- [ ] Махачкала — нужны данные от клиента

### Ещё
- [ ] `/clubs` — SEO-агрегатор всех клубов (важен для SEO)

---

## Фаза 4 — Интеграции 🔑
> Все заблокированы — ждём данные от клиента

- [ ] 🔑 Langame API endpoint → LiveMap (polling 60s, сейчас mock)
- [ ] 🔑 Telegram Bot токен → Booking + все формы сайта
- [ ] 🔑 Яндекс.Карты API ключ → MapContact (сейчас SVG)
- [ ] 🔑 Яндекс.Метрика ID → layout.tsx

---

## Фаза 5 — Остальные страницы ⏳
> Дизайн в Claude Design (кроме /promo)

- [ ] `/events` — мероприятия (дизайн готов)
  - [ ] Логотипы партнёров: Quantum, БК Зенит, Skynet, Lova Lova
  - [ ] Фото Комендантского
  - [ ] Реальные названия сериалов
- [x] `/tournaments` — турниры ✅
  - [x] Страница турнира `/tournaments/[slug]` — динамическая из Supabase
  - [x] Форма регистрации (individual/team) → пишет в Supabase
  - [x] Realtime счётчик мест и список участников (только confirmed)
  - [x] Telegram-уведомление при новой заявке (@fullfocushub_bot)
  - [x] Captain's Draft #1 — 13 июня, slug: captains-draft-1
  - [ ] Реальные фото с турниров (галерея)
  - [ ] Раздел «Турниры» в ffhub (админка) — промпт готов
- [ ] `/franchise` — франшиза (дизайн готов)
  - [ ] 🔑 Верифицировать все цифры с клиентом
  - [ ] Якорь `#zayavka` для формы
- [ ] `/promo` — акции (дизайна нет, строить по стилю главной)
  - 7 акций: SITE500, Пригласи друга, ДР, Студентам, Отзыв, Такси, Gorilla Energy

---

## Фаза 6 — SEO и производительность ⏳

- [ ] `sitemap.xml` — автогенерация (главная 1.0, клубы 0.9, остальные 0.7)
- [ ] `robots.txt` (запрет `/admin/`, `/_dev/`)
- [ ] Все изображения → WebP + srcset + lazy loading
- [ ] Видео hero: WebM + MP4, `preload="none"` мобайл, poster
- [ ] Nginx: кэш статики `expires max`, gzip/brotli
- [ ] PageSpeed Mobile 90+, Desktop 95+ на всех страницах
- [ ] NAP консистентность: телефон и адрес одинаковые везде
- [ ] hreflang="ru" на всех страницах

---

## Фаза 7 — Деплой ⏳

- [ ] Добавить переменные окружения на VPS (`.env.production` или в PM2 ecosystem):
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://pdsdpvjaxpyttbtmjhwp.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkc2RwdmpheHB5dHRidG1qaHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0OTE4ODQsImV4cCI6MjA5MTA2Nzg4NH0.p5zoKeFW1Gsm0T1kzsIs3i3ozQsLWeUo7bT0Igal6a0
  ```
- [ ] `next build` на VPS (swap 2GB настроен)
- [ ] PM2 ecosystem config, `pm2 start`, `pm2 save`, `pm2 startup`
- [ ] Nginx конфиг для fullfocusclub.ru (proxy_pass → localhost:3000)
- [ ] SSL сертификат (certbot --nginx)
- [ ] Проверить `https://fullfocusclub.ru` в браузере
- [ ] Проверить robots.txt, sitemap.xml, Schema.org через валидаторы
- [ ] Добавить в Яндекс.Вебмастер и Google Search Console

---

## Ждём от клиента 🔑

| Что | Где использовать |
|-----|-----------------|
| Langame API endpoint + ключ | LiveMap (polling) |
| Telegram Bot токен | все формы (бронь, события, турниры, франшиза) |
| Яндекс.Карты API ключ | MapContact, главная |
| Яндекс.Метрика ID | layout.tsx |
| Данные 5 клубов (зоны, тарифы, фичи, отзывы) | lib/clubs/[slug].ts |
| Реальные фото клубов | страницы клубов |
| Верификация цифр франшизы | /franchise |
| Логотипы партнёров (Quantum, БК Зенит, Skynet, Lova Lova) | /events |
