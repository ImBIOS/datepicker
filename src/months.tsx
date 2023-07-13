import type { GridProps } from '@chakra-ui/react'
import { Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarStyles } from './types'
import { PropsWithChildren } from 'react'

export type CalendarMonths = PropsWithChildren<GridProps>

export function CalendarMonthsDJ({ children, ...props }: CalendarMonths) {
  const styles = useMultiStyleConfig('Calendar', {}) as CalendarStyles

  return <Grid sx={{ ...styles.months, ...props }}>{children}</Grid>
}
