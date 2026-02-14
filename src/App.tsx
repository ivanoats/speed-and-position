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

/**
 * Main App Component for Speed and Position
 * Mobile-first redesign using component architecture
 */
function App() {
  const { position, loading, error } = useGeolocation()
  const [unit, setUnit] = useState<SpeedUnit>('mph')
  const speed = useSpeedCalculation(position?.speed ?? null, unit)

  const toggleUnit = () => {
    setUnit(prev => prev === 'mph' ? 'kph' : 'mph')
  }

  return (
    <div className={css({ minHeight: '100vh', display: 'flex', flexDirection: 'column' })}>
      <Header />

      <main className={css({ flex: 1, padding: '4' })}>
        <div className={container()}>
          {loading && (
            <div className={css({ 
              textAlign: 'center', 
              fontSize: 'xl',
              padding: '8',
            })}>
              Loading... Please stand by.
            </div>
          )}

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

          {!loading && !error && (
            <>
              <SpeedDisplay speed={speed} unit={unit} onToggleUnit={toggleUnit} />
              {position && <LocationInfo position={position} />}
              <Map position={position} />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
