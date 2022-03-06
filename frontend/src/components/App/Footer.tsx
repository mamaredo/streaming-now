import { Text } from '@chakra-ui/react'

import { AppContentWrapper } from './AppContentWrapper'

export type FooterProps = {}

export const Footer = () => {
  return (
    <AppContentWrapper>
      <Text color="white">from footer</Text>
    </AppContentWrapper>
  )
}
