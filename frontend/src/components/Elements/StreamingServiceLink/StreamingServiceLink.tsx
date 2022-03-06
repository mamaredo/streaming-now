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
    <Box display="flex" flexFlow="column" maxWidth="160px">
      <Link
        href={url}
        borderRadius="md"
        bgColor={style?.bgColor}
        boxShadow="md"
      >
        <Box p="10" w="full">
          <Image mx="auto" width="64px" src={icon} alt={serviceName} />
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
