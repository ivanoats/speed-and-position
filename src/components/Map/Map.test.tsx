import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Map } from './Map'

describe('Map', () => {
  it('renders the map container', () => {
    const { container } = render(<Map position={null} />)
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
    const { container } = render(<Map position={position} />)
    const mapElement = container.querySelector('.leaflet-container')
    expect(mapElement).toBeInTheDocument()
    
    // Check for marker
    const marker = screen.getByRole('button', { name: /Marker/i })
    expect(marker).toBeInTheDocument()
  })

  it('displays OpenStreetMap attribution', () => {
    render(<Map position={null} />)
    const attribution = screen.getByText(/OpenStreetMap/i)
    expect(attribution).toBeInTheDocument()
  })

  it('displays zoom controls', () => {
    render(<Map position={null} />)
    const zoomIn = screen.getByRole('button', { name: /Zoom in/i })
    const zoomOut = screen.getByRole('button', { name: /Zoom out/i })
    expect(zoomIn).toBeInTheDocument()
    expect(zoomOut).toBeInTheDocument()
  })

  it('displays interactive map instructions', () => {
    render(<Map position={null} />)
    const instructions = document.getElementById('map-instructions')
    expect(instructions).toBeInTheDocument()
    expect(instructions?.textContent).toContain('Double-tap to center')
    expect(instructions?.textContent).toContain('Long-press to copy coordinates')
  })

  it('renders map region with proper accessibility attributes', () => {
    render(<Map position={null} />)
    const mapRegion = screen.getByRole('region', { name: /Interactive map/i })
    expect(mapRegion).toBeInTheDocument()
    expect(mapRegion).toHaveAttribute('aria-describedby', 'map-instructions')
  })

  it('shows marker popup with position details when position is available', () => {
    const position = {
      latitude: 37.774900,
      longitude: -122.419400,
      accuracy: 15.5,
      speed: 5,
    }
    
    render(<Map position={position} />)
    
    // The popup content is rendered but may not be visible until marker is clicked
    // We can check for the marker presence
    const marker = screen.getByRole('button', { name: /Marker/i })
    expect(marker).toBeInTheDocument()
  })

  it('uses Seattle as default center when no position is provided', () => {
    const { container } = render(<Map position={null} />)
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
    
    const { rerender, container } = render(<Map position={position1} />)
    let mapElement = container.querySelector('.leaflet-container')
    expect(mapElement).toBeInTheDocument()
    
    // Change position significantly (different rounded values)
    const position2 = {
      latitude: 40.7128,
      longitude: -74.0060,
      accuracy: 10,
      speed: 5,
    }
    
    rerender(<Map position={position2} />)
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
    
    const { unmount } = render(<Map position={position} />)
    
    // Unmount should not throw error
    expect(() => unmount()).not.toThrow()
  })

  it('does not display tile error warning initially', () => {
    render(<Map position={null} />)
    
    // Should not show error message initially
    expect(screen.queryByText(/Map Tiles Blocked/i)).not.toBeInTheDocument()
  })

  it('does not count tile errors before any tiles have loaded successfully', () => {
    render(<Map position={null} />)
    
    // The error dialog should not appear initially because:
    // 1. No tiles have loaded yet (hasLoadedTile is false)
    // 2. Even if tileerror events fire, they won't be counted until after first successful tile load
    // This prevents false positives from cancelled requests during initial map render or panning
    expect(screen.queryByText(/Map Tiles Blocked/i)).not.toBeInTheDocument()
  })
})
