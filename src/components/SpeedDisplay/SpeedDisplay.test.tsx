import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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
})
