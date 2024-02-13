import { type CalendarAdapter, type CalendarAdapterProps } from '..'

export const mockCalendarAdapter: CalendarAdapter<unknown, unknown> = (
  _props: CalendarAdapterProps<unknown>
) => ({
  defaultFormats: {
    weekday: 'long',
    month: 'long',
    monthDay: 'MM/DD',
    day: 'DD',
  },
  today: new Date(),
  isValid: jest.fn(),
  addMonths: jest.fn(),
  addDays: jest.fn(),
  startOfMonth: jest.fn(),
  endOfMonth: jest.fn(),
  startOfWeek: jest.fn(),
  endOfWeek: jest.fn(),
  daysInRange: jest.fn(),
  removeOutMonthDays: jest.fn(),
  weekdays: jest.fn(),
  quarters: jest.fn(),
  format: jest.fn(),
  isBefore: jest.fn(),
  isAfter: jest.fn(),
  isSameDay: jest.fn(),
  isToday: jest.fn(),
  isWeekend: jest.fn(),
  differenceInMonths: jest.fn(),
})
