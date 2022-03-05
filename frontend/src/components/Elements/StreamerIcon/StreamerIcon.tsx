import { Avatar } from '@chakra-ui/react'

export type StreamerIconProps = {
  src: string
  name: string
}

export const StreamerIcon = ({ src, name }: StreamerIconProps) => {
  return <Avatar name={name} src={src} size="xl" boxShadow="md" />
}
