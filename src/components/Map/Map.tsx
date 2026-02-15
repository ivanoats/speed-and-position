import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { css } from '../../../styled-system/css'
import type { Position } from '../../types/position'
import { useEffect, useState } from 'react'
import { useTouchGestures } from '../../hooks/useTouchGestures'

// Fix Leaflet default marker icons not loading with module bundlers
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
})

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
 * Supports double-tap to center and long-press to copy coordinates
 * 
 * @param position - Current position data from geolocation
 */
export function Map({ position }: MapProps) {
  const [tileError, setTileError] = useState(false)
  const [notification, setNotification] = useState<string>('')
  
  // Handle double tap to center map
  const handleDoubleTap = () => {
    if (position) {
      // The MapUpdater will handle centering
      setNotification('Map centered on your location')
      setTimeout(() => setNotification(''), 2000)
    }
  }

  // Handle long press to copy coordinates
  const handleLongPress = async () => {
    if (position) {
      const coords = `${position.latitude.toFixed(6)}, ${position.longitude.toFixed(6)}`
      try {
        await navigator.clipboard.writeText(coords)
        setNotification('Coordinates copied to clipboard!')
      } catch {
        setNotification('Failed to copy coordinates')
      }
      setTimeout(() => setNotification(''), 2000)
    }
  }

  // Touch gesture support
  const gestureRef = useTouchGestures<HTMLDivElement>({
    onDoubleTap: handleDoubleTap,
    onLongPress: handleLongPress,
  })
  
  // Default center (Seattle, WA) if no position yet
  const center: [number, number] = position 
    ? [position.latitude, position.longitude]
    : [47.6062, -122.3321] // Seattle, WA
  
  // Use a key to force MapContainer to re-render when center changes significantly
  const mapKey = position 
    ? `${position.latitude.toFixed(2)}-${position.longitude.toFixed(2)}`
    : 'default-seattle'

  return (
    <div 
      ref={gestureRef}
      className={css({
        marginTop: '4',
        borderRadius: 'lg',
        overflow: 'hidden',
        height: { base: '300px', md: '400px', lg: '500px' },
        width: '100%',
        border: '2px solid',
        borderColor: 'gray.200',
        position: 'relative',
        bg: 'gray.50',
      })}
      role="region"
      aria-label="Interactive map"
      aria-describedby="map-instructions"
    >
      <span id="map-instructions" className={css({ srOnly: true })}>
        Double-tap to center map on your location. Long-press to copy coordinates to clipboard.
      </span>
      {notification && (
        <div className={css({
          position: 'absolute',
          top: '4',
          left: '50%',
          transform: 'translateX(-50%)',
          bg: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '2 4',
          borderRadius: 'md',
          zIndex: 1000,
          fontSize: 'sm',
          fontWeight: 'semibold',
          boxShadow: 'lg',
          animation: 'fadeIn 0.3s ease',
        })} role="status" aria-live="polite">
          {notification}
        </div>
      )}
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
              Accuracy: {position.accuracy.toFixed(0)}m<br />
              <span className={css({ fontSize: 'xs', color: 'gray.600', marginTop: '1', display: 'block' })}>
                💡 Long-press map to copy coordinates
              </span>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
