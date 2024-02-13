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
    return as({ onClick: context.nextMonth })
  }

  return (
    <Button onClick={context.nextMonth} sx={styles.button}>
      &#8594;
    </Button>
  )
}
