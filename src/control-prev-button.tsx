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
      case 'day':
        return as({ onClick: context.prevMonth })
      case 'month':
        return as({ onClick: context.prevYear })
      default:
    }
  }

  const handleClick = () => {
    switch (context.mode) {
      case 'day':
        context.prevMonth()
        break
      case 'month':
        context.prevYear()
        break
      default:
    }
  }

  return (
    <Button onClick={handleClick} sx={styles.button}>
      &#8592;
    </Button>
  )
}
