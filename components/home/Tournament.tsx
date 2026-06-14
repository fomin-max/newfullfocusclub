import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import { getTournaments } from '@/lib/supabase'

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', timeZone: 'Europe/Moscow',
  })
}
function formatWeekdayTime(iso: string) {
  const d = new Date(iso)
  const weekday = d.toLocaleDateString('ru-RU', { weekday: 'long', timeZone: 'Europe/Moscow' })
  const time    = d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow' })
  return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)} · ${time}`
}

export default async function Tournament() {
  const tournaments = await getTournaments()
  const t = tournaments.find(t =>
    t.status === 'registration_open' || t.status === 'upcoming'
  ) ?? null

  const title = t ? (t.title_accent ?? t.title) : null

  const meta = t ? [
    { label: 'Формат',     value: t.format.replace(/_/g, ' ') },
    { label: 'Призовой',   value: `${t.prize_pool?.toLocaleString('ru')} ₽`, accent: true },
    { label: 'Участников', value: `до ${t.max_participants}` },
    { label: 'Взнос',      value: `${t.entry_fee.toLocaleString('ru')} ₽ / ${t.participant_type === 'team' ? 'игрок' : 'участник'}` },
  ] : []

  return (
    <section id="tournament" className="ff-section">
      <div className="ff-section__inner">
        <Reveal className="ff-section-head">
          <span className="ff-tag">Турниры</span>
          <h2 className="ff-section-head__title">Докажи, что ты лучший</h2>
          <p className="ff-section-head__sub">
            Регулярные турниры по CS2, Dota 2, Valorant и Tekken. Призовые, мерч и эфиры на твиче.
          </p>
        </Reveal>

        {t ? (
          <Reveal>
            <div className="ff-tournament__card">
              <div className="ff-tournament__left">
                <div className="ff-tournament__date">
                  <strong>{formatDay(t.date)}</strong>
                  <span>· {formatWeekdayTime(t.date)}</span>
                </div>
                <h3 className="ff-tournament__title">{title}</h3>
                {t.location_name && (
                  <p className="ff-tournament__loc">
                    <Icon name="pin" size={16} />
                    <span>{t.location_name}</span>
                  </p>
                )}
                <div className="ff-tournament__cta">
                  <a href={`/tournaments/${t.slug}#registration`} className="ff-btn ff-btn--primary is-pulse">
                    Зарегистрироваться <Icon name="arrowRight" size={14} />
                  </a>
                  <a href="/tournaments" className="ff-btn ff-btn--secondary">
                    Все турниры <Icon name="arrowRight" size={14} />
                  </a>
                </div>
              </div>
              <dl className="ff-tournament__meta">
                {meta.map((m, i) => (
                  <div key={i} className="ff-tournament__meta-cell">
                    <dt>{m.label}</dt>
                    <dd>{m.accent ? <span className="mint">{m.value}</span> : m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="ff-tournament__card">
              <div className="ff-tournament__left">
                <p className="ff-tournament__loc" style={{ marginBottom: 20 }}>
                  Сейчас активных турниров нет. Следи за анонсами!
                </p>
                <div className="ff-tournament__cta">
                  <a href="https://t.me/fullfocusclubru?direct" target="_blank" rel="noopener noreferrer"
                     className="ff-btn ff-btn--primary">
                    Telegram-канал <Icon name="telegram" size={14} />
                  </a>
                  <a href="/tournaments" className="ff-btn ff-btn--secondary">
                    Все турниры <Icon name="arrowRight" size={14} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
