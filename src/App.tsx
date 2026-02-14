import { css } from '../styled-system/css'
import { container } from '../styled-system/patterns'
import { useState } from 'react'
import { useGeolocation } from './hooks/useGeolocation'
import { useSpeedCalculation, type SpeedUnit } from './hooks/useSpeedCalculation'
import { Header } from './components/Header'
import { SpeedDisplay } from './components/SpeedDisplay'
import { LocationInfo } from './components/LocationInfo'
import { Map } from './components/Map'
import { Footer } from './components/Footer'
import { Settings } from './components/Settings'

/**
 * Main App Component for Speed and Position
 * Mobile-first redesign using component architecture
 */
function App() {
  const { position, loading, error } = useGeolocation()
  const [unit, setUnit] = useState<SpeedUnit>('mph')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const speed = useSpeedCalculation(position?.speed ?? null, unit)

  const toggleUnit = () => {
    setUnit(prev => prev === 'mph' ? 'kph' : 'mph')
  }

  const handleUnitChange = (newUnit: SpeedUnit) => {
    setUnit(newUnit)
  }

  return (
    <div className={css({ minHeight: '100vh', display: 'flex', flexDirection: 'column' })}>
      <Header 
        onSettingsClick={() => setIsSettingsOpen(true)}
        hasGpsSignal={!!position && !loading}
      />

      <main className={css({ flex: 1, padding: '4' })}>
        <div className={container()}>
          {error && (
            <div className={css({
              bg: 'red.100',
              border: '2px solid',
              borderColor: 'red.500',
              color: 'red.800',
              padding: '4',
              borderRadius: 'md',
              marginBottom: '4',
            })}>
              Error: {error}
            </div>
          )}

          {loading && !position && (
            <div className={css({ 
              textAlign: 'center', 
              fontSize: 'xl',
              padding: '8',
              bg: 'blue.50',
              borderRadius: 'md',
              marginBottom: '4',
              border: '2px solid',
              borderColor: 'blue.200',
            })}>
              📍 Requesting location access...
              <div className={css({ fontSize: 'sm', color: 'gray.600', marginTop: '2' })}>
                Please allow location access in your browser to see your position
              </div>
            </div>
          )}

          {position ? (
            <>
              <SpeedDisplay speed={speed} unit={unit} onToggleUnit={toggleUnit} />
              <LocationInfo position={position} />
              <Map position={position} />
            </>
          ) : (
            <>
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
                  color: 'gray.400',
                  marginBottom: '2',
                })}>
                  -- <span className={css({ fontSize: '3xl' })}>{unit}</span>
                </div>
                <div className={css({ fontSize: 'sm', color: 'gray.500' })}>
                  Waiting for GPS signal...
                </div>
              </div>
              <Map position={null} />
            </>
          )}
        </div>
      </main>

      <Footer />

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        unit={unit}
        onUnitChange={handleUnitChange}
      />
    </div>
  )
}

export default App
