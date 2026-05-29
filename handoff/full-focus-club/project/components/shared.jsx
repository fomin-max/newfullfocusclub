/* shared.jsx — primitives & hooks for the Full Focus B2C homepage */

const { useState, useEffect, useRef, useCallback } = React;

/* ------------- Lucide-style line icons ------------- */
const Icon = ({ name, size = 18, ...rest }) => {
  const paths = {
    arrowRight: (<><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>),
    arrowDown:  (<><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></>),
    star:       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    pin:        (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
    monitor:    (<><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>),
    cpu:        (<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>),
    users:      (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>),
    user:       (<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>),
    sofa:       (<><path d="M3 18v-6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6"/><path d="M3 14h18"/><path d="M5 21v-3"/><path d="M19 21v-3"/></>),
    gamepad:    (<><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258"/></>),
    bolt:       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    trophy:     (<><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 4h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4"/><path d="M7 4H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4"/></>),
    calendar:   (<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>),
    gift:       (<><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></>),
    cake:       (<><path d="M20 21V11a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10z"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="8" y1="4" x2="8" y2="6"/><line x1="16" y1="4" x2="16" y2="6"/></>),
    taxi:       (<><rect x="2" y="11" width="20" height="9" rx="2"/><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><circle cx="7" cy="17" r="1"/><circle cx="17" cy="17" r="1"/><path d="M9 6V4h6v2"/></>),
    school:     (<><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>),
    twitch:     (<><path d="M3 5l2-3h16v13l-5 5h-4l-3 3H6v-3H3z"/><line x1="11" y1="7" x2="11" y2="12"/><line x1="16" y1="7" x2="16" y2="12"/></>),
    userPair:   (<><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 21v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1"/><path d="M16 21v-1a3 3 0 0 1 3-3h1a2 2 0 0 1 2 2v2"/></>),
    vk:         (<path d="M20.5 7.5h-2c-.4 0-.6.2-.8.5-.6 1.5-1.5 3-1.9 3-.2 0-.3-.2-.3-.6V7.8c0-.5-.2-.7-.6-.7h-3.2c-.3 0-.5.2-.5.5 0 .5.7.6.8 2v3c0 .6-.1.7-.4.7-.8 0-2.2-2.7-3-5.7-.2-.5-.3-.8-1-.8H4.5c-.5 0-.6.2-.6.5 0 .5.8 3.4 3.4 7.2 1.8 2.6 4.2 4 6.4 4 1.4 0 1.5-.3 1.5-.8v-1.7c0-.5.1-.6.5-.6.3 0 .8.1 2 1.3 1.4 1.3 1.6 1.9 2.4 1.9h2c.5 0 .8-.3.6-.8-.4-1.3-2.9-3.7-3-3.9-.3-.3-.2-.5 0-.8.1-.1 2.2-3 2.4-4 .2-.4.1-.7-.5-.7z"/>),
    telegram:   (<path d="M21.5 4.5l-3 14c-.2 1-.8 1.2-1.6.7l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.5 8.2-7.4c.4-.3-.1-.5-.6-.2l-10.1 6.4-4.4-1.4c-.9-.3-.9-.9.2-1.4l17.3-6.7c.8-.3 1.5.2 1.3 1.3z"/>),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name] || null}
    </svg>
  );
};

/* ------------- Button ------------- */
const Button = ({ variant = 'primary', size, pulse, children, ...rest }) => {
  const cls = [
    'ff-btn', `ff-btn--${variant}`,
    size && `ff-btn--${size}`,
    pulse && 'is-pulse',
  ].filter(Boolean).join(' ');
  return <button className={cls} {...rest}>{children}</button>;
};

/* ------------- Tag ------------- */
const Tag = ({ children }) => <span className="ff-tag">{children}</span>;

/* ------------- Card with mouse-tracking glow ------------- */
const Card = React.forwardRef(({ className = '', featured, brackets, children, as: T = 'div', ...rest }, fwdRef) => {
  const ownRef = useRef(null);
  const setRef = useCallback((node) => {
    ownRef.current = node;
    if (typeof fwdRef === 'function') fwdRef(node);
    else if (fwdRef) fwdRef.current = node;
  }, [fwdRef]);
  const onMove = useCallback((e) => {
    const el = ownRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
  const cls = [
    'ff-card',
    featured && 'is-featured',
    brackets && 'ff-card--brackets',
    className,
  ].filter(Boolean).join(' ');
  return (
    <T ref={setRef} className={cls} onMouseMove={onMove} {...rest}>
      <span className="ff-card__glow" />
      <span style={{ position: 'relative', zIndex: 1, display: 'flex',
                     flexDirection: 'column', height: '100%', gap: 'inherit' }}>
        {children}
      </span>
    </T>
  );
});

/* ------------- prefers-reduced-motion ------------- */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------- useScramble — text scramble, runs once ------------- */
const useScramble = (text, { duration = 800, delay = 300 } = {}) => {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (prefersReducedMotion() || window.innerWidth < 768) { setOut(text); return; }
    const chars = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const rnd = () => chars[Math.floor(Math.random() * chars.length)];
    let raf, t0;
    const timer = setTimeout(() => {
      t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const reveal = Math.floor(p * text.length);
        let scrambled = '';
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (i < reveal || ch === ' ' || ch === '\n') scrambled += ch;
          else scrambled += rnd();
        }
        setOut(scrambled);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); if (raf) cancelAnimationFrame(raf); };
  }, [text, duration, delay]);
  return out;
};

/* ------------- useTilt — 3D tilt on mousemove, desktop only ------------- */
const useTilt = ({ max = 8 } = {}) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (prefersReducedMotion()) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    if (!mq.matches) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * 2 * max;
      const ry = (x - 0.5) * 2 * max;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.willChange = 'transform';
        el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      setTimeout(() => { el.style.willChange = 'auto'; }, 400);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);
  return ref;
};

/* ------------- Reveal on scroll ------------- */
const Reveal = ({ delay = 0, as: T = 'div', className = '', children, ...rest }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setShown(true), delay);
        io.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <T ref={ref} className={`ff-reveal ${shown ? 'is-in' : ''} ${className}`} {...rest}>
      {children}
    </T>
  );
};

/* ------------- useCountUp ------------- */
const useCountUp = (target, { duration = 1600, decimals = 0 } = {}) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      if (prefersReducedMotion()) { setVal(target); return; }
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  const formatted = decimals === 0
    ? Math.round(val).toString()
    : val.toFixed(decimals);
  return [formatted, ref];
};

/* ------------- Section primitive ------------- */
const Section = ({ id, label, title, sub, center, className = '', children }) => (
  <section id={id} className={`ff-section ${className}`} data-screen-label={label}>
    <div className="ff-section__inner">
      {(title || label) && (
        <Reveal className={`ff-section-head ${center ? 'center' : ''}`}>
          {label && <Tag>{label}</Tag>}
          {title && <h2 className="ff-section-head__title">{title}</h2>}
          {sub && <p className="ff-section-head__sub">{sub}</p>}
        </Reveal>
      )}
      {children}
    </div>
  </section>
);

window.FF = { Icon, Button, Tag, Card, Reveal, Section, useCountUp, useScramble, useTilt, prefersReducedMotion };
