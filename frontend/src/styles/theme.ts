import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      primary: {
        default: '#120052'
      },
      secondary: {
        default: '#FF2C6C'
      },
      'bg-primary': {
        default: '#F8F8FF'
      },
      'text-light': {
        default: '#F8F8FF'
      },
      'text-primary': {
        default: '#2E2E2E'
      },
      'text-secondary': {
        default: '#3B3B3B'
      }
    },
    fonts: {
      heading: '"Righteous", "Noto Sans JP", cursive, sans-serif;',
      body: '"Righteous", "Noto Sans JP", cursive, sans-serif;'
    }
  },
  styles: {
    global: {
      body: {
        letterSpacing: '0.5px',
        background: '#FAFAFA'
      }
    }
  }
})
