import { css, cx } from '../../../styled-system/css'
import { card, button } from '../../../styled-system/recipes'

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
  const cardStyles = card()
  return (
    <div className={cx(cardStyles.root, css({ marginBottom: '4' }))}>
      <div className={cx(cardStyles.body, css({ textAlign: 'center' }))}>
        <div className={css({
          fontSize: { base: '5xl', md: '6xl' },
          fontWeight: 'bold',
          color: 'accent.default',
          marginBottom: '2',
        })}>
          {speed.toFixed(1)} <span className={css({ fontSize: '3xl', color: 'fg.muted' })}>{unit}</span>
        </div>
        {onToggleUnit && (
          <button
            onClick={onToggleUnit}
            className={button({ variant: 'outline', size: 'sm' })}
          >
            Switch to {unit === 'mph' ? 'KPH' : 'MPH'}
          </button>
        )}
      </div>
    </div>
  )
}
