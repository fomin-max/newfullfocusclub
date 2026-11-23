import { notFound } from 'next/navigation'
import { isId, pickLang, portalEnabled, IMAGE_EXT, type Lang } from '@/lib/portal/config'
import { hasRole } from '@/lib/portal/auth'
import { currentVersion, fileUrl, filesFor, readProject, sortedDocs, t, versionLangs, type PDoc, type PProject } from '@/lib/portal/store'
import { DICT, LANG_LABEL, fmtDate, type Dict } from '@/lib/portal/i18n'
import LoginForm from '../_components/LoginForm'
import Header from '../_components/Header'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ project: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }

function withLang(href: string, lang: Lang) {
  if (lang === 'ru') return href
  return href + (href.includes('?') ? '&' : '?') + `lang=${lang}`
}

export default async function ProjectPage({ params, searchParams }: Props) {
  if (!portalEnabled()) notFound()
  const { project } = await params
  if (!isId(project)) notFound()
  const lang = pickLang((await searchParams).lang)
  const tr = DICT[lang]

  if (!(await hasRole('view'))) return <LoginForm role="view" t={tr} title={tr.loginTitle} />

  const p = await readProject(project)
  if (!p) notFound()

  const base = `/p/${project}`
  const models = sortedDocs(p, 'model')
  const docs = sortedDocs(p, 'docs')
  const renders = sortedDocs(p, 'renders')

  return (
    <>
      <Header title={t(p.title, lang)} subtitle={t(p.subtitle, lang)} lang={lang} basePath={base} />
      <main className="ffp-wrap space-y-10 py-6 pb-16">
        {models.map((d) => (
          <ModelBlock key={d.id} p={p} d={d} lang={lang} tr={tr} base={base} />
        ))}

        <section>
          <h2 className="mb-3 text-xl font-bold">{tr.docs}</h2>
          {docs.length === 0 ? (
            <p className="ffp-muted">{tr.empty}</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {docs.map((d) => (
                <DocCard key={d.id} p={p} d={d} lang={lang} tr={tr} base={base} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">{tr.renders}</h2>
          <Renders p={p} docs={renders} lang={lang} tr={tr} />
        </section>

        <Updates p={p} lang={lang} tr={tr} base={base} />
      </main>
    </>
  )
}

function VersionLine({ d, tr, lang }: { d: PDoc; tr: Dict; lang: Lang }) {
  const v = currentVersion(d)
  if (!v) return <span className="ffp-muted text-sm">{tr.soon}</span>
  const langs = versionLangs(v)
  return (
    <span className="flex flex-wrap items-center gap-2 text-sm">
      <span className="ffp-badge ffp-badge-on">{v.label}</span>
      <span className="ffp-muted">{fmtDate(v.createdAt)}</span>
      {langs.map((l) => (
        <span key={l} className={`ffp-badge ${l === lang ? 'ffp-badge-on' : ''}`}>
          {LANG_LABEL[l]}
        </span>
      ))}
    </span>
  )
}

function ModelBlock({ p, d, lang, tr, base }: { p: PProject; d: PDoc; lang: Lang; tr: Dict; base: string }) {
  const v = currentVersion(d)
  const html = v ? filesFor(v, lang).files.find((f) => f.ext === 'html' || f.ext === 'htm') : undefined
  const src = v && html ? `${fileUrl(p.id, d.id, v.id, html)}#${lang}` : null
  return (
    <section>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">{t(d.title, lang) || tr.model}</h2>
          <div className="mt-1">
            <VersionLine d={d} tr={tr} lang={lang} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {src && (
            <a className="ffp-btn ffp-btn-primary" href={src} target="_blank" rel="noopener">
              {tr.fullscreen} ↗
            </a>
          )}
          <a className="ffp-btn" href={withLang(`${base}/d/${d.id}`, lang)}>
            {tr.history}
          </a>
        </div>
      </div>
      {src ? (
        <>
          <div className="ffp-card overflow-hidden">
            <iframe
              src={src}
              title={t(d.title, lang)}
              className="block h-[65vh] min-h-[380px] w-full sm:h-[72vh]"
              sandbox="allow-scripts allow-popups allow-downloads"
              allow="fullscreen"
            />
          </div>
          <p className="ffp-muted mt-2 text-xs">{tr.modelHint}</p>
        </>
      ) : (
        <div className="ffp-card ffp-muted p-6">{tr.soon}</div>
      )}
    </section>
  )
}

function DocCard({ p, d, lang, tr, base }: { p: PProject; d: PDoc; lang: Lang; tr: Dict; base: string }) {
  const v = currentVersion(d)
  // Для скачивания PDF удобнее .md, поэтому он в приоритете
  const files = v ? filesFor(v, lang).files : []
  const main = files.find((f) => f.ext === 'pdf') ?? files[0]
  return (
    <article className="ffp-card flex flex-col gap-3 p-4">
      <div>
        <h3 className="text-base font-bold leading-snug">{t(d.title, lang)}</h3>
        {d.description && <p className="ffp-muted mt-1 text-sm">{t(d.description, lang)}</p>}
      </div>
      <VersionLine d={d} tr={tr} lang={lang} />
      {v && (
        <div className="mt-auto flex flex-wrap gap-2">
          <a className="ffp-btn ffp-btn-primary" href={withLang(`${base}/d/${d.id}`, lang)}>
            {tr.open}
          </a>
          {main && (
            <a className="ffp-btn" href={fileUrl(p.id, d.id, v.id, main, true)}>
              {tr.download} .{main.ext}
            </a>
          )}
        </div>
      )}
    </article>
  )
}

function Renders({ p, docs, lang, tr }: { p: PProject; docs: PDoc[]; lang: Lang; tr: Dict }) {
  const items = docs.flatMap((d) => {
    const v = currentVersion(d)
    if (!v) return []
    return filesFor(v, lang)
      .files.filter((f) => IMAGE_EXT.has(f.ext))
      .map((f) => ({ d, v, f }))
  })
  if (!items.length) return <p className="ffp-muted">{tr.rendersSoon}</p>
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {items.map(({ d, v, f }) => {
        const url = fileUrl(p.id, d.id, v.id, f)
        return (
          <a key={f.id} href={url} target="_blank" rel="noopener" className="ffp-card block overflow-hidden" title={tr.clickToEnlarge}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={t(d.title, lang)} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </a>
        )
      })}
    </div>
  )
}

function Updates({ p, lang, tr, base }: { p: PProject; lang: Lang; tr: Dict; base: string }) {
  const rows = p.docs
    .flatMap((d) => d.versions.map((v) => ({ d, v })))
    .sort((a, b) => b.v.createdAt.localeCompare(a.v.createdAt))
    .slice(0, 10)
  if (!rows.length) return null
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold">{tr.updates}</h2>
      <ul className="ffp-card divide-y divide-[var(--ff-white-10)]">
        {rows.map(({ d, v }) => (
          <li key={v.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3 text-sm">
            <span className="ffp-muted w-24 shrink-0">{fmtDate(v.createdAt)}</span>
            <a className="ffp-link" href={withLang(`${base}/d/${d.id}?v=${v.id}`, lang)}>
              {t(d.title, lang)}
            </a>
            <span className="ffp-badge">{v.label}</span>
            {v.note && <span className="ffp-muted basis-full sm:basis-auto">{t(v.note, lang)}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}
