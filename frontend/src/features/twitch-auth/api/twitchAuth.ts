import { ParsedUrlQuery } from 'querystring'

import { axios } from '@/lib/axios'

export const twitchAuth = async (params: ParsedUrlQuery) => {
  let isAuth = false
  console.log(params)
  const payload = {
    code: params.code,
    scope: params.scope
  }

  // const payload = JSON.stringify(code)
  await axios.post('/api/twitch-auth', JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return isAuth
}
