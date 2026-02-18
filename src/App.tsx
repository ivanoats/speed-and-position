import { css, cx } from '../styled-system/css'
import { container } from '../styled-system/patterns'
import { card } from '../styled-system/recipes'
import { useState, memo } from 'react'
import { useGeolocation } from './hooks/useGeolocation'
import {
  useSpeedCalculation,
  type SpeedUnit,
} from './hooks/useSpeedCalculation'
import { useServiceWorker } from './hooks/useServiceWorker'
import { Header } from './components/Header'
import { SpeedDisplay } from './components/SpeedDisplay'
import { LocationInfo } from './components/LocationInfo'
import { Map } from './components/Map'
import { Footer } from './components/Footer'
import { Settings } from './components/Settings'
import { LocationPermissionPrompt } from './components/LocationPermissionPrompt'

// Memoized components to prevent unnecessary re-renders
const MemoizedSpeedDisplay = memo(SpeedDisplay)
const MemoizedLocationInfo = memo(LocationInfo)
const MemoizedMap = memo(Map)
const MemoizedFooter = memo(Footer)
const MemoizedSettings = memo(Settings)
const MemoizedLocationPermissionPrompt = memo(LocationPermissionPrompt)

/**
 * Main App Component for Speed and Position
 * Mobile-first redesign using component architecture
 * Phase 4: Enhanced with PWA support, touch gestures, and performance optimizations
 * Updated to request location permission with context (Lighthouse best practice)
 */
function App() {
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false)
  const { position, loading, error } = useGeolocation(locationPermissionGranted)
  const [unit, setUnit] = useState<SpeedUnit>('mph')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const speed = useSpeedCalculation(position?.speed ?? null, unit)

  // Register service worker for PWA support
  useServiceWorker()

  const handleRequestPermission = () => {
    setLocationPermissionGranted(true)
  }

  const handleRetryPermission = () => {
    // Reset state to allow user to try again
    setLocationPermissionGranted(false)
  }

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'mph' ? 'kph' : 'mph'))
  }

  const handleUnitChange = (newUnit: SpeedUnit) => {
    setUnit(newUnit)
  }

  return (
    <div
      className={css({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bg: 'bg.canvas',
      })}
    >
      <Header
        onSettingsClick={() => setIsSettingsOpen(true)}
        hasGpsSignal={!!position && !loading}
      />

      <main className={css({ flex: 1, padding: '4' })}>
        <div className={container()}>
          {!locationPermissionGranted ? (
            <MemoizedLocationPermissionPrompt
              onRequestPermission={handleRequestPermission}
            />
          ) : (
            <>
              {error && (
                <div
                  className={css({
                    bg: 'bg.error',
                    border: '2px solid',
                    borderColor: 'border.error',
                    color: 'fg.error',
                    padding: '4',
                    borderRadius: 'l2',
                    marginBottom: '4',
                  })}
                  role="alert"
                >
                  <div className={css({ marginBottom: '2' })}>
                    <strong>Location Error:</strong> {error}
                  </div>
                  {error.toLowerCase().includes('denied') ||
                  error.toLowerCase().includes('permission') ? (
                    <div className={css({ marginTop: '3' })}>
                      <div
                        className={css({
                          fontSize: 'sm',
                          marginBottom: '2',
                          color: 'fg.error',
                        })}
                      >
                        To use this app, you need to allow location access in
                        your browser settings.
                      </div>
                      <button
                        onClick={handleRetryPermission}
                        className={css({
                          bg: 'white',
                          color: 'red.700',
                          border: '2px solid',
                          borderColor: 'red.700',
                          padding: '2 4',
                          borderRadius: 'md',
                          fontSize: 'sm',
                          fontWeight: 'semibold',
                          cursor: 'pointer',
                          _hover: {
                            bg: 'red.50',
                          },
                        })}
                      >
                        Try Again
                      </button>
                    </div>
                  ) : null}
                </div>
              )}

              {loading &&
                !position &&
                (() => {
                  const cardStyles = card()
                  return (
                    <div
                      className={cx(
                        cardStyles.root,
                        css({ marginBottom: '4' })
                      )}
                    >
                      <div
                        className={cx(
                          cardStyles.body,
                          css({ textAlign: 'center' })
                        )}
                        role="status"
                        aria-label="Requesting location access"
                        aria-live="polite"
                      >
                        <div
                          className={css({ fontSize: 'xl', marginBottom: '2' })}
                        >
                          <span aria-hidden="true">📍</span> Requesting location
                          access...
                        </div>
                        <div
                          className={css({ fontSize: 'sm', color: 'fg.muted' })}
                        >
                          Please allow location access in your browser to see
                          your position
                        </div>
                      </div>
                    </div>
                  )
                })()}

              {position ? (
                <>
                  <MemoizedSpeedDisplay
                    speed={speed}
                    unit={unit}
                    onToggleUnit={toggleUnit}
                  />
                  <MemoizedLocationInfo position={position} />
                  <MemoizedMap position={position} />
                </>
              ) : (
                <>
                  {(() => {
                    const cardStyles = card()
                    return (
                      <div
                        className={cx(
                          cardStyles.root,
                          css({ marginBottom: '4' })
                        )}
                      >
                        <div
                          className={cx(
                            cardStyles.body,
                            css({ textAlign: 'center' })
                          )}
                        >
                          <div
                            className={css({
                              fontSize: { base: '5xl', md: '6xl' },
                              fontWeight: 'bold',
                              color: 'fg.subtle',
                              marginBottom: '2',
                            })}
                          >
                            --{' '}
                            <span className={css({ fontSize: '3xl' })}>
                              {unit}
                            </span>
                          </div>
                          <div
                            className={css({
                              fontSize: 'sm',
                              color: 'fg.muted',
                            })}
                          >
                            Waiting for GPS signal...
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                  <MemoizedMap position={null} />
                </>
              )}
            </>
          )}
        </div>
      </main>

      <MemoizedFooter />

      <MemoizedSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        unit={unit}
        onUnitChange={handleUnitChange}
      />
    </div>
  )
}

export default App
