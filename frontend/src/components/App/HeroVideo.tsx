import { AspectRatio, Box } from '@chakra-ui/react'

export const HeroVideo = () => {
  return (
    <Box bgColor="rgba(67,67,67, 0.45)" width="100%">
      <AspectRatio
        zIndex="-1"
        maxHeight="100vh"
        overflow="hidden"
        ratio={4 / 3}
      >
        <video autoPlay muted loop playsInline poster="/hero-image.png">
          <source src="/hero-tunnel.mp4" type="video/mp4" />
        </video>
      </AspectRatio>
    </Box>
  )
}
