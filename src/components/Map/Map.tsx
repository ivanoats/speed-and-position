import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { css } from '../../../styled-system/css'
import type { Position } from '../../types/position'
import { useEffect } from 'react'

interface MapProps {
  position: Position | null
}

/**
 * Component to handle map view updates when position changes
 */
function MapUpdater({ position }: { position: Position | null }) {
  const map = useMap()
  
  useEffect(() => {
    if (position) {
      map.setView([position.latitude, position.longitude], 15)
    }
  }, [position, map])
  
  return null
}

/**
 * Map component - Interactive map with React-Leaflet
 * Shows current position with auto-centering
 * Defaults to Seattle, WA when no position available
 * 
 * @param position - Current position data from geolocation
 */
export function Map({ position }: MapProps) {
  // Default center (Seattle, WA) if no position yet
  const center: [number, number] = position 
    ? [position.latitude, position.longitude]
    : [47.6062, -122.3321] // Seattle, WA
  
  // Use a key to force MapContainer to re-render when center changes significantly
  const mapKey = position 
    ? `${position.latitude.toFixed(2)}-${position.longitude.toFixed(2)}`
    : 'default-seattle'

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
        key={mapKey}
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <MapUpdater position={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
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
