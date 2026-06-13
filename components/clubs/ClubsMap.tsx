'use client'

import dynamic from 'next/dynamic'
import type { AggClub } from '@/lib/clubs/aggregatorData'

function MapSkeleton() {
  return <div className="cla-map-skeleton" aria-hidden="true" />
}

const ClubsMapInner = dynamic(() => import('./ClubsMapInner'), {
  ssr: false,
  loading: MapSkeleton,
})

interface Props {
  clubs: AggClub[]
  activeId: string | null
  visibleIds: Set<string>
  city: string
  onMarkerEnter: (id: string) => void
  onMarkerLeave: () => void
  onMarkerClick: (id: string) => void
}

export default function ClubsMap(props: Props) {
  return (
    <div className="cla-map-real" role="img" aria-label="Карта клубов Full Focus">
      <div className="cla-map-real__map">
        <ClubsMapInner {...props} />
      </div>
      {/* purple brand overlay */}
      <div className="cla-map-real__tint" aria-hidden="true" />
    </div>
  )
}
