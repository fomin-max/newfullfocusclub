# Full Focus Club — Master Document

## О проекте
Сайт: fullfocusclub.ru
Тип: сеть киберспортивных клубов
Города: Санкт-Петербург (6 клубов) + Махачкала (1 клуб)
Итого: 7 клубов
Основан: 2022

## Стек
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styles: Tailwind CSS
- Fonts: next/font/local (Grandis Extended, Magistral) + Google Fonts (Audiowide)

## Инфраструктура и деплой

### Сервер
- Провайдер: Timeweb VPS, нода СПб
- Конфигурация: 1 vCPU, 1 GB RAM + **2 GB swap** (обязательно для `next build`)
- Диск: NVMe (swap на NVMe работает быстро)
- Процесс: Nginx (reverse proxy + статика) → PM2 (Next.js Node.js процесс)

### Настройка swap (один раз при первом подключении к VPS)
```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### Домен и DNS
- Домен `fullfocusclub.ru` зарегистрирован на reg.ru (оплачен до 2028)
- Хостинг reg.ru **не используется** (shared, не поддерживает Node.js)
- После получения IP Timeweb VPS поменять A-записи в DNS reg.ru:
```
A   fullfocusclub.ru      → [IP Timeweb VPS]
A   www.fullfocusclub.ru  → [IP Timeweb VPS]
```

## Дизайн-система

### Цвета
```css
--color-bg: #080223
--color-primary: #6632FA
--color-accent: #00FFB6
--color-text: #F2F2F7
--color-muted: #9D9D9C
```

### Шрифты (4 шрифта из брендбука)

**--pay-font-display: Audiowide**
Применение: логотип, display-заголовки (только латиница)
Подключение: Google Fonts

**--pay-font-sans: Grandis Extended**
Применение: основной текст, кнопки, nav, поля ввода
Подключение: локальный файл (лицензионный)
Путь: apps/web/public/fonts/

**--pay-font-heading: Magistral**
Применение: все h1–h6
Подключение: локальный файл (лицензионный)
Путь: apps/web/public/fonts/

```ts
// layout.tsx
const grandisExtended = localFont({
  src: '../public/fonts/GrandisExtended-[filename]',
  variable: '--pay-font-sans',
  display: 'swap'
})
const magistral = localFont({
  src: '../public/fonts/Magistral-[filename]',
  variable: '--pay-font-heading',
  display: 'swap'
})
```

> **ВАЖНО:** Orbitron и Inter из перенесённого кода Claude Design — заменить везде:
> - Orbitron → Magistral (все заголовки h1–h6)
> - Inter → Grandis Extended (весь body-текст)

### Tone of voice
Уверенный, технологичный, обращение на «ты»

---

## Клубы сети

| # | Название | Адрес | Slug |
|---|----------|-------|------|
| 1 | Василеостровская (флагман) | Бугский переулок, 3 | vasilyeostrovsky |
| 2 | Электросила | Московский проспект, 149А | elektrosila |
| 3 | Комендантский | Проспект Испытателей, 33 | komendantsky |
| 4 | Просвещения | Проспект Просвещения, 43 | prosvescheniya |
| 5 | Садовая | Улица Казанская, 33 | sadovaya |
| 6 | Технологический | 3-я Красноармейская, 10 | tekhnologichesky |
| 7 | Махачкала | Улица Манташева, 107Б | makhachkala |

---

## Архитектура страниц

```
/                          → главная
/clubs                     → SEO-агрегатор всех клубов
/clubs/vasilyeostrovsky    → флагман (шаблон)
/clubs/elektrosila
/clubs/komendantsky
/clubs/prosvescheniya
/clubs/sadovaya
/clubs/tekhnologichesky
/clubs/makhachkala
/events                    → мероприятия/корпоративы
/tournaments               → турниры
/franchise                 → франшиза
/promo                     → акции
```

---

## Контакты

Телефон: +7 (812) 660-55-96
Email: hello@fullfocusclub.ru
Telegram: @fullfocusclub
VK: vk.com/fullfocusclub
Работает: 24/7

---

## Производительность — цели

| Метрика | Цель |
|---------|------|
| PageSpeed Mobile | 90+ |
| PageSpeed Desktop | 95+ |
| LCP | < 2.5s |
| CLS | < 0.1 |
| Размер страницы | < 500KB без медиа |

### Обязательные практики
- Изображения: WebP + fallback, srcset 1x/2x, lazy loading
- Видео hero: WebM + MP4, autoplay только десктоп, `preload="none"` мобайл, poster-заглушка
- Шрифты: WOFF2, subset кириллица + латиница, `display: swap`
- Critical CSS: инлайн в head
- JS: `'use client'` только для Langame-виджета и форм
- Анимации: только `transform` + `opacity`
- `IntersectionObserver` вместо scroll events
- Без jQuery и тяжёлых библиотек

---

## Интеграции

| Сервис | Назначение | Статус |
|--------|-----------|--------|
| Langame API | Live-схема мест (polling 60s) | Эндпоинт уточнить у клиента |
| Telegram Bot | Все формы сайта (бронь, события, турниры, франшиза) | Токен уточнить у клиента |
| Яндекс.Карты | Карты клубов, тёмная тема | API ключ получить на developer.tech.yandex.ru |
| Яндекс.Метрика | Аналитика и цели | ID счётчика уточнить у клиента |
