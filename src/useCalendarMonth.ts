'use client'

import { createContext, useContext } from 'react'
import { CalendarBodyContext } from './calendar-body'
import { useCalendarContext } from './context'

export type CalendarMonthContextType<TDate> = {
  month: TDate
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MonthContext = createContext<CalendarMonthContextType<any>>({
  month: null,
})

export function useCalendarMonth<TDate, TLocale>() {
  const context = useCalendarContext<TDate, TLocale>()

  const dayContext = useContext<CalendarMonthContextType<TDate>>(MonthContext)
  const monthContext = useContext(CalendarBodyContext)

  let variant: 'selected' | 'range' | 'outside' | 'today' | undefined

  if (context.highlightToday && context.adapter.isToday(dayContext.month)) {
    variant = 'today'
  }

  const isStartDateSelected = Boolean(
    context.startSelectedDate &&
      context.adapter.isSameDay(dayContext.month, context.startSelectedDate)
  )
  const isEndDateSelected = Boolean(
    context.endSelectedDate &&
      context.adapter.isSameDay(dayContext.month, context.endSelectedDate)
  )
  const isSelected = isStartDateSelected || isEndDateSelected

  if (isSelected) {
    variant = 'selected'
  }

  if (
    (context.adapter.isBefore(
      dayContext.month,
      context.dates[Number(monthContext.month)].startDateOfYear
    ) ||
      context.adapter.isAfter(
        dayContext.month,
        context.dates[Number(monthContext.month)].endDateOfYear
      )) &&
    !isSelected
  ) {
    variant = 'outside'
  }

  const interval =
    context.startSelectedDate &&
    context.endSelectedDate &&
    context.adapter.monthsInRange(
      context.startSelectedDate,
      context.endSelectedDate
    )

  const isInRange = interval
    ? interval.some(
        date => context.adapter.isSameDay(dayContext.month, date) && !isSelected
      )
    : false

  if (isInRange && !isSelected) {
    variant = 'range'
  }

  const isDisabled =
    (context.disablePastDates &&
      context.adapter.isBefore(
        dayContext.month,
        typeof context.disablePastDates !== 'boolean'
          ? context.disablePastDates
          : context.adapter.addMonths(context.adapter.today, -1)
      )) ??
    (context.disableFutureDates &&
      context.adapter.isAfter(
        dayContext.month,
        typeof context.disableFutureDates !== 'boolean'
          ? context.disableFutureDates
          : context.adapter.today
      )) ??
    (context.disableDates &&
      context.disableDates.some(date =>
        context.adapter.isSameDay(dayContext.month, date)
      ))

  return {
    month: dayContext.month,
    variant,
    isSelected,
    interval,
    isInRange,
    isDisabled,
    onSelectDates: context.onSelectDates,
  }
}
