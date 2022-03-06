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
      'text-primary': {
        default: '#2E2E2E'
      },
      'text-secondary': {
        default: '#3B3B3B'
      }
    },
    fonts: {
      heading: '"Righteous", cursive, sans;',
      body: '"Righteous", cursive;'
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
