/* Gallery.jsx — §7 masonry of image-slots (seeded with real photos) */
const Gallery = () => {
  const { Section, Reveal } = window.FF;
  const Icon = window.EI;
  const { GALLERY } = window.EVENTS_DATA;

  return (
    <Section id="gallery" label="— атмосфера" title="АТМОСФЕРА"
             sub="Перетащи свои фото в любую плитку — галерея запомнит их.">
      <div className="ev-gallery">
        {GALLERY.map((g, i) => (
          <Reveal key={g.id} delay={40 + i * 70} className={`ev-gallery__cell ev-gallery__cell--${g.span}`}>
            <div className="ev-gallery__tile">
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
    </Section>
  );
};

window.EVENTS_PAGE = window.EVENTS_PAGE || {};
window.EVENTS_PAGE.Gallery = Gallery;
