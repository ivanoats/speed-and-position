import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSpeedCalculation } from './useSpeedCalculation'

describe('useSpeedCalculation', () => {
  it('returns 0 for null speed', () => {
    const { result } = renderHook(() => useSpeedCalculation(null))
    expect(result.current).toBe(0)
  })

  it('returns 0 for undefined speed', () => {
    const { result } = renderHook(() => useSpeedCalculation(undefined as unknown as null))
    expect(result.current).toBe(0)
  })

  it('converts meters per second to mph', () => {
    const { result } = renderHook(() => useSpeedCalculation(10))
    expect(result.current).toBeCloseTo(22.3694, 2)
  })

  it('handles zero speed', () => {
    const { result } = renderHook(() => useSpeedCalculation(0))
    expect(result.current).toBe(0)
  })

  it('handles decimal speeds', () => {
    const { result } = renderHook(() => useSpeedCalculation(15.5))
    expect(result.current).toBeCloseTo(34.6726, 2)
  })

  it('memoizes the result', () => {
    const { result, rerender } = renderHook(
      ({ speed }) => useSpeedCalculation(speed),
      { initialProps: { speed: 10 } }
    )
    
    const firstResult = result.current
    rerender({ speed: 10 })
    expect(result.current).toBe(firstResult)
  })
})
