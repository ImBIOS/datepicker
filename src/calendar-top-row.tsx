import { Grid, Text, useMultiStyleConfig } from '@chakra-ui/react'
import { type CalendarBodyStyles } from './_types'
import { useCalendarContext } from './context'

export function CalendarTopRow<TDate, TLocale>() {
  const styles = useMultiStyleConfig('CalendarBody', {}) as CalendarBodyStyles
  const context = useCalendarContext<TDate, TLocale>()

  switch (context.mode) {
    case 'day':
      const weekdays = context.adapter.weekdays(context.weekdayFormat)

      return (
        <Grid sx={styles.week}>
          {weekdays.map((weekday, i) => (
            <Text key={`${weekday}-${i}`} sx={styles.topRow}>
              {weekday}
            </Text>
          ))}
        </Grid>
      )
    case 'month':
    // const quarters = context.adapter.quarters('qqq')

    // return (
    //   <Grid sx={styles.quarter}>
    //     {quarters.map((quarter, i) => (
    //       <Text key={`${quarter}-${i}`} sx={styles.topRow}>
    //         {quarter}
    //       </Text>
    //     ))}
    //   </Grid>
    // )
    default:
      return null
  }
}
