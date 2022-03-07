import { Spinner, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useCallbackYoutube } from '@/features/youtube-auth'

const YouTube: NextPage = () => {
  const router = useRouter()
  const youtube = useCallbackYoutube()

  useEffect(() => {
    ;(async () => {
      const isTwitchAuth = await youtube.isAuth
      if (!router.isReady) return

      isTwitchAuth && router.replace('/mypage')
    })()
  }, [youtube, router])

  if (youtube.isAuth !== null && !youtube.isAuth) {
    return (
      <div>
        <Text>認証に失敗しました。</Text>
      </div>
    )
  }

  return (
    <>
      認証中です。
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </>
  )
}

export default YouTube
