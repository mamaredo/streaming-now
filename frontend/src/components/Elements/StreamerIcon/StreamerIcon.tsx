import { Avatar } from '@chakra-ui/react'

export type StreamerIconProps = {
  src: string
  name: string
  isActive?: boolean
}

export const StreamerIcon = ({
  src,
  name,
  isActive = true
}: StreamerIconProps) => {
  return (
    <Avatar
      name={name}
      src={src}
      size="xl"
      boxShadow="md"
      opacity={isActive ? '1' : '0.8'}
      bgColor="rgba(0,0,0,0)"
    />
  )
}
