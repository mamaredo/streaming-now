import { ChakraProps } from '@chakra-ui/react'

import { Heading } from '@/components/Elements'
import { TextStyle } from '@/utils/TextStyle'

type StyleProps = {
  color: ChakraProps['color']
  fontSize: ChakraProps['fontSize']
}

export type LogoProps = Partial<StyleProps>

export const Logo = ({
  fontSize = 'xx-large',
  color = 'text-light',
  ...props
}: LogoProps) => (
  <Heading as="h1" fontSize={fontSize} color={color} {...props}>
    Streaming Now<TextStyle style="accent">?</TextStyle>
  </Heading>
)
