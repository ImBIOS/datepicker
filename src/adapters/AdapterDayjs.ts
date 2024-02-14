import dayjs, { type Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import updateLocale from 'dayjs/plugin/updateLocale'
import { type AdapterFormats, type CalendarAdapter } from './index'

dayjs.extend(isoWeek)

export const AdapterDayjs: CalendarAdapter<Dayjs, string> = props => {
  const defaultFormats: AdapterFormats = {
    weekday: 'ddd',
    month: 'MMMM',
    shortMonth: 'MMM',
    monthYear: 'MMMM, YYYY',
    monthDay: 'MM-D',
    day: 'D',
    year: 'YYYY',
  }

  if (props.locale) {
    const locales = dayjs.Ls
    const locale = props.locale

    if (locales[locale] === undefined) {
      console.error(
        `Your locale has not been found. Maybe you forgot to import the locale with \`import 'dayjs/locale/${props.locale}'\``
      )
    }
  }

  if (props.weekStartsOn !== undefined) {
    dayjs.extend(updateLocale)
    dayjs.updateLocale(props.locale ?? 'en', {
      weekStart: props.weekStartsOn,
    })
  }

  const localizedDayjs = props.locale
    ? (...args: Parameters<typeof dayjs>) =>
        dayjs(...args).locale(props.locale ?? 'en')
    : dayjs

  return {
    defaultFormats,
    today: localizedDayjs(),
    isValid: value => localizedDayjs(value).isValid(),
    addMonths: (value, amount) =>
      amount < 0
        ? value.subtract(Math.abs(amount), 'month')
        : value.add(amount, 'month'),
    addDays: (value, amount) =>
      amount < 0
        ? value.subtract(Math.abs(amount), 'day')
        : value.add(amount, 'day'),
    startOfYear: value => localizedDayjs(value).startOf('year'),
    endOfYear: value => localizedDayjs(value).endOf('year'),
    startOfMonth: value => localizedDayjs(value).startOf('month'),
    endOfMonth: value => localizedDayjs(value).endOf('month'),
    startOfWeek: value => localizedDayjs(value).startOf('week'),
    endOfWeek: value => localizedDayjs(value).endOf('week'),
    daysInRange: (start, end) => {
      if (start > end) {
        throw new Error('Invalid interval')
      }

      const startOfInterval = start.startOf('day')
      const endOfInterval = end.endOf('day')
      const diff = Math.ceil(endOfInterval.diff(startOfInterval, 'days', true))

      return Array.from({ length: diff }, (_, i) =>
        localizedDayjs(start).add(i, 'days')
      )
    },
    monthsInRange: (start, end) => {
      if (start > end) {
        throw new Error('Invalid interval')
      }

      const startOfInterval = start.startOf('month')
      const endOfInterval = end.endOf('month')
      const diff = Math.ceil(
        endOfInterval.diff(startOfInterval, 'months', true)
      )

      return Array.from({ length: diff + 1 }, (_, i) =>
        localizedDayjs(start).add(i, 'months')
      )
    },
    removeOutMonthDays: (days, date) =>
      days.map(d => (d.isSame(date, 'month') ? d : null)),
    weekdays: (formatString = defaultFormats.weekday) => {
      const start = localizedDayjs().startOf('week')
      return Array.from({ length: 7 }, (_, i) =>
        start.add(i, 'days').format(formatString)
      )
    },
    quarters: (formatString = defaultFormats.month) => {
      const start = localizedDayjs().startOf('month')
      return Array.from({ length: 3 }, (_, i) =>
        start.add(i * 3, 'month').format(formatString)
      )
    },
    format: (value, formatKey, formatString) =>
      localizedDayjs(value).format(formatString ?? defaultFormats[formatKey]),
    isBefore: (value, comparing) => value < comparing,
    isAfter: (value, comparing) => value > comparing,
    isSameDay: (value, comparing) => value.isSame(comparing, 'date'),
    isToday: value => value.isSame(localizedDayjs(), 'date'),
    isWeekend: value => {
      const day = localizedDayjs(value).isoWeekday()
      return day === 6 || day === 7
    },
    differenceInMonths: (value, comparing) => value.diff(comparing, 'month'),
  }
}
