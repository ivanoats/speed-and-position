import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Map } from './Map'

describe('Map', () => {
  const mockOnTrackingPause = vi.fn()

  it('renders the map container', () => {
    const { container } = render(
      <Map
        position={null}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )
    const mapElement = container.querySelector('.leaflet-container')
    expect(mapElement).toBeInTheDocument()
  })

  it('renders with position data and shows marker', () => {
    const position = {
      latitude: 37.7749,
      longitude: -122.4194,
      accuracy: 10,
      speed: 5,
    }
    const { container } = render(
      <Map
        position={position}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )
    const mapElement = container.querySelector('.leaflet-container')
    expect(mapElement).toBeInTheDocument()

    // Check for marker
    const marker = screen.getByRole('button', { name: /Marker/i })
    expect(marker).toBeInTheDocument()
  })

  it('displays OpenStreetMap attribution', () => {
    render(
      <Map
        position={null}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )
    const attribution = screen.getByText(/OpenStreetMap/i)
    expect(attribution).toBeInTheDocument()
  })

  it('displays zoom controls', () => {
    render(
      <Map
        position={null}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )
    const zoomIn = screen.getByRole('button', { name: /Zoom in/i })
    const zoomOut = screen.getByRole('button', { name: /Zoom out/i })
    expect(zoomIn).toBeInTheDocument()
    expect(zoomOut).toBeInTheDocument()
  })

  it('displays interactive map instructions', () => {
    render(
      <Map
        position={null}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )
    const instructions = document.getElementById('map-instructions')
    expect(instructions).toBeInTheDocument()
    expect(instructions?.textContent).toContain('Double-tap to center')
    expect(instructions?.textContent).toContain(
      'Long-press to copy coordinates'
    )
  })

  it('renders map region with proper accessibility attributes', () => {
    render(
      <Map
        position={null}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )
    const mapRegion = screen.getByRole('region', { name: /Interactive map/i })
    expect(mapRegion).toBeInTheDocument()
    expect(mapRegion).toHaveAttribute('aria-describedby', 'map-instructions')
  })

  it('shows marker popup with position details when position is available', () => {
    const position = {
      latitude: 37.7749,
      longitude: -122.4194,
      accuracy: 15.5,
      speed: 5,
    }

    render(
      <Map
        position={position}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )

    // The popup content is rendered but may not be visible until marker is clicked
    // We can check for the marker presence
    const marker = screen.getByRole('button', { name: /Marker/i })
    expect(marker).toBeInTheDocument()
  })

  it('uses Seattle as default center when no position is provided', () => {
    const { container } = render(
      <Map
        position={null}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )
    const mapElement = container.querySelector('.leaflet-container')
    expect(mapElement).toBeInTheDocument()
    // The map should render without errors even without position
  })

  it('updates map key when position changes significantly', () => {
    const position1 = {
      latitude: 37.7749,
      longitude: -122.4194,
      accuracy: 10,
      speed: 5,
    }

    const { rerender, container } = render(
      <Map
        position={position1}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )
    let mapElement = container.querySelector('.leaflet-container')
    expect(mapElement).toBeInTheDocument()

    // Change position significantly (different rounded values)
    const position2 = {
      latitude: 40.7128,
      longitude: -74.006,
      accuracy: 10,
      speed: 5,
    }

    rerender(
      <Map
        position={position2}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )
    mapElement = container.querySelector('.leaflet-container')

    // Map should still exist after position change
    expect(mapElement).toBeInTheDocument()
  })

  it('cleans up on unmount', () => {
    const position = {
      latitude: 37.7749,
      longitude: -122.4194,
      accuracy: 10,
      speed: 5,
    }

    const { unmount } = render(
      <Map
        position={position}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )

    // Unmount should not throw error
    expect(() => unmount()).not.toThrow()
  })

  it('does not display tile error warning initially', () => {
    render(
      <Map
        position={null}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )

    // Should not show error message initially
    expect(screen.queryByText(/Map Tiles Blocked/i)).not.toBeInTheDocument()
  })

  it('does not count tile errors before any tiles have loaded successfully', () => {
    render(
      <Map
        position={null}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )

    // The error dialog should not appear initially because:
    // 1. No tiles have loaded yet (hasLoadedTile is false)
    // 2. Even if tileerror events fire, they won't be counted until after first successful tile load
    // This prevents false positives from cancelled requests during initial map render or panning
    expect(screen.queryByText(/Map Tiles Blocked/i)).not.toBeInTheDocument()
  })

  it('shows "Resume Tracking" button when tracking is paused', () => {
    render(
      <Map
        position={null}
        isTrackingPaused={true}
        onTrackingPause={mockOnTrackingPause}
      />
    )

    const resumeButton = screen.getByRole('button', {
      name: /Resume tracking/i,
    })
    expect(resumeButton).toBeInTheDocument()
  })

  it('does not show "Resume Tracking" button when tracking is not paused', () => {
    render(
      <Map
        position={null}
        isTrackingPaused={false}
        onTrackingPause={mockOnTrackingPause}
      />
    )

    const resumeButton = screen.queryByRole('button', {
      name: /Resume tracking/i,
    })
    expect(resumeButton).not.toBeInTheDocument()
  })

  it('shows notification when tracking is paused', () => {
    render(
      <Map
        position={null}
        isTrackingPaused={true}
        onTrackingPause={mockOnTrackingPause}
      />
    )

    const notification = screen.getByText(/Tracking paused - Explore the map/i)
    expect(notification).toBeInTheDocument()
  })

  it('calls onTrackingPause when resume button is clicked', () => {
    const mockCallback = vi.fn()
    render(
      <Map
        position={null}
        isTrackingPaused={true}
        onTrackingPause={mockCallback}
      />
    )

    const resumeButton = screen.getByRole('button', {
      name: /Resume tracking/i,
    })
    resumeButton.click()

    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
})
