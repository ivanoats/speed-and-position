import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { css } from '../../../styled-system/css'
import type { Position } from '../../types/position'
import { useEffect, useState } from 'react'

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
      map.setView([position.latitude, position.longitude], 15, {
        animate: true,
      })
    }
  }, [position, map])
  
  // Ensure map is properly sized on mount
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize()
    }, 100)
  }, [map])
  
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
  const [tileError, setTileError] = useState(false)
  
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
      position: 'relative',
      bg: 'gray.50',
    })}>
      {tileError && (
        <div className={css({
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bg: 'rgba(255, 255, 255, 0.95)',
          padding: '4',
          borderRadius: 'md',
          boxShadow: 'lg',
          zIndex: 1000,
          textAlign: 'center',
          maxWidth: '80%',
          border: '2px solid',
          borderColor: 'orange.500',
        })}>
          <div className={css({ fontSize: 'lg', fontWeight: 'bold', color: 'orange.700', marginBottom: '2' })}>
            ⚠️ Map Tiles Blocked
          </div>
          <div className={css({ fontSize: 'sm', color: 'gray.700' })}>
            Map tiles are blocked by a browser extension.<br />
            Please disable your ad blocker for this site to see the map.
          </div>
        </div>
      )}
      <MapContainer
        key={mapKey}
        center={center}
        zoom={15}
        style={{ 
          height: '100%', 
          width: '100%', 
          background: 'linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0), linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={true}
      >
        <MapUpdater position={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          errorTileUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          eventHandlers={{
            tileerror: () => setTileError(true),
          }}
        />
        {position && (
          <Marker position={[position.latitude, position.longitude]}>
            <Popup>
              You are here<br />
              Latitude: {position.latitude.toFixed(6)}<br />
              Longitude: {position.longitude.toFixed(6)}<br />
              Accuracy: {position.accuracy.toFixed(0)}m
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
