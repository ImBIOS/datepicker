'use client'

import { useMemo, useState } from 'react'
import { type CalendarAdapter } from './adapters'
import { type CalendarContextType } from './context'

export type UseCalendarProps<TDate, TLocale> = {
  start: TDate
  blockFuture?: boolean | TDate
  allowOutsideDays?: boolean
  months?: number
  adapter: ReturnType<CalendarAdapter<TDate, TLocale>>
}

export function useCalendar<TDate, TLocale>({
  start,
  months = 1,
  blockFuture,
  allowOutsideDays,
  adapter,
}: UseCalendarProps<TDate, TLocale>) {
  const initialState = blockFuture
    ? typeof blockFuture === 'boolean' ||
      adapter.differenceInMonths(blockFuture, start) < 1
      ? adapter.addMonths(start, -1)
      : start
    : start

  const [date, setDate] = useState(initialState)

  const actions = useMemo(
    function actionsFn() {
      const nextMonth = () => setDate(prevSet => adapter.addMonths(prevSet, 1))
      const prevMonth = () => setDate(prevSet => adapter.addMonths(prevSet, -1))
      const nextYear = () => setDate(prevSet => adapter.addMonths(prevSet, 12))
      const prevYear = () => setDate(prevSet => adapter.addMonths(prevSet, -12))
      const resetDate = () => setDate(initialState)

      const dates = Array.from({ length: months }, (_, i) => {
        const month = adapter.addMonths(date, i)

        const startDateOfMonth = adapter.startOfMonth(month)
        const endDateOfMonth = adapter.endOfMonth(month)
        const startWeek = adapter.startOfWeek(startDateOfMonth)
        const endWeek = adapter.endOfWeek(endDateOfMonth)
        const days = adapter.daysInRange(startWeek, endWeek)

        const startDateOfYear = adapter.startOfYear(month)
        const endDateOfYear = adapter.endOfYear(month)
        const startMonth = adapter.startOfMonth(startDateOfYear)
        const endMonth = adapter.endOfMonth(endDateOfYear)
        const months = adapter.monthsInRange(startMonth, endMonth)

        return {
          startDateOfMonth,
          endDateOfMonth,
          startWeek,
          endWeek,
          days: allowOutsideDays
            ? days
            : adapter.removeOutMonthDays(days, month),
          months,
          startDateOfYear,
          endDateOfYear,
        } satisfies CalendarContextType<TDate, TLocale>['dates'][number]
      })

      return {
        nextMonth,
        prevMonth,
        nextYear,
        prevYear,
        resetDate,
        dates,
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allowOutsideDays, date, initialState, months]
  )

  return {
    startDate: date,
    ...actions,
  }
}
