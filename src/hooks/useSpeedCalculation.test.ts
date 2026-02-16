import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSpeedCalculation } from './useSpeedCalculation'

describe('useSpeedCalculation', () => {
  it('returns 0 for null speed', () => {
    const { result } = renderHook(() => useSpeedCalculation(null, 'mph'))
    expect(result.current).toBe(0)
  })

  it('converts meters per second to mph by default', () => {
    const { result } = renderHook(() => useSpeedCalculation(10))
    expect(result.current).toBeCloseTo(22.3694, 2)
  })

  it('converts meters per second to mph when specified', () => {
    const { result } = renderHook(() => useSpeedCalculation(10, 'mph'))
    expect(result.current).toBeCloseTo(22.3694, 2)
  })

  it('converts meters per second to kph when specified', () => {
    const { result } = renderHook(() => useSpeedCalculation(10, 'kph'))
    expect(result.current).toBe(36)
  })

  it('handles zero speed', () => {
    const { result } = renderHook(() => useSpeedCalculation(0, 'mph'))
    expect(result.current).toBe(0)
  })

  it('handles decimal speeds in mph', () => {
    const { result } = renderHook(() => useSpeedCalculation(15.5, 'mph'))
    expect(result.current).toBeCloseTo(34.6726, 2)
  })

  it('handles decimal speeds in kph', () => {
    const { result } = renderHook(() => useSpeedCalculation(15.5, 'kph'))
    expect(result.current).toBeCloseTo(55.8, 1)
  })

  it('memoizes the result', () => {
    const { result, rerender } = renderHook(
      ({ speed, unit }) => useSpeedCalculation(speed, unit),
      { initialProps: { speed: 10, unit: 'mph' as const } }
    )
    
    const firstResult = result.current
    rerender({ speed: 10, unit: 'mph' as const })
    expect(result.current).toBe(firstResult)
  })

  it('recalculates when unit changes', () => {
    const { result, rerender } = renderHook(
      ({ speed, unit }) => useSpeedCalculation(speed, unit),
      { initialProps: { speed: 10, unit: 'mph' } as { speed: number; unit: 'mph' | 'kph' } }
    )
    
    const mphResult = result.current
    expect(mphResult).toBeCloseTo(22.3694, 2)
    
    rerender({ speed: 10, unit: 'kph' })
    expect(result.current).toBe(36)
    expect(result.current).not.toBe(mphResult)
  })
})
