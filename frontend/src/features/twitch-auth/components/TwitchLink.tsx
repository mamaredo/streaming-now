import { StreamingServiceLink } from '@/components/Elements'
import { TWITCH } from '@/config'

export type TwitchLinkProps = {}

const url = `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH.CLIENT_ID}&redirect_uri=${TWITCH.CALLBACK_URL}&response_type=code&scope=openid user:read:follows`

export const TwitchLink = () => {
  return (
    <StreamingServiceLink
      url={url}
      icon="/TwitchGlitchPurple.svg"
      serviceName="Twitch"
      style={{
        bgColor: '#F0F0FF'
      }}
    />
  )
}
