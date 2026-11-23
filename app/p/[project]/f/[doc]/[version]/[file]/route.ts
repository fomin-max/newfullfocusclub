// Отдача файлов портала (после проверки пароля). Путь вне /api/, чтобы браузер мог кэшировать:
// файлы версии неизменны, поэтому кэш безопасен.
import fs from 'node:fs'
import zlib from 'node:zlib'
import { Readable } from 'node:stream'
import { NextRequest, NextResponse } from 'next/server'
import { ALLOWED_EXT, isId, portalEnabled } from '@/lib/portal/config'
import { hasRole } from '@/lib/portal/auth'
import { filePath, readProject } from '@/lib/portal/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const COMPRESSIBLE = new Set(['html', 'htm', 'md', 'txt', 'csv', 'svg', 'dxf'])

type Params ={ project: string; doc: string; version: string; file: string }

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { project, doc, version, file } = await params
  if (!portalEnabled() || !isId(project) || !isId(doc) || !isId(version)) return new NextResponse(null, { status: 404 })
  if (!(await hasRole('view'))) return new NextResponse('Unauthorized', { status: 401 })

  const p = await readProject(project)
  const f = p?.docs.find((d) => d.id === doc)?.versions.find((v) => v.id === version)?.files.find((x) => x.stored === file)
  if (!f) return new NextResponse(null, { status: 404 })

  const abs = filePath(project, doc, version, f.stored)
  let size: number
  try {
    size = (await fs.promises.stat(abs)).size
  } catch {
    return new NextResponse(null, { status: 404 })
  }

  const headers = new Headers({
    'Content-Type': ALLOWED_EXT[f.ext] || 'application/octet-stream',
    'Content-Length': String(size),
    'Cache-Control': 'private, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, nofollow',
  })
  // HTML и SVG открываются в «песочнице»: их скрипты не получают доступа к домену сайта
  if (['html', 'htm', 'svg'].includes(f.ext)) {
    headers.set('Content-Security-Policy', 'sandbox allow-scripts allow-popups allow-downloads allow-forms allow-modals')
  }
  if (req.nextUrl.searchParams.has('dl')) {
    headers.set('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(f.original)}`)
  }

  // Текстовые файлы отдаём сжатыми: 3D-модель 4,3 МБ → ≈ 0,7 МБ по сети
  const source = fs.createReadStream(abs)
  const gzip = COMPRESSIBLE.has(f.ext) && /\bgzip\b/.test(req.headers.get('accept-encoding') || '')
  headers.set('Vary', 'Accept-Encoding')
  if (gzip) {
    headers.delete('Content-Length')
    headers.set('Content-Encoding', 'gzip')
  }
  const body = gzip ? source.pipe(zlib.createGzip({ level: 6 })) : source
  return new NextResponse(Readable.toWeb(body) as ReadableStream, { headers })
}
