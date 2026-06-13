# DEPLOY — fullfocusclub.ru

Производственный деплой: **Timeweb VPS (СПб) + Nginx + PM2 + SSL**

---

## Архитектура

```
браузер → Nginx (:80/:443) → PM2 / next start (:3000)
                                    ↓
                            Supabase (DB + Storage)
                            Langame API (live seats)
                            Telegram Bot API
                            SMTP reg.ru (franchise leads)
```

---

## Нюансы проекта (ВАЖНО перед деплоем)

### 1. Это Next.js SSR — не статика
Сайт **нельзя** деплоить как набор файлов. Требуется живой Node.js процесс.  
Причины: API routes (`/api/booking`, `/api/seats/[slug]`, `/api/events`, `/api/franchise`, `/api/tariffs`),  
Server Components, динамические страницы турниров.

### 2. Env-переменные делятся на два типа
- `NEXT_PUBLIC_*` — попадают в браузерный бандл, безопасны для публичных ключей
- Без префикса — **только сервер**, никогда не утекают клиенту

| Переменная | Тип | Где используется |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | публичная | клиент + сервер |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | публичная | клиент + сервер |
| `SUPABASE_SERVICE_ROLE_KEY` | **секрет** | API routes (обход RLS) |
| `TELEGRAM_BOOKING_BOT_TOKEN` | **секрет** | /api/booking, /api/events, /api/franchise |
| `FRANCHISE_CHAT_ID` | **секрет** | /api/franchise |
| `SMTP_USER` | **секрет** | /api/franchise (nodemailer → reg.ru) |
| `SMTP_PASS` | **секрет** | /api/franchise (nodemailer → reg.ru) |
| `LANGAME_API_KEY_*` | **секрет** | /api/seats/[slug] (7 ключей по клубам) |
| `NEXT_PUBLIC_CDN_BASE` | публичная | ссылки на ассеты (пустая пока CDN не готов) |

> `SUPABASE_SERVICE_ROLE_KEY` даёт полный обход Row Level Security — никогда не светить в клиентском коде.

### 3. Langame API — 7 отдельных ключей
Каждый клуб имеет свой ключ:
```
LANGAME_API_KEY_VASILYEOSTROVSKY
LANGAME_API_KEY_ELEKTROSILA
LANGAME_API_KEY_KOMENDANTSKY
LANGAME_API_KEY_PROSVESCHENIYA
LANGAME_API_KEY_SADOVAYA
LANGAME_API_KEY_TEKHNOLOGICHESKY
LANGAME_API_KEY_MAKHACHKALA
```
Если ключ не задан — `/api/seats/[slug]` вернёт пустой массив с `warning`, не упадёт.

### 4. SMTP через reg.ru
Форма франшизы отправляет письма через `smtp.hosting.reg.ru:465` (SSL).  
Почтовый ящик `franchise@fullfocusclub.ru` должен существовать на хостинге reg.ru.  
На VPS исходящий порт 465 должен быть открыт (у Timeweb по умолчанию открыт).

### 5. next/image — удалённые домены
В `next.config.ts` прописаны разрешённые источники изображений:
- `storage.yandexcloud.net` — Яндекс Object Storage (ассеты клубов)
- `cdn.fullfocusclub.ru` — будущий CDN (пока пустой `NEXT_PUBLIC_CDN_BASE`)
- `pdsdpvjaxpyttbtmjhwp.supabase.co` — Supabase Storage (логотипы партнёров турниров)

При смене Supabase проекта — обновить hostname в `next.config.ts`.

### 6. MapLibre GL JS — без ключей
Карта использует CARTO Dark Matter tiles — ключи не нужны, работает из коробки.

### 7. RAM и swap для сборки
`next build` требует ~1.5–2 GB RAM.  
На VPS с 1 GB RAM **обязательно** создать swap 2 GB до первой сборки (шаг 3 ниже).

