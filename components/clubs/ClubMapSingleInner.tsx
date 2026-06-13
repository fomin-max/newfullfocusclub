'use client'

import { useEffect, useRef } from 'react'
import type { Map as MapLibreMap } from 'maplibre-gl'

interface Props {
  lat: number
  lng: number
  name: string
  bookUrl: string
}

export default function ClubMapSingleInner({ lat, lng, name, bookUrl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<MapLibreMap | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    let cancelled = false

    import('maplibre-gl').then((ml) => {
      if (cancelled || !containerRef.current) return

      const map = new ml.Map({
        container: containerRef.current,
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [lng, lat],
        zoom: 15.5,
        attributionControl: false,
        dragRotate: false,
      })

      map.addControl(new ml.NavigationControl({ showCompass: false }), 'top-right')
      mapRef.current = map

      map.on('load', () => {
        if (cancelled) return

        const el = document.createElement('div')
        el.className = 'cla-map-pin'
        el.innerHTML = `<span class="cla-map-pin__pulse"></span><span class="cla-map-pin__dot"></span>`

        const popup = new ml.Popup({ offset: 20, closeButton: false, className: 'cla-map-popup', focusAfterOpen: false })
          .setHTML(`
            <div class="cla-map-popup__inner">
              <strong>Full Focus · ${name}</strong>
              <a href="${bookUrl}" class="cla-map-popup__btn">ЗАБРОНИРОВАТЬ →</a>
            </div>
          `)

        new ml.Marker({ element: el })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map)
          .togglePopup()
      })
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
