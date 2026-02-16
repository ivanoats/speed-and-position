/**
 * Utility functions for unit conversions
 */

/**
 * Meters per second to miles per hour conversion factor
 */
export const METERS_PER_SEC_TO_MPH = 2.23694;

/**
 * Meters per second to kilometers per hour conversion factor
 */
export const METERS_PER_SEC_TO_KPH = 3.6;

/**
 * Convert meters per second to miles per hour
 * @param metersPerSec - Speed in meters per second
 * @returns Speed in miles per hour
 */
export function metersPerSecToMph(metersPerSec: number): number {
  return metersPerSec * METERS_PER_SEC_TO_MPH;
}

/**
 * Convert meters per second to kilometers per hour
 * @param metersPerSec - Speed in meters per second
 * @returns Speed in kilometers per hour
 */
export function metersPerSecToKph(metersPerSec: number): number {
  return metersPerSec * METERS_PER_SEC_TO_KPH;
}