### 8. Yandex.Metrika — отложенная инициализация
Метрика инициализируется только после cookie-consent пользователя.  
ID счётчика (`NEXT_PUBLIC_YM_ID`) добавить после регистрации в Яндекс.Метрике.  
Сейчас компонент не подключён — добавить в `app/layout.tsx` после деплоя.

---

## Шаг 0 — Что нужно перед началом

- [ ] VPS Timeweb (СПб, 1 vCPU, 1 GB RAM) — получить IP
- [ ] SSH доступ к VPS
- [ ] DNS на reg.ru: A-запись `fullfocusclub.ru` и `www.fullfocusclub.ru` → IP VPS
- [ ] Все env-переменные собраны (особенно `TELEGRAM_BOOKING_BOT_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`)
- [ ] Почтовый ящик `franchise@fullfocusclub.ru` создан на reg.ru хостинге

---

## Шаг 1 — Первичная настройка VPS

```bash
# Обновить систему
apt update && apt upgrade -y

# Установить Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Установить PM2 глобально
npm install -g pm2

# Установить Nginx
apt install -y nginx

# Установить Certbot для SSL
apt install -y certbot python3-certbot-nginx

# Создать пользователя для приложения (не запускать от root)
useradd -m -s /bin/bash ffclub
```

---

## Шаг 2 — Структура директорий на сервере

```bash
mkdir -p /var/www/fullfocusclub
chown -R ffclub:ffclub /var/www/fullfocusclub
```

Структура:
```
/var/www/fullfocusclub/
├── .next/          # сборка (git-ignored, создаётся при build)
├── public/         # статика
├── app/
├── components/
├── lib/
├── node_modules/
├── package.json
├── .env.production # env-переменные (НЕ в git)
└── ecosystem.config.js
```

---

## Шаг 3 — Swap 2 GB (обязательно для сборки)

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

# Сделать постоянным
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# Проверить
free -h
```

---

## Шаг 4 — Загрузка кода на сервер

### Вариант A — через git (рекомендуется)
```bash
# На сервере
cd /var/www/fullfocusclub
git init
git remote add origin git@github.com:ВАШ_ЛОГИН/newfullfocusclub.git
git pull origin main
```

### Вариант B — rsync с локальной машины
```bash
# Запустить локально (исключая node_modules и .next)
rsync -avz --exclude='node_modules' --exclude='.next' --exclude='.env*' \
  /Users/user/VSCodeProjects/newfullfocusclub/ \
  ffclub@TIMEWEB_IP:/var/www/fullfocusclub/
```

---

## Шаг 5 — Файл .env.production на сервере

```bash
# Создать файл ТОЛЬКО на сервере, не коммитить в git
nano /var/www/fullfocusclub/.env.production
```

Содержимое (заменить значения реальными):
```env
NODE_ENV=production

NEXT_PUBLIC_SUPABASE_URL=https://pdsdpvjaxpyttbtmjhwp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

TELEGRAM_BOOKING_BOT_TOKEN=85233...
FRANCHISE_CHAT_ID=-10042...

SMTP_USER=franchise@fullfocusclub.ru
SMTP_PASS=ВАШ_ПАРОЛЬ

LANGAME_API_KEY_VASILYEOSTROVSKY=0b89...
LANGAME_API_KEY_ELEKTROSILA=7ad8...
LANGAME_API_KEY_KOMENDANTSKY=98fa...
LANGAME_API_KEY_PROSVESCHENIYA=3829...
LANGAME_API_KEY_SADOVAYA=88aa...
LANGAME_API_KEY_TEKHNOLOGICHESKY=5a1b...
LANGAME_API_KEY_MAKHACHKALA=7938...

NEXT_PUBLIC_CDN_BASE=
```

```bash
chmod 600 /var/www/fullfocusclub/.env.production
```

---

## Шаг 6 — Сборка проекта

```bash
cd /var/www/fullfocusclub

# Установить зависимости (только prod)
npm ci --production=false

