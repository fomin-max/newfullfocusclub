import fs from 'node:fs/promises'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { isId, pickLang, portalEnabled, IMAGE_EXT, type Lang } from '@/lib/portal/config'
import { hasRole } from '@/lib/portal/auth'
import { filePath, fileUrl, filesFor, readProject, t, versionLangs, type PDoc, type PFile, type PProject, type PVersion } from '@/lib/portal/store'
import { parseCsv } from '@/lib/portal/csv'
import { DICT, LANG_LABEL, fmtDate, fmtSize, type Dict } from '@/lib/portal/i18n'
import LoginForm from '../../../_components/LoginForm'
import Header from '../../../_components/Header'
import CsvTable from '../../../_components/CsvTable'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ project: string; doc: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function withLang(href: string, lang: Lang) {
  if (lang === 'ru') return href
  return href + (href.includes('?') ? '&' : '?') + `lang=${lang}`
}

export default async function DocPage({ params, searchParams }: Props) {
  if (!portalEnabled()) notFound()
  const { project, doc } = await params
  if (!isId(project) || !isId(doc)) notFound()
  const sp = await searchParams
  const lang = pickLang(sp.lang)
  const tr = DICT[lang]

  if (!(await hasRole('view'))) return <LoginForm role="view" t={tr} title={tr.loginTitle} />

  const p = await readProject(project)
  const d = p?.docs.find((x) => x.id === doc)
  if (!p || !d) notFound()

  const wanted = typeof sp.v === 'string' ? sp.v : d.current
  const v = d.versions.find((x) => x.id === wanted) ?? d.versions.find((x) => x.id === d.current)
  const base = `/p/${project}`
  const query: Record<string, string> = v && v.id !== d.current ? { v: v.id } : {}

  return (
    <>
      <Header title={t(p.title, lang)} lang={lang} basePath={`${base}/d/${d.id}`} query={query} />
      <main className="ffp-wrap space-y-5 py-6 pb-16">
        <a className="ffp-link text-sm" href={withLang(base, lang)}>
          ← {tr.back}
        </a>
        <div>
          <h1 className="text-2xl font-bold leading-tight">{t(d.title, lang)}</h1>
          {d.description && <p className="ffp-muted mt-1">{t(d.description, lang)}</p>}
        </div>

        {!v ? (
          <p className="ffp-muted">{tr.soon}</p>
        ) : (
          <VersionView p={p} d={d} v={v} lang={lang} tr={tr} base={base} />
        )}

        <History d={d} active={v?.id} lang={lang} tr={tr} base={base} />
      </main>
    </>
  )
}

