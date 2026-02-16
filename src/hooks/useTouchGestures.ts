import { useEffect, useRef, useCallback } from 'react';

interface TouchGestureHandlers {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
}

interface TouchPoint {
  x: number;
  y: number;
  time: number;
}

/**
 * Custom hook for handling touch gestures
 * Supports swipe, double-tap, and long-press gestures
 *
 * @param handlers - Object containing gesture event handlers
 * @returns ref to attach to the element
 */
export function useTouchGestures<T extends HTMLElement>(
  handlers: TouchGestureHandlers,
) {
  const elementRef = useRef<T>(null);
  const touchStart = useRef<TouchPoint | null>(null);
  const lastTap = useRef<number>(0);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };

      // Start long press timer
      if (handlers.onLongPress) {
        longPressTimer.current = setTimeout(() => {
          if (handlers.onLongPress) {
            handlers.onLongPress();
            touchStart.current = null; // Cancel swipe after long press
          }
        }, 500); // 500ms for long press
      }
    },
    [handlers],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      // Clear long press timer
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      if (!touchStart.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;
      const deltaTime = Date.now() - touchStart.current.time;

      // Check for double tap
      const now = Date.now();
      if (now - lastTap.current < 300 && handlers.onDoubleTap) {
        handlers.onDoubleTap();
        lastTap.current = 0;
        touchStart.current = null;
        return;
      }
      lastTap.current = now;

      // Swipe detection
      const minSwipeDistance = 50; // minimum distance in pixels
      const maxSwipeTime = 300; // maximum time in ms
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (deltaTime < maxSwipeTime) {
        if (absY > absX && absY > minSwipeDistance) {
          // Vertical swipe
          if (deltaY < 0 && handlers.onSwipeUp) {
            handlers.onSwipeUp();
          } else if (deltaY > 0 && handlers.onSwipeDown) {
            handlers.onSwipeDown();
          }
        } else if (absX > absY && absX > minSwipeDistance) {
          // Horizontal swipe
          if (deltaX < 0 && handlers.onSwipeLeft) {
            handlers.onSwipeLeft();
          } else if (deltaX > 0 && handlers.onSwipeRight) {
            handlers.onSwipeRight();
          }
        }
      }

      touchStart.current = null;
    },
    [handlers],
  );

  const handleTouchMove = useCallback(() => {
    // Cancel long press on move
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchmove', handleTouchMove);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [handleTouchStart, handleTouchEnd, handleTouchMove]);

  return elementRef;
}
