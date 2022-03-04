import { useQuery } from 'react-query'

import { useGetQueryParams } from '@/hooks/useGetQueryParams'

import { twitchAuth } from '../api/twitchAuth'

export const useCallbackTwitch = () => {
  const { params } = useGetQueryParams()
  const { data: isAuth = null, isLoading } = useQuery<Promise<boolean>>(
    'twitchAuth',
    () => twitchAuth(params!),
    {
      enabled: !!params
    }
  )

  return {
    isAuth,
    isLoading
  }
}
