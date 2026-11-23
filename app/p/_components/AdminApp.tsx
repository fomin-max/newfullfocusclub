'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { L10n, PDoc, PProject, PVersion, Section } from '@/lib/portal/store'
import { fmtDate, fmtSize } from '@/lib/portal/i18n'

const SECTION_LABEL: Record<Section, string> = { model: '3D-модель (сверху страницы)', docs: 'Документы', renders: 'Рендеры (галерея)' }
const LANG_OPTIONS = [
  { v: 'ru', l: 'RU' },
  { v: 'sr', l: 'SR' },
  { v: 'en', l: 'EN' },
  { v: 'any', l: 'Без языка' },
]

async function api(body: Record<string, unknown>) {
  const res = await fetch('/api/p/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const json = await res.json().catch(() => ({ ok: false, error: 'Ошибка сервера' }))
  if (!json.ok) throw new Error(json.error || 'Ошибка')
  return json
}

function uploadFile(params: Record<string, string>, file: File, onProgress: (pct: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const qs = new URLSearchParams({ ...params, name: file.name }).toString()
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `/api/p/upload?${qs}`)
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100))
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) return resolve()
      let msg = `Ошибка ${xhr.status}`
      try {
        msg = JSON.parse(xhr.responseText).error || msg
      } catch {
        if (xhr.status === 413) msg = 'Файл слишком большой для сервера (лимит nginx)'
      }
      reject(new Error(`${file.name}: ${msg}`))
    }
    xhr.onerror = () => reject(new Error(`${file.name}: сеть недоступна`))
    xhr.send(file)
  })
}

function L10nFields({ name, value, rows = 1 }: { name: string; value?: L10n; rows?: number }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {(['ru', 'sr', 'en'] as const).map((l) => (
        <label key={l} className="block text-xs">
          <span className="ffp-muted">{l.toUpperCase()}</span>
          {rows > 1 ? (
            <textarea name={`${name}.${l}`} defaultValue={value?.[l] ?? ''} rows={rows} className="mt-1" />
          ) : (
            <input name={`${name}.${l}`} defaultValue={value?.[l] ?? ''} className="ffp-input mt-1" />
          )}
        </label>
      ))}
    </div>
  )
}

function readL10n(fd: FormData, name: string): L10n {
  return { ru: String(fd.get(`${name}.ru`) || ''), sr: String(fd.get(`${name}.sr`) || ''), en: String(fd.get(`${name}.en`) || '') }
}

export default function AdminApp({ projectId, project, maxMb }: { projectId: string; project: PProject | null; maxMb: number }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  async function run(fn: () => Promise<unknown>, okText = 'Сохранено') {
    setBusy(true)
    setMsg(null)
    try {
      await fn()
      setMsg({ ok: true, text: okText })
      router.refresh()
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message })
    } finally {
      setBusy(false)
    }
  }

  const sectionRank: Record<Section, number> = { model: 0, docs: 1, renders: 2 }
  const docs = project ? [...project.docs].sort((a, b) => sectionRank[a.section] - sectionRank[b.section] || a.order - b.order) : []

  return (
    <div className="ffp-wrap space-y-6 py-6 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="ffp-head text-[11px] tracking-[0.2em] text-[var(--ff-neon-bloom)]">FULL FOCUS · АДМИНКА</div>
          <h1 className="text-xl font-bold">Проект «{projectId}»</h1>
        </div>
        <div className="flex gap-2">
          {project && (
            <a className="ffp-btn" href={`/p/${projectId}`} target="_blank" rel="noopener">
              Страница для рабочих ↗
            </a>
          )}
          <button
            className="ffp-btn"
            onClick={() => run(() => fetch('/api/p/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ logout: true }) }), 'Вы вышли')}
          >
            Выйти
          </button>
        </div>
      </div>

      {msg && (
        <div className={`sticky top-2 z-10 rounded-xl border px-4 py-2 text-sm ${msg.ok ? 'border-[var(--ff-neon-bloom-line)] bg-[#0b2a26]' : 'border-[var(--ff-danger)] bg-[#2a0b12]'}`}>
          {msg.text}
        </div>
      )}

      <section className="ffp-card space-y-3 p-4">
        <h2 className="font-bold">{project ? 'Название проекта' : 'Создать проект'}</h2>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            run(() => api({ action: 'saveProject', project: projectId, title: readL10n(fd, 'title'), subtitle: readL10n(fd, 'subtitle') }))
          }}
        >
          <div>
            <div className="mb-1 text-sm">Название</div>
            <L10nFields name="title" value={project?.title} />
          </div>
          <div>
            <div className="mb-1 text-sm">Подзаголовок (необязательно)</div>
            <L10nFields name="subtitle" value={project?.subtitle} />
          </div>
          <button className="ffp-btn ffp-btn-primary" disabled={busy}>
            Сохранить
          </button>
        </form>
      </section>

      {project && (
        <>
          {docs.map((d) => (
            <DocAdmin key={d.id} projectId={projectId} d={d} busy={busy} run={run} setBusy={setBusy} setMsg={setMsg} maxMb={maxMb} />
          ))}
          <NewDoc projectId={projectId} busy={busy} run={run} />
        </>
      )}
    </div>
  )
}

