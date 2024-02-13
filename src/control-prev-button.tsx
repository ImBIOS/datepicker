import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { type ReactElement } from 'react'
import { type CalendarControlStyles } from './_types'
import { useCalendarContext } from './context'

type CalendarPrevButtonProps = {
  as?: ({ onClick }: { onClick: VoidFunction }) => ReactElement | null
}

export function CalendarPrevButton<TDate, TLocale>({
  as,
}: CalendarPrevButtonProps) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles
  const context = useCalendarContext<TDate, TLocale>()

  if (as) {
    switch (context.mode) {
      case 'month':
        return as({ onClick: context.prevYear })
      case 'day':
      default:
        return as({ onClick: context.prevMonth })
    }
  }

  const handleClick = () => {
    switch (context.mode) {
      case 'month':
        context.prevYear()
        break
      case 'day':
      default:
        context.prevMonth()
        break
    }
  }

  return (
    <Button onClick={handleClick} sx={styles.button}>
      &#8592;
    </Button>
  )
}
