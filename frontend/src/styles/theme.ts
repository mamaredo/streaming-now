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
      text: {
        default: '#2B2B2B'
      }
    },
    fonts: {
      heading: 'Righteous, cursive;',
      body: 'Righteous, cursive;'
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
