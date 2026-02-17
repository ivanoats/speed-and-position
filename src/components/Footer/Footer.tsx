import { css } from '../../../styled-system/css'
import { link } from '../../../styled-system/recipes'

/**
 * Footer component - Attribution and links
 * Mobile-first design with centered content
 */
export function Footer() {
  return (
    <footer
      className={css({
        bg: 'bg.subtle',
        padding: '4',
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: '1px solid',
        borderColor: 'border.subtle',
      })}
    >
      <div className={css({ fontSize: 'sm', color: 'fg.muted' })}>
        Made with ♥ by{' '}
        <a href="https://www.ivanstorck.com" className={link()}>
          Ivan Storck
        </a>
      </div>
    </footer>
  )
}
