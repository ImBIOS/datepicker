import { extendTheme } from '@chakra-ui/react'
import { CalendarBody } from './body'
import { Calendar } from './calendar'
import { CalendarControl } from './controls'
import { CalendarDay } from './day'
import { CalendarMonth } from './month'

export const theme = extendTheme({
  components: {
    Calendar,
    CalendarBody,
    CalendarDay,
    CalendarMonth,
    CalendarControl,
  },
})
