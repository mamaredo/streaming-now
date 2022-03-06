import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { Footer } from '@/components/App'

export type MainLayoutProps = {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Container
        maxW={{ base: 'container.md', xl: 'container.lg' }}
        minHeight="100vh"
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}
