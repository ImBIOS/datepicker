import { act, renderHook } from '@testing-library/react'
import { type CalendarAdapter } from './adapters'
import { useCalendar } from './useCalendar'

// Mocking CalendarAdapter
const mockAddMonths = jest.fn()
const mockDifferenceInMonths = jest.fn()
const mockStartOfMonth = jest.fn()
const mockEndOfMonth = jest.fn()
const mockStartOfWeek = jest.fn()
const mockEndOfWeek = jest.fn()
const mockDaysInRange = jest.fn()
const mockRemoveOutMonthDays = jest.fn()

const createMockAdapter = <TDate, TLocale>() =>
  ({
    addMonths: mockAddMonths,
    differenceInMonths: mockDifferenceInMonths,
    startOfMonth: mockStartOfMonth,
    endOfMonth: mockEndOfMonth,
    startOfWeek: mockStartOfWeek,
    endOfWeek: mockEndOfWeek,
    daysInRange: mockDaysInRange,
    removeOutMonthDays: mockRemoveOutMonthDays,
    defaultFormats: {
      weekday: 'long',
      month: 'long',
      monthDay: 'MM/DD',
      day: 'DD',
    },
    isValid: jest.fn(),
    addDays: jest.fn(),
    weekdays: jest.fn(),
    format: jest.fn(),
    isBefore: jest.fn(),
    isAfter: jest.fn(),
    isSameDay: jest.fn(),
    isToday: jest.fn(),
    isWeekend: jest.fn(),
    today: new Date() as TDate,
  } satisfies ReturnType<CalendarAdapter<TDate, TLocale>>)

// Resetting mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})

// Test cases
describe('useCalendar', () => {
  it('initializes with the correct start date', () => {
    const adapter = createMockAdapter()
    const { result } = renderHook(() =>
      useCalendar({
        start: '2021-01-01',
        adapter,
      })
    )

    expect(result.current.startDate).toEqual('2021-01-01')
  })

  // Testing blockFuture functionality
  it('blocks future dates correctly when blockFuture is true', () => {
    const start = '2021-01-01'
    const adapter = createMockAdapter()
    mockAddMonths.mockImplementation((date, months) => {
      const parts = (date as string).split('-')
      let year = parseInt(parts[0], 10)
      let month = parseInt(parts[1], 10) + (months as number)

      // Adjust for month overflow or underflow
      while (month > 12) {
        year += 1
        month -= 12
      }
      while (month < 1) {
        year -= 1
        month += 12
      }

      // Ensure the month is two digits
      const monthStr = month < 10 ? `0${month}` : `${month}`

      return `${year}-${monthStr}-01`
    })

    mockDifferenceInMonths.mockImplementation(() => 0) // Simulate blockFuture is within a month

    const { result } = renderHook(() =>
      useCalendar({
        start,
        blockFuture: true,
        adapter,
      })
    )

    expect(result.current.startDate).toEqual('2020-12-01')
  })

  // Testing navigating to next and previous months
  it('navigates months correctly', () => {
    const start = '2021-01-01'
    const adapter = createMockAdapter()
    mockAddMonths.mockImplementation(
      (date, months) =>
        `2021-0${parseInt((date as string).split('-')[1], 10) + months}-01`
    )

    const { result } = renderHook(() =>
      useCalendar({
        start,
        adapter,
      })
    )

    act(() => {
      result.current.nextMonth()
    })
    expect(result.current.startDate).toEqual('2021-02-01')

    act(() => {
      result.current.prevMonth()
    })
    expect(result.current.startDate).toEqual('2021-01-01')
  })

  // Testing resetDate functionality
  it('resets date correctly', () => {
    const start = '2021-01-01'
    const adapter = createMockAdapter()
    mockAddMonths.mockImplementation(
      (date, months) =>
        `2021-0${parseInt((date as string).split('-')[1], 10) + months}-01`
    )

    const { result } = renderHook(() =>
      useCalendar({
        start,
        adapter,
      })
    )

    // Navigate to a different month
    act(() => {
      result.current.nextMonth()
    })

    // Reset to initial date
    act(() => {
      result.current.resetDate()
    })

    expect(result.current.startDate).toEqual(start)
  })

  // Testing calculation of dates and handling of allowOutsideDays
  it('calculates dates correctly with allowOutsideDays', () => {
    const start = '2021-01-01'
    const adapter = createMockAdapter()
    mockAddMonths.mockImplementation(
      (date, months) =>
        `2021-0${parseInt((date as string).split('-')[1], 10) + months}-01`
    )
    mockStartOfMonth.mockImplementation(date => date as string) // Simplified for test
    mockEndOfMonth.mockImplementation(date => date as string) // Simplified for test
    mockStartOfWeek.mockImplementation(date => date as string) // Simplified for test
    mockEndOfWeek.mockImplementation(date => date as string) // Simplified for test
    mockDaysInRange.mockImplementation(() => ['2021-01-01', '2021-01-02']) // Simplified array of days
    mockRemoveOutMonthDays.mockImplementation(days => days as string) // Simplified for test

    const { result } = renderHook(() =>
      useCalendar({
        start,
        months: 2,
        allowOutsideDays: true,
        adapter,
      })
    )

    // Here, you would assert that the dates are calculated correctly
    // This is a simplified example; in a real test, you'd want to have more detailed assertions
    expect(result.current.dates.length).toEqual(2) // Expecting two months of dates
    expect(result.current.dates[0].days).toEqual(['2021-01-01', '2021-01-02'])
    // Add more assertions as needed to verify the structure and content of `dates`
  })
})
