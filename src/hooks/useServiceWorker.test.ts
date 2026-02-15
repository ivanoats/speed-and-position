import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useServiceWorker } from './useServiceWorker'

/* eslint-disable no-undef */

describe('useServiceWorker', () => {
  let originalNavigator: typeof navigator
  let mockRegistration: {
    scope: string
    update: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    vi.useFakeTimers()
    originalNavigator = globalThis.navigator
    
    mockRegistration = {
      scope: '/test-scope',
      update: vi.fn(),
    }

    // Mock navigator.serviceWorker
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        serviceWorker: {
          register: vi.fn().mockResolvedValue(mockRegistration),
        },
      },
      writable: true,
      configurable: true,
    })

    // Mock window.addEventListener
    globalThis.window.addEventListener = vi.fn()
    globalThis.window.removeEventListener = vi.fn()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    })
  })

  it('should register service worker on mount', async () => {
    renderHook(() => useServiceWorker())

    expect(window.addEventListener).toHaveBeenCalledWith('load', expect.any(Function))
  })

  it('should clean up event listener on unmount', () => {
    const { unmount } = renderHook(() => useServiceWorker())

    unmount()

    expect(window.removeEventListener).toHaveBeenCalledWith('load', expect.any(Function))
  })

  it('should register service worker when load event fires', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    renderHook(() => useServiceWorker())

    // Get the load handler that was registered
    const loadHandler = (window.addEventListener as ReturnType<typeof vi.fn>).mock.calls[0][1]
    
    // Trigger the load event (returns a promise)
    const loadPromise = loadHandler()

    // Wait for promise to resolve
    await loadPromise

    expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js')
    
    consoleLogSpy.mockRestore()
  })

  it('should set up periodic updates after registration', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    renderHook(() => useServiceWorker())

    // Get the load handler
    const loadHandler = (window.addEventListener as ReturnType<typeof vi.fn>).mock.calls[0][1]
    
    // Trigger the load event
    await loadHandler()

    expect(navigator.serviceWorker.register).toHaveBeenCalled()

    // Fast-forward time by 60 seconds
    vi.advanceTimersByTime(60000)

    expect(mockRegistration.update).toHaveBeenCalledTimes(1)

    // Fast-forward another 60 seconds
    vi.advanceTimersByTime(60000)

    expect(mockRegistration.update).toHaveBeenCalledTimes(2)
    
    consoleLogSpy.mockRestore()
  })

  it('should clear interval on unmount', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const { unmount } = renderHook(() => useServiceWorker())

    // Get the load handler
    const loadHandler = (window.addEventListener as ReturnType<typeof vi.fn>).mock.calls[0][1]
    
    // Trigger the load event
    await loadHandler()

    expect(navigator.serviceWorker.register).toHaveBeenCalled()

    // Spy on clearInterval
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
    
    consoleLogSpy.mockRestore()
  })

  it('should handle registration errors gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const error = new Error('Registration failed')
    
    // Mock failed registration
    const mockRegister = vi.fn().mockRejectedValue(error)
    Object.defineProperty(global, 'navigator', {
      value: {
        serviceWorker: {
          register: mockRegister,
        },
      },
      writable: true,
      configurable: true,
    })

    renderHook(() => useServiceWorker())

    // Get the load handler
    const loadHandler = (window.addEventListener as ReturnType<typeof vi.fn>).mock.calls[0][1]
    
    // Trigger the load event
    loadHandler()
    
    // Manually flush promises by advancing timers
    await vi.runOnlyPendingTimersAsync()

    expect(mockRegister).toHaveBeenCalledWith('/sw.js')
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Service Worker registration failed:',
      error
    )

    consoleErrorSpy.mockRestore()
  })

  it('should not register service worker if not supported', () => {
    // Mock no service worker support
    Object.defineProperty(global, 'navigator', {
      value: {},
      writable: true,
      configurable: true,
    })

    renderHook(() => useServiceWorker())

    expect(window.addEventListener).not.toHaveBeenCalled()
  })
})
