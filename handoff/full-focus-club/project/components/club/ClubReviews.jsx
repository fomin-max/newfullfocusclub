/* ClubReviews.jsx — §8 marquee reviews */
const ClubReviews = () => {
  const { REVIEWS, CLUB } = window.CLUB_DATA;
  const { Reveal } = window.FF;

  // Split into two rows for top→right and bottom→left animation
  const half = Math.ceil(REVIEWS.length / 2);
  const top    = REVIEWS.slice(0, half);
  const bottom = REVIEWS.slice(half);

  const renderRow = (items) => (
    <>
      {[...items, ...items].map((r, i) => (
        <article key={i} className="cl-quote">
          <div className="cl-quote__row">
            <span>{r.name}</span>
            <span className="cl-quote__stars">{'★'.repeat(r.stars)}</span>
          </div>
          <p className="cl-quote__text">«{r.text}»</p>
          <span className="cl-quote__src">{r.src} · отзыв</span>
        </article>
      ))}
    </>
  );

  return (
    <section id="reviews" className="ff-section" data-screen-label="08 · ОТЗЫВЫ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="cl-reviews__head">
            <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
              <span className="ff-tag">— что говорят гости</span>
              <h2 className="ff-section-head__title" style={{ margin:0 }}>
                {CLUB.REVIEWS_TITLE || 'ОТЗЫВЫ ИЗ ЯНДЕКСА И 2ГИС'}
              </h2>
            </div>
            <div className="cl-reviews__rating">
              <strong>5.0</strong>
              <em>★★★★★</em>
              <span style={{ color: 'var(--ff-system-fog)', fontSize: 12, fontWeight: 600 }}>
                · {CLUB.REVIEWS_COUNT || '240+ отзывов'}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="cl-marquee">
            <div className="cl-marquee__track">
              {renderRow(top)}
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="cl-marquee cl-marquee--rev" style={{ marginTop: 16 }}>
            <div className="cl-marquee__track">
              {renderRow(bottom)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.ClubReviews = ClubReviews;
