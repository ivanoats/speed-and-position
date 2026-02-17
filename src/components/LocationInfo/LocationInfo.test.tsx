import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LocationInfo } from './LocationInfo'

describe('LocationInfo', () => {
  const mockPosition = {
    latitude: 47.6062,
    longitude: -122.3321,
    accuracy: 10.5,
    speed: null,
  }

  it('renders the location heading', () => {
    render(<LocationInfo position={mockPosition} />)
    expect(screen.getByText('Location')).toBeInTheDocument()
  })

  it('displays latitude with 6 decimal places when expanded', async () => {
    const user = userEvent.setup()
    render(<LocationInfo position={mockPosition} />)

    // Click to expand
    const button = screen.getByRole('button', {
      name: /Location information/i,
    })
    await user.click(button)

    expect(screen.getByText(/47\.606200/)).toBeInTheDocument()
  })

  it('displays longitude with 6 decimal places when expanded', async () => {
    const user = userEvent.setup()
    render(<LocationInfo position={mockPosition} />)

    // Click to expand
    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText(/-122\.332100/)).toBeInTheDocument()
  })

  it('displays accuracy with one decimal place when expanded', async () => {
    const user = userEvent.setup()
    render(<LocationInfo position={mockPosition} />)

    // Click to expand
    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText(/±10\.5m/)).toBeInTheDocument()
  })

  it('formats accuracy correctly when expanded', async () => {
    const user = userEvent.setup()
    const position = { ...mockPosition, accuracy: 5.678 }
    render(<LocationInfo position={position} />)

    // Click to expand
    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText(/±5\.7m/)).toBeInTheDocument()
  })

  it('toggles between collapsed and expanded states', async () => {
    const user = userEvent.setup()
    render(<LocationInfo position={mockPosition} />)

    const button = screen.getByRole('button')

    // Initially collapsed
    expect(button).toHaveAttribute('aria-expanded', 'false')

    // Click to expand
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/Latitude:/)).toBeInTheDocument()

    // Click to collapse
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(/Latitude:/)).not.toBeInTheDocument()
  })

  it('shows hint text when collapsed', () => {
    render(<LocationInfo position={mockPosition} />)
    expect(screen.getByText(/Tap to view coordinates/)).toBeInTheDocument()
  })

  it('toggles state when Enter key is pressed', async () => {
    const user = userEvent.setup()
    render(<LocationInfo position={mockPosition} />)

    const button = screen.getByRole('button')

    // Initially collapsed
    expect(button).toHaveAttribute('aria-expanded', 'false')

    // Press Enter to expand
    button.focus()
    await user.keyboard('{Enter}')
    expect(button).toHaveAttribute('aria-expanded', 'true')

    // Press Enter to collapse
    await user.keyboard('{Enter}')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles state when Space key is pressed', async () => {
    const user = userEvent.setup()
    render(<LocationInfo position={mockPosition} />)

    const button = screen.getByRole('button')

    // Initially collapsed
    expect(button).toHaveAttribute('aria-expanded', 'false')

    // Press Space to expand
    button.focus()
    await user.keyboard(' ')
    expect(button).toHaveAttribute('aria-expanded', 'true')

    // Press Space to collapse
    await user.keyboard(' ')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
