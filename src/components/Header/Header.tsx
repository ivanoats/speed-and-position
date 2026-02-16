import { css, cx } from '../../../styled-system/css';
import { button } from '../../../styled-system/recipes';

export interface HeaderProps {
  onSettingsClick?: () => void;
  hasGpsSignal?: boolean;
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
    <header
      className={css({
        bg: 'accent.default',
        color: 'white',
        padding: '4',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: 'md',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      })}
    >
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
            className={cx(
              button({ variant: 'ghost', size: 'md' }),
              css({
                color: 'white',
                borderColor: 'white',
                border: '2px solid',
                _hover: {
                  bg: 'rgba(255, 255, 255, 0.15)',
                },
                _active: {
                  bg: 'rgba(255, 255, 255, 0.25)',
                },
                touchAction: 'manipulation',
              }),
            )}
            aria-label="Open settings"
          >
            ⚙️
          </button>
        )}
      </div>
    </header>
  );
}
