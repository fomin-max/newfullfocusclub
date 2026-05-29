# Общие UI-компоненты — память

## Статус
- [x] Все компоненты реализованы
- [x] Шрифты: Magistral (h1–h6) + Grandis Extended (body) — подключены через next/font/local
- [x] Токены дизайн-системы применены через CSS variables (ff-*)
- [x] RSC по умолчанию, 'use client' только где нужно

## Компоненты (все реализованы ✅)

| Компонент | Файл | use client | Статус |
|-----------|------|-----------|--------|
| Icon | `Icon.tsx` | нет | ✅ |
| Card | `Card.tsx` | ДА (mouse glow) | ✅ forwardRef |
| Reveal | `Reveal.tsx` | ДА (IntersectionObserver) | ✅ |
| Header | `Header.tsx` | ДА (scroll, active section) | ✅ |
| Footer | `Footer.tsx` | нет | ✅ |
| Ticker | `Ticker.tsx` | нет (CSS animation) | ✅ |
| ProgressBar | `ProgressBar.tsx` | ДА (scroll) | ✅ |
| MobileStickyBar | `MobileStickyBar.tsx` | нет | ✅ |

## Хуки (lib/hooks.ts)
- `useScramble` — текстовый скрэмбл, запускается один раз
- `useCountUp` — count-up от 0 до N при попадании в viewport
- `useCountFromTo` — count-up между двумя значениями
- `useTilt` — 3D-тilт по mousemove, только десктоп
- `useReveal` — появление при скролле (IntersectionObserver)
- `useScrolled` — boolean, прокручена ли страница
- `useActiveSection` — активная секция по scroll offset
- `useCardGlow` — mouse-tracking glow на карточках

## Дизайн-токены
Все в `app/globals.css`. Ключевые:
```css
--ff-font-heading: 'Magistral', 'Grandis Extended', system-ui
--ff-font-body:    'Grandis Extended', system-ui
--ff-font-display: 'Audiowide', system-ui
--ff-glitch-core:  #6632FA
--ff-neon-bloom:   #00FFB6
--ff-deep-memory:  #080223
--ff-softlight:    #F2F2F7
```
