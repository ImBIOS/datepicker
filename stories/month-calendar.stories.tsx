import { type Meta, type StoryFn } from '@storybook/react'

import {
  Box,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { format, isValid } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import {
  Calendar,
  CalendarAdapterProvider,
  CalendarBody,
  CalendarBodyWrapper,
  CalendarControls,
  CalendarHeading,
  CalendarNextButton,
  CalendarPicker,
  CalendarPrevButton,
  CalendarTopRow,
  type CalendarDateRange,
  type CalendarSingleDate,
} from '../src'
import { AdapterDateFns } from '../src/adapters/AdapterDateFns'

export default {
  title: 'Month Calendar',
  component: Calendar,
} as Meta<typeof Calendar>

export const SinglePicker: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarSingleDate<Date>>()

  const handleSelectDate = (dates: CalendarSingleDate<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar
        mode="month"
        value={dates}
        onSelectDate={handleSelectDate}
        singleDateSelection
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarBodyWrapper>
          <CalendarBody>
            <CalendarHeading />
            <CalendarTopRow />
            <CalendarPicker />
          </CalendarBody>
        </CalendarBodyWrapper>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const RangePicker: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar mode="month" value={dates} onSelectDate={handleSelectDate}>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarBodyWrapper>
          <CalendarBody>
            <CalendarHeading />
            <CalendarTopRow />
            <CalendarPicker />
          </CalendarBody>
        </CalendarBodyWrapper>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const WithInputPopover: StoryFn<typeof Calendar> = () => {
  const [date, setDate] = useState<CalendarSingleDate<Date>>()
  const [value, setValue] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const calendarRef = useRef(null)

  const handleSelectDate = (date: CalendarSingleDate<Date>) => {
    setDate(date)
    setValue(() => (isValid(date) ? format(date!, 'MM/yyyy') : ''))
    onClose()
  }

  const match = (value: string) => value.match(/(\d{2})\/(\d{2})\/(\d{4})/)

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value)

    if (match(target.value)) {
      onClose()
    }
  }

  useOutsideClick({
    ref: calendarRef,
    handler: onClose,
    enabled: isOpen,
  })

  useEffect(() => {
    if (match(value)) {
      const date = new Date(value)

      return setDate(date)
    }
  }, [value])

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Box minH="400px">
        <Popover
          placement="auto-start"
          isOpen={isOpen}
          onClose={onClose}
          initialFocusRef={initialRef}
          isLazy
        >
          <PopoverTrigger>
            <Box onClick={onOpen} ref={initialRef}>
              <Input
                placeholder="MM/yyyy"
                value={value}
                onChange={handleInputChange}
              />
            </Box>
          </PopoverTrigger>

          <PopoverContent
            p={0}
            w="min-content"
            border="none"
            outline="none"
            _focus={{ boxShadow: 'none' }}
            ref={calendarRef}
          >
            <Calendar
              mode="month"
              value={date}
              onSelectDate={handleSelectDate}
              singleDateSelection
            >
              <PopoverBody p={0}>
                <CalendarControls>
                  <CalendarPrevButton />
                  <CalendarNextButton />
                </CalendarControls>

                <CalendarBodyWrapper>
                  <CalendarBody>
                    <CalendarHeading />
                    <CalendarTopRow />
                    <CalendarPicker />
                  </CalendarBody>
                </CalendarBodyWrapper>
              </PopoverBody>
            </Calendar>
          </PopoverContent>
        </Popover>
      </Box>
    </CalendarAdapterProvider>
  )
}
