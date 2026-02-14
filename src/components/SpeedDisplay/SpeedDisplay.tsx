import { css } from '../../../styled-system/css'

export interface SpeedDisplayProps {
  speed: number
  unit?: 'mph' | 'kph'
}

/**
 * SpeedDisplay component - Large, prominent speed readout
 * Mobile-first design with responsive typography
 */
export function SpeedDisplay({ speed, unit = 'mph' }: SpeedDisplayProps) {
  return (
    <div className={css({
      bg: 'white',
      borderRadius: 'lg',
      padding: '6',
      marginBottom: '4',
      boxShadow: 'lg',
      textAlign: 'center',
    })}>
      <div className={css({
        fontSize: { base: '5xl', md: '6xl' },
        fontWeight: 'bold',
        color: 'blue.600',
      })}>
        {speed.toFixed(1)} <span className={css({ fontSize: '3xl' })}>{unit}</span>
      </div>
    </div>
  )
}
