import { Box, useMultiStyleConfig } from '@chakra-ui/react'
import { type PropsWithChildren, createContext } from 'react'
import { type CalendarMonthStyles } from './types'

export type CalendarMonthProps = PropsWithChildren<{ month?: number }>

type MonthContextType = {
  month?: number
}

export const MonthContext = createContext<MonthContextType>({
  month: 0,
})

export function CalendarMonth({ children, month = 0 }: CalendarMonthProps) {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles

  return (
    <MonthContext.Provider value={{ month }}>
      <Box sx={styles.month}>{children}</Box>
    </MonthContext.Provider>
  )
}
