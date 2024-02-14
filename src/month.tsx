import { Button, useStyleConfig, type ButtonProps } from '@chakra-ui/react'
import { type PropsWithChildren } from 'react'
import { useCalendarContext } from './context'
import { useCalendarMonth } from './useCalendarMonth'

export type CalendarMonthProps = PropsWithChildren<ButtonProps>

export function CalendarMonth<TDate, TLocale>({
  children,
  ...props
}: CalendarMonthProps) {
  const context = useCalendarContext<TDate, TLocale>()

  const { month, interval, variant, isDisabled, onSelectDates } =
    useCalendarMonth<TDate, TLocale>()
  const styles = useStyleConfig('CalendarMonth', { variant, interval })

  console.log('isDisabled', isDisabled)

  return (
    <Button
      aria-current={variant === 'selected' ? 'date' : false}
      aria-label={context.adapter.format(month, 'shortMonth')}
      onClick={() => onSelectDates(month)}
      isDisabled={isDisabled}
      sx={{ ...styles, ...props }}
      {...props}
    >
      {children ?? context.adapter.format(month, 'shortMonth')}
    </Button>
  )
}