type RunFn = (fn: () => Promise<unknown>, okText?: string) => Promise<void>

function NewDoc({ projectId, busy, run }: { projectId: string; busy: boolean; run: RunFn }) {
  return (
    <section className="ffp-card space-y-3 p-4">
      <h2 className="font-bold">Добавить документ</h2>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.currentTarget
          const fd = new FormData(form)
          run(async () => {
            await api({
              action: 'createDoc',
              project: projectId,
              doc: String(fd.get('doc') || '').trim(),
              section: fd.get('section'),
              title: readL10n(fd, 'title'),
              description: readL10n(fd, 'description'),
            })
            form.reset()
          }, 'Документ добавлен')
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            id для адреса (латиница, цифры, дефис)
            <input name="doc" className="ffp-input mt-1" placeholder="tz-hvac" pattern="[a-z0-9][a-z0-9\-]{0,47}" required />
          </label>
          <label className="block text-sm">
            Раздел
            <select name="section" defaultValue="docs" className="mt-1">
              {(Object.keys(SECTION_LABEL) as Section[]).map((s) => (
                <option key={s} value={s}>
                  {SECTION_LABEL[s]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <div className="mb-1 text-sm">Название (RU обязательно)</div>
          <L10nFields name="title" />
        </div>
        <div>
          <div className="mb-1 text-sm">Описание (необязательно)</div>
          <L10nFields name="description" />
        </div>
        <button className="ffp-btn ffp-btn-primary" disabled={busy}>
          Добавить
        </button>
      </form>
    </section>
  )
}

function DocAdmin({
  projectId,
  d,
  busy,
  run,
  setBusy,
  setMsg,
  maxMb,
}: {
  projectId: string
  d: PDoc
  busy: boolean
  run: RunFn
  setBusy: (b: boolean) => void
  setMsg: (m: { ok: boolean; text: string } | null) => void
  maxMb: number
}) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [progress, setProgress] = useState('')
  const base = { project: projectId, doc: d.id }
  const versions = [...d.versions].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  async function newVersion(form: HTMLFormElement) {
    const fd = new FormData(form)
    const groups = (['ru', 'sr', 'en', 'any'] as const).map((lang) => ({ lang, files: (fd.getAll(`files.${lang}`) as File[]).filter((f) => f.size > 0) }))
    const total = groups.reduce((n, g) => n + g.files.length, 0)
    if (!total) {
      setMsg({ ok: false, text: 'Выберите хотя бы один файл' })
      return
    }
    const tooBig = groups.flatMap((g) => g.files).find((f) => f.size > maxMb * 1048576)
    if (tooBig) {
      setMsg({ ok: false, text: `${tooBig.name}: больше ${maxMb} МБ` })
      return
    }
    setBusy(true)
    setMsg(null)
    try {
      const { version } = await api({
        action: 'createVersion',
        ...base,
        label: fd.get('label'),
        note: readL10n(fd, 'note'),
        makeCurrent: false,
      })
      let i = 0
      for (const g of groups) {
        for (const f of g.files) {
          i++
          await uploadFile({ ...base, version, lang: g.lang }, f, (pct) => setProgress(`Файл ${i} из ${total}: ${f.name} — ${pct}%`))
        }
      }
      // Актуальной версия становится только после загрузки всех файлов
      if (fd.get('makeCurrent')) await api({ action: 'setCurrent', ...base, version })
      form.reset()
      setMsg({ ok: true, text: `Версия загружена (${total} файл.)` })
      router.refresh()
    } catch (e) {
      setMsg({ ok: false, text: `${(e as Error).message}. Версия сохранена как неактуальная — проверьте файлы ниже.` })
      router.refresh()
    } finally {
      setProgress('')
      setBusy(false)
    }
  }

  async function addFile(v: PVersion, form: HTMLFormElement) {
    const fd = new FormData(form)
    const files = (fd.getAll('file') as File[]).filter((f) => f.size > 0)
    if (!files.length) return
    setBusy(true)
    setMsg(null)
    try {
      for (const f of files) {
        await uploadFile({ ...base, version: v.id, lang: String(fd.get('lang')) }, f, (pct) => setProgress(`${f.name} — ${pct}%`))
      }
      form.reset()
      setMsg({ ok: true, text: 'Файл добавлен' })
      router.refresh()
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message })
    } finally {
      setProgress('')
      setBusy(false)
    }
  }

  return (
    <section className="ffp-card space-y-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="ffp-muted text-xs">
            {SECTION_LABEL[d.section]} · id: {d.id}
          </div>
          <h2 className="text-lg font-bold">{d.title.ru}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="ffp-btn" disabled={busy} onClick={() => run(() => api({ action: 'moveDoc', ...base, dir: 'up' }))}>
            ↑
          </button>
          <button className="ffp-btn" disabled={busy} onClick={() => run(() => api({ action: 'moveDoc', ...base, dir: 'down' }))}>
            ↓
          </button>
          <button className="ffp-btn" onClick={() => setEditing((x) => !x)}>
            {editing ? 'Скрыть' : 'Название'}
          </button>
          <button
            className="ffp-btn ffp-btn-danger"
            disabled={busy}
            onClick={() => confirm(`Удалить документ «${d.title.ru}» со всеми версиями и файлами?`) && run(() => api({ action: 'deleteDoc', ...base }), 'Документ удалён')}
          >
            Удалить
          </button>
        </div>
      </div>

      {editing && (
        <form
          className="space-y-3 rounded-xl border border-[var(--ff-white-10)] p-3"
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            run(() => api({ action: 'updateDoc', ...base, title: readL10n(fd, 'title'), description: readL10n(fd, 'description'), section: fd.get('section') }))
          }}
        >
          <L10nFields name="title" value={d.title} />
          <div className="text-sm">Описание</div>
          <L10nFields name="description" value={d.description} />
          <select name="section" defaultValue={d.section} className="max-w-xs">
            {(Object.keys(SECTION_LABEL) as Section[]).map((s) => (
              <option key={s} value={s}>
                {SECTION_LABEL[s]}
              </option>
            ))}
          </select>
          <button className="ffp-btn ffp-btn-primary" disabled={busy}>
            Сохранить
          </button>
        </form>
      )}

      {versions.length > 0 && (
        <ul className="divide-y divide-[var(--ff-white-10)] rounded-xl border border-[var(--ff-white-10)]">
          {versions.map((v) => (
            <li key={v.id} className="space-y-2 p-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="ffp-badge ffp-badge-on">{v.label}</span>
                {v.id === d.current ? <span className="ffp-badge ffp-badge-on">актуальная</span> : <span className="ffp-badge">не актуальная</span>}
                <span className="ffp-muted">{fmtDate(v.createdAt)}</span>
                {v.note?.ru && <span className="ffp-muted">— {v.note.ru}</span>}
                <span className="ml-auto flex flex-wrap gap-2">
                  {v.id !== d.current && (
                    <button className="ffp-btn" disabled={busy} onClick={() => run(() => api({ action: 'setCurrent', ...base, version: v.id }), 'Версия сделана актуальной')}>
                      Сделать актуальной
                    </button>
                  )}
                  <button
                    className="ffp-btn ffp-btn-danger"
                    disabled={busy}
                    onClick={() => confirm(`Удалить версию ${v.label} и её файлы?`) && run(() => api({ action: 'deleteVersion', ...base, version: v.id }), 'Версия удалена')}
                  >
                    Удалить версию
                  </button>
                </span>
              </div>
              <ul className="space-y-1">
                {v.files.map((f) => (
                  <li key={f.id} className="flex flex-wrap items-center gap-2">
                    <span className="ffp-badge">{f.lang === 'any' ? '—' : f.lang.toUpperCase()}</span>
                    <a className="ffp-link" href={`/p/${projectId}/f/${d.id}/${v.id}/${f.stored}`} target="_blank" rel="noopener">
                      {f.original}
                    </a>
                    <span className="ffp-muted">{fmtSize(f.size)}</span>
                    <button
                      className="ffp-btn ffp-btn-danger px-2 py-0.5 text-xs"
                      disabled={busy}
                      onClick={() => confirm(`Удалить файл ${f.original}?`) && run(() => api({ action: 'deleteFile', ...base, version: v.id, file: f.id }), 'Файл удалён')}
                    >
                      ✕
                    </button>
                  </li>
                ))}
                {v.files.length === 0 && <li className="text-[var(--ff-warning)]">В версии нет файлов</li>}
              </ul>
              <form
                className="flex flex-wrap items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  addFile(v, e.currentTarget)
                }}
              >
                <span className="ffp-muted text-xs">Добавить файл в эту версию:</span>
                <select name="lang" defaultValue="ru" className="w-auto">
                  {LANG_OPTIONS.map((o) => (
                    <option key={o.v} value={o.v}>
                      {o.l}
                    </option>
                  ))}
                </select>
                <input type="file" name="file" multiple className="max-w-[260px] text-xs" />
                <button className="ffp-btn px-2 py-1 text-xs" disabled={busy}>
                  Загрузить
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}

      <details className="rounded-xl border border-[var(--ff-white-10)] p-3" open={versions.length === 0}>
        <summary className="cursor-pointer font-semibold">＋ Новая версия</summary>
        <form
          className="mt-3 space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            newVersion(e.currentTarget)
          }}
        >
          <label className="block max-w-xs text-sm">
            Номер версии
            <input name="label" className="ffp-input mt-1" placeholder="v33" required maxLength={40} />
          </label>
          <div>
            <div className="mb-1 text-sm">Что изменилось (увидят рабочие, необязательно)</div>
            <L10nFields name="note" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {LANG_OPTIONS.map((o) => (
              <label key={o.v} className="block text-sm">
                Файлы: {o.l}
                {o.v === 'any' && <span className="ffp-muted"> (3D-модель, картинки, чертежи)</span>}
                <input type="file" name={`files.${o.v}`} multiple className="mt-1 block w-full text-xs" />
              </label>
            ))}
          </div>
          <p className="ffp-muted text-xs">
            Один язык может содержать несколько файлов: например .md для чтения на странице и .pdf для скачивания. Лимит — {maxMb} МБ на файл.
          </p>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="makeCurrent" defaultChecked className="w-auto" /> Сразу сделать актуальной
          </label>
          <button className="ffp-btn ffp-btn-primary" disabled={busy}>
            Загрузить версию
          </button>
          {progress && <p className="text-sm text-[var(--ff-neon-bloom)]">{progress}</p>}
        </form>
      </details>
    </section>
  )
}
