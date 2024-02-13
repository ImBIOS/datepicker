import dayjs from 'dayjs'
import 'dayjs/locale/es' // Import a sample locale for testing
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

import { AdapterDayjs } from './AdapterDayjs' // Adjust the import path as necessary

describe('AdapterDayjs', () => {
  const adapter = AdapterDayjs({ locale: 'en' })

  test('today returns current date', () => {
    expect(adapter.today.format('YYYY-MM-DD')).toBe(
      dayjs().format('YYYY-MM-DD')
    )
  })

  test('isValid returns true for valid date', () => {
    expect(adapter.isValid(dayjs())).toBeTruthy()
  })

  test('addMonths adds and subtracts months correctly', () => {
    const baseDate = dayjs('2020-01-01')
    expect(adapter.addMonths(baseDate, 1).format('YYYY-MM-DD')).toBe(
      '2020-02-01'
    )
    expect(adapter.addMonths(baseDate, -1).format('YYYY-MM-DD')).toBe(
      '2019-12-01'
    )
  })

  test('addDays adds and subtracts days correctly', () => {
    const baseDate = dayjs('2020-01-01')
    expect(adapter.addDays(baseDate, 1).format('YYYY-MM-DD')).toBe('2020-01-02')
    expect(adapter.addDays(baseDate, -1).format('YYYY-MM-DD')).toBe(
      '2019-12-31'
    )
  })

  test('startOfMonth returns the first day of the month', () => {
    const date = dayjs('2020-01-15')
    expect(adapter.startOfMonth(date).format('YYYY-MM-DD')).toBe('2020-01-01')
  })

  test('weekdays returns the correct weekdays', () => {
    const weekdays = adapter.weekdays()
    expect(weekdays.length).toBe(7)
    expect(weekdays[0]).toBe(dayjs().startOf('week').format('ddd'))
  })

  // Continuing from the last provided test scenario...

  test('endOfMonth returns the last day of the month', () => {
    const date = dayjs('2020-01-15')
    expect(adapter.endOfMonth(date).format('YYYY-MM-DD')).toBe('2020-01-31')
  })

  test('startOfWeek returns the first day of the week according to locale', () => {
    // Assuming the locale starts the week on Sunday
    const date = dayjs('2020-01-15') // This is a Wednesday
    expect(adapter.startOfWeek(date).format('YYYY-MM-DD')).toBe('2020-01-12') // Previous Sunday
  })

  test('endOfWeek returns the last day of the week according to locale', () => {
    // Assuming the locale ends the week on Saturday
    const date = dayjs('2020-01-15') // This is a Wednesday
    expect(adapter.endOfWeek(date).format('YYYY-MM-DD')).toBe('2020-01-18') // Coming Saturday
  })

  test('daysInRange returns an array of days between two dates', () => {
    const start = dayjs('2020-01-01')
    const end = dayjs('2020-01-03')
    const range = adapter
      .daysInRange(start, end)
      .map(d => d.format('YYYY-MM-DD'))
    expect(range).toEqual(['2020-01-01', '2020-01-02', '2020-01-03'])
  })

  test('daysInRange throws error for invalid interval', () => {
    const start = dayjs('2020-01-03')
    const end = dayjs('2020-01-01')
    expect(() => {
      adapter.daysInRange(start, end)
    }).toThrow('Invalid interval')
  })

  // Edge Cases and Additional Scenarios
  test('isValid returns false for invalid date', () =>
    // @ts-expect-error - Testing invalid input
    expect(adapter.isValid('This is not a date')).toBeFalsy())

  test('locale error handling for unimported locale', () => {
    const adapterWithUnimportedLocale = AdapterDayjs({ locale: 'xx' }) // Assuming 'xx' is not a valid/imported locale
    // Not directly testable without changing the implementation to handle or mock `console.error`
    // This is an example of how you might set up the test if you could catch the error or warning
    expect(() => {
      adapterWithUnimportedLocale.today
    }).not.toThrow() // Assuming the implementation fails gracefully
  })

  // Locale change effects
  test('weekStartsOn correctly affects startOfWeek', () => {
    const adapterWithWeekStart = AdapterDayjs({ locale: 'en', weekStartsOn: 1 }) // Week starts on Monday
    const date = dayjs('2020-01-15') // This is a Wednesday
    expect(adapterWithWeekStart.startOfWeek(date).format('YYYY-MM-DD')).toBe(
      '2020-01-13'
    ) // Previous Monday
  })
})
