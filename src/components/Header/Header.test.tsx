import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header />)
    expect(screen.getByText('Speed & Location')).toBeInTheDocument()
  })

  it('renders as a header element', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('renders the title as an h1', () => {
    render(<Header />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Speed & Location')
  })
})
