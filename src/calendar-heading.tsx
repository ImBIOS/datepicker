'use client'

import { Heading, LinkBox, useMultiStyleConfig } from '@chakra-ui/react'
import { useContext } from 'react'
import { type CalendarBodyStyles } from './_types'
import { CalendarBodyContext } from './calendar-body'
import { useCalendarContext } from './context'

export type CalendarMonthNameProps = {
  format?: string
}

export function CalendarHeading<TDate, TLocale>({
  format,
}: CalendarMonthNameProps) {
  const styles = useMultiStyleConfig('CalendarBody', {}) as CalendarBodyStyles
  const context = useCalendarContext<TDate, TLocale>()
  const monthContext = useContext(CalendarBodyContext)
  const currentMonth =
    context.dates[Number(monthContext.month)].startDateOfMonth

  const month = context.adapter.format(currentMonth, 'month')
  const year = context.adapter.format(currentMonth, 'year')
  const headingText = format
    ? format.replace(/MMMM/g, month).replace(/yyyy/g, year)
    : `${month}, ${year}`

  const handleMonthClick = () => {
    context.setMode('month')
  }

  const handleYearClick = () => {
    console.info('TODO: Add support for year')
  }

  return (
    <Heading
      aria-label={headingText}
      zIndex={10}
      sx={styles.name}
      _hover={{ cursor: 'pointer' }}
    >
      {context.mode === 'day' && (
        <LinkBox
          display="inline-block"
          onClick={handleMonthClick}
          _hover={{
            textDecoration: 'underline',
          }}
        >
          {month}
        </LinkBox>
      )}{' '}
      <LinkBox
        display="inline-block"
        onClick={handleYearClick}
        _hover={{
          // TODO: Add support for 'year'
          // textDecoration: 'underline',
          cursor: 'not-allowed',
        }}
      >
        {year}
      </LinkBox>
    </Heading>
  )
}
