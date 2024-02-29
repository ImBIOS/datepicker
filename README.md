# Datepicker Component for Chakra-UI

[![npm version](https://badge.fury.io/js/%40imbios%2Fdatepicker.svg)](https://badge.fury.io/js/%40imbios%2Fdatepicker)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![All Contributors](https://img.shields.io/github/all-contributors/ImBIOS/datepicker?color=ee8449&style=flat-square)](#contributors-)

A powerful and simple-to-use datepicker component for web applications, built with [date-fns](https://date-fns.org/) for date management and styled using [Chakra-UI](https://chakra-ui.com/), a modular and accessible component library. This README provides all the necessary information to get started, customize the component, and contribute to its development.

## Table of Contents

- [Datepicker Component for Chakra-UI](#datepicker-component-for-chakra-ui)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation and Usage](#installation-and-usage)
    - [Customizing the Datepicker](#customizing-the-datepicker)
  - [Theming: Available Components Theme Keys](#theming-available-components-theme-keys)
  - [License](#license)
  - [Contributors ✨](#contributors-)

## Prerequisites

To integrate the datepicker into your project, ensure you have [date-fns](https://date-fns.org/) and [Chakra-UI](https://chakra-ui.com/) installed. These libraries are essential for date management and UI styling, respectively.

```bash
bun add date-fns
```

Follow the installation guide for Chakra-UI [here](https://chakra-ui.com/guides/first-steps#framework-guide) to complete the setup.

## Installation and Usage

Once the prerequisites are installed, add the datepicker component to your project using:

```bash
bun add @imbios/datepicker
```

Below is an example showcasing how to integrate the datepicker into your application, using Chakra-UI's provider for theming:

TODO: Update below example with newest date library agnostic approach

```tsx
import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import {
  Calendar,
  CalendarDefaultTheme,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
} from '@imbios/datepicker'

export function App() {
  const [dates, setDates] = useState()

  const handleSelectDate = values => setDates(values)

  return (
    <ChakraProvider theme={CalendarDefaultTheme}>
      <Calendar value={dates} onSelectDate={handleSelectDate}>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>
        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </ChakraProvider>
  )
}
```

Note: This example displays the calendar without an input field. For integration with inputs and popovers, refer to [this detailed example](https://uselessdev-datepicker.netlify.app/?path=/story/calendar--with-input-popover-start-end-dates).

### Customizing the Datepicker

Customize the Calendar component using Chakra-UI's `extendTheme` feature. Below is an example showing how to override the default theme:

```ts
import { extendTheme } from '@chakra-ui/react'
import { CalendarDefaultTheme } from '@imbios/datepicker'

export const theme = extendTheme(CalendarDefaultTheme, {
  components: {
    Calendar: {
      parts: ['calendar'],
      baseStyle: {
        calendar: {
          borderWidth: '6px',
          borderColor: 'pink.400',
          rounded: 'none',
          shadow: 'none',
          boxShadow: '32px 16px 0 6px #3B4DCC',
        },
      },
    },
    CalendarControl: {
      parts: ['button'],
      baseStyle: {
        button: {
          h: 6,
          px: 2,
          rounded: 'none',
          fontSize: 'sm',
          color: 'white',
          bgColor: 'pink.400',
          _hover: {
            bgColor: 'pink.200',
          },
          _focus: {
            outline: 'none',
          },
        },
      },
    },
  },
})
```

## Theming: Available Components Theme Keys

| Key name        | Description                                                               | Parts                                      |
| --------------- | ------------------------------------------------------------------------- | ------------------------------------------ |
| Calendar        | A multipart component this is reponsible for the calendar it self.        | `calendar`, `months`                       |
| CalendarMonth   | Responsible to style one month block.                                     | `month`, `name`, `week`, `weekday`, `days` |
| CalendarDay     | Applies styles to individual day. This is the only single part component. | --                                         |
| CalendarControl | Applies styles to prev and next months.                                   | `controls`, `button`                       |

## License

This project is licensed under the [Apache-2.0 License](LICENSE), allowing for wide use and contribution.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome! -->
