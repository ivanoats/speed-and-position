/**
 * Shared type definitions for the application
 */

/**
 * Position data from the Geolocation API
 * @property latitude - Latitude in degrees (WGS84)
 * @property longitude - Longitude in degrees (WGS84)
 * @property accuracy - Accuracy of position in meters
 * @property speed - Speed in meters per second, or null if unavailable
 */
export interface Position {
  latitude: number
  longitude: number
  accuracy: number
  speed: number | null
}
