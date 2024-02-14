'use client'

import { Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { useContext, type PropsWithChildren } from 'react'
import type { CalendarBodyStyles } from './_types'
import { CalendarBodyContext } from './calendar-body'
import { useCalendarContext } from './context'
import { CalendarDay } from './day'
import { CalendarMonth } from './month'
import { DayContext } from './useCalendarDay'
import { MonthContext } from './useCalendarMonth'

export function CalendarPicker<TDate, TLocale>({
  children,
}: PropsWithChildren<unknown>) {
  const styles = useMultiStyleConfig('CalendarBody', {}) as CalendarBodyStyles
  const context = useCalendarContext<TDate, TLocale>()
  const monthContext = useContext(CalendarBodyContext)

  switch (context.mode) {
    case 'day':
      return (
        <Grid sx={styles.days}>
          {context.dates[Number(monthContext.month)].days.map((day, index) => {
            if (!day) {
              return <span key={`not-a-day-${index}`} />
            }

            return (
              <DayContext.Provider
                value={{ day }}
                key={context.adapter.format(day, 'monthDay')}
              >
                {children ? children : <CalendarDay>{children}</CalendarDay>}
              </DayContext.Provider>
            )
          })}
        </Grid>
      )
    case 'month':
      return (
        <Grid sx={styles.monthItems}>
          {context.dates[Number(monthContext.year)].months.map(
            (month, index) => {
              if (!month) {
                return <span key={`not-a-month-${index}`} />
              }

              return (
                <MonthContext.Provider
                  value={{ month }}
                  key={context.adapter.format(month, 'month')}
                >
                  {children ? (
                    children
                  ) : (
                    <CalendarMonth>{children}</CalendarMonth>
                  )}
                </MonthContext.Provider>
              )
            }
          )}
        </Grid>
      )
    default:
      return null
  }
}
