import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export const useHasAccessToken = () => {
  const [hasAccessToken, setHasAccessToken] = useState<null | boolean>(null)
  const [cookies] = useCookies()

  useEffect(() => {
    const accessToken = cookies['twitch_access_token']

    if (!accessToken) return setHasAccessToken(false)
    setHasAccessToken(true)
  }, [cookies])

  return {
    hasAccessToken
  }
}
