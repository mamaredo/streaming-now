/* eslint-disable @next/next/no-page-custom-font */
import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { GlobalHeader } from '@/components/GlobalHeader'

export type MainLayoutProps = {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <GlobalHeader />
      <Container maxW={{ base: 'container.md', xl: 'container.lg' }}>
        {children}
      </Container>
      <Footer />
    </>
  )
}
