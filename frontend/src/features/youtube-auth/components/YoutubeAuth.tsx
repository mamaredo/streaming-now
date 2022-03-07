import { StreamingServiceLink } from '@/components/Elements'

export type YoutubeAuthProps = {}

const url = ''

export const YoutubeAuth = () => {
  return (
    <StreamingServiceLink
      url={url}
      icon="/youtube_social_icon_red.png"
      serviceName="Youtube"
      style={{
        bgColor: '#FFFFFF'
      }}
    />
  )
}
