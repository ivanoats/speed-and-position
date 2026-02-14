import { css } from '../../../styled-system/css'
import type { Position } from '../../types/position'

export interface LocationInfoProps {
  position: Position
}

/**
 * LocationInfo component - Displays coordinate and accuracy information
 * Mobile-first design with clear, readable typography
 */
export function LocationInfo({ position }: LocationInfoProps) {
  return (
    <div className={css({
      bg: 'white',
      borderRadius: 'lg',
      padding: '4',
      boxShadow: 'md',
    })}>
      <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '3' })}>
        Location
      </h2>
      <div className={css({ fontSize: 'sm', color: 'gray.700' })}>
        <div className={css({ marginBottom: '2' })}>
          <strong>Latitude:</strong> {position.latitude.toFixed(6)}
        </div>
        <div className={css({ marginBottom: '2' })}>
          <strong>Longitude:</strong> {position.longitude.toFixed(6)}
        </div>
        <div>
          <strong>Accuracy:</strong> ±{position.accuracy.toFixed(1)}m
        </div>
      </div>
    </div>
  )
}
