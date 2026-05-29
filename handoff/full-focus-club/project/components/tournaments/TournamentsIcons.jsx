/* TournamentsIcons.jsx — extra line glyphs for the /tournaments page.
   Wraps window.CI (club icons), adding tournament-specific glyphs.
   Stroke-only, currentColor. Exposed as window.TI. */
const TournIcon = ({ name, size = 18, ...rest }) => {
  const paths = {
    broadcast: (<><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/></>),
    ruble:     (<><path d="M7 21V4h6a4 4 0 0 1 0 8H7"/><line x1="4" y1="12" x2="13" y2="12"/><line x1="4" y1="16" x2="11" y2="16"/></>),
    clock:     (<><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></>),
    info:      (<><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>),
    search:    (<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>),
    x:         (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
    crosshair: (<><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="3" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="21" y2="12"/></>),
    swords:    (<><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6-6"/><path d="m16 16 4 4"/><path d="m19 21 2-2"/><path d="M14.5 6.5 18 3h3v3l-3.5 3.5"/><path d="m5 14 6 6"/><path d="m8 17-2 2"/><path d="m2 22 3-3"/></>),
    list:      (<><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>),
    pin:       (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
    chevronLeft:  <polyline points="15 18 9 12 15 6"/>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
  };
  if (!paths[name] && window.CI) {
    return <window.CI name={name} size={size} {...rest} />;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name] || null}
    </svg>
  );
};
window.TI = TournIcon;
