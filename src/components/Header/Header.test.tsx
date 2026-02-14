import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('does not render settings button when onSettingsClick is not provided', () => {
    render(<Header />)
    expect(screen.queryByLabelText('Open settings')).not.toBeInTheDocument()
  })

  it('renders settings button when onSettingsClick is provided', () => {
    render(<Header onSettingsClick={vi.fn()} />)
    expect(screen.getByLabelText('Open settings')).toBeInTheDocument()
  })

  it('calls onSettingsClick when settings button is clicked', async () => {
    const user = userEvent.setup()
    const onSettingsClick = vi.fn()
    render(<Header onSettingsClick={onSettingsClick} />)
    
    const settingsButton = screen.getByLabelText('Open settings')
    await user.click(settingsButton)
    
    expect(onSettingsClick).toHaveBeenCalledTimes(1)
  })

  it('does not render GPS indicator when hasGpsSignal is false', () => {
    render(<Header hasGpsSignal={false} />)
    expect(screen.queryByLabelText('GPS signal detected')).not.toBeInTheDocument()
  })

  it('renders GPS indicator when hasGpsSignal is true', () => {
    render(<Header hasGpsSignal={true} />)
    expect(screen.getByLabelText('GPS signal detected')).toBeInTheDocument()
  })
})
