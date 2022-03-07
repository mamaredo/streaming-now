import { Box, chakra, ChakraProps, Image, Text } from '@chakra-ui/react'

type StyleProps = {
  bgColor: ChakraProps['bgColor']
}

export type StreamingServiceLinkProps = {
  url: string
  icon: string
  serviceName: string
  style?: Partial<StyleProps>
}

const Link = chakra('a')

export const StreamingServiceLink = ({
  url,
  icon,
  serviceName,
  style
}: StreamingServiceLinkProps) => {
  return (
    <Box display="flex" flexFlow="column">
      <Link
        href={url}
        borderRadius="md"
        bgColor={style?.bgColor}
        boxShadow="md"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={{ base: '136px', sm: '160px' }}
          width={{ base: '136px', sm: '160px' }}
        >
          <Image width="64px" src={icon} alt={serviceName} />
        </Box>
      </Link>
      <Text
        pt="1"
        fontSize="2xl"
        fontWeight="bold"
        color="text-secondary"
        textAlign="center"
      >
        {serviceName}
      </Text>
    </Box>
  )
}
