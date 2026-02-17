import { useMemo } from 'react'
import { metersPerSecToMph, metersPerSecToKph } from '../utils/conversions'

export type SpeedUnit = 'mph' | 'kph'

/**
 * Custom hook for calculating speed from position data
 * @param speed - Speed in meters per second (from geolocation API)
 * @param unit - Unit to convert to (mph or kph)
 * @returns Speed in the specified unit
 */
export function useSpeedCalculation(
  speed: number | null,
  unit: SpeedUnit = 'mph'
): number {
  return useMemo(() => {
    if (speed === null) {
      return 0
    }
    return unit === 'mph' ? metersPerSecToMph(speed) : metersPerSecToKph(speed)
  }, [speed, unit])
}
