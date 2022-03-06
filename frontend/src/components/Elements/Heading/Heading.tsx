import {
  ChakraProps,
  Heading as ChakraHeading,
  TypographyProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export type HeadingProps = {
  children: ReactNode
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  fontSize: TypographyProps['fontSize']
  color?: ChakraProps['color']
}

export const Heading = ({
  children,
  as,
  fontSize,
  color = 'text'
}: HeadingProps) => {
  return (
    <ChakraHeading
      as={as}
      color={color}
      fontWeight="400"
      letterSpacing="0.25px"
      fontSize={fontSize}
    >
      {children}
    </ChakraHeading>
  )
}
