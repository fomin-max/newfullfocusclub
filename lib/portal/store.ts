// Хранилище портала на диске, без базы данных:
//   <PORTAL_DATA_DIR>/<проект>/manifest.json                  — список документов и версий
//   <PORTAL_DATA_DIR>/<проект>/files/<док>/<версия>/<файл>    — сами файлы
// Файлы версии никогда не перезаписываются: новая версия = новая папка.
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { dataDir, isId, IMAGE_EXT, type FileLang, type Lang } from './config'

export type L10n = Partial<Record<Lang, string>>
export type Section = 'model' | 'docs' | 'renders'

export interface PFile {
  id: string
  lang: FileLang
  original: string
  stored: string
  ext: string
  size: number
}
export interface PVersion {
  id: string
  label: string
  note?: L10n
  createdAt: string
  files: PFile[]
}
export interface PDoc {
  id: string
  section: Section
  title: L10n
  description?: L10n
  order: number
  current?: string
  versions: PVersion[]
}
export interface PProject {
  id: string
  title: L10n
  subtitle?: L10n
  docs: PDoc[]
  updatedAt: string
}

export const SECTIONS: Section[] = ['model', 'docs', 'renders']

function assertId(...ids: string[]) {
  for (const id of ids) if (!isId(id)) throw new Error('bad_id')
}

export function projectDir(project: string) {
  assertId(project)
  return path.join(dataDir(), project)
}
export function versionDir(project: string, doc: string, version: string) {
  assertId(project, doc, version)
  return path.join(projectDir(project), 'files', doc, version)
}
export function filePath(project: string, doc: string, version: string, stored: string) {
  if (!/^[a-z0-9-]+\.[a-z0-9]+$/.test(stored)) throw new Error('bad_id')
  return path.join(versionDir(project, doc, version), stored)
}

export function newId() {
  return Date.now().toString(36) + crypto.randomBytes(3).toString('hex')
}

export async function readProject(project: string): Promise<PProject | null> {
  try {
    const raw = await fs.readFile(path.join(projectDir(project), 'manifest.json'), 'utf8')
    return JSON.parse(raw) as PProject
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw e
  }
}

async function writeProject(p: PProject) {
  const dir = projectDir(p.id)
  await fs.mkdir(dir, { recursive: true })
  p.updatedAt = new Date().toISOString()
  const tmp = path.join(dir, `manifest.${process.pid}.${Date.now()}.tmp`)
  await fs.writeFile(tmp, JSON.stringify(p, null, 2), 'utf8')
  await fs.rename(tmp, path.join(dir, 'manifest.json'))
}

// Все изменения манифеста идут по очереди, чтобы параллельные загрузки не затёрли друг друга.
let queue: Promise<unknown> = Promise.resolve()
export function mutate<T>(project: string, fn: (p: PProject | null) => Promise<{ project: PProject | null; result: T }> | { project: PProject | null; result: T }): Promise<T> {
  const run = queue.then(async () => {
    const current = await readProject(project)
    const { project: next, result } = await fn(current)
    if (next) await writeProject(next)
    return result
  })
  queue = run.catch(() => undefined)
  return run
}

// ── Выборки для страниц ──

export function sortedDocs(p: PProject, section: Section) {
  return p.docs.filter((d) => d.section === section).sort((a, b) => a.order - b.order)
}

export function currentVersion(d: PDoc): PVersion | undefined {
  return d.versions.find((v) => v.id === d.current)
}

export function t(l: L10n | undefined, lang: Lang): string {
  if (!l) return ''
  return l[lang] || l.ru || l.en || l.sr || ''
}

const PRIORITY = ['md', 'html', 'htm', 'csv', 'pdf']

function rank(f: PFile) {
  const i = PRIORITY.indexOf(f.ext)
  if (i >= 0) return i
  if (IMAGE_EXT.has(f.ext)) return PRIORITY.length
  return PRIORITY.length + 1
}

/** Файлы версии для языка: свой язык → русский оригинал; файлы «без языка» добавляются всегда. */
export function filesFor(v: PVersion, lang: Lang): { files: PFile[]; shownLang: Lang | null } {
  const neutral = v.files.filter((f) => f.lang === 'any')
  for (const l of [lang, 'ru', 'sr', 'en'] as Lang[]) {
    const own = v.files.filter((f) => f.lang === l)
    if (own.length) return { files: [...own, ...neutral].sort((a, b) => rank(a) - rank(b)), shownLang: l }
  }
  return { files: neutral.sort((a, b) => rank(a) - rank(b)), shownLang: null }
}

export function versionLangs(v: PVersion): Lang[] {
  return (['ru', 'sr', 'en'] as Lang[]).filter((l) => v.files.some((f) => f.lang === l))
}

export function fileUrl(project: string, doc: string, version: string, f: PFile, download = false) {
  return `/p/${project}/f/${doc}/${version}/${f.stored}${download ? '?dl=1' : ''}`
}
