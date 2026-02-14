import { css } from '../../../styled-system/css'

/**
 * Header component - Sticky navigation with app title
 * Mobile-first design with touch-friendly height
 */
export function Header() {
  return (
    <header className={css({
      bg: 'blue.600',
      color: 'white',
      padding: '4',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      boxShadow: 'md',
    })}>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold', margin: 0 })}>
        Speed & Location
      </h1>
    </header>
  )
}
