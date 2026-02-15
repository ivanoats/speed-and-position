import { useEffect } from 'react'

/**
 * Hook to register the service worker for PWA functionality
 * Provides offline support and caching
 */
export function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const handleLoad = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration.scope)
            
            // Check for updates periodically
            const intervalId = setInterval(() => {
              registration.update()
            }, 60000) // Check every minute
            
            // Clean up interval on unmount
            return () => clearInterval(intervalId)
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error)
          })
      }

      window.addEventListener('load', handleLoad)

      return () => {
        window.removeEventListener('load', handleLoad)
      }
    }
  }, [])
}
