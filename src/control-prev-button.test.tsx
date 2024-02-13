import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen } from '../.jest/with-theme'
import { CalendarAdapterProvider } from './adapters'
import { AdapterDateFns } from './adapters/AdapterDateFns'
import { AdapterDayjs } from './adapters/AdapterDayjs'
import { useCalendarContext } from './context'
import { CalendarPrevButton } from './control-prev-button'

// Mock useMultiStyleConfig to simulate the styles being applied from Chakra UI
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useMultiStyleConfig: jest.fn(() => ({
    button: {
      backgroundColor: 'red', // Example style, adjust as needed
    },
  })),
}))

// Mocking the context provider to simulate prevMonth functionality
jest.mock('./context', () => ({
  useCalendarContext: jest.fn(),
}))

describe('CalendarPrevButton', () => {
  const mockPrevMonth = jest.fn()

  beforeEach(() => {
    ;(useCalendarContext as jest.Mock).mockReturnValue({
      prevMonth: mockPrevMonth,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the default button and triggers prevMonth on click', async () => {
    render(
      <CalendarAdapterProvider adapter={AdapterDateFns}>
        <CalendarPrevButton />
      </CalendarAdapterProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ backgroundColor: 'red' })
    await userEvent.click(button)
    expect(mockPrevMonth).toHaveBeenCalledTimes(1)
  })

  it('renders a custom button component when passed as prop', () => {
    const CustomButton = ({ onClick }: { onClick: VoidFunction }) => (
      <button onClick={onClick} data-testid="custom-button">
        Prev
      </button>
    )

    render(
      <CalendarAdapterProvider adapter={AdapterDayjs}>
        <CalendarPrevButton as={CustomButton} />
      </CalendarAdapterProvider>
    )

    const customButton = screen.getByTestId('custom-button')
    expect(customButton).toBeInTheDocument()
    fireEvent.click(customButton)
    expect(mockPrevMonth).toHaveBeenCalledTimes(1)
  })
})
