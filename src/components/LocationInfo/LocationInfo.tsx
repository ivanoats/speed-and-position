import { css } from '../../../styled-system/css'
import type { Position } from '../../types/position'
import { useState } from 'react'
import { useTouchGestures } from '../../hooks/useTouchGestures'

export interface LocationInfoProps {
  position: Position
}

/**
 * LocationInfo component - Displays coordinate and accuracy information
 * Mobile-first design with clear, readable typography
 * Supports swipe gestures to expand/collapse on mobile
 */
export function LocationInfo({ position }: LocationInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Touch gesture support for mobile
  const ref = useTouchGestures<HTMLDivElement>({
    onSwipeUp: () => setIsExpanded(true),
    onSwipeDown: () => setIsExpanded(false),
  })

  return (
    <div 
      ref={ref}
      className={css({
        bg: 'white',
        borderRadius: 'lg',
        padding: '4',
        boxShadow: 'md',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        _hover: {
          boxShadow: 'lg',
        },
      })}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label="Location information"
      aria-describedby="location-hint"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsExpanded(!isExpanded)
        }
      }}
    >
      <div className={css({ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: isExpanded ? '3' : '0',
      })}>
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold' })}>
          Location
        </h2>
        <span className={css({ 
          fontSize: '2xl',
          transition: 'transform 0.3s ease',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        })} aria-hidden="true">
          {isExpanded ? '▼' : '▲'}
        </span>
      </div>
      
      {isExpanded && (
        <div className={css({ fontSize: 'sm', color: 'gray.700' })}>
          <div className={css({ marginBottom: '2' })}>
            <strong>Latitude:</strong> {position.latitude.toFixed(6)}
          </div>
          <div className={css({ marginBottom: '2' })}>
            <strong>Longitude:</strong> {position.longitude.toFixed(6)}
          </div>
          <div>
            <strong>Accuracy:</strong> ±{position.accuracy.toFixed(1)}m
          </div>
          <div className={css({ 
            marginTop: '3', 
            paddingTop: '3', 
            borderTop: '1px solid',
            borderColor: 'gray.200',
            fontSize: 'xs',
            color: 'gray.500',
            textAlign: 'center',
          })}>
            💡 Tip: Swipe up/down or click to expand/collapse
          </div>
        </div>
      )}
      
      {!isExpanded && (
        <div id="location-hint" className={css({ 
          fontSize: 'xs', 
          color: 'gray.500',
          marginTop: '2',
        })}>
          Tap to view coordinates • Swipe up to expand
        </div>
      )}
    </div>
  )
}

