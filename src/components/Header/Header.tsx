import { css } from '../../../styled-system/css'

export interface HeaderProps {
  onSettingsClick?: () => void
  hasGpsSignal?: boolean
}

/**
 * Header component - Sticky navigation with app title and settings
 * Mobile-first design with touch-friendly height
 * 
 * @param onSettingsClick - Callback when settings button is clicked
 * @param hasGpsSignal - Whether GPS signal is available
 */
export function Header({ onSettingsClick, hasGpsSignal = false }: HeaderProps) {
  return (
    <header className={css({
      bg: 'blue.600',
      color: 'white',
      padding: '4',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      boxShadow: 'md',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    })}>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold', margin: 0 })}>
        Speed & Location
      </h1>
      
      <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
        {hasGpsSignal && (
          <div 
            className={css({
              fontSize: 'xl',
              display: 'flex',
              alignItems: 'center',
            })}
            title="GPS signal detected"
            aria-label="GPS signal detected"
          >
            📡
          </div>
        )}
        
        {onSettingsClick && (
          <button
            type="button"
            onClick={onSettingsClick}
            className={css({
              bg: 'transparent',
              border: '2px solid white',
              color: 'white',
              padding: '2',
              borderRadius: 'md',
              cursor: 'pointer',
              fontSize: 'xl',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '10',
              height: '10',
              transition: 'background 0.2s',
              _hover: {
                bg: 'rgba(255, 255, 255, 0.1)',
              },
              _active: {
                bg: 'rgba(255, 255, 255, 0.2)',
              },
              touchAction: 'manipulation',
            })}
            aria-label="Open settings"
          >
            ⚙️
          </button>
        )}
      </div>
    </header>
  )
}
