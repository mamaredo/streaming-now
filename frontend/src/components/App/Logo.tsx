import { chakra, ChakraProps } from '@chakra-ui/react'

import { Heading } from '@/components/Elements'

type StyleProps = {
  color: ChakraProps['color']
  fontSize: ChakraProps['fontSize']
}

export type LogoProps = {
  styles?: Partial<StyleProps>
}

const Span = chakra('span', {
  baseStyle: {
    color: 'secondary'
  }
})

export const Logo = ({
  styles = { fontSize: 'xx-large', color: 'white' }
}: LogoProps) => (
  <Heading as="h1" fontSize={styles.fontSize} color={styles.color}>
    Streaming Now<Span>?</Span>
  </Heading>
)
