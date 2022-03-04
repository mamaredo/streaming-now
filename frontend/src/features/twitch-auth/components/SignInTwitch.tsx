import { Link } from '@chakra-ui/react'

export type SignInTwitchProps = {}

const link = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_TWITCH_CALLBACK_URL}&response_type=code&scope=openid`

export const SignInTwitch = () => {
  return <Link href={link}>SignInTwitch</Link>
}
