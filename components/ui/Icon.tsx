export type IconName =
  | 'arrowRight' | 'arrowDown' | 'arrowLeft' | 'star' | 'pin' | 'monitor' | 'cpu'
  | 'users' | 'user' | 'sofa' | 'gamepad' | 'bolt' | 'trophy'
  | 'calendar' | 'gift' | 'cake' | 'taxi' | 'school' | 'twitch'
  | 'userPair' | 'vk' | 'telegram'
  | 'clock' | 'utensils' | 'briefcase' | 'cards' | 'chair' | 'kitchen'
  | 'billiard' | 'phone' | 'memory' | 'keyboard' | 'projector' | 'tv'
  | 'speakers' | 'route' | 'map' | 'leaf'
  | 'broadcast' | 'check' | 'mic' | 'award' | 'info' | 'swords'
  | 'camera' | 'list' | 'ruble' | 'zoom' | 'burger' | 'plus' | 'minus'
  | 'mouse' | 'headphones'

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

const PATHS: Record<IconName, React.ReactNode> = {
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
  arrowLeft:  (<><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>),
  clock:      (<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>),
  utensils:   (<><path d="M3 2v7c0 1.66 1.34 3 3 3v10" /><path d="M9 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></>),
  briefcase:  (<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>),
  cards:      (<><rect x="6" y="3" width="12" height="18" rx="2" /><line x1="9" y1="7" x2="9.01" y2="7"/><line x1="15" y1="17" x2="15.01" y2="17"/></>),
  chair:      (<><path d="M6 19v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" /><path d="M5 22h14" /><path d="M7 13V8a5 5 0 0 1 10 0v5" /></>),
  kitchen:    (<><path d="M4 4h16v4H4z" /><path d="M6 8v12h12V8" /><line x1="10" y1="12" x2="14" y2="12" /></>),
  billiard:   (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></>),
  phone:      (<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />),
  memory:     (<><path d="M6 19v-3"/><path d="M10 19v-3"/><path d="M14 19v-3"/><path d="M18 19v-3"/><path d="M8 11V9"/><path d="M16 11V9"/><path d="M12 11V9"/><path d="M2 15h20"/><path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"/></>),
  keyboard:   (<><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h0"/><path d="M10 10h0"/><path d="M14 10h0"/><path d="M18 10h0"/><path d="M6 14h0"/><path d="M18 14h0"/><path d="M10 14h4"/></>),
  projector:  (<><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><circle cx="14" cy="12" r="3"/><line x1="7" y1="12" x2="7.01" y2="12"/></>),
  tv:         (<><rect x="2" y="5" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></>),
  speakers:   (<><circle cx="12" cy="8" r="2"/><circle cx="12" cy="16" r="3"/><rect x="6" y="2" width="12" height="20" rx="2"/></>),
  route:      (<><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></>),
  map:        (<><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>),
  leaf:       (<><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></>),
  broadcast:  (<><path d="M18.364 5.636a9 9 0 0 1 0 12.728"/><path d="M5.636 5.636a9 9 0 0 0 0 12.728"/><path d="M15.536 8.464a5 5 0 0 1 0 7.072"/><path d="M8.464 8.464a5 5 0 0 0 0 7.072"/><circle cx="12" cy="12" r="1"/></>),
  check:      (<><polyline points="20 6 9 17 4 12"/></>),
  mic:        (<><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></>),
  award:      (<><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>),
  info:       (<><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>),
  swords:     (<><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" y1="14" x2="9" y2="18"/><line x1="7" y1="21" x2="9" y2="19"/></>),
  camera:     (<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>),
  list:       (<><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>),
  ruble:      (<><path d="M6 4h8a4 4 0 0 1 0 8H6"/><path d="M6 12h10"/><path d="M6 20V4"/></>),
  zoom:       (<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></>),
  burger:     (<><path d="M3 11h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/><path d="M12 11V7a4 4 0 0 0-8 0v4"/><path d="M8 21v-4a2 2 0 0 1 4 0v4"/><line x1="4" y1="21" x2="20" y2="21"/></>),
  plus:       (<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>),
  minus:      (<line x1="5" y1="12" x2="19" y2="12"/>),
  mouse:      (<><rect x="5" y="2" width="14" height="20" rx="7"/><line x1="12" y1="2" x2="12" y2="10"/></>),
  headphones: (<><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></>),
}

export default function Icon({ name, size = 18, className }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
