import { css } from '../../../styled-system/css'

/**
 * Map component - Placeholder for React-Leaflet integration
 * Will be implemented with interactive map in future phase
 */
export function Map() {
  return (
    <div className={css({
      bg: 'gray.100',
      borderRadius: 'lg',
      padding: '8',
      marginTop: '4',
      textAlign: 'center',
      color: 'gray.600',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })}>
      🗺️ Map will be implemented here with React-Leaflet
    </div>
  )
}
