/* TournamentsGallery.jsx — §6 masonry of image-slots + lightbox */
const { useState: useStateTG, useEffect: useEffectTG } = React;

const TournamentsGallery = () => {
  const { Section, Reveal } = window.FF;
  const Icon = window.TI;
  const { GALLERY } = window.TOURN_DATA;
  const [box, setBox] = useStateTG(null); // {src, label} or null

  // Read the current image rendered inside an <image-slot> (user drop or seed)
  const openTile = (g) => {
    let src = g.src;
    const host = document.getElementById(g.id);
    if (host) {
      const img = host.querySelector('img');
      if (img && img.src) src = img.src;
      else if (host.getAttribute('src')) src = host.getAttribute('src');
    }
    if (src) setBox({ src, label: g.label });
  };

  useEffectTG(() => {
    if (!box) return;
    const onKey = (e) => { if (e.key === 'Escape') setBox(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [box]);

  return (
    <Section id="gallery" label="— АТМОСФЕРА" title="АТМОСФЕРА"
             sub="Фото с наших турниров. Перетащи свои — галерея запомнит их.">
      <div className="ev-gallery">
        {GALLERY.map((g, i) => (
          <Reveal key={g.id} delay={40 + i * 70} className={`ev-gallery__cell ev-gallery__cell--${g.span}`}>
            <div className="ev-gallery__tile tn-gallery__tile" onClick={() => openTile(g)} role="button" tabIndex={0}
                 onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTile(g); } }}>
              <image-slot
                id={g.id}
                src={g.src || undefined}
                shape="rect"
                fit="cover"
                placeholder="Перетащи фото"
                style={{ width: '100%', height: '100%', display: 'block' }}
              ></image-slot>
              <div className="ev-gallery__overlay">
                <span className="ev-gallery__zoom"><Icon name="search" size={18} /></span>
                <span className="ev-gallery__label">{g.label}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {box && (
        <div className="tn-lightbox" onClick={() => setBox(null)}>
          <button className="tn-lightbox__close" aria-label="Закрыть" onClick={() => setBox(null)}>
            <Icon name="x" size={22} />
          </button>
          <figure className="tn-lightbox__fig" onClick={(e) => e.stopPropagation()}>
            <img src={box.src} alt={box.label} />
            <figcaption>{box.label}</figcaption>
          </figure>
        </div>
      )}
    </Section>
  );
};

window.TOURN_PAGE = window.TOURN_PAGE || {};
window.TOURN_PAGE.TournamentsGallery = TournamentsGallery;
