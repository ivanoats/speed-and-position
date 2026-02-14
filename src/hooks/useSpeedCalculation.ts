import { useMemo } from 'react'
import { metersPerSecToMph } from '../utils/conversions'

/**
 * Custom hook for calculating speed from position data
 * @param speed - Speed in meters per second (from geolocation API)
 * @returns Speed in miles per hour
 */
export function useSpeedCalculation(speed: number | null): number {
  return useMemo(() => {
    if (speed === null || speed === undefined) {
      return 0
    }
    return metersPerSecToMph(speed)
  }, [speed])
}
