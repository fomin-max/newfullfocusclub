// Админ-действия портала (только с cookie администратора). Загрузка файлов — отдельно, /api/p/upload.
import fs from 'node:fs/promises'
import path from 'node:path'
import { NextRequest, NextResponse } from 'next/server'
import { isId, portalEnabled } from '@/lib/portal/config'
import { hasRole } from '@/lib/portal/auth'
import { mutate, newId, projectDir, versionDir, SECTIONS, type L10n, type PProject, type Section } from '@/lib/portal/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Body = Record<string, unknown>

function l10n(v: unknown): L10n | undefined {
  if (!v || typeof v !== 'object') return undefined
  const out: L10n = {}
  for (const k of ['ru', 'sr', 'en'] as const) {
    const s = (v as Record<string, unknown>)[k]
    if (typeof s === 'string' && s.trim()) out[k] = s.trim().slice(0, 2000)
  }
  return Object.keys(out).length ? out : undefined
}

class Bad extends Error {}
function need(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Bad(msg)
}

function findDoc(p: PProject | null, id: unknown) {
  need(p, 'Проект не найден')
  const d = p.docs.find((x) => x.id === id)
  need(d, 'Документ не найден')
  return d
}

export async function POST(req: NextRequest) {
  if (!portalEnabled()) return new NextResponse(null, { status: 404 })
  if (!(await hasRole('admin'))) return NextResponse.json({ ok: false, error: 'Нет доступа' }, { status: 401 })

  const b = ((await req.json().catch(() => null)) || {}) as Body
  const project = b.project
  if (!isId(project)) return NextResponse.json({ ok: false, error: 'Неверный id проекта' }, { status: 400 })

  try {
    const result = await mutate<{ version?: string }>(project, async (p) => {
      switch (b.action) {
        case 'saveProject': {
          const title = l10n(b.title)
          need(title?.ru, 'Нужно название проекта на русском')
          const next: PProject = p ?? { id: project, title, docs: [], updatedAt: '' }
          next.title = title
          next.subtitle = l10n(b.subtitle)
          return { project: next, result: {} }
        }
        case 'createDoc': {
          need(p, 'Сначала создайте проект')
          need(isId(b.doc), 'id документа: латиница, цифры, дефис')
          need(!p.docs.some((d) => d.id === b.doc), 'Документ с таким id уже есть')
          const title = l10n(b.title)
          need(title?.ru, 'Нужно название на русском')
          const section = (SECTIONS as string[]).includes(String(b.section)) ? (b.section as Section) : 'docs'
          const order = Math.max(0, ...p.docs.filter((d) => d.section === section).map((d) => d.order)) + 1
          p.docs.push({ id: b.doc as string, section, title, description: l10n(b.description), order, versions: [] })
          return { project: p, result: {} }
        }
        case 'updateDoc': {
          const d = findDoc(p, b.doc)
          const title = l10n(b.title)
          need(title?.ru, 'Нужно название на русском')
          d.title = title
          d.description = l10n(b.description)
          if ((SECTIONS as string[]).includes(String(b.section))) d.section = b.section as Section
          return { project: p, result: {} }
        }
        case 'moveDoc': {
          const d = findDoc(p, b.doc)
          const list = p!.docs.filter((x) => x.section === d.section).sort((a, c) => a.order - c.order)
          const i = list.indexOf(d)
          const j = b.dir === 'up' ? i - 1 : i + 1
          if (j >= 0 && j < list.length) {
            list.splice(i, 1)
            list.splice(j, 0, d)
            list.forEach((x, k) => (x.order = k + 1))
          }
          return { project: p, result: {} }
        }
        case 'deleteDoc': {
          const d = findDoc(p, b.doc)
          p!.docs = p!.docs.filter((x) => x !== d)
          await fs.rm(path.join(projectDir(project), 'files', d.id), { recursive: true, force: true })
          return { project: p, result: {} }
        }
        case 'createVersion': {
          const d = findDoc(p, b.doc)
          const label = typeof b.label === 'string' ? b.label.trim().slice(0, 40) : ''
          need(label, 'Укажите номер версии, например v33')
          const id = newId()
          d.versions.push({ id, label, note: l10n(b.note), createdAt: new Date().toISOString(), files: [] })
          if (b.makeCurrent) d.current = id
          return { project: p, result: { version: id } }
        }
        case 'updateVersion': {
          const d = findDoc(p, b.doc)
          const v = d.versions.find((x) => x.id === b.version)
          need(v, 'Версия не найдена')
          const label = typeof b.label === 'string' ? b.label.trim().slice(0, 40) : ''
          need(label, 'Укажите номер версии')
          v.label = label
          v.note = l10n(b.note)
          return { project: p, result: {} }
        }
        case 'setCurrent': {
          const d = findDoc(p, b.doc)
          need(d.versions.some((x) => x.id === b.version), 'Версия не найдена')
          d.current = b.version as string
          return { project: p, result: {} }
        }
        case 'deleteVersion': {
          const d = findDoc(p, b.doc)
          const v = d.versions.find((x) => x.id === b.version)
          need(v, 'Версия не найдена')
          d.versions = d.versions.filter((x) => x !== v)
          if (d.current === v.id) d.current = d.versions.at(-1)?.id
          await fs.rm(versionDir(project, d.id, v.id), { recursive: true, force: true })
          return { project: p, result: {} }
        }
        case 'deleteFile': {
          const d = findDoc(p, b.doc)
          const v = d.versions.find((x) => x.id === b.version)
          need(v, 'Версия не найдена')
          const f = v.files.find((x) => x.id === b.file)
          need(f, 'Файл не найден')
          v.files = v.files.filter((x) => x !== f)
          await fs.rm(path.join(versionDir(project, d.id, v.id), f.stored), { force: true })
          return { project: p, result: {} }
        }
        default:
          throw new Bad('Неизвестное действие')
      }
    })
    return NextResponse.json({ ok: true, ...result })
  } catch (e) {
    if (e instanceof Bad) return NextResponse.json({ ok: false, error: e.message }, { status: 400 })
    console.error('[portal admin]', e)
    return NextResponse.json({ ok: false, error: 'Ошибка сервера' }, { status: 500 })
  }
}