async function VersionView({ p, d, v, lang, tr, base }: { p: PProject; d: PDoc; v: PVersion; lang: Lang; tr: Dict; base: string }) {
  const { files, shownLang } = filesFor(v, lang)
  const isOld = v.id !== d.current
  const langs = versionLangs(v)
  const main = d.section === 'renders' ? undefined : files[0]
  const isTranslation = shownLang !== null && shownLang !== 'ru' && langs.includes('ru')

  return (
    <div className="space-y-4">
      {isOld && (
        <div className="ffp-banner flex flex-wrap items-center gap-3 text-sm">
          <span>
            ⚠️ {tr.outdated} ({v.label})
          </span>
          {d.current && (
            <a className="ffp-link" href={withLang(`${base}/d/${d.id}`, lang)}>
              {tr.goCurrent}
            </a>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="ffp-badge ffp-badge-on">{v.label}</span>
        <span className="ffp-muted">{fmtDate(v.createdAt)}</span>
        {langs.map((l) => (
          <span key={l} className={`ffp-badge ${l === shownLang ? 'ffp-badge-on' : ''}`}>
            {LANG_LABEL[l]}
          </span>
        ))}
        {v.note && <span className="ffp-muted">— {t(v.note, lang)}</span>}
      </div>

      {shownLang && shownLang !== lang && <p className="ffp-banner text-sm">{tr.noLang}</p>}
      {isTranslation && <p className="ffp-muted text-sm">{tr.translation}</p>}

      {main && <Viewer p={p} d={d} v={v} f={main} lang={lang} tr={tr} />}
      {d.section === 'renders' && <Gallery p={p} d={d} v={v} files={files} tr={tr} />}

      {files.length > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-[var(--ff-white-60)]">{tr.files}</h2>
          <div className="flex flex-wrap gap-2">
            {files.map((f) => (
              <a key={f.id} className="ffp-btn" href={fileUrl(p.id, d.id, v.id, f, true)}>
                ⬇ {f.original} <span className="ffp-muted font-normal">{fmtSize(f.size)}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

async function Viewer({ p, d, v, f, lang, tr }: { p: PProject; d: PDoc; v: PVersion; f: PFile; lang: Lang; tr: Dict }) {
  const url = fileUrl(p.id, d.id, v.id, f)

  if (f.ext === 'md' || f.ext === 'txt') {
    const text = await fs.readFile(filePath(p.id, d.id, v.id, f.stored), 'utf8')
    const html = f.ext === 'md' ? await marked.parse(text, { gfm: true, breaks: true }) : `<pre>${escapeHtml(text)}</pre>`
    return <article className="ffp-card ffp-prose p-4 sm:p-8" dangerouslySetInnerHTML={{ __html: html }} />
  }

  if (f.ext === 'csv') {
    const rows = parseCsv(await fs.readFile(filePath(p.id, d.id, v.id, f.stored), 'utf8'))
    return <CsvTable rows={rows} searchLabel={tr.search} rowsLabel={tr.rows} />
  }

  if (f.ext === 'html' || f.ext === 'htm') {
    return (
      <div className="space-y-2">
        <a className="ffp-btn ffp-btn-primary" href={`${url}#${lang}`} target="_blank" rel="noopener">
          {tr.fullscreen} ↗
        </a>
        <div className="ffp-card overflow-hidden">
          <iframe
            src={`${url}#${lang}`}
            title={t(d.title, lang)}
            className="block h-[75vh] min-h-[380px] w-full"
            sandbox="allow-scripts allow-popups allow-downloads"
          />
        </div>
      </div>
    )
  }

  if (f.ext === 'pdf') {
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <a className="ffp-btn ffp-btn-primary" href={url} target="_blank" rel="noopener">
            {tr.open} PDF ↗
          </a>
          <span className="ffp-muted text-sm md:hidden">{tr.pdfMobile}</span>
        </div>
        <iframe src={url} title={t(d.title, lang)} className="ffp-card hidden h-[85vh] w-full md:block" />
      </div>
    )
  }

  if (IMAGE_EXT.has(f.ext)) {
    return (
      <a href={url} target="_blank" rel="noopener" className="ffp-card block overflow-hidden" title={tr.clickToEnlarge}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={t(d.title, lang)} className="w-full bg-white" />
        <span className="ffp-muted block px-3 py-2 text-xs">{tr.clickToEnlarge}</span>
      </a>
    )
  }

  return null
}

function Gallery({ p, d, v, files, tr }: { p: PProject; d: PDoc; v: PVersion; files: PFile[]; tr: Dict }) {
  const imgs = files.filter((f) => IMAGE_EXT.has(f.ext))
  if (!imgs.length) return null
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {imgs.map((f) => {
        const url = fileUrl(p.id, d.id, v.id, f)
        return (
          <a key={f.id} href={url} target="_blank" rel="noopener" className="ffp-card block overflow-hidden" title={tr.clickToEnlarge}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={f.original} loading="lazy" className="w-full" />
          </a>
        )
      })}
    </div>
  )
}

function History({ d, active, lang, tr, base }: { d: PDoc; active?: string; lang: Lang; tr: Dict; base: string }) {
  if (d.versions.length < 1) return null
  const list = [...d.versions].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return (
    <section>
      <h2 className="mb-2 text-lg font-bold">{tr.history}</h2>
      <ul className="ffp-card divide-y divide-[var(--ff-white-10)]">
        {list.map((v) => (
          <li key={v.id} className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3 text-sm ${v.id === active ? 'bg-[var(--ff-glitch-core-wash)]' : ''}`}>
            <a className="ffp-link font-semibold" href={withLang(`${base}/d/${d.id}?v=${v.id}`, lang)}>
              {v.label}
            </a>
            {v.id === d.current && <span className="ffp-badge ffp-badge-on">{tr.current}</span>}
            <span className="ffp-muted">{fmtDate(v.createdAt)}</span>
            <span className="flex gap-1">
              {versionLangs(v).map((l) => (
                <span key={l} className="ffp-badge">
                  {LANG_LABEL[l]}
                </span>
              ))}
            </span>
            {v.note && <span className="ffp-muted basis-full sm:basis-auto">{t(v.note, lang)}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)
}
