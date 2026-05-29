/* Features.jsx — §6 bento grid (unique features) */
const Features = () => {
  const { CLUB, FEATURES } = window.CLUB_DATA;
  const { Reveal } = window.FF;
  const Icon = window.CI;

  // Bento sizes:
  //   big   = 2x2  → ARENA (with photo)
  //   wide  = 2x1  → KITCHEN, PS5 VIP
  //   small = 1x1  → BILLIARD, POKER, YAMAGUCHI
  // Layout total in 4 cols:
  //   row 1: ARENA(2x2)        KITCHEN(2x1)
  //   row 2: ARENA cont        BILLIARD POKER
  //   row 3: YAMAGUCHI ───── PS5 VIP(2x1) ─────
  // Add a tiny FF deco tile to fill the residual gap in row 3.

  return (
    <section id="features" className="ff-section" data-screen-label="06 · ОСОБЕННОСТИ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="ff-section-head">
            <span className="ff-tag">{CLUB.FEATURES_TAG || '— только на Василеостровской'}</span>
            <h2 className="ff-section-head__title">
              {CLUB.FEATURES_TITLE || 'ТОЛЬКО ЗДЕСЬ'}
            </h2>
            <p className="ff-section-head__sub">
              {CLUB.FEATURES_SUB || 'Шесть вещей, которые делают Василеостровскую особенной. В других клубах сети — этого нет.'}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="cl-bento">
            {FEATURES.map((f) => {
              const cls = [
                'cl-bento__cell',
                `cl-bento__cell--${f.size}`,
                f.image && 'cl-bento__cell--media',
              ].filter(Boolean).join(' ');
              const style = f.image ? { '--bg': `url(${f.image})` } : {};
              return (
                <div key={f.id} className={cls} style={style}>
                  {f.tag && <span className="cl-bento__tag">★ {f.tag}</span>}
                  {f.icon && (
                    <span className="cl-bento__icon">
                      <Icon name={f.icon} size={22} />
                    </span>
                  )}
                  <h3 className="cl-bento__name">{f.name}</h3>
                  <p className="cl-bento__desc">{f.desc}</p>
                  {f.note && <p className="cl-bento__note">{f.note}</p>}
                </div>
              );
            })}
            {/* Decorative tail tile — fills bento residual cell */}
            <div className="cl-bento__cell cl-bento__cell--deco">
              <span className="cl-bento__hash">// 01 / 08</span>
              <h3 className="cl-bento__name" style={{ fontSize: 18 }}>
                ОДИН ИЗ ВОСЬМИ КЛУБОВ FF
              </h3>
              <p className="cl-bento__desc">
                Сеть с 2022 — топовое железо, единые стандарты, программа лояльности
                действует во всех клубах.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.Features = Features;
