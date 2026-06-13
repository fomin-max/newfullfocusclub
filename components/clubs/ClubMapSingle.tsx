'use client'

import dynamic from 'next/dynamic'

const ClubMapSingleInner = dynamic(() => import('./ClubMapSingleInner'), { ssr: false })

interface Props {
  lat: number
  lng: number
  name: string
  bookUrl: string
}

export default function ClubMapSingle({ lat, lng, name, bookUrl }: Props) {
  return (
    <div className="cl-map-real">
      <div className="cl-map-real__map">
        <ClubMapSingleInner lat={lat} lng={lng} name={name} bookUrl={bookUrl} />
      </div>
      <div className="cl-map-real__tint" aria-hidden="true" />
    </div>
  )
}
