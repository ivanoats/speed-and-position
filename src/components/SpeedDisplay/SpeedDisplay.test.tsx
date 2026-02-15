import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SpeedDisplay } from './SpeedDisplay'

describe('SpeedDisplay', () => {
  it('renders speed with one decimal place', () => {
    render(<SpeedDisplay speed={45.678} />)
    expect(screen.getByText(/45\.7/)).toBeInTheDocument()
  })

  it('displays mph unit by default', () => {
    render(<SpeedDisplay speed={30} />)
    expect(screen.getByText('mph')).toBeInTheDocument()
  })

  it('displays kph unit when specified', () => {
    render(<SpeedDisplay speed={50} unit="kph" />)
    expect(screen.getByText('kph')).toBeInTheDocument()
  })

  it('rounds speed to one decimal place', () => {
    render(<SpeedDisplay speed={25.123456} />)
    expect(screen.getByText(/25\.1/)).toBeInTheDocument()
  })

  it('displays zero speed correctly', () => {
    render(<SpeedDisplay speed={0} />)
    expect(screen.getByText(/0\.0/)).toBeInTheDocument()
  })

  it('does not show toggle button when onToggleUnit is not provided', () => {
    render(<SpeedDisplay speed={30} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('shows toggle button when onToggleUnit is provided', () => {
    const onToggleUnit = vi.fn()
    render(<SpeedDisplay speed={30} unit="mph" onToggleUnit={onToggleUnit} />)
    expect(screen.getByRole('button', { name: /Switch to KPH/i })).toBeInTheDocument()
  })

  it('calls onToggleUnit when toggle button is clicked', async () => {
    const user = userEvent.setup()
    const onToggleUnit = vi.fn()
    render(<SpeedDisplay speed={30} unit="mph" onToggleUnit={onToggleUnit} />)
    
    const button = screen.getByRole('button', { name: /Switch to KPH/i })
    await user.click(button)
    
    expect(onToggleUnit).toHaveBeenCalledTimes(1)
  })

  it('shows correct toggle button text for kph unit', () => {
    const onToggleUnit = vi.fn()
    render(<SpeedDisplay speed={30} unit="kph" onToggleUnit={onToggleUnit} />)
    expect(screen.getByRole('button', { name: /Switch to MPH/i })).toBeInTheDocument()
  })
})
