import { chakra } from '@chakra-ui/react'

import { Heading } from '@/components/Elements'

import { GlobalContentWrapper } from './GlobalContentWrapper'

export type HeaderProps = {}

const Span = chakra('span', {
  baseStyle: {
    color: 'secondary'
  }
})

export const Header = () => {
  return (
    <GlobalContentWrapper
      height={{ base: '56px', xl: '72px' }}
      display="flex"
      alignItems="center"
    >
      <Heading as="h1" fontSize="xx-large" color="white">
        Streaming Now<Span>?</Span>
      </Heading>
    </GlobalContentWrapper>
  )
}
