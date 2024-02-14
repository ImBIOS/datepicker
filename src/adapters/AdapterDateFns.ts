import {
  addDays,
  addMonths,
  differenceInCalendarMonths,
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isValid,
  isWeekend,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns'
import { type CalendarAdapter } from './index'

import type enUS from 'date-fns/locale/en-US'

export const AdapterDateFns: CalendarAdapter<
  Date,
  (typeof enUS)['enUS']
> = props => {
  const defaultFormats = {
    weekday: 'E',
    month: 'MMMM',
    shortMonth: 'MMM',
    monthYear: 'MMMM, yyyy',
    monthDay: 'MM-d',
    day: 'd',
    year: 'yyyy',
  }

  const locale = props.locale
  const weekStartsOn = props.weekStartsOn

  return {
    defaultFormats,
    today: new Date(),
    isValid: value => isValid(value),
    addMonths: (value, amount) => addMonths(value, amount),
    addDays: (value, amount) => addDays(value, amount),
    startOfYear: value => startOfYear(value),
    endOfYear: value => endOfYear(value),
    startOfMonth: value => startOfMonth(value),
    endOfMonth: value => endOfMonth(value),
    startOfWeek: value => startOfWeek(value, { locale, weekStartsOn }),
    endOfWeek: value => endOfWeek(value, { locale, weekStartsOn }),
    daysInRange: (start, end) => eachDayOfInterval({ start, end }),
    monthsInRange: (start, end) => eachMonthOfInterval({ start, end }),
    removeOutMonthDays: (days, date) =>
      days.map(d => (isSameMonth(date, d) ? d : null)),
    weekdays: (formatString = defaultFormats.weekday) => {
      const start = startOfWeek(new Date(), {
        locale,
        weekStartsOn,
      })
      return Array.from({ length: 7 }, (_, i) =>
        format(addDays(start, i), formatString, { locale, weekStartsOn })
      )
    },
    quarters: (formatString = 'qqq') => {
      const start = startOfMonth(new Date())
      return Array.from({ length: 4 }, (_, i) =>
        format(addMonths(start, i * 3), formatString, { locale, weekStartsOn })
      )
    },
    format: (value, formatKey, formatString) =>
      format(value, formatString ?? defaultFormats[formatKey], {
        locale,
        weekStartsOn,
      }),
    isBefore: (value, comparing) => isBefore(value, comparing),
    isAfter: (value, comparing) => isAfter(value, comparing),
    isSameDay: (value, comparing) => isSameDay(value, comparing),
    isToday: value => isSameDay(value, new Date()),
    isWeekend: value => isWeekend(value),
    differenceInMonths: (value, comparing) =>
      differenceInCalendarMonths(value, comparing),
  }
}
