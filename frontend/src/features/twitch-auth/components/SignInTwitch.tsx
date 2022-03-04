import { Link } from '@chakra-ui/react'

import { TWITCH } from '@/config'

export type SignInTwitchProps = {}

const link = `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH.CLIENT_ID}&redirect_uri=${TWITCH.CALLBACK_URL}&response_type=code&scope=openid user:read:follows`

export const SignInTwitch = () => {
  return <Link href={link}>SignInTwitch</Link>
}
