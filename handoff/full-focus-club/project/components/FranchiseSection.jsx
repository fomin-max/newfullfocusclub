/* FranchiseSection.jsx — full-bleed franchise pitch (above FFPay) */
const { Reveal, Icon, useCountUp, prefersReducedMotion } = window.FF;
const { useState, useEffect, useRef, useCallback } = React;

/* local scramble with a custom charset (Latin-only for the Audiowide line) */
const useScrambleSet = (text, charset, { duration = 600, delay = 200 } = {}) => {
  const [out, setOut] = useState(text);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (prefersReducedMotion() || window.innerWidth < 768) { setOut(text); return; }
    const rnd = () => charset[Math.floor(Math.random() * charset.length)];
    let raf, t0, started = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return;
      started = true; io.disconnect();
      const timer = setTimeout(() => {
        t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / duration);
          const reveal = Math.floor(p * text.length);
          let s = '';
          for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            s += (i < reveal || ch === ' ') ? ch : rnd();
          }
          setOut(s);
          if (p < 1) raf = requestAnimationFrame(tick);
          else setOut(text);
        };
        raf = requestAnimationFrame(tick);
      }, delay);
      el._timer = timer;
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); if (el._timer) clearTimeout(el._timer); };
  }, [text, charset, duration, delay]);
  return [out, ref];
};

/* count between two values (supports counting down), triggers on viewport */
const useCountFromTo = (from, to, { duration = 1600 } = {}) => {
  const [val, setVal] = useState(from);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (prefersReducedMotion()) { setVal(to); return; }
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(from + (to - from) * eased);
        if (p < 1) requestAnimationFrame(tick);
        else setVal(to);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [from, to, duration]);
  return [Math.round(val), ref];
};

const CYR_LAT = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const LAT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const ADV = [
  { icon: 'bolt',  title: 'Готовая модель', desc: 'Не надо изобретать с нуля' },
  { icon: 'cpu',   title: 'IT-экосистема',  desc: 'Собственный софт и интеграции' },
  { icon: 'users', title: 'Поддержка',      desc: 'Сопровождение на каждом этапе' },
];

const FranchiseSection = () => {
  const [line1, l1ref] = useScrambleSet('ОТКРОЙ СВОЙ', CYR_LAT, { duration: 600, delay: 120 });
  const [line2, l2ref] = useScrambleSet('FULL FOCUS', LAT, { duration: 600, delay: 260 });
  const [clubs, clubsRef]   = useCountFromTo(0, 8);
  const [money, moneyRef]   = useCountFromTo(0, 7);
  const [months, monthsRef] = useCountFromTo(30, 18);

  const secRef = useRef(null);
  const onMove = useCallback((e) => {
    const el = secRef.current; if (!el) return;
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);

  return (
    <section
      className="ff-fr"
      id="franchise"
      data-screen-label="Франшиза"
      ref={secRef}
      onMouseMove={onMove}
    >
      <span className="ff-fr__glow" aria-hidden="true" />
      <div className="ff-fr__inner">
        {/* LEFT */}
        <div className="ff-fr__left">
          <Reveal>
            <span className="ff-fr__hash">//// ФРАНШИЗА</span>
          </Reveal>
          <h2 className="ff-fr__title">
            <span ref={l1ref} className="ff-fr__title-cyr">{line1}</span>
            <span ref={l2ref} className="ff-fr__title-lat">{line2}</span>
          </h2>
          <Reveal delay={120}>
            <p className="ff-fr__sub">
              Готовая IT-экосистема, проверенная бизнес-модель и поддержка на каждом шаге.
              Клубы открываются — места ограничены.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="ff-fr__ctas">
              <a href="/franchise" className="ff-btn ff-btn--primary is-pulse">
                Условия франшизы <Icon name="arrowRight" size={14} />
              </a>
              <a href="/franchise#zayavka" className="ff-btn ff-btn--secondary ff-btn--on-purple">
                Оставить заявку
              </a>
            </div>
          </Reveal>
        </div>

        {/* RIGHT */}
        <div className="ff-fr__right">
          <div className="ff-fr__stats">
            <div className="ff-fr__stat" ref={clubsRef}>
              <span className="ff-fr__num">{clubs}</span>
              <span className="ff-fr__num-label">клубов уже работают</span>
            </div>
            <div className="ff-fr__stat" ref={moneyRef}>
              <span className="ff-fr__num">от {money} млн&nbsp;₽</span>
              <span className="ff-fr__num-label">инвестиции</span>
            </div>
            <div className="ff-fr__stat" ref={monthsRef}>
              <span className="ff-fr__num">&lt; {months} мес</span>
              <span className="ff-fr__num-label">окупаемость</span>
            </div>
          </div>

          <div className="ff-fr__adv">
            {ADV.map((a, i) => (
              <Reveal key={a.title} delay={150 * i} className="ff-fr__adv-item">
                <span className="ff-fr__adv-icon"><Icon name={a.icon} size={22} /></span>
                <span className="ff-fr__adv-title">{a.title}</span>
                <span className="ff-fr__adv-desc">{a.desc}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

window.FF.FranchiseSection = FranchiseSection;
