/* SocialProof.jsx — §5 "нам доверяют" — 2 feature blocks + partners */
const SocialProof = () => {
  const { Section, Reveal } = window.FF;
  const Icon = window.EI;
  const { PROOF, PARTNERS } = window.EVENTS_DATA;

  return (
    <Section id="proof" label="— реальные кейсы" title="НАМ ДОВЕРЯЮТ"
             sub="Площадка для медиатурниров и съёмок — клуб работает не только как клуб.">
      <div className="ev-proof__grid">
        {PROOF.map((p, i) => (
          <Reveal key={p.id} delay={80 + i * 140}>
            <article className="ev-proof">
              <div className="ev-proof__media">
                <image-slot
                  id={p.slot}
                  src={p.image}
                  shape="rect"
                  fit="cover"
                  placeholder="Перетащи реальное фото"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                ></image-slot>
                <div className="ev-proof__media-shade" />
                <span className="ev-proof__badge">{p.badge}</span>
              </div>
              <div className="ev-proof__body">
                <span className="ev-proof__type">{p.type}</span>
                <h3 className="ev-proof__name">{p.name}</h3>
                <p className="ev-proof__desc">{p.desc}</p>
                {p.projects && (
                  <div className="ev-proof__projects">
                    {p.projects.map((pr) => (
                      <span key={pr} className="ev-proof__chip">
                        <Icon name="film" size={13} /> {pr}
                      </span>
                    ))}
                  </div>
                )}
                {p.cta && (
                  <a className="ev-proof__cta" href={p.cta.href} target="_blank" rel="noopener">
                    {p.cta.label} <Icon name="arrowRight" size={14} />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <div className="ev-partners">
          <span className="ev-partners__label">// Турниры и кейсы партнёров</span>
          <div className="ev-partners__row">
            {PARTNERS.map((p) => (
              <span key={p.name} className="ev-partner__logo">{p.name}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
};

window.EVENTS_PAGE = window.EVENTS_PAGE || {};
window.EVENTS_PAGE.SocialProof = SocialProof;
