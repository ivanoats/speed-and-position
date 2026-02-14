import { useState, useEffect } from 'react'
import type { Position } from '../types/position'

export interface GeolocationState {
  position: Position | null
  loading: boolean
  error: string | null
}

/**
 * Custom hook for accessing geolocation with high accuracy
 * @returns GeolocationState with position, loading, and error states
 */
export function useGeolocation(): GeolocationState {
  const [position, setPosition] = useState<Position | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    const successHandler = (pos: GeolocationPosition) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        speed: pos.coords.speed,
      })
      setLoading(false)
    }

    const errorHandler = (err: GeolocationPositionError) => {
      setError(err.message)
      setLoading(false)
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
    })

    // Watch position for updates
    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return { position, loading, error }
}
