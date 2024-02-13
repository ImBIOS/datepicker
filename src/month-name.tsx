import { Heading, useMultiStyleConfig } from '@chakra-ui/react'
import { useContext } from 'react'
import { type CalendarMonthStyles } from './_types'
import { useCalendarContext } from './context'
import { MonthContext } from './month'

export type CalendarMonthNameProps = {
  format?: string
}

export function CalendarMonthName<TDate, TLocale>({
  format,
}: CalendarMonthNameProps) {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles
  const context = useCalendarContext<TDate, TLocale>()
  const monthContext = useContext(MonthContext)
  const currentMonth =
    context.dates[Number(monthContext.month)].startDateOfMonth

  const label = context.adapter.format(currentMonth, 'month', format)

  return (
    <Heading aria-label={label} sx={styles.name}>
      {label}
    </Heading>
  )
}
