import { Spinner } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { useGetQueryParams } from '@/hooks/useGetQueryParams'

import { twitchAuth } from '../api/twitchAuth'

export const CallbackTwitch = () => {
  const { params } = useGetQueryParams()
  const { data: isAuth, isLoading } = useQuery<Promise<boolean>>(
    'twitchAuth',
    () => twitchAuth(params!),
    {
      enabled: !!params
    }
  )

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  }

  if (!isAuth) {
    return <div>認証に失敗しました。</div>
  }

  return <div>認証に成功しました</div>
}
