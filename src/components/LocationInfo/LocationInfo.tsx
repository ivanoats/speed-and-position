import { css, cx } from '../../../styled-system/css';
import { card } from '../../../styled-system/recipes';
import type { Position } from '../../types/position';
import { useState } from 'react';
import { useTouchGestures } from '../../hooks/useTouchGestures';

export interface LocationInfoProps {
  position: Position;
}

/**
 * LocationInfo component - Displays coordinate and accuracy information
 * Mobile-first design with clear, readable typography
 * Supports swipe gestures to expand/collapse on mobile
 */
export function LocationInfo({ position }: LocationInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardStyles = card();

  // Touch gesture support for mobile
  const ref = useTouchGestures<HTMLDivElement>({
    onSwipeUp: () => setIsExpanded(true),
    onSwipeDown: () => setIsExpanded(false),
  });

  return (
    <div
      ref={ref}
      className={cx(
        cardStyles.root,
        css({
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          _hover: {
            boxShadow: 'lg',
          },
        }),
      )}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label="Location information"
      aria-describedby="location-hint"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <div
        className={cx(
          cardStyles.header,
          css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: isExpanded ? '3' : '0',
          }),
        )}
      >
        <h2 className={cardStyles.title}>Location</h2>
        <span
          className={css({
            fontSize: '2xl',
            transition: 'transform 0.3s ease',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'fg.muted',
          })}
          aria-hidden="true"
        >
          {isExpanded ? '▼' : '▲'}
        </span>
      </div>

      {isExpanded && (
        <div
          className={cx(
            cardStyles.body,
            css({ fontSize: 'sm', color: 'fg.default' }),
          )}
        >
          <div className={css({ marginBottom: '2' })}>
            <strong>Latitude:</strong> {position.latitude.toFixed(6)}
          </div>
          <div className={css({ marginBottom: '2' })}>
            <strong>Longitude:</strong> {position.longitude.toFixed(6)}
          </div>
          <div>
            <strong>Accuracy:</strong> ±{position.accuracy.toFixed(1)}m
          </div>
          <div
            className={css({
              marginTop: '3',
              paddingTop: '3',
              borderTop: '1px solid',
              borderColor: 'border.subtle',
              fontSize: 'xs',
              color: 'fg.subtle',
              textAlign: 'center',
            })}
          >
            💡 Tip: Swipe up/down or click to expand/collapse
          </div>
        </div>
      )}

      {!isExpanded && (
        <div
          id="location-hint"
          className={cx(
            cardStyles.body,
            css({
              fontSize: 'xs',
              color: 'fg.subtle',
              paddingTop: '2',
            }),
          )}
        >
          Tap to view coordinates • Swipe up to expand
        </div>
      )}
    </div>
  );
}
