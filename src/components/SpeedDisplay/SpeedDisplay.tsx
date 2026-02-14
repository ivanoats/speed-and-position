import { css } from '../../../styled-system/css'

export type SpeedUnit = 'mph' | 'kph'

export interface SpeedDisplayProps {
  speed: number
  unit?: SpeedUnit
  onToggleUnit?: () => void
}

/**
 * SpeedDisplay component - Large, prominent speed readout
 * Mobile-first design with responsive typography and unit toggle
 */
export function SpeedDisplay({ speed, unit = 'mph', onToggleUnit }: SpeedDisplayProps) {
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
        marginBottom: '2',
      })}>
        {speed.toFixed(1)} <span className={css({ fontSize: '3xl' })}>{unit}</span>
      </div>
      {onToggleUnit && (
        <button
          onClick={onToggleUnit}
          className={css({
            bg: 'blue.500',
            color: 'white',
            padding: '2 4',
            borderRadius: 'md',
            border: 'none',
            cursor: 'pointer',
            fontSize: 'sm',
            fontWeight: '600',
            transition: 'background 0.2s',
            _hover: {
              bg: 'blue.600',
            },
            _active: {
              bg: 'blue.700',
            },
            touchAction: 'manipulation',
          })}
        >
          Switch to {unit === 'mph' ? 'KPH' : 'MPH'}
        </button>
      )}
    </div>
  )
}
