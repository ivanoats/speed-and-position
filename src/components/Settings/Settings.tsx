import { Dialog } from '@ark-ui/react'
import { css } from '../../../styled-system/css'
import type { SpeedUnit } from '../../hooks/useSpeedCalculation'

export interface SettingsProps {
  isOpen: boolean
  onClose: () => void
  unit: SpeedUnit
  onUnitChange: (unit: SpeedUnit) => void
}

/**
 * Settings component - Modal dialog for app preferences
 * Mobile-friendly with Ark UI Dialog
 * 
 * @param isOpen - Whether the dialog is open
 * @param onClose - Callback when dialog is closed
 * @param unit - Current speed unit preference
 * @param onUnitChange - Callback when unit preference changes
 */
export function Settings({ isOpen, onClose, unit, onUnitChange }: SettingsProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(details) => !details.open && onClose()}>
      <Dialog.Backdrop 
        className={css({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bg: 'rgba(0, 0, 0, 0.5)',
          zIndex: 40,
        })}
      />
      <Dialog.Positioner
        className={css({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '4',
        })}
      >
        <Dialog.Content
          className={css({
            bg: 'white',
            borderRadius: 'lg',
            boxShadow: 'xl',
            padding: '6',
            maxWidth: '400px',
            width: '100%',
          })}
        >
          <Dialog.Title
            className={css({
              fontSize: 'xl',
              fontWeight: 'bold',
              marginBottom: '4',
              color: 'gray.800',
            })}
          >
            Settings
          </Dialog.Title>
          
          <Dialog.Description
            className={css({
              fontSize: 'sm',
              color: 'gray.600',
              marginBottom: '6',
            })}
          >
            Configure your preferences for the Speed & Location app.
          </Dialog.Description>

          <div className={css({ marginBottom: '6' })}>
            <label 
              className={css({
                display: 'block',
                fontSize: 'sm',
                fontWeight: '600',
                marginBottom: '2',
                color: 'gray.700',
              })}
            >
              Speed Unit
            </label>
            <div className={css({ display: 'flex', gap: '3' })}>
              <button
                type="button"
                onClick={() => onUnitChange('mph')}
                className={css({
                  flex: 1,
                  padding: '3',
                  borderRadius: 'md',
                  border: '2px solid',
                  borderColor: unit === 'mph' ? 'blue.500' : 'gray.300',
                  bg: unit === 'mph' ? 'blue.50' : 'white',
                  color: unit === 'mph' ? 'blue.700' : 'gray.700',
                  fontWeight: unit === 'mph' ? '600' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    borderColor: 'blue.400',
                  },
                  touchAction: 'manipulation',
                })}
              >
                MPH
              </button>
              <button
                type="button"
                onClick={() => onUnitChange('kph')}
                className={css({
                  flex: 1,
                  padding: '3',
                  borderRadius: 'md',
                  border: '2px solid',
                  borderColor: unit === 'kph' ? 'blue.500' : 'gray.300',
                  bg: unit === 'kph' ? 'blue.50' : 'white',
                  color: unit === 'kph' ? 'blue.700' : 'gray.700',
                  fontWeight: unit === 'kph' ? '600' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    borderColor: 'blue.400',
                  },
                  touchAction: 'manipulation',
                })}
              >
                KPH
              </button>
            </div>
          </div>

          <Dialog.CloseTrigger asChild>
            <button
              type="button"
              className={css({
                width: '100%',
                padding: '3',
                bg: 'blue.500',
                color: 'white',
                borderRadius: 'md',
                border: 'none',
                fontSize: 'sm',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s',
                _hover: {
                  bg: 'blue.600',
                },
                _active: {
                  bg: 'blue.700',
                },
                touchAction: 'manipulation',
              })}
            >
              Close
            </button>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
