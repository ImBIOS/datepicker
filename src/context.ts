import { createContext, useContext } from 'react'
import { type CalendarAdapter } from './adapters'

export type CalendarContextType<TDate, TLocale> = {
  dates: {
    startDateOfMonth: TDate
    endDateOfMonth: TDate
    startDateOfYear: TDate
    endDateOfYear: TDate
    startWeek: TDate
    endWeek: TDate
    days: (TDate | null)[]
    months: (TDate | null)[]
  }[]
  nextMonth: VoidFunction
  prevMonth: VoidFunction
  nextYear: VoidFunction
  prevYear: VoidFunction
  onSelectDates: (date: TDate) => void
  startSelectedDate?: TDate
  endSelectedDate?: TDate
  allowOutsideDays?: boolean
  disablePastDates?: boolean | TDate
  disableFutureDates?: boolean | TDate
  disableWeekends?: boolean
  disableDates?: TDate[]
  locale?: TLocale
  weekdayFormat?: string
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  highlightToday?: boolean
  adapter: ReturnType<CalendarAdapter<TDate, TLocale>>
  mode: 'day' | 'month' // TODO: Add 'year' and 'decade' mode
  setMode: (mode: 'day' | 'month') => void
}

export const CalendarContext = createContext<CalendarContextType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> | null>(null)

export const useCalendarContext = <TDate, TLocale>() => {
  const calendarContext = useContext<CalendarContextType<
    TDate,
    TLocale
  > | null>(CalendarContext)

  if (calendarContext === null) {
    throw new Error('Something went wrong')
  }

  return calendarContext
}
