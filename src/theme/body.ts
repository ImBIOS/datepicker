import { type ComponentMultiStyleConfig } from '@chakra-ui/react'

export const CalendarBody: ComponentMultiStyleConfig = {
  parts: ['month', 'name', 'week', 'weekday', 'days'],

  baseStyle: {
    name: {
      h: 8,
      fontSize: 'md',
      lineHeight: 6,
      textAlign: 'center',
      textTransform: 'capitalize',
    },

    week: {
      gridTemplateColumns: 'repeat(7, 1fr)',
    },

    quarter: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },

    topRow: {
      color: 'gray.500',
      textAlign: 'center',
      textTransform: 'capitalize',
    },

    days: {
      gridTemplateColumns: 'repeat(7, 1fr)',
    },

    monthItems: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },

  defaultProps: {
    name: {
      as: 'h2',
    },
  },
}
