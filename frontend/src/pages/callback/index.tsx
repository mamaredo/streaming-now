import { Spinner, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { SignInTwitch, useCallbackTwitch } from '@/features/twitch-auth'

const Callback: NextPage = () => {
  const router = useRouter()
  const twitch = useCallbackTwitch()

  useEffect(() => {
    ;(async () => {
      const isTwitchAuth = await twitch.isAuth
      if (!router.isReady) return

      isTwitchAuth && router.replace('/mypage')
    })()
  }, [twitch, router])

  if (twitch.isAuth !== null && !twitch.isAuth) {
    return (
      <div>
        <Text>認証に失敗しました。</Text>
        <SignInTwitch />
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

export default Callback
