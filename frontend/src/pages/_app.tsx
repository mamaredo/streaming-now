/* eslint-disable @next/next/no-page-custom-font */
import 'focus-visible/dist/focus-visible'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { queryClient } from '@/lib/react-query'
import { theme } from '@/styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ChakraProvider theme={theme}>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
