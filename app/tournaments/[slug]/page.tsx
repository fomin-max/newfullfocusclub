import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import ProgressBar from '@/components/ui/ProgressBar'
import Ticker from '@/components/ui/Ticker'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import MobileStickyBar from '@/components/ui/MobileStickyBar'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import DraftRegistrationForm from '@/components/tournaments/DraftRegistrationForm'
import ParticipantsList from '@/components/tournaments/ParticipantsList'
import { getTournament } from '@/lib/supabase'
import './tournament-page.css'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const t = await getTournament(slug)
  if (!t) return { title: 'Турнир не найден' }
  return {
    title: `${t.title} — Full Focus Club`,
    description: t.description ?? t.subtitle ?? undefined,
    metadataBase: new URL('https://fullfocusclub.ru'),
    alternates: { canonical: `/tournaments/${slug}` },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric',
    timeZone: 'Europe/Moscow',
  })
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('ru-RU', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow',
  })
}

export default async function TournamentPage({ params }: Props) {
  const { slug } = await params
  const tournament = await getTournament(slug)
  if (!tournament) notFound()

  const isOpen  = tournament.status === 'registration_open'
  const prizes  = tournament.prize_breakdown as Record<string, string | number> | null
  const partners = tournament.partners

  return (
    <>
      <ProgressBar />
      <Ticker />
      <Header />
      <main className="tp-page">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="tp-hero">
          <div className="tp-hero__bg" />
          <div className="tp-hero__overlay" />
          <div className="tp-hero__mesh" />
          <div className="tp-hero__scan" />
          <span className="tp-hero__hash">//// ТУРНИР · FULL FOCUS</span>

          <div className="tp-hero__inner">
            <div className="tp-hero__badges">
              {isOpen && (
                <span className="tp-badge-live">
                  <span className="tp-badge-live__dot" />
                  Регистрация открыта
                </span>
              )}
              <span className="ff-tag">{tournament.format.replace(/_/g, ' ')}</span>
            </div>
            <Reveal>
              <h1 className="tp-hero__title">
                {tournament.title_accent ? (
                  <>
                    <span className="tp-hero__line1">FULL FOCUS</span>
                    <span className="tp-hero__line2">{tournament.title_accent}</span>
                  </>
                ) : (
                  <span className="tp-hero__line1">{tournament.title}</span>
                )}
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <div className="tp-hero__meta">
                <span className="tp-hero__meta-item">
                  <Icon name="calendar" size={18} />
                  {formatDate(tournament.date)} · {formatTime(tournament.date)}
                </span>
                {tournament.location_name && (
                  <span className="tp-hero__meta-item">
                    <Icon name="pin" size={18} />
                    {tournament.location_name}
                  </span>
                )}
              </div>
            </Reveal>
          </div>

          {/* Stats bar — inside hero, overlaps page transition via mask */}
          <div className="tp-stats">
            <div className="tp-stat">
              <span className="tp-stat__lbl">Призовой фонд</span>
              <span className="tp-stat__val tp-stat__val--accent">
                {tournament.prize_pool?.toLocaleString('ru')} ₽
              </span>
            </div>
            <div className="tp-stat">
              <span className="tp-stat__lbl">Участников</span>
              <span className="tp-stat__val">до {tournament.max_participants}</span>
            </div>
            <div className="tp-stat">
              <span className="tp-stat__lbl">Взнос</span>
              <span className="tp-stat__val">{tournament.entry_fee.toLocaleString('ru')} ₽</span>
            </div>
            <div className="tp-stat">
              <span className="tp-stat__lbl">Сбор участников</span>
              <span className="tp-stat__val">{formatTime(tournament.date)}</span>
            </div>
          </div>
        </section>

        {/* ── Body — 2 columns ──────────────────────────────────── */}
        <div className="tp-body-wrap">

          {/* Left column */}
          <div className="tp-main">

            {/* About */}
            {tournament.description && (
              <section>
                <div className="cd-block__head">
                  <Reveal><span className="ff-tag">О турнире</span></Reveal>
                  <Reveal delay={70}><h2 className="cd-block__title">ОПИСАНИЕ<br />ТУРНИРА</h2></Reveal>
                </div>
                <Reveal delay={130}>
                  <p className="cd-about__text">{tournament.description}</p>
                </Reveal>
              </section>
            )}

            {/* How it works */}
            {tournament.format_steps && tournament.format_steps.length > 0 && (
              <section>
                <div className="cd-block__head">
                  <Reveal><span className="ff-tag">Как это работает</span></Reveal>
                  <Reveal delay={70}>
                    <h2 className="cd-block__title">{tournament.format.replace(/_/g, ' ')}</h2>
                  </Reveal>
                  {tournament.subtitle && (
                    <Reveal delay={100}><p className="cd-block__sub">{tournament.subtitle}</p></Reveal>
                  )}
                </div>
                <div className="cd-steps">
                  {tournament.format_steps.map((text, i) => (
                    <Reveal key={i} className="cd-step" delay={i * 70}>
                      <span className="cd-step__num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="cd-step__text">{text}</span>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {/* Prizes */}
            {prizes && (
              <section>
                <div className="cd-block__head">
                  <Reveal><span className="ff-tag">Призы</span></Reveal>
                  <Reveal delay={70}><h2 className="cd-block__title">ПРИЗОВОЙ ФОНД</h2></Reveal>
                </div>
                <div className="cd-prizes">
                  {Object.entries(prizes).map(([place, val], i) => (
                    <Reveal key={place} className={`cd-prize${place === '1' ? ' is-first' : ''}`} delay={i * 80}>
                      <span className="cd-prize__rank">{place}</span>
                      <span className="cd-prize__place">
                        {place === '1' ? '1 место' : place === '2' ? '2 место' : '3 место'}
                      </span>
                      <span className="cd-prize__val">
                        {typeof val === 'number' ? `${val.toLocaleString('ru')} ₽` : val}
                      </span>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right column — sticky registration form */}
          <div className="tp-aside">
            <DraftRegistrationForm tournament={tournament} />
          </div>

        </div>

        {/* ── Full-width sections ────────────────────────────────── */}

        {/* Participants */}
        {tournament.show_participants && (
          <>
            <div className="cd-divider" />
            <div className="cd-wide">
              <section className="cd-section">
                <div className="cd-block__head">
                  <Reveal><span className="ff-tag">Участники</span></Reveal>
                  <Reveal delay={70}><h2 className="cd-block__title">СПИСОК<br />УЧАСТНИКОВ</h2></Reveal>
                </div>
                <ParticipantsList tournament={tournament} />
              </section>
            </div>
          </>
        )}

        {/* Rules */}
        {tournament.rules && (
          <>
            <div className="cd-divider" />
            <div className="cd-wide">
              <section className="cd-section">
                <div className="cd-block__head">
                  <Reveal><span className="ff-tag">Правила</span></Reveal>
                  <Reveal delay={70}><h2 className="cd-block__title">ПРАВИЛА<br />ТУРНИРА</h2></Reveal>
                </div>
                <div className="cd-rules">
                  {tournament.rules.split('\n').filter(r => r.trim()).map((rule, i) => (
                    <Reveal key={i} className="cd-rule" delay={i * 55}>
                      <span className="cd-rule__mark">{String(i + 1).padStart(2, '0')}</span>
                      <span className="cd-rule__text">{rule.trim()}</span>
                    </Reveal>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}

        {/* Partners */}
        {partners && partners.length > 0 && (
          <>
            <div className="cd-divider" />
            <div className="cd-wide">
              <section className="cd-section">
                <div className="cd-block__head">
                  <Reveal><span className="ff-tag">Партнёры</span></Reveal>
                  <Reveal delay={70}><h2 className="cd-block__title">ПАРТНЁРЫ</h2></Reveal>
                </div>
                <div className="cd-partners">
                  {partners.map((p, i) => (
                    <Reveal key={i} className="cd-partner" delay={i * 70}>
                      <div className="cd-partner__logo">
                        {p.logo_url
                          ? <Image src={p.logo_url} alt={p.name} width={80} height={80} style={{ objectFit: 'contain' }} />
                          : <span className="cd-partner__logo-placeholder">{p.name}</span>
                        }
                      </div>
                      <span className="cd-partner__name">{p.name}</span>
                      {p.description && <p className="cd-partner__desc">{p.description}</p>}
                    </Reveal>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}

      </main>
      <Footer />
      <MobileStickyBar />
    </>
  )
}
