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
})
