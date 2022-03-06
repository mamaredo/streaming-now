import { Text } from '@chakra-ui/react'

import { GlobalContentWrapper } from './GlobalContentWrapper'

export type FooterProps = {}

export const Footer = () => {
  return (
    <GlobalContentWrapper>
      <Text color="white">from footer</Text>
    </GlobalContentWrapper>
  )
}