# Собрать (использует .env.production автоматически при NODE_ENV=production)
NODE_ENV=production npm run build
```

> Сборка займёт 2–5 минут. Swap подхватится автоматически если RAM не хватит.

---

## Шаг 7 — PM2 ecosystem.config.js

Файл уже будет создан в репозитории (см. раздел "Файлы конфигурации" ниже).

```bash
cd /var/www/fullfocusclub

# Запустить приложение
pm2 start ecosystem.config.js --env production

# Автозапуск после перезагрузки сервера
pm2 startup
pm2 save
```

Проверить что работает:
```bash
pm2 status
curl http://localhost:3000
```

---

## Шаг 8 — Nginx конфиг

Файл будет создан как `nginx.conf` в репозитории для удобства.  
Установить на сервере:

```bash
cp /var/www/fullfocusclub/nginx.conf /etc/nginx/sites-available/fullfocusclub
ln -s /etc/nginx/sites-available/fullfocusclub /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx
```

---

## Шаг 9 — SSL сертификат (Let's Encrypt)

```bash
certbot --nginx -d fullfocusclub.ru -d www.fullfocusclub.ru \
  --email fullfocusclubru@gmail.com --agree-tos --no-eff-email

# Проверить автообновление
certbot renew --dry-run
```

После этого Certbot автоматически обновит Nginx конфиг для HTTPS.

---

## Шаг 10 — После деплоя

- [ ] Открыть `https://fullfocusclub.ru` — проверить главную
- [ ] Проверить `/clubs` — карта MapLibre загружается
- [ ] Проверить форму бронирования — Telegram уведомление приходит
- [ ] Проверить форму франшизы — Telegram + email работают
- [ ] Проверить `/api/seats/vasilyeostrovsky` — Langame отвечает
- [ ] Проверить `/tournaments/[slug]` — Supabase данные подтягиваются
- [ ] `curl https://fullfocusclub.ru/sitemap.xml` — sitemap доступен
- [ ] Добавить sitemap в **Яндекс.Вебмастер**: `https://fullfocusclub.ru/sitemap.xml`
- [ ] Добавить sitemap в **Google Search Console**
- [ ] Зарегистрировать счётчик **Яндекс.Метрика**, добавить ID в env как `NEXT_PUBLIC_YM_ID`
- [ ] Убедиться что `robots.txt` доступен: `https://fullfocusclub.ru/robots.txt`

---

## Обновление сайта (последующие деплои)

```bash
cd /var/www/fullfocusclub

# Получить новый код
git pull origin main

# Пересобрать
NODE_ENV=production npm run build

# Перезапустить без даунтайма
pm2 reload fullfocusclub
```

---

## Мониторинг

```bash
pm2 logs fullfocusclub          # логи в реальном времени
pm2 monit                       # CPU/RAM монитор
pm2 logs fullfocusclub --lines 100  # последние 100 строк
```

---

## Файлы конфигурации

Будут созданы в следующей сессии:
- `ecosystem.config.js` — PM2 конфигурация
- `nginx.conf` — Nginx виртуальный хост

---

## DNS (reg.ru → Timeweb)

В панели reg.ru → DNS-записи домена `fullfocusclub.ru`:

| Тип | Имя | Значение | TTL |
|-----|-----|----------|-----|
| A | @ | IP_TIMEWEB_VPS | 3600 |
| A | www | IP_TIMEWEB_VPS | 3600 |

DNS обновляется до 24 часов. SSL получать после обновления DNS.

---

## Проблемы и решения

| Проблема | Решение |
|---|---|
| `next build` падает с OOM | Swap не создан — выполнить Шаг 3 |
| PM2 не стартует | Проверить `pm2 logs` — скорее всего отсутствует `.env.production` |
| Nginx 502 Bad Gateway | PM2 не запущен или слушает не на :3000 |
| Письма франшизы не приходят | Проверить SMTP_USER/SMTP_PASS, ящик должен существовать на reg.ru |
| Langame не отвечает | Ключи `LANGAME_API_KEY_*` не заданы — API вернёт пустой список без ошибки |
| SSL ошибка при certbot | DNS ещё не распространился — подождать и повторить |
