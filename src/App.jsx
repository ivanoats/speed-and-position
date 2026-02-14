import React, { useState, useEffect } from 'react'
import { css } from '../styled-system/css'
import { container } from '../styled-system/patterns'

/**
 * Main App Component for Speed and Position
 * Mobile-first redesign using ParkUI
 */
function App() {
  const [speed, setSpeed] = useState(0)
  const [position, setPosition] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    const successHandler = (pos) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      })
      setSpeed(pos.coords.speed ? pos.coords.speed * 2.23694 : 0) // m/s to mph
      setLoading(false)
    }

    const errorHandler = (err) => {
      setError(err.message)
      setLoading(false)
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
    })

    // Watch position for updates
    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return (
    <div className={css({ minHeight: '100vh', display: 'flex', flexDirection: 'column' })}>
      {/* Header */}
      <header className={css({
        bg: 'blue.600',
        color: 'white',
        padding: '4',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: 'md',
      })}>
        <h1 className={css({ fontSize: '2xl', fontWeight: 'bold', margin: 0 })}>
          Speed & Location
        </h1>
      </header>

      {/* Main Content */}
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
              {/* Speed Display */}
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
                })}>
                  {speed.toFixed(1)} <span className={css({ fontSize: '3xl' })}>mph</span>
                </div>
              </div>

              {/* Position Info */}
              {position && (
                <div className={css({
                  bg: 'white',
                  borderRadius: 'lg',
                  padding: '4',
                  boxShadow: 'md',
                })}>
                  <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '3' })}>
                    Location
                  </h2>
                  <div className={css({ fontSize: 'sm', color: 'gray.700' })}>
                    <div className={css({ marginBottom: '2' })}>
                      <strong>Latitude:</strong> {position.latitude.toFixed(6)}
                    </div>
                    <div className={css({ marginBottom: '2' })}>
                      <strong>Longitude:</strong> {position.longitude.toFixed(6)}
                    </div>
                    <div>
                      <strong>Accuracy:</strong> ±{position.accuracy.toFixed(1)}m
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for Map - will be implemented with React-Leaflet */}
              <div className={css({
                bg: 'gray.100',
                borderRadius: 'lg',
                padding: '8',
                marginTop: '4',
                textAlign: 'center',
                color: 'gray.600',
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}>
                🗺️ Map will be implemented here with React-Leaflet
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={css({
        bg: 'gray.100',
        padding: '4',
        textAlign: 'center',
        marginTop: 'auto',
      })}>
        <div className={css({ fontSize: 'sm', color: 'gray.600' })}>
          Made with ♥ by{' '}
          <a 
            href="https://www.ivanstorck.com"
            className={css({ color: 'blue.600', textDecoration: 'underline' })}
          >
            Ivan Storck
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
