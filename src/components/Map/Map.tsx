import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { css } from '../../../styled-system/css'
import type { Position } from '../../types/position'
import { useEffect, useRef } from 'react'
import type { Map as LeafletMap } from 'leaflet'

interface MapProps {
  position: Position | null
}

/**
 * Map component - Interactive map with React-Leaflet
 * Shows current position with auto-centering
 * 
 * @param position - Current position data from geolocation
 */
export function Map({ position }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null)

  // Center map on position when it updates
  useEffect(() => {
    if (mapRef.current && position) {
      mapRef.current.setView([position.latitude, position.longitude], 15)
    }
  }, [position])

  // Default center (San Francisco) if no position yet
  const center: [number, number] = position 
    ? [position.latitude, position.longitude]
    : [37.7749, -122.4194]

  return (
    <div className={css({
      marginTop: '4',
      borderRadius: 'lg',
      overflow: 'hidden',
      height: { base: '300px', md: '400px', lg: '500px' },
      width: '100%',
      border: '2px solid',
      borderColor: 'gray.200',
    })}>
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker position={[position.latitude, position.longitude]}>
            <Popup>
              You are here<br />
              Accuracy: {position.accuracy.toFixed(0)}m
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
