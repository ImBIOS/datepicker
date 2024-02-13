import type { GridProps } from '@chakra-ui/react'
import { Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { type PropsWithChildren } from 'react'
import { type CalendarStyles } from './_types'

export type CalendarMonthsProps = PropsWithChildren<GridProps>

export function CalendarMonths({ children, ...props }: CalendarMonthsProps) {
  const styles = useMultiStyleConfig('Calendar', {}) as CalendarStyles

  return <Grid sx={{ ...styles.months, ...props }}>{children}</Grid>
}
