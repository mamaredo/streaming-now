import { chakra } from '@chakra-ui/react'
import { ReactNode } from 'react'

const SecondaryColorText = chakra('span', {
  baseStyle: {
    color: 'secondary',
    fontWeight: 'bold'
  }
})

const NormalWeightText = chakra('span', {
  baseStyle: {
    fontWeight: 'normal'
  }
})

const Accent = ({ children }: { children: ReactNode }) => (
  <SecondaryColorText>{children}</SecondaryColorText>
)

const NormalWeight = ({ children }: { children: ReactNode }) => (
  <NormalWeightText>{children}</NormalWeightText>
)

type TextStyleType = 'accent' | 'normalWeight'

const component = {
  accent: Accent,
  normalWeight: NormalWeight
}

type TextStyleProps = {
  style: TextStyleType
  children: ReactNode
}

export const TextStyle = ({ style, children }: TextStyleProps) => {
  const Component = component[style]
  return <Component>{children}</Component>
}
