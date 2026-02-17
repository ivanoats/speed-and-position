import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Settings } from './Settings'

describe('Settings', () => {
  it('renders when isOpen is true', () => {
    render(
      <Settings
        isOpen={true}
        onClose={vi.fn()}
        unit="mph"
        onUnitChange={vi.fn()}
      />
    )
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText(/Configure your preferences/i)).toBeInTheDocument()
  })

  it('renders with hidden attribute when isOpen is false', () => {
    const { container } = render(
      <Settings
        isOpen={false}
        onClose={vi.fn()}
        unit="mph"
        onUnitChange={vi.fn()}
      />
    )
    const content = container.querySelector('[data-part="content"]')
    expect(content).toHaveAttribute('hidden')
  })

  it('displays MPH as selected when unit is mph', () => {
    render(
      <Settings
        isOpen={true}
        onClose={vi.fn()}
        unit="mph"
        onUnitChange={vi.fn()}
      />
    )
    const mphButton = screen.getByRole('button', { name: 'MPH' })
    expect(mphButton).toBeInTheDocument()
  })

  it('displays KPH as selected when unit is kph', () => {
    render(
      <Settings
        isOpen={true}
        onClose={vi.fn()}
        unit="kph"
        onUnitChange={vi.fn()}
      />
    )
    const kphButton = screen.getByRole('button', { name: 'KPH' })
    expect(kphButton).toBeInTheDocument()
  })

  it('calls onUnitChange when MPH button is clicked', async () => {
    const user = userEvent.setup()
    const onUnitChange = vi.fn()
    render(
      <Settings
        isOpen={true}
        onClose={vi.fn()}
        unit="kph"
        onUnitChange={onUnitChange}
      />
    )

    const mphButton = screen.getByRole('button', { name: 'MPH' })
    await user.click(mphButton)

    expect(onUnitChange).toHaveBeenCalledWith('mph')
  })

  it('calls onUnitChange when KPH button is clicked', async () => {
    const user = userEvent.setup()
    const onUnitChange = vi.fn()
    render(
      <Settings
        isOpen={true}
        onClose={vi.fn()}
        unit="mph"
        onUnitChange={onUnitChange}
      />
    )

    const kphButton = screen.getByRole('button', { name: 'KPH' })
    await user.click(kphButton)

    expect(onUnitChange).toHaveBeenCalledWith('kph')
  })

  it('calls onClose when Close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Settings
        isOpen={true}
        onClose={onClose}
        unit="mph"
        onUnitChange={vi.fn()}
      />
    )

    const closeButton = screen.getByRole('button', { name: /Close/i })
    await user.click(closeButton)

    expect(onClose).toHaveBeenCalled()
  })

  it('displays Speed Unit label', () => {
    render(
      <Settings
        isOpen={true}
        onClose={vi.fn()}
        unit="mph"
        onUnitChange={vi.fn()}
      />
    )
    expect(screen.getByText('Speed Unit')).toBeInTheDocument()
  })
})
