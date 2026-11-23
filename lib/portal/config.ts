// Портал проектов (/p/<проект>): страница с 3D-моделью, ТЗ и рендерами для подрядчиков.
// Код полностью изолирован в app/p, app/api/p и lib/portal — остальной сайт его не использует.
import path from 'node:path'

export const LANGS = ['ru', 'sr', 'en'] as const
export type Lang = (typeof LANGS)[number]
export type FileLang = Lang | 'any'

/** Выключатель без пересборки: PORTAL_ENABLED=false → все страницы и API портала отдают 404. */
export function portalEnabled(): boolean {
  return process.env.PORTAL_ENABLED !== 'false'
}

/** Где лежат файлы. На VPS — папка вне репозитория, чтобы деплой её не трогал. */
export function dataDir(): string {
  return process.env.PORTAL_DATA_DIR || path.join(process.cwd(), '.portal-data')
}

/** Лимит на один файл. Загрузка идёт потоком на диск, память не растёт. */
export const MAX_FILE_BYTES = Number(process.env.PORTAL_MAX_FILE_MB || 60) * 1024 * 1024

/** Не принимать файлы, если на диске останется меньше этого запаса. */
export const MIN_FREE_BYTES = Number(process.env.PORTAL_MIN_FREE_GB || 2) * 1024 * 1024 * 1024

/** id проекта, документа, версии и файла — только латиница, цифры и дефис (защита от ../ в путях). */
export const ID_RE = /^[a-z0-9][a-z0-9-]{0,47}$/

export function isId(v: unknown): v is string {
  return typeof v === 'string' && ID_RE.test(v)
}

export function pickLang(v: unknown): Lang {
  const s = Array.isArray(v) ? v[0] : v
  return (LANGS as readonly string[]).includes(s as string) ? (s as Lang) : 'ru'
}

export const ALLOWED_EXT: Record<string, string> = {
  html: 'text/html; charset=utf-8',
  htm: 'text/html; charset=utf-8',
  md: 'text/markdown; charset=utf-8',
  txt: 'text/plain; charset=utf-8',
  csv: 'text/csv; charset=utf-8',
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  dxf: 'application/dxf',
  dwg: 'application/acad',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  zip: 'application/zip',
  glb: 'model/gltf-binary',
}

export const IMAGE_EXT = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'])
