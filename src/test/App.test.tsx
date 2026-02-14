import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import { mockGeolocation } from './setup'

describe('App Component', () => {
  let originalGeolocation: Geolocation

  beforeEach(() => {
    originalGeolocation = globalThis.navigator.geolocation
  })

  afterEach(() => {
    // Restore geolocation after each test
    globalThis.navigator.geolocation = originalGeolocation
  })

  it('should render loading state initially', () => {
    render(<App />)
    expect(screen.getByText(/Loading... Please stand by/i)).toBeInTheDocument()
  })

  it('should display error when geolocation is not supported', async () => {
    // Mock geolocation as undefined
    // @ts-expect-error - intentionally setting to undefined for test
    globalThis.navigator.geolocation = undefined

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Geolocation is not supported/i)).toBeInTheDocument()
    })
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
    expect(screen.getAllByText(/mph/i).length).toBeGreaterThan(0)

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
