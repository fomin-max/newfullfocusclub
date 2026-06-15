'use client'

import { useEffect, useRef, useState } from 'react'
import type { Map as MapLibreMap, Marker } from 'maplibre-gl'
import type { AggClub } from '@/lib/clubs/aggregatorData'

const PADDING = 80

function getBounds(clubs: AggClub[]) {
  const lngs = clubs.map(c => c.lng)
  const lats = clubs.map(c => c.lat)
  return {
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
  }
}

interface Props {
  clubs: AggClub[]
  activeId: string | null
  visibleIds: Set<string>
  city: string
  onMarkerEnter: (id: string) => void
  onMarkerLeave: () => void
  onMarkerClick: (id: string) => void
}

export default function ClubsMapInner({
  clubs, activeId, visibleIds, city,
  onMarkerEnter, onMarkerLeave, onMarkerClick,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<MapLibreMap | null>(null)
  const markersRef   = useRef<Map<string, { marker: Marker; el: HTMLButtonElement }>>(new Map())
  const [mapLoaded, setMapLoaded] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const MAX_RETRIES = 4

  // init map once (re-runs on retryCount bump)
  useEffect(() => {
    if (!containerRef.current || retryCount > MAX_RETRIES) return

    let cancelled = false
    let map: MapLibreMap
    let loadTimeout: ReturnType<typeof setTimeout>

    import('maplibre-gl').then((ml) => {
      if (cancelled || !containerRef.current) return

      const spbClubs = clubs.filter(c => c.city === 'spb')
      const { minLng, maxLng, minLat, maxLat } = getBounds(spbClubs.length ? spbClubs : clubs)

      map = new ml.Map({
        container: containerRef.current,
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        bounds: [[minLng, minLat], [maxLng, maxLat]],
        fitBoundsOptions: { padding: PADDING },
        attributionControl: false,
      })

      map.addControl(new ml.NavigationControl({ showCompass: false }), 'top-right')
      mapRef.current = map

      const triggerRetry = () => {
        if (cancelled) return
        clearTimeout(loadTimeout)
        map.remove()
        mapRef.current = null
        markersRef.current.clear()
        setMapLoaded(false)
        setRetryCount(n => n + 1)
      }

      // auto-retry if style/tiles fail to load within 8s
      loadTimeout = setTimeout(() => {
        if (mapLoaded) return
        triggerRetry()
      }, 8000)

      map.on('error', triggerRetry)

      map.on('load', () => {
        if (cancelled) return
        clearTimeout(loadTimeout)
        setMapLoaded(true)

        let leaveTimer: ReturnType<typeof setTimeout> | null = null
        const cancelLeave = () => { if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null } }
        const scheduleLeave = () => { leaveTimer = setTimeout(onMarkerLeave, 150) }

        clubs.forEach(c => {
          const el = document.createElement('button') as HTMLButtonElement
          el.className = 'cla-map-pin'
          el.setAttribute('aria-label', `Клуб ${c.name}`)
          el.innerHTML = `<span class="cla-map-pin__pulse"></span><span class="cla-map-pin__dot"></span>`

          el.addEventListener('mouseenter', () => { cancelLeave(); onMarkerEnter(c.id) })
          el.addEventListener('mouseleave', scheduleLeave)
          el.addEventListener('click', () => onMarkerClick(c.id))

          const bookUrl = c.slug ? `/clubs/${c.slug}#live` : 'https://t.me/fullfocusclub'
          const popup = new ml.Popup({ offset: 18, closeButton: false, className: 'cla-map-popup', focusAfterOpen: false })
            .setHTML(`
              <div class="cla-map-popup__inner">
                <strong>${c.name}</strong>
                <span>${c.address}</span>
                <a href="${bookUrl}" class="cla-map-popup__btn">ЗАБРОНИРОВАТЬ →</a>
              </div>
            `)

          popup.on('open', () => {
            const popupEl = popup.getElement()
            if (!popupEl) return
            popupEl.addEventListener('mouseenter', cancelLeave)
            popupEl.addEventListener('mouseleave', scheduleLeave)
          })

          const marker = new ml.Marker({ element: el })
            .setLngLat([c.lng, c.lat])
            .setPopup(popup)
            .addTo(map)

          markersRef.current.set(c.id, { marker, el })
        })
      })
    })

    return () => {
      cancelled = true
      clearTimeout(loadTimeout)
      map?.remove()
      mapRef.current = null
      markersRef.current.clear()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryCount])

  // fit to city clubs on filter change
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const cityClubs = city === 'all' ? clubs : clubs.filter(c => c.city === city)
    if (!cityClubs.length) return
    if (cityClubs.length === 1) {
      map.flyTo({ center: [cityClubs[0].lng, cityClubs[0].lat], zoom: 13, duration: 900 })
      return
    }
    const { minLng, maxLng, minLat, maxLat } = getBounds(cityClubs)
    map.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: PADDING, duration: 900 })
  }, [city, clubs])

  // sync active / visible state on markers
  useEffect(() => {
    markersRef.current.forEach(({ el, marker }, id) => {
      const isVisible = visibleIds.has(id)
      const isActive  = activeId === id

      el.classList.toggle('is-active', isActive)
      el.classList.toggle('is-dim',    !isVisible)

      if (isActive && !marker.getPopup().isOpen()) marker.togglePopup()
      if (!isActive && marker.getPopup().isOpen())  marker.togglePopup()
    })
  }, [activeId, visibleIds])

  return (
    <>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      {!mapLoaded && <div className="cla-map-skeleton cla-map-skeleton--overlay" aria-hidden="true" />}
    </>
  )
}
