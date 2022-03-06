import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Header } from '@/components/App'
import { Heading } from '@/components/Elements'
import { Head } from '@/components/Head'
import { MainLayout } from '@/components/Layout'
import { ActiveStreamer } from '@/features/streamer'
import { useHasAccessToken } from '@/hooks/useHasAccessToken'

const SectionHeading = ({ text }: { text: string }) => (
  <Heading as="h2" fontSize="28px" color="text-primary">
    {text}
  </Heading>
)

const MyPage = () => {
  const { hasAccessToken } = useHasAccessToken()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady || hasAccessToken === null) return
    !hasAccessToken && router.replace('/')
  }, [hasAccessToken, router])

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
