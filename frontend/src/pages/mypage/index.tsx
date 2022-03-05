import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { MainLayout } from '@/components/Layout'
import { ActiveStreamer } from '@/features/streamer'

const useExistsCookies = () => {
  const [existsCookie, setExistsCookie] = useState<null | boolean>(null)
  const [cookies] = useCookies()

  useEffect(() => {
    console.log('useExistsCookies')
    const accessToken = cookies['twitch_access_token']
    // const idToken = cookies['twitch_id_token']

    if (!accessToken) return setExistsCookie(false)
    setExistsCookie(true)
  }, [cookies])

  return {
    existsCookie
  }
}

const MyPage = () => {
  const { existsCookie } = useExistsCookies()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady || existsCookie === null) return
    !existsCookie && router.replace('/')
  }, [existsCookie, router])

  return (
    <MainLayout>
      <div>
        my-page
        <ActiveStreamer />
      </div>
    </MainLayout>
  )
}

export default MyPage
