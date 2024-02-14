import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen } from '../.jest/with-theme'
import { CalendarAdapterProvider } from './adapters'
import { AdapterDateFns } from './adapters/AdapterDateFns'
import { AdapterDayjs } from './adapters/AdapterDayjs'
import { useCalendarContext } from './context'
import { CalendarNextButton } from './control-next-button'

// Mock useMultiStyleConfig to return expected styles
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useMultiStyleConfig: jest.fn(() => ({
    button: {
      backgroundColor: 'blue', // Example style, adjust as needed
    },
  })),
}))

// Mocking the CalendarContextProvider might be necessary if it's not straightforward to simulate its behavior
// This mock implementation can be adjusted based on the actual context structure
jest.mock('./context', () => ({
  useCalendarContext: jest.fn(),
}))

describe('CalendarNextButton', () => {
  const mockNextMonth = jest.fn()

  beforeEach(() => {
    ;(useCalendarContext as jest.Mock).mockReturnValue({
      nextMonth: mockNextMonth,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the default button and triggers nextMonth on click', async () => {
    render(
      <CalendarAdapterProvider adapter={AdapterDateFns}>
        <CalendarNextButton />
      </CalendarAdapterProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ backgroundColor: 'blue' })
    await userEvent.click(button)
    expect(mockNextMonth).toHaveBeenCalledTimes(1)
  })

  it('renders a custom button component when passed as prop', () => {
    const CustomButton = ({ onClick }: { onClick: VoidFunction }) => (
      <button onClick={onClick} data-testid="custom-button">
        Next
      </button>
    )

    render(
      <CalendarAdapterProvider adapter={AdapterDayjs}>
        <CalendarNextButton as={CustomButton} />
      </CalendarAdapterProvider>
    )

    const customButton = screen.getByTestId('custom-button')
    expect(customButton).toBeInTheDocument()
    fireEvent.click(customButton)
    expect(mockNextMonth).toHaveBeenCalledTimes(1)
  })
})
