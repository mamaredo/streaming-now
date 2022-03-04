import { ParsedUrlQuery } from 'querystring'

import { axios } from '@/lib/axios'

export const twitchAuth = async (params: ParsedUrlQuery) => {
  const payload = {
    code: params.code,
    scope: params.scope
  }

  const { is_auth }: { is_auth: boolean } = await axios.post(
    '/api/twitch-auth',
    JSON.stringify(payload),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return is_auth
}
