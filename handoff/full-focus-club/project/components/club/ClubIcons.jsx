/* ClubIcons.jsx — additional icons for club pages
   Wraps the shared FF.Icon so we can add club-specific glyphs
   without editing the shared file. */
const ClubIcon = ({ name, size = 18, ...rest }) => {
  const paths = {
    arrowLeft:  (<><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>),
    clock:      (<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>),
    utensils:   (<><path d="M3 2v7c0 1.66 1.34 3 3 3v10" /><path d="M9 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></>),
    briefcase:  (<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>),
    cards:      (<><rect x="6" y="3" width="12" height="18" rx="2" /><line x1="9" y1="7" x2="9.01" y2="7"/><line x1="15" y1="17" x2="15.01" y2="17"/></>),
    chair:      (<><path d="M6 19v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" /><path d="M5 22h14" /><path d="M7 13V8a5 5 0 0 1 10 0v5" /></>),
    kitchen:    (<><path d="M4 4h16v4H4z" /><path d="M6 8v12h12V8" /><line x1="10" y1="12" x2="14" y2="12" /></>),
    billiard:   (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></>),
    phone:      (<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />),
    mapPin:     (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
    check:      <polyline points="20 6 9 17 4 12" />,
    monitor:    (<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>),
    cpu:        (<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>),
    memory:     (<><path d="M6 19v-3"/><path d="M10 19v-3"/><path d="M14 19v-3"/><path d="M18 19v-3"/><path d="M8 11V9"/><path d="M16 11V9"/><path d="M12 11V9"/><path d="M2 15h20"/><path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"/></>),
    keyboard:   (<><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h0"/><path d="M10 10h0"/><path d="M14 10h0"/><path d="M18 10h0"/><path d="M6 14h0"/><path d="M18 14h0"/><path d="M10 14h4"/></>),
    projector:  (<><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><circle cx="14" cy="12" r="3"/><line x1="7" y1="12" x2="7.01" y2="12"/></>),
    sofa:       (<><path d="M3 18v-6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6"/><path d="M3 14h18"/></>),
    tv:         (<><rect x="2" y="5" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></>),
    gamepad:    (<><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258"/></>),
    speakers:   (<><circle cx="12" cy="8" r="2"/><circle cx="12" cy="16" r="3"/><rect x="6" y="2" width="12" height="20" rx="2"/></>),
    trophy:     (<><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 4h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4"/><path d="M7 4H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4"/></>),
    cake:       (<><path d="M20 21V11a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10z"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><line x1="12" y1="2" x2="12" y2="6"/></>),
    route:      (<><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></>),
    map:        (<><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>),
    leaf:       (<><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></>),
  };
  // Fallback to shared FF.Icon for icons we don't override
  if (!paths[name] && window.FF?.Icon) {
    return <window.FF.Icon name={name} size={size} {...rest} />;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name] || null}
    </svg>
  );
};
window.CI = ClubIcon;
