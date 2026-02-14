import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import { mockGeolocation } from './setup'

describe('App Component', () => {
  it('should render loading state initially', () => {
    render(<App />)
    expect(screen.getByText(/Loading... Please stand by/i)).toBeInTheDocument()
  })

  it('should display error when geolocation is not supported', async () => {
    // Mock geolocation as undefined
    const originalGeolocation = globalThis.navigator.geolocation
    // @ts-expect-error - intentionally setting to undefined for test
    globalThis.navigator.geolocation = undefined

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Geolocation is not supported/i)).toBeInTheDocument()
    })

    // Restore geolocation
    globalThis.navigator.geolocation = originalGeolocation
  })

  it('should display speed and position when geolocation succeeds', async () => {
    const mockPosition: GeolocationPosition = {
      coords: {
        latitude: 47.6062,
        longitude: -122.3321,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: 10, // 10 m/s
      },
      timestamp: Date.now(),
    }

    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition)
    })
    mockGeolocation.watchPosition.mockImplementation((success) => {
      success(mockPosition)
      return 1 // mock watch ID
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
    })

    // Speed should be converted from m/s to mph (10 * 2.23694 ≈ 22.4)
    expect(screen.getByText(/22\.4/i)).toBeInTheDocument()
    expect(screen.getByText(/mph/i)).toBeInTheDocument()

    // Position should be displayed
    expect(screen.getByText(/Latitude:/i)).toBeInTheDocument()
    expect(screen.getByText(/47\.606200/i)).toBeInTheDocument()
    expect(screen.getByText(/Longitude:/i)).toBeInTheDocument()
  })

  it('should render header with correct title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Speed & Location/i })).toBeInTheDocument()
  })

  it('should render footer with author link', () => {
    render(<App />)
    const authorLink = screen.getByRole('link', { name: /Ivan Storck/i })
    expect(authorLink).toBeInTheDocument()
    expect(authorLink).toHaveAttribute('href', 'https://www.ivanstorck.com')
  })
})
