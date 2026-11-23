import { notFound } from 'next/navigation'
import { isId, portalEnabled, MAX_FILE_BYTES } from '@/lib/portal/config'
import { adminConfigured, hasRole } from '@/lib/portal/auth'
import { readProject } from '@/lib/portal/store'
import { DICT } from '@/lib/portal/i18n'
import LoginForm from '../../_components/LoginForm'
import AdminApp from '../../_components/AdminApp'

export const dynamic = 'force-dynamic'

export default async function AdminPage({ params }: { params: Promise<{ project: string }> }) {
  if (!portalEnabled()) notFound()
  const { project } = await params
  if (!isId(project)) notFound()

  if (!adminConfigured()) {
    return (
      <div className="ffp-wrap py-16">
        <div className="ffp-card max-w-xl p-6">
          <h1 className="mb-2 text-xl font-bold">Админка выключена</h1>
          <p className="ffp-muted">
            Задайте на сервере в .env.production переменные PORTAL_ADMIN_PASSWORD и PORTAL_SECRET и перезапустите сайт.
          </p>
        </div>
      </div>
    )
  }

  if (!(await hasRole('admin'))) return <LoginForm role="admin" t={DICT.ru} title={DICT.ru.adminLoginTitle} />

  const p = await readProject(project)
  return <AdminApp projectId={project} project={p} maxMb={Math.round(MAX_FILE_BYTES / 1048576)} />
}
