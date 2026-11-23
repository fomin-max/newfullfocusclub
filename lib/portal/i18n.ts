import type { Lang } from './config'

const ru = {
  loginTitle: 'Материалы проекта',
  loginHint: 'Введите пароль, который вам прислали вместе со ссылкой.',
  adminLoginTitle: 'Вход для администратора',
  password: 'Пароль',
  enter: 'Войти',
  wrongPassword: 'Неверный пароль',
  tooMany: 'Слишком много попыток. Попробуйте через 15 минут.',
  model: '3D-модель',
  docs: 'Документы',
  renders: 'Рендеры',
  updates: 'Что нового',
  fullscreen: 'Открыть на весь экран',
  history: 'История версий',
  open: 'Открыть',
  download: 'Скачать',
  soon: 'Скоро появится',
  rendersSoon: 'Рендеры появятся позже.',
  version: 'Версия',
  current: 'актуальная',
  outdated: 'Это устаревшая версия.',
  goCurrent: 'Открыть актуальную',
  back: 'Все материалы',
  noLang: 'Нет версии на этом языке — показан оригинал.',
  translation: 'Перевод. При расхождении действует русская версия.',
  files: 'Файлы',
  search: 'Поиск по таблице',
  rows: 'строк',
  clickToEnlarge: 'Нажмите, чтобы открыть в полном размере',
  pdfMobile: 'На телефоне PDF удобнее открыть отдельно.',
  modelHint: 'На телефоне модель может открываться дольше, чем на ноутбуке.',
  empty: 'Здесь пока ничего нет.',
  date: 'Дата',
  note: 'Что изменилось',
}

type Dict = typeof ru

const sr: Dict = {
  loginTitle: 'Materijali projekta',
  loginHint: 'Unesite lozinku koju ste dobili uz link.',
  adminLoginTitle: 'Prijava za administratora',
  password: 'Lozinka',
  enter: 'Prijavi se',
  wrongPassword: 'Pogrešna lozinka',
  tooMany: 'Previše pokušaja. Pokušajte ponovo za 15 minuta.',
  model: '3D model',
  docs: 'Dokumenti',
  renders: 'Renderi',
  updates: 'Šta je novo',
  fullscreen: 'Otvori preko celog ekrana',
  history: 'Istorija verzija',
  open: 'Otvori',
  download: 'Preuzmi',
  soon: 'Uskoro',
  rendersSoon: 'Renderi će biti dodati kasnije.',
  version: 'Verzija',
  current: 'aktuelna',
  outdated: 'Ovo je zastarela verzija.',
  goCurrent: 'Otvori aktuelnu',
  back: 'Svi materijali',
  noLang: 'Nema verzije na ovom jeziku — prikazan je original.',
  translation: 'Prevod. U slučaju razlike važi ruska verzija.',
  files: 'Fajlovi',
  search: 'Pretraga tabele',
  rows: 'redova',
  clickToEnlarge: 'Kliknite da otvorite u punoj veličini',
  pdfMobile: 'Na telefonu je PDF lakše otvoriti posebno.',
  modelHint: 'Na telefonu se model može otvarati duže nego na laptopu.',
  empty: 'Ovde još nema ničega.',
  date: 'Datum',
  note: 'Šta je promenjeno',
}

const en: Dict = {
  loginTitle: 'Project materials',
  loginHint: 'Enter the password you received with the link.',
  adminLoginTitle: 'Administrator sign-in',
  password: 'Password',
  enter: 'Sign in',
  wrongPassword: 'Wrong password',
  tooMany: 'Too many attempts. Try again in 15 minutes.',
  model: '3D model',
  docs: 'Documents',
  renders: 'Renders',
  updates: "What's new",
  fullscreen: 'Open full screen',
  history: 'Version history',
  open: 'Open',
  download: 'Download',
  soon: 'Coming soon',
  rendersSoon: 'Renders will be added later.',
  version: 'Version',
  current: 'current',
  outdated: 'This is an outdated version.',
  goCurrent: 'Open the current one',
  back: 'All materials',
  noLang: 'Not available in this language — showing the original.',
  translation: 'Translation. If versions differ, the Russian one applies.',
  files: 'Files',
  search: 'Search the table',
  rows: 'rows',
  clickToEnlarge: 'Click to open at full size',
  pdfMobile: 'On a phone it is easier to open the PDF separately.',
  modelHint: 'On a phone the model may take longer to open than on a laptop.',
  empty: 'Nothing here yet.',
  date: 'Date',
  note: 'What changed',
}

export const DICT: Record<Lang, Dict> = { ru, sr, en }
export type { Dict }

export const LANG_LABEL: Record<Lang, string> = { ru: 'RU', sr: 'SR', en: 'EN' }

export function fmtDate(iso: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Belgrade',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(iso))
}

export function fmtSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
