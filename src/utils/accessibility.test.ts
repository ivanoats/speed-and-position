import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  debounce,
  prefersReducedMotion,
  prefersHighContrast,
} from './accessibility'

describe('accessibility utilities', () => {
  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should delay function execution', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)

      debouncedFn()

      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(300)

      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should cancel previous timeout when called again', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)

      debouncedFn()
      vi.advanceTimersByTime(100)

      debouncedFn()
      vi.advanceTimersByTime(100)

      debouncedFn()
      vi.advanceTimersByTime(299)

      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1)

      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should pass arguments to the debounced function', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)

      debouncedFn('arg1', 'arg2', 123)

      vi.advanceTimersByTime(300)

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123)
    })

    it('should handle multiple calls with different arguments', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)

      debouncedFn('first')
      vi.advanceTimersByTime(100)

      debouncedFn('second')
      vi.advanceTimersByTime(100)

      debouncedFn('third')
      vi.advanceTimersByTime(300)

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('third')
    })

    it('should allow multiple debounced calls after delay', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 300)

      debouncedFn('first')
      vi.advanceTimersByTime(300)

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenLastCalledWith('first')

      debouncedFn('second')
      vi.advanceTimersByTime(300)

      expect(mockFn).toHaveBeenCalledTimes(2)
      expect(mockFn).toHaveBeenLastCalledWith('second')
    })

    it('should handle zero delay', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 0)

      debouncedFn()

      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(0)

      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('prefersReducedMotion', () => {
    it('should return true when user prefers reduced motion', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })),
      })

      expect(prefersReducedMotion()).toBe(true)
    })

    it('should return false when user does not prefer reduced motion', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: false,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })),
      })

      expect(prefersReducedMotion()).toBe(false)
    })

    it('should call matchMedia with correct query', () => {
      const matchMediaMock = vi.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: matchMediaMock,
      })

      prefersReducedMotion()

      expect(matchMediaMock).toHaveBeenCalledWith(
        '(prefers-reduced-motion: reduce)'
      )
    })
  })

  describe('prefersHighContrast', () => {
    it('should return true when user prefers high contrast', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(prefers-contrast: more)',
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })),
      })

      expect(prefersHighContrast()).toBe(true)
    })

    it('should return false when user does not prefer high contrast', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: false,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })),
      })

      expect(prefersHighContrast()).toBe(false)
    })

    it('should call matchMedia with correct query', () => {
      const matchMediaMock = vi.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: matchMediaMock,
      })

      prefersHighContrast()

      expect(matchMediaMock).toHaveBeenCalledWith('(prefers-contrast: more)')
    })
  })
})
