/* Tariffs.jsx — §5 weekday/weekend flip table */
const { useState: useStateTR, useEffect: useEffectTR, useRef: useRefTR } = React;

const Tariffs = () => {
  const { TARIFFS } = window.CLUB_DATA;
  const { Reveal } = window.FF;
  const [mode, setMode] = useStateTR('weekday'); // 'weekday' | 'weekend'
  const [flipKey, setFlipKey] = useStateTR(0);
  const isFirst = useRefTR(true);

  // Trigger flip animation when mode changes
  useEffectTR(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    setFlipKey(k => k + 1);
  }, [mode]);

  const valueOf = (pair) => {
    if (!pair) return null;
    return mode === 'weekday' ? pair[0] : pair[1];
  };

  return (
    <section id="tariffs" className="ff-section" data-screen-label="05 · ТАРИФЫ">
      <div className="ff-section__inner">
        <Reveal>
          <div className="cl-tariffs__head">
            <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
              <span className="ff-tag">— цены в рублях</span>
              <h2 className="ff-section-head__title" style={{ margin:0 }}>ТАРИФЫ</h2>
            </div>
            <div className="cl-tariffs__toggle" role="tablist" aria-label="День недели">
              <button className={mode==='weekday'?'is-on':''}
                      onClick={() => setMode('weekday')}>
                БУДНИ
              </button>
              <button className={mode==='weekend'?'is-on':''}
                      onClick={() => setMode('weekend')}>
                ВЫХОДНЫЕ
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="cl-tariffs__wrap">
            <div className="cl-tariffs__scroll">
              <table className="cl-tariffs__table">
                <thead>
                  <tr>
                    <th>Зона</th>
                    {TARIFFS.cols.map((c, i) => (
                      <th key={c} className={i === TARIFFS.popular ? 'popular' : ''}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TARIFFS.rows.map((row, ri) => (
                    <tr key={row.zone}>
                      <th scope="row">{row.zone}</th>
                      {row.vals.map((pair, ci) => {
                        const v = valueOf(pair);
                        // Stagger flip delay across cells
                        const delay = `${ri * 0.02 + ci * 0.04}s`;
                        return (
                          <td key={ci}>
                            {v === null ? (
                              <span className="cl-tariffs__empty">—</span>
                            ) : (
                              <span key={flipKey}
                                    className="cl-tariffs__cell is-flip"
                                    style={{ animationDelay: delay }}>
                                {v} ₽
                                <sub>{TARIFFS.cols[ci]}</sub>
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="best">
                    <th scope="row" colSpan="6" style={{ padding:'14px 16px' }}>
                      ↑ Ночь 10ч — самая низкая цена за час сессии
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cl-tariffs__student">
              <strong>🎓 БОНУС</strong>
              <span>{TARIFFS.student.replace(/^🎓\s+/, '')}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.Tariffs = Tariffs;
