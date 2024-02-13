import { createContext, useContext } from 'react'
import { useCalendarContext } from './context'
import { MonthContext } from './month'

export type CalendarDayContextType<TDate> = {
  day: TDate
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DayContext = createContext<CalendarDayContextType<any>>({
  day: null,
})

export function useCalendarDay<TDate, TLocale>() {
  const context = useCalendarContext<TDate, TLocale>()

  const dayContext = useContext<CalendarDayContextType<TDate>>(DayContext)
  const monthContext = useContext(MonthContext)

  let variant: 'selected' | 'range' | 'outside' | 'today' | undefined

  if (context.highlightToday && context.adapter.isToday(dayContext.day)) {
    variant = 'today'
  }

  const isStartDateSelected = Boolean(
    context.startSelectedDate &&
      context.adapter.isSameDay(dayContext.day, context.startSelectedDate)
  )
  const isEndDateSelected = Boolean(
    context.endSelectedDate &&
      context.adapter.isSameDay(dayContext.day, context.endSelectedDate)
  )
  const isSelected = isStartDateSelected || isEndDateSelected

  if (isSelected) {
    variant = 'selected'
  }

  if (
    (context.adapter.isBefore(
      dayContext.day,
      context.dates[Number(monthContext.month)].startDateOfMonth
    ) ||
      context.adapter.isAfter(
        dayContext.day,
        context.dates[Number(monthContext.month)].endDateOfMonth
      )) &&
    !isSelected
  ) {
    variant = 'outside'
  }

  const interval =
    context.startSelectedDate &&
    context.endSelectedDate &&
    context.adapter.daysInRange(
      context.startSelectedDate,
      context.endSelectedDate
    )

  const isInRange = interval
    ? interval.some(
        date => context.adapter.isSameDay(dayContext.day, date) && !isSelected
      )
    : false

  if (isInRange && !isSelected) {
    variant = 'range'
  }

  const isDisabled =
    (context.disablePastDates &&
      context.adapter.isBefore(
        dayContext.day,
        typeof context.disablePastDates !== 'boolean'
          ? context.disablePastDates
          : context.adapter.addDays(context.adapter.today, -1)
      )) ??
    (context.disableFutureDates &&
      context.adapter.isAfter(
        dayContext.day,
        typeof context.disableFutureDates !== 'boolean'
          ? context.disableFutureDates
          : context.adapter.today
      )) ??
    (context.disableWeekends && context.adapter.isWeekend(dayContext.day)) ??
    (context.disableDates &&
      context.disableDates.some(date =>
        context.adapter.isSameDay(dayContext.day, date)
      ))

  return {
    day: dayContext.day,
    variant,
    isSelected,
    interval,
    isInRange,
    isDisabled,
    onSelectDates: context.onSelectDates,
  }
}
