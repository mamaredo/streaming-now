import { Box, ChakraProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

export type GlobalContentWrapperProps = {
  children: ReactNode
} & ChakraProps

export const GlobalContentWrapper = ({
  children,
  ...props
}: GlobalContentWrapperProps) => {
  return (
    <Box {...props} w="full" paddingX="16px" bgColor="primary">
      {children}
    </Box>
  )
}
