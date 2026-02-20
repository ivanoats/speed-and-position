import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { mockGeolocation } from './setup'

describe('App Component', () => {
  let originalGeolocation: Geolocation

  beforeEach(() => {
    originalGeolocation = globalThis.navigator.geolocation
  })

  afterEach(() => {
    // Restore geolocation after each test
    // @ts-expect-error - Assigning to readonly property for test cleanup
    globalThis.navigator.geolocation = originalGeolocation
  })

  it('should show permission prompt on initial load', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /Welcome to Speed & Position/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Enable Location Access/i })
    ).toBeInTheDocument()
  })

  it('should render loading state after permission is granted', async () => {
    const user = userEvent.setup()

    // Mock geolocation to not call callbacks immediately (simulating loading state)
    mockGeolocation.getCurrentPosition.mockImplementation(() => {
      // Don't call success or error - simulate waiting for permission
    })
    mockGeolocation.watchPosition.mockImplementation(() => {
      return 1 // mock watch ID
    })

    render(<App />)

    const enableButton = screen.getByRole('button', {
      name: /Enable Location Access/i,
    })
    await user.click(enableButton)

    // Should see placeholder and waiting messages (since we're waiting for GPS)
    await waitFor(() => {
      expect(screen.getByText(/Waiting for GPS signal/i)).toBeInTheDocument()
    })
  })

  it('should show placeholder speed display when no position after permission granted', async () => {
    const user = userEvent.setup()

    // Mock geolocation to not call callbacks immediately
    mockGeolocation.getCurrentPosition.mockImplementation(() => {
      // Don't call success or error
    })
    mockGeolocation.watchPosition.mockImplementation(() => {
      return 1 // mock watch ID
    })

    render(<App />)

    const enableButton = screen.getByRole('button', {
      name: /Enable Location Access/i,
    })
    await user.click(enableButton)

    // Should show placeholder while waiting for position
    await waitFor(() => {
      expect(screen.getByText(/--/)).toBeInTheDocument()
    })
    expect(screen.getByText(/Waiting for GPS signal/i)).toBeInTheDocument()
  })

  it('should display error when geolocation is not supported after permission granted', async () => {
    const user = userEvent.setup()
    // Mock geolocation as undefined
    // @ts-expect-error - intentionally setting to undefined for test
    globalThis.navigator.geolocation = undefined

    render(<App />)

    const enableButton = screen.getByRole('button', {
      name: /Enable Location Access/i,
    })
    await user.click(enableButton)

    await waitFor(() => {
      expect(
        screen.getByText(/Geolocation is not supported/i)
      ).toBeInTheDocument()
    })
  })

  it('should show retry button when permission is denied', async () => {
    const user = userEvent.setup()

    // Mock geolocation to simulate permission denied
    mockGeolocation.getCurrentPosition.mockImplementation(
      (
        _success: (position: GeolocationPosition) => void,
        error: (error: GeolocationPositionError) => void
      ) => {
        error({
          code: 1,
          message: 'User denied Geolocation',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        } as GeolocationPositionError)
      }
    )
    mockGeolocation.watchPosition.mockImplementation(() => 1)

    render(<App />)

    const enableButton = screen.getByRole('button', {
      name: /Enable Location Access/i,
    })
    await user.click(enableButton)

    // Should show error with retry button
    await waitFor(() => {
      expect(screen.getByText(/User denied Geolocation/i)).toBeInTheDocument()
    })

    const retryButton = screen.getByRole('button', { name: /Try Again/i })
    expect(retryButton).toBeInTheDocument()

    // Click retry should go back to permission prompt
    await user.click(retryButton)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Welcome to Speed & Position/i })
      ).toBeInTheDocument()
    })
  })

  it('should display speed and position when geolocation succeeds', async () => {
    const user = userEvent.setup()
    const mockPosition: GeolocationPosition = {
      coords: {
        latitude: 47.6062,
        longitude: -122.3321,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: 10, // 10 m/s
        toJSON: () => ({}),
      },
      timestamp: Date.now(),
      toJSON: () => ({}),
    }

    mockGeolocation.getCurrentPosition.mockImplementation(
      (success: (position: GeolocationPosition) => void) => {
        success(mockPosition)
      }
    )
    mockGeolocation.watchPosition.mockImplementation(
      (success: (position: GeolocationPosition) => void) => {
        success(mockPosition)
        return 1 // mock watch ID
      }
    )

    render(<App />)

    const enableButton = screen.getByRole('button', {
      name: /Enable Location Access/i,
    })
    await user.click(enableButton)

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
    })

    // Speed should be converted from m/s to mph (10 * 2.23694 ≈ 22.4)
    expect(screen.getByText(/22\.4/i)).toBeInTheDocument()
    expect(screen.getAllByText(/mph/i).length).toBeGreaterThan(0)

    // Location info should be present but collapsed initially
    expect(
      screen.getByRole('button', { name: /Location information/i })
    ).toBeInTheDocument()

    // The component should show hint text when collapsed
    expect(screen.getByText(/Tap to view coordinates/i)).toBeInTheDocument()
  })

  it('should render header with correct title', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /Speed & Location/i })
    ).toBeInTheDocument()
  })

  it('should render footer with author link', () => {
    render(<App />)
    const authorLink = screen.getByRole('link', { name: /Ivan Storck/i })
    expect(authorLink).toBeInTheDocument()
    expect(authorLink).toHaveAttribute('href', 'https://www.ivanstorck.com')
  })
})
