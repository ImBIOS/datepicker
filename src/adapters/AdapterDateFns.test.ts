import localeEnUS from 'date-fns/locale/en-US'
import { AdapterDateFns } from './AdapterDateFns'

describe('AdapterDateFns', () => {
  const locale = localeEnUS.enUS
  const adapter = AdapterDateFns({
    locale,
    weekStartsOn: 0, // Sunday
  })

  describe('Timezones', () => {
    it('should always be UTC', () => {
      expect(new Date().getTimezoneOffset()).toBe(0)
    })
  })

  describe('isValid', () => {
    it('should validate valid date', () => {
      expect(adapter.isValid(new Date())).toBeTruthy()
    })

    it('should invalidate invalid date', () => {
      expect(adapter.isValid(new Date('invalid date'))).toBeFalsy()
    })
  })

  describe('addMonths', () => {
    it('adds months to a date', () => {
      const initialDate = new Date(2020, 0, 1) // January 1, 2020
      const expectedDate = new Date(2020, 1, 1) // February 1, 2020
      expect(adapter.addMonths(initialDate, 1)).toEqual(expectedDate)
    })
  })

  describe('format', () => {
    it('formats date according to default format', () => {
      const date = new Date(2020, 0, 1) // January 1, 2020
      expect(adapter.format(date, 'month')).toEqual('January, 2020')
    })
  })

  // Add tests for weekdays, ensuring it returns correct days of the week in correct locale
  describe('weekdays', () => {
    it('returns correct weekdays starting from Sunday', () => {
      const weekdays = adapter.weekdays()
      expect(weekdays).toEqual([
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
      ])
      // NOTE: This expected value might need to adjust based on your locale and format
    })
  })

  describe('addDays', () => {
    it('adds days to a date', () => {
      const initialDate = new Date(2020, 0, 1) // January 1, 2020
      const expectedDate = new Date(2020, 0, 2) // January 2, 2020
      expect(adapter.addDays(initialDate, 1)).toEqual(expectedDate)
    })

    it('handles negative values to subtract days', () => {
      const initialDate = new Date(2020, 0, 10)
      const expectedDate = new Date(2020, 0, 5) // Subtract 5 days
      expect(adapter.addDays(initialDate, -5)).toEqual(expectedDate)
    })
  })

  describe('startOfMonth', () => {
    it('finds the first day of the month', () => {
      const date = new Date(2020, 1, 10) // February 10, 2020
      const expectedDate = new Date(2020, 1, 1) // February 1, 2020
      expect(adapter.startOfMonth(date)).toEqual(expectedDate)
    })
  })

  describe('endOfMonth', () => {
    test('endOfMonth finds the last day of the month', () => {
      const date = new Date('2020-02-01T00:00:00.000Z') // February 10, 2020
      const endOfMonthDate = adapter.endOfMonth(date) // February 29, 2020 (leap year)
      expect(endOfMonthDate).toEqual(new Date('2020-02-29T23:59:59.999Z'))
    })
  })

  describe('format with custom formats', () => {
    it('formats date with custom format string', () => {
      const date = new Date(2020, 0, 1) // January 1, 2020
      expect(adapter.format(date, 'day', 'yyyy/MM/dd')).toEqual('2020/01/01')
    })

    it('applies default format when format key is missing', () => {
      const date = new Date(2020, 0, 15) // January 15, 2020
      // @ts-expect-error - Testing for missing key
      expect(adapter.format(date, 'nonExistingKey', 'dd-MM-yyyy')).toEqual(
        '15-01-2020'
      )
    })
  })

  describe('isBefore', () => {
    it('correctly identifies a date before another', () => {
      const date1 = new Date(2020, 0, 1)
      const date2 = new Date(2020, 0, 2)
      expect(adapter.isBefore(date1, date2)).toBeTruthy()
    })
  })

  describe('isAfter', () => {
    it('correctly identifies a date after another', () => {
      const date1 = new Date(2020, 0, 2)
      const date2 = new Date(2020, 0, 1)
      expect(adapter.isAfter(date1, date2)).toBeTruthy()
    })
  })

  describe('isSameDay', () => {
    it('identifies the same day correctly', () => {
      const date1 = new Date(2020, 0, 1)
      const date2 = new Date(2020, 0, 1)
      expect(adapter.isSameDay(date1, date2)).toBeTruthy()
    })

    it('returns false for different days', () => {
      const date1 = new Date(2020, 0, 1)
      const date2 = new Date(2020, 0, 2)
      expect(adapter.isSameDay(date1, date2)).toBeFalsy()
    })
  })

  describe('isWeekend', () => {
    it('identifies a weekend day correctly', () => {
      const saturday = new Date(2020, 5, 6) // June 6, 2020, Saturday
      expect(adapter.isWeekend(saturday)).toBeTruthy()
      const sunday = new Date(2020, 5, 7) // June 7, 2020, Sunday
      expect(adapter.isWeekend(sunday)).toBeTruthy()
    })

    it('returns false for a weekday', () => {
      const monday = new Date(2020, 5, 8) // June 8, 2020, Monday
      expect(adapter.isWeekend(monday)).toBeFalsy()
    })
  })

  describe('differenceInMonths', () => {
    it('calculates the difference in months between two dates', () => {
      const date1 = new Date(2020, 0, 1)
      const date2 = new Date(2020, 5, 1)
      expect(adapter.differenceInMonths(date2, date1)).toEqual(5)
    })

    it('returns negative for past comparison', () => {
      const date1 = new Date(2020, 5, 1)
      const date2 = new Date(2020, 0, 1)
      expect(adapter.differenceInMonths(date2, date1)).toEqual(-5)
    })
  })
})
