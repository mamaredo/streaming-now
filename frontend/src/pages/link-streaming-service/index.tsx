import { Box, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'

import { Logo } from '@/components/App/Logo'
import { MainLayout } from '@/components/Layout'
import { TwitchLink } from '@/features/twitch-auth'

const LinkStreamingService: NextPage = () => {
  return (
    <MainLayout>
      <Box pt="14">
        <Logo color="text-primary" />
        <Text pt="4" color="text-primary" fontWeight="bold" fontSize="xl">
          連携する配信プラットフォームを選択して下さい。
        </Text>
        <Text color="text-primary" fontSize="md">
          ※後から追加することもできます
        </Text>
      </Box>
      <Box pt="10">
        <TwitchLink />
      </Box>
    </MainLayout>
  )
}

export default LinkStreamingService
