import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { type ReactElement } from 'react'
import { type CalendarControlStyles } from './_types'
import { useCalendarContext } from './context'

type CalendarNextButtonProps = {
  as?: ({ onClick }: { onClick: VoidFunction }) => ReactElement | null
}

export function CalendarNextButton<TDate, TLocale>({
  as,
}: CalendarNextButtonProps) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles

  const context = useCalendarContext<TDate, TLocale>()

  if (as) {
    switch (context.mode) {
      case 'day':
        return as({ onClick: context.nextMonth })
      case 'month':
        return as({ onClick: context.nextYear })
      default:
    }
  }

  const handleClick = () => {
    switch (context.mode) {
      case 'day':
        context.nextMonth()
        break
      case 'month':
        context.nextYear()
        break
      default:
    }
  }

  return (
    <Button onClick={handleClick} sx={styles.button}>
      &#8594;
    </Button>
  )
}
