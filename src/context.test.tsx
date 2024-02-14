import { renderHook } from '@testing-library/react'
import {
  CalendarContext,
  useCalendarContext,
  type CalendarContextType,
} from './context'

describe('CalendarContext', () => {
  it('provides null as default value', () => {
    expect(() => {
      renderHook(() => useCalendarContext<Date, string>())
    }).toThrow('Something went wrong')
  })

  it('throws an error when `useCalendarContext` is used outside of a provider', () => {
    expect(() => {
      renderHook(() => useCalendarContext<Date, string>())
    }).toThrow('Something went wrong')
  })

  it('returns the correct context value when used within a provider', () => {
    // Mock context value
    const mockContextValue: CalendarContextType<Date, string> = {
      dates: [
        {
          startDateOfMonth: new Date(),
          endDateOfMonth: new Date(),
          startWeek: new Date(),
          endWeek: new Date(),
          days: [new Date(), null],
          months: [new Date(), null],
          startDateOfYear: new Date(),
          endDateOfYear: new Date(),
        },
      ],
      nextMonth: jest.fn(),
      prevMonth: jest.fn(),
      nextYear: jest.fn(),
      prevYear: jest.fn(),
      onSelectDates: jest.fn(),
      startSelectedDate: new Date(),
      endSelectedDate: new Date(),
      allowOutsideDays: true,
      disablePastDates: false,
      disableFutureDates: false,
      disableWeekends: false,
      disableDates: [new Date()],
      locale: 'en-US',
      weekdayFormat: 'long',
      weekStartsOn: 0,
      highlightToday: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      adapter: jest.fn() as any, // Mock implementation or type casting as needed
      mode: 'day',
      setMode: jest.fn(),
    }

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CalendarContext.Provider value={mockContextValue}>
        {children}
      </CalendarContext.Provider>
    )

    const { result } = renderHook(() => useCalendarContext<Date, string>(), {
      wrapper,
    })

    // Now you can assert various properties of the context
    expect(result.current).toBeDefined()
    expect(result.current.dates).toEqual(mockContextValue.dates)
    expect(result.current.nextMonth).toBeDefined()
    expect(result.current.prevMonth).toBeDefined()
    // Add more assertions as necessary
  })
})
