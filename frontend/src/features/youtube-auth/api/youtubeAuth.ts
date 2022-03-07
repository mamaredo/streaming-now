import { ParsedUrlQuery } from 'querystring'

import { axios } from '@/lib/axios'

import { Endpoint } from '../types'

const endpoint: Endpoint['auth'] = '/api/youtube/auth'

export const youtubeAuth = async (params: ParsedUrlQuery) => {
  const payload = {
    code: params.code,
    scope: params.scope
  }

  const { is_auth }: { is_auth: boolean } = await axios.post(
    endpoint,
    JSON.stringify(payload),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return is_auth
}
