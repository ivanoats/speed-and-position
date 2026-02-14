import { useState, useEffect, useCallback } from 'react'
import type { Position } from '../types/position'
import { debounce } from '../utils/accessibility'

export interface GeolocationState {
  position: Position | null
  loading: boolean
  error: string | null
}

/**
 * Custom hook for accessing geolocation with high accuracy
 * Includes debouncing for performance optimization
 * @returns GeolocationState with position, loading, and error states
 */
export function useGeolocation(): GeolocationState {
  const [position, setPosition] = useState<Position | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Debounced position update to reduce re-renders
  const debouncedSetPosition = useCallback(
    debounce((newPosition: Position) => {
      setPosition(newPosition)
    }, 100), // 100ms debounce
    []
  )

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    const successHandler = (pos: GeolocationPosition) => {
      const newPosition = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        speed: pos.coords.speed,
      }
      
      // Use debounced update for continuous tracking
      if (position) {
        debouncedSetPosition(newPosition)
      } else {
        // First position update is immediate
        setPosition(newPosition)
      }
      
      setLoading(false)
    }

    const errorHandler = (err: GeolocationPositionError) => {
      setError(err.message)
      setLoading(false)
    }

    // Get initial position with timeout
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 10000, // 10 second timeout
      maximumAge: 0,
    })

    // Watch position for updates
    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      {
        enableHighAccuracy: true,
        maximumAge: 1000, // Allow 1 second old position for performance
        timeout: 5000,
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [position, debouncedSetPosition])

  return { position, loading, error }
}
