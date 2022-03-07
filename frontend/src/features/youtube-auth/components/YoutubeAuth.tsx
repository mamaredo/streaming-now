import { StreamingServiceLink } from '@/components/Elements'
import { YOUTUBE } from '@/config'

export type YoutubeAuthProps = {}

const url = `https://accounts.google.com/o/oauth2/auth?client_id=${YOUTUBE.CLIENT_ID}&redirect_uri=${YOUTUBE.CALLBACK_URL}&scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code&access_type=offline`

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
