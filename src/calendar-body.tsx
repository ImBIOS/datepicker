import { Box, useMultiStyleConfig } from '@chakra-ui/react'
import { createContext, type PropsWithChildren } from 'react'
import { type CalendarBodyStyles } from './_types'

type CalendarBodyContextType = {
  month?: number
  year?: number
}

export type CalendarBodyProps = PropsWithChildren<CalendarBodyContextType>

export const CalendarBodyContext = createContext<CalendarBodyContextType>({
  month: 0,
  year: 0,
})

export function CalendarBody({
  children,
  month = 0,
  year = 0,
}: CalendarBodyProps) {
  const styles = useMultiStyleConfig('CalendarBody', {}) as CalendarBodyStyles

  return (
    <CalendarBodyContext.Provider value={{ month, year }}>
      <Box sx={styles.month}>{children}</Box>
    </CalendarBodyContext.Provider>
  )
}
