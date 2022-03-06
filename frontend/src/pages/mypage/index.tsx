import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { Header } from '@/components/App'
import { Heading } from '@/components/Elements'
import { Head } from '@/components/Head'
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

const SectionHeading = ({ text }: { text: string }) => (
  <Heading as="h2" fontSize="28px" color="text-primary">
    {text}
  </Heading>
)

const MyPage = () => {
  const { existsCookie } = useExistsCookies()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady || existsCookie === null) return
    !existsCookie && router.replace('/')
  }, [existsCookie, router])

  return (
    <>
      <Head />
      <Header />
      <MainLayout>
        <Box py="14">
          <Box as="section">
            <SectionHeading text="ACTIVE STREAMER" />
            <Box pt="4">
              <ActiveStreamer />
            </Box>
          </Box>
        </Box>
      </MainLayout>
    </>
  )
}

export default MyPage
