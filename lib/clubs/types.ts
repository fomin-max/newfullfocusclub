export interface HeroFact {
  icon: string
  val: string
  lbl: string
}

export interface MapRoad {
  type: 'path' | 'line'
  d?: string
  x1?: number; y1?: number; x2?: number; y2?: number
  w: number
  color: string
}

export interface MapLabel {
  x: number
  y: number
  text: string
  color: string
}

export interface ClubMapConfig {
  pin: { top: string; left: string }
  river: boolean
  roads: MapRoad[]
  labels: MapLabel[]
}

export interface ClubMeta {
  NAME: string
  SLUG: string
  ADDRESS: string
  METRO: string
  METRO_COLOR: string
  METRO_TIME: string
  HOURS: string
  TELEGRAM: string
  PHONE: string
  MAPS_URL: string
  ROUTE_URL: string
  COORDS: string
  VIDEO_URL: string
  POSTER_URL: string
  REVIEWS_COUNT: string
  REVIEWS_COUNT_NUM: number
  GEO: { lat: number; lng: number }
  MEDIA_LABEL: string
  FACTS: HeroFact[]
  FEATURES_TAG: string
  FEATURES_TITLE: string
  FEATURES_SUB: string
  MAP: ClubMapConfig
}

export interface ClubZone {
  id: string
  name: string
  accent: string
  seats: number | string
  priceFrom: number
  desc: string
  specShort: string
  image: string
  cta: string
  flagship: boolean
  wide: boolean
  badge?: string
  games?: string[]
}

export interface TariffRow {
  zone: string
  vals: Array<[number, number] | null>
}

export interface ClubTariffs {
  cols: string[]
  popular: number
  bestValue: number
  rows: TariffRow[]
  student: string
  bestNote?: string
}

export interface HardwareRow {
  k: string
  v: string
  accent?: boolean
}

export interface HardwareTab {
  name: string
  rows: HardwareRow[]
}

export interface Feature {
  id: string
  size: 'big' | 'wide' | 'small'
  name: string
  desc: string
  image: string | null
  tag: string | null
  icon: string | null
  note: string | null
}

export interface Seat {
  id: string
  x: number
  y: number
  status: 'free' | 'busy' | 'off'
}

export interface FloorZone {
  zone: string
  label: string
  seats: Seat[]
}

export interface FloorFilter {
  id: string
  name: string
  match: string[] | null
}

export interface FloorOutline {
  label: string
  left: string
  top: string
  width: string
  height: string
  highlightFor: string | null
  accent?: string
}

export interface FloorPlan {
  zones: FloorZone[]
  filters: FloorFilter[]
  outlines: FloorOutline[]
}

export interface Review {
  name: string
  src: string
  stars: number
  text: string
}

export interface ClubRef {
  slug: string
  name: string
  metro: string
  color: string
  addr: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface EventItem {
  icon: string
  name: string
  desc: string
  badge?: string | null
}

export interface ClubData {
  CLUB: ClubMeta
  CLUB_ZONES: ClubZone[]
  TARIFFS: ClubTariffs
  HARDWARE: Record<string, HardwareTab>
  FEATURES: Feature[]
  FLOOR: FloorPlan
  REVIEWS: Review[]
  ALL_CLUBS: ClubRef[]
  FAQ: FAQItem[]
  EVENTS: EventItem[]
}
