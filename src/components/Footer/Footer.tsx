import { css } from '../../../styled-system/css'

/**
 * Footer component - Attribution and links
 * Mobile-first design with centered content
 */
export function Footer() {
  return (
    <footer className={css({
      bg: 'gray.100',
      padding: '4',
      textAlign: 'center',
      marginTop: 'auto',
    })}>
      <div className={css({ fontSize: 'sm', color: 'gray.600' })}>
        Made with ♥ by{' '}
        <a 
          href="https://www.ivanstorck.com"
          className={css({ color: 'blue.600', textDecoration: 'underline' })}
        >
          Ivan Storck
        </a>
      </div>
    </footer>
  )
}
