import { LANGS, type Lang } from '@/lib/portal/config'
import { LANG_LABEL } from '@/lib/portal/i18n'

/** Шапка портала: название проекта и переключатель языка (язык передаётся в адресе как ?lang=). */
export default function Header({
  title,
  subtitle,
  lang,
  basePath,
  query = {},
}: {
  title: string
  subtitle?: string
  lang: Lang
  basePath: string
  query?: Record<string, string>
}) {
  return (
    <header className="border-b border-[var(--ff-white-10)] bg-[var(--ff-surface)]">
      <div className="ffp-wrap flex flex-wrap items-center justify-between gap-3 py-4">
        <div className="min-w-0">
          <div className="ffp-head text-[11px] tracking-[0.2em] text-[var(--ff-neon-bloom)]">FULL FOCUS</div>
          <div className="ffp-head truncate text-lg font-bold sm:text-xl">{title}</div>
          {subtitle && <div className="ffp-muted text-sm">{subtitle}</div>}
        </div>
        <nav className="flex gap-1" aria-label="Language">
          {LANGS.map((l) => {
            const qs = new URLSearchParams({ ...query, ...(l === 'ru' ? {} : { lang: l }) }).toString()
            return (
              <a
                key={l}
                href={`${basePath}${qs ? `?${qs}` : ''}`}
                className={`ffp-btn px-3 py-1.5 ${l === lang ? 'ffp-btn-primary' : ''}`}
                aria-current={l === lang ? 'true' : undefined}
              >
                {LANG_LABEL[l]}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
