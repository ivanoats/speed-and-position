import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Map } from './Map'

describe('Map', () => {
  it('renders the map placeholder', () => {
    render(<Map />)
    expect(screen.getByText(/Map will be implemented/i)).toBeInTheDocument()
  })

  it('displays the map icon emoji', () => {
    render(<Map />)
    expect(screen.getByText(/🗺️/)).toBeInTheDocument()
  })
})
