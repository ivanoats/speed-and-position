import { useState, useEffect, useRef } from 'react'
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
 * @param enabled - Whether to start requesting geolocation (default: true for backwards compatibility)
 * @returns GeolocationState with position, loading, and error states
 */
export function useGeolocation(enabled: boolean = true): GeolocationState {
  const [position, setPosition] = useState<Position | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Store debounced function in ref to maintain same instance
  const debouncedSetPositionRef = useRef(
    debounce<[Position]>((newPosition: Position) => {
      setPosition(newPosition)
    }, 100)
  )

  useEffect(() => {
    // Don't request geolocation if not enabled
    if (!enabled) {
      setLoading(false)
      setError(null) // Clear any previous errors
      return
    }

    // Set loading to true when starting geolocation request
    setLoading(true)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    let isFirstPosition = true

    const successHandler = (pos: GeolocationPosition) => {
      const newPosition = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        speed: pos.coords.speed,
      }

      // First position update is immediate, subsequent updates are debounced
      if (isFirstPosition) {
        setPosition(newPosition)
        isFirstPosition = false
      } else {
        debouncedSetPositionRef.current(newPosition)
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
  }, [enabled]) // Add enabled to dependency array

  return { position, loading, error }
}
