import { css } from '../styled-system/css'
import { container } from '../styled-system/patterns'
import { useGeolocation } from './hooks/useGeolocation'
import { useSpeedCalculation } from './hooks/useSpeedCalculation'
import { Header } from './components/Header/Header'
import { SpeedDisplay } from './components/SpeedDisplay/SpeedDisplay'
import { LocationInfo } from './components/LocationInfo/LocationInfo'
import { Map } from './components/Map/Map'
import { Footer } from './components/Footer/Footer'

/**
 * Main App Component for Speed and Position
 * Mobile-first redesign using component architecture
 */
function App() {
  const { position, loading, error } = useGeolocation()
  const speed = useSpeedCalculation(position?.speed ?? null)

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
              <SpeedDisplay speed={speed} />
              {position && <LocationInfo position={position} />}
              <Map />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
