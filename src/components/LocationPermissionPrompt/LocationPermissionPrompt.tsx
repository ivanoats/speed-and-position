import { css } from '../../../styled-system/css'

interface LocationPermissionPromptProps {
  onRequestPermission: () => void
}

/**
 * Component that explains the app's purpose and requests location permission
 * Addresses user trust issues by providing context before requesting location
 */
export function LocationPermissionPrompt({ onRequestPermission }: LocationPermissionPromptProps) {
  return (
    <div className={css({
      bg: 'white',
      borderRadius: 'lg',
      padding: '8',
      boxShadow: 'xl',
      maxWidth: '500px',
      margin: '0 auto',
      textAlign: 'center',
    })}>
      <div className={css({
        fontSize: '4xl',
        marginBottom: '4',
      })} aria-hidden="true">
        📍🚗
      </div>
      
      <h2 className={css({
        fontSize: '2xl',
        fontWeight: 'bold',
        marginBottom: '4',
        color: 'gray.800',
      })}>
        Welcome to Speed & Position
      </h2>
      
      <p className={css({
        fontSize: 'lg',
        color: 'gray.700',
        marginBottom: '4',
        lineHeight: '1.6',
      })}>
        This mapping app shows you how fast you're going and where you are in real-time.
      </p>
      
      <p className={css({
        fontSize: 'md',
        color: 'gray.600',
        marginBottom: '6',
        lineHeight: '1.6',
      })}>
        To provide this functionality, we need access to your device's location. Your location data stays on your device and is not shared with anyone.
      </p>
      
      <button
        onClick={onRequestPermission}
        className={css({
          bg: 'blue.600',
          color: 'white',
          fontSize: 'lg',
          fontWeight: 'semibold',
          padding: '4',
          paddingX: '8',
          borderRadius: 'lg',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          width: '100%',
          _hover: {
            bg: 'blue.700',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
          },
          _focus: {
            outline: '3px solid',
            outlineColor: 'blue.300',
            outlineOffset: '2px',
          },
        })}
      >
        Enable Location Access
      </button>
      
      <p className={css({
        fontSize: 'sm',
        color: 'gray.500',
        marginTop: '4',
      })}>
        You'll be prompted by your browser to allow location access
      </p>
    </div>
  )
}
