import { Box, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarMonthStyles } from './types'
import { createContext, PropsWithChildren } from 'react'

export type CalendarMonth = PropsWithChildren<{ month?: number }>

type MonthContext = {
  month?: number
}

export const MonthContext = createContext<MonthContext>({
  month: 0,
})

export function CalendarMonthDJ({ children, month = 0 }: CalendarMonth) {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles

  return (
    <MonthContext.Provider value={{ month }}>
      <Box sx={styles.month}>{children}</Box>
    </MonthContext.Provider>
  )
}
