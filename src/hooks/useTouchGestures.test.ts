import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTouchGestures } from './useTouchGestures'
import type { MutableRefObject } from 'react'

describe('useTouchGestures', () => {
  let mockElement: HTMLDivElement

  // Helper to set ref current value (bypassing readonly restriction for testing)
  const setRefCurrent = <T>(ref: MutableRefObject<T>, value: T) => {
    Object.defineProperty(ref, 'current', {
      value,
      writable: true,
      configurable: true,
    })
  }

  beforeEach(() => {
    vi.useFakeTimers()
    mockElement = document.createElement('div')
    document.body.appendChild(mockElement)
  })

  afterEach(() => {
    document.body.removeChild(mockElement)
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('should return a ref', () => {
    const { result } = renderHook(() => useTouchGestures({}))
    expect(result.current).toHaveProperty('current')
  })

  it('should attach touch event listeners when ref is set', () => {
    const addEventListenerSpy = vi.spyOn(mockElement, 'addEventListener')

    const { result, rerender } = renderHook(() => useTouchGestures({}))

    act(() => {
      setRefCurrent(result.current, mockElement)
    })

    // Trigger effect by re-rendering
    rerender()

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'touchstart',
      expect.any(Function),
      { passive: true }
    )
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'touchend',
      expect.any(Function),
      { passive: true }
    )
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'touchmove',
      expect.any(Function),
      { passive: true }
    )
  })

  it('should detect swipe up gesture', () => {
    const onSwipeUp = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTouchGestures({ onSwipeUp })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // Simulate touch start
    act(() => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 200 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Simulate swipe up (moving up 110px in under 300ms)
    act(() => {
      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [{ clientX: 100, clientY: 90 } as Touch],
      })
      mockElement.dispatchEvent(touchEndEvent)
    })

    expect(onSwipeUp).toHaveBeenCalledTimes(1)
  })

  it('should detect swipe down gesture', () => {
    const onSwipeDown = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTouchGestures({ onSwipeDown })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // Simulate touch start
    act(() => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Simulate swipe down
    act(() => {
      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [{ clientX: 100, clientY: 210 } as Touch],
      })
      mockElement.dispatchEvent(touchEndEvent)
    })

    expect(onSwipeDown).toHaveBeenCalledTimes(1)
  })

  it('should detect swipe left gesture', () => {
    const onSwipeLeft = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTouchGestures({ onSwipeLeft })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // Simulate touch start
    act(() => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 200, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Simulate swipe left
    act(() => {
      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [{ clientX: 90, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchEndEvent)
    })

    expect(onSwipeLeft).toHaveBeenCalledTimes(1)
  })

  it('should detect swipe right gesture', () => {
    const onSwipeRight = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTouchGestures({ onSwipeRight })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // Simulate touch start
    act(() => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Simulate swipe right
    act(() => {
      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [{ clientX: 210, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchEndEvent)
    })

    expect(onSwipeRight).toHaveBeenCalledTimes(1)
  })

  it('should detect double tap gesture', () => {
    const onDoubleTap = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTouchGestures({ onDoubleTap })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // First tap
    act(() => {
      let touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)

      let touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchEndEvent)
    })

    // Second tap within 300ms
    act(() => {
      vi.advanceTimersByTime(200)
    })

    act(() => {
      let touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)

      let touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchEndEvent)
    })

    expect(onDoubleTap).toHaveBeenCalledTimes(1)
  })

  it('should detect long press gesture', () => {
    const onLongPress = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTouchGestures({ onLongPress })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // Simulate touch start
    act(() => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Wait for long press duration (500ms)
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(onLongPress).toHaveBeenCalledTimes(1)
  })

  it('should cancel long press on touch move', () => {
    const onLongPress = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTouchGestures({ onLongPress })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // Simulate touch start
    act(() => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Simulate touch move before long press triggers
    act(() => {
      vi.advanceTimersByTime(250)
      const touchMoveEvent = new TouchEvent('touchmove')
      mockElement.dispatchEvent(touchMoveEvent)
    })

    // Wait remaining time
    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(onLongPress).not.toHaveBeenCalled()
  })

  it('should cancel long press on touch end', () => {
    const onLongPress = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTouchGestures({ onLongPress })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // Simulate touch start
    act(() => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Simulate touch end before long press triggers
    act(() => {
      vi.advanceTimersByTime(250)
      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchEndEvent)
    })

    // Wait remaining time
    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(onLongPress).not.toHaveBeenCalled()
  })

  it('should not detect swipe if distance is too small', () => {
    const onSwipeUp = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTouchGestures({ onSwipeUp })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // Simulate touch start
    act(() => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Simulate small movement (less than 50px threshold)
    act(() => {
      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [{ clientX: 100, clientY: 80 } as Touch],
      })
      mockElement.dispatchEvent(touchEndEvent)
    })

    expect(onSwipeUp).not.toHaveBeenCalled()
  })

  it('should not detect swipe if time is too long', () => {
    const onSwipeUp = vi.fn()
    const { result, rerender } = renderHook(() =>
      useTouchGestures({ onSwipeUp })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // Simulate touch start
    act(() => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 200 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Wait too long (over 300ms threshold)
    act(() => {
      vi.advanceTimersByTime(400)
    })

    // Simulate swipe up
    act(() => {
      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [{ clientX: 100, clientY: 90 } as Touch],
      })
      mockElement.dispatchEvent(touchEndEvent)
    })

    expect(onSwipeUp).not.toHaveBeenCalled()
  })

  it('should clean up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(mockElement, 'removeEventListener')

    const { result, rerender, unmount } = renderHook(() => useTouchGestures({}))

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'touchstart',
      expect.any(Function)
    )
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'touchend',
      expect.any(Function)
    )
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'touchmove',
      expect.any(Function)
    )
  })

  it('should clear timeout on unmount', () => {
    const onLongPress = vi.fn()
    const { result, rerender, unmount } = renderHook(() =>
      useTouchGestures({ onLongPress })
    )

    act(() => {
      setRefCurrent(result.current, mockElement)
    })
    rerender()

    // Simulate touch start to set timeout
    act(() => {
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      })
      mockElement.dispatchEvent(touchStartEvent)
    })

    // Unmount before timeout completes
    act(() => {
      vi.advanceTimersByTime(250)
    })

    unmount()

    // Advance time past when timeout would have fired
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(onLongPress).not.toHaveBeenCalled()
  })
})
