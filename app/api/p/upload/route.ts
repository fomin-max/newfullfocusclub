// Загрузка одного файла в версию документа. Тело запроса — сам файл (не multipart),
// метаданные — в query. Файл пишется на диск потоком, в память целиком не читается.
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { Readable, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { NextRequest, NextResponse } from 'next/server'
import { ALLOWED_EXT, dataDir, isId, MAX_FILE_BYTES, MIN_FREE_BYTES, portalEnabled, LANGS, type FileLang } from '@/lib/portal/config'
import { hasRole } from '@/lib/portal/auth'
import { mutate, newId, readProject, versionDir } from '@/lib/portal/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function err(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status })
}

export async function POST(req: NextRequest) {
  if (!portalEnabled()) return new NextResponse(null, { status: 404 })
  if (!(await hasRole('admin'))) return err(401, 'Нет доступа')

  const q = req.nextUrl.searchParams
  const project = q.get('project') || ''
  const doc = q.get('doc') || ''
  const version = q.get('version') || ''
  const langRaw = q.get('lang') || 'any'
  const original = (q.get('name') || '').replace(/[\\/\0]/g, '_').slice(0, 200)
  const ext = path.extname(original).slice(1).toLowerCase()

  if (!isId(project) || !isId(doc) || !isId(version)) return err(400, 'Неверные параметры')
  if (!original || !ALLOWED_EXT[ext]) return err(400, `Тип файла .${ext || '?'} не поддерживается`)
  const lang: FileLang = (LANGS as readonly string[]).includes(langRaw) ? (langRaw as FileLang) : 'any'

  const declared = Number(req.headers.get('content-length') || 0)
  if (declared > MAX_FILE_BYTES) return err(413, `Файл больше ${Math.round(MAX_FILE_BYTES / 1048576)} МБ`)
  if (!req.body) return err(400, 'Пустой файл')

  const p = await readProject(project)
  const d = p?.docs.find((x) => x.id === doc)
  if (!d?.versions.some((v) => v.id === version)) return err(404, 'Версия не найдена')

  // Запас места на диске: не даём порталу забить диск сайта
  await fsp.mkdir(dataDir(), { recursive: true })
  const st = await fsp.statfs(dataDir())
  if (st.bavail * st.bsize - Math.max(declared, 0) < MIN_FREE_BYTES) return err(507, 'Мало места на диске сервера')

  const dir = versionDir(project, doc, version)
  await fsp.mkdir(dir, { recursive: true })
  const id = newId()
  const stored = `${id}.${ext}`
  const tmp = path.join(dir, `${id}.part`)

  let size = 0
  const limiter = new Transform({
    transform(chunk: Buffer, _enc, cb) {
      size += chunk.length
      if (size > MAX_FILE_BYTES) cb(new Error('too_large'))
      else cb(null, chunk)
    },
  })

  try {
    await pipeline(Readable.fromWeb(req.body as import('node:stream/web').ReadableStream), limiter, fs.createWriteStream(tmp))
  } catch (e) {
    await fsp.rm(tmp, { force: true })
    if ((e as Error).message === 'too_large') return err(413, `Файл больше ${Math.round(MAX_FILE_BYTES / 1048576)} МБ`)
    return err(400, 'Загрузка прервалась')
  }
  if (size === 0) {
    await fsp.rm(tmp, { force: true })
    return err(400, 'Пустой файл')
  }
  await fsp.rename(tmp, path.join(dir, stored))

  try {
    await mutate(project, (cur) => {
      const v = cur?.docs.find((x) => x.id === doc)?.versions.find((x) => x.id === version)
      if (!cur || !v) throw new Error('gone')
      v.files.push({ id, lang, original, stored, ext, size })
      return { project: cur, result: null }
    })
  } catch {
    await fsp.rm(path.join(dir, stored), { force: true })
    return err(409, 'Версию удалили во время загрузки')
  }

  return NextResponse.json({ ok: true, file: id })
}
