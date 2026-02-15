import { Dialog } from '@ark-ui/react'
import { css, cx } from '../../../styled-system/css'
import { dialog, button } from '../../../styled-system/recipes'
import type { SpeedUnit } from '../../hooks/useSpeedCalculation'

export interface SettingsProps {
  isOpen: boolean
  onClose: () => void
  unit: SpeedUnit
  onUnitChange: (unit: SpeedUnit) => void
}

/**
 * Settings component - Modal dialog for app preferences
 * Mobile-friendly with Ark UI Dialog and ParkUI styling
 * 
 * @param isOpen - Whether the dialog is open
 * @param onClose - Callback when dialog is closed
 * @param unit - Current speed unit preference
 * @param onUnitChange - Callback when unit preference changes
 */
export function Settings({ isOpen, onClose, unit, onUnitChange }: SettingsProps) {
  const dialogStyles = dialog()
  return (
    <Dialog.Root open={isOpen} onOpenChange={(details) => !details.open && onClose()}>
      <Dialog.Backdrop className={dialogStyles.backdrop} />
      <Dialog.Positioner className={dialogStyles.positioner}>
        <Dialog.Content className={dialogStyles.content}>
          <Dialog.Title className={dialogStyles.title}>
            Settings
          </Dialog.Title>
          
          <Dialog.Description className={dialogStyles.description}>
            Configure your preferences for the Speed & Location app.
          </Dialog.Description>

          <div className={css({ marginBottom: '6' })}>
            <label 
              className={css({
                display: 'block',
                fontSize: 'sm',
                fontWeight: '600',
                marginBottom: '2',
                color: 'fg.default',
              })}
            >
              Speed Unit
            </label>
            <div className={css({ display: 'flex', gap: '3' })}>
              <button
                type="button"
                onClick={() => onUnitChange('mph')}
                className={cx(button({ variant: unit === 'mph' ? 'solid' : 'outline', size: 'md' }), css({
                  flex: 1,
                  touchAction: 'manipulation',
                }))}
              >
                MPH
              </button>
              <button
                type="button"
                onClick={() => onUnitChange('kph')}
                className={cx(button({ variant: unit === 'kph' ? 'solid' : 'outline', size: 'md' }), css({
                  flex: 1,
                  touchAction: 'manipulation',
                }))}
              >
                KPH
              </button>
            </div>
          </div>

          <Dialog.CloseTrigger asChild>
            <button
              type="button"
              className={cx(button({ variant: 'solid', size: 'md' }), css({
                width: '100%',
                touchAction: 'manipulation',
              }))}
            >
              Close
            </button>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
