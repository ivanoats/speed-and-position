import { css } from '../../../styled-system/css'
import { card, button } from '../../../styled-system/recipes'

interface LocationPermissionPromptProps {
  onRequestPermission: () => void
}

/**
 * Component that explains the app's purpose and requests location permission
 * Addresses user trust issues by providing context before requesting location
 */
export function LocationPermissionPrompt({ onRequestPermission }: LocationPermissionPromptProps) {
  const cardStyles = card()
  return (
    <div className={cardStyles.root + ' ' + css({
      maxWidth: '500px',
      margin: '0 auto',
    })}>
      <div className={cardStyles.header + ' ' + css({ textAlign: 'center' })}>
        <div className={css({
          fontSize: '4xl',
          marginBottom: '4',
        })} aria-hidden="true">
          📍🚗
        </div>
        
        <h2 className={cardStyles.title + ' ' + css({ fontSize: '2xl' })}>
          Welcome to Speed & Position
        </h2>
      </div>
      
      <div className={cardStyles.body + ' ' + css({ textAlign: 'center' })}>
        <p className={css({
          fontSize: 'lg',
          color: 'fg.default',
          marginBottom: '4',
          lineHeight: '1.6',
        })}>
          This mapping app shows you how fast you're going and where you are in real-time.
        </p>
        
        <p className={css({
          fontSize: 'md',
          color: 'fg.muted',
          marginBottom: '6',
          lineHeight: '1.6',
        })}>
          To provide this functionality, we need access to your device's location. Your location data stays on your device and is not shared with anyone.
        </p>
      </div>

      <div className={cardStyles.footer + ' ' + css({ flexDirection: 'column', gap: '3' })}>
        <button
          onClick={onRequestPermission}
          className={button({ variant: 'solid', size: 'lg' }) + ' ' + css({
            width: '100%',
          })}
        >
          Enable Location Access
        </button>
        
        <p className={css({
          fontSize: 'sm',
          color: 'fg.subtle',
          textAlign: 'center',
        })}>
          You'll be prompted by your browser to allow location access
        </p>
      </div>
    </div>
  )
}
