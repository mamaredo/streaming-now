import { useQuery } from 'react-query'

import { useGetQueryParams } from '@/hooks/useGetQueryParams'

import { youtubeAuth } from '../api/youtubeAuth'

export const useCallbackYoutube = () => {
  const { params } = useGetQueryParams()
  const { data: isAuth = null, isLoading } = useQuery<Promise<boolean>>(
    'youTubeAuth',
    () => youtubeAuth(params!),
    {
      enabled: !!params
    }
  )

  return {
    isAuth,
    isLoading
  }
}
