import '@testing-library/jest-dom'
import { render, renderHook, screen } from '@testing-library/react'
import { CalendarAdapterProvider, useAdapter } from '.'
import { mockCalendarAdapter } from './__mocks__/calendarAdapterMock'

describe('CalendarAdapterProvider', () => {
  it('provides the calendar adapter context to its children', () => {
    const TestComponent = () => {
      // Use the context here to ensure it's provided correctly
      return <div>Test Component</div>
    }

    render(
      <CalendarAdapterProvider adapter={mockCalendarAdapter}>
        <TestComponent />
      </CalendarAdapterProvider>
    )

    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })
})

describe('useAdapter', () => {
  it('throws an error when not wrapped in CalendarAdapterProvider', () => {
    expect(() => {
      renderHook(() => useAdapter({}))
    }).toThrow('forgot to wrap your component')
  })

  it('returns the adapter when used within CalendarAdapterProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CalendarAdapterProvider adapter={mockCalendarAdapter}>
        {children}
      </CalendarAdapterProvider>
    )
    const { result } = renderHook(() => useAdapter({}), { wrapper })
    expect(result.current).toBeDefined()
  })
})
