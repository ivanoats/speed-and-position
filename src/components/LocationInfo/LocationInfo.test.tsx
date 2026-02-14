import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LocationInfo } from './LocationInfo'

describe('LocationInfo', () => {
  const mockPosition = {
    latitude: 47.6062,
    longitude: -122.3321,
    accuracy: 10.5,
  }

  it('renders the location heading', () => {
    render(<LocationInfo position={mockPosition} />)
    expect(screen.getByText('Location')).toBeInTheDocument()
  })

  it('displays latitude with 6 decimal places', () => {
    render(<LocationInfo position={mockPosition} />)
    expect(screen.getByText(/47\.606200/)).toBeInTheDocument()
  })

  it('displays longitude with 6 decimal places', () => {
    render(<LocationInfo position={mockPosition} />)
    expect(screen.getByText(/-122\.332100/)).toBeInTheDocument()
  })

  it('displays accuracy with one decimal place', () => {
    render(<LocationInfo position={mockPosition} />)
    expect(screen.getByText(/±10\.5m/)).toBeInTheDocument()
  })

  it('formats accuracy correctly', () => {
    const position = { ...mockPosition, accuracy: 5.678 }
    render(<LocationInfo position={position} />)
    expect(screen.getByText(/±5\.7m/)).toBeInTheDocument()
  })
})
