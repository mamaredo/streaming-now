import { Box, Button, Container, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'

import { HeroVideo } from '@/components/App/HeroVideo'
import { Logo } from '@/components/App/Logo'
import { Head } from '@/components/Head'
import { MainLayout } from '@/components/Layout'
import { SignInTwitch } from '@/features/twitch-auth'
import { TextStyle } from '@/utils/TextStyle'

const HeroHeader = () => {
  return (
    <Box position="relative" display="flex" justifyContent="center">
      <HeroVideo />
      <Container
        display="flex"
        flexFlow="column"
        position="absolute"
        top="0"
        maxW={{ base: 'container.md', xl: 'container.lg' }}
        height="100%"
        px={{ base: '16px' }}
        justifyContent="center"
      >
        <Box mb="12">
          <Logo fontSize="7xl" />
          <Text color="white" fontSize="xl" fontWeight="bold">
            お気に入りの<TextStyle style="normalWeight">Streamer</TextStyle>
            を見たいあなたに
            <br />
            最高の体験を与えます<TextStyle style="accent">。</TextStyle>
          </Text>
        </Box>
        <Link href="/link-streaming-service">
          <Button
            ml="auto"
            width="156px"
            height="56px"
            fontSize="x-large"
            color="secondary"
            bgColor="rgba(248,248,255, 0.25)"
            border="2px"
            borderColor="text-light"
          >
            START
          </Button>
        </Link>
        <Text pt="1" color="text-light" textAlign="right">
          ※外部サービスとのアカウント連携が必要です
        </Text>
      </Container>
    </Box>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head />
      <HeroHeader />
      <MainLayout>
        <Logo />
        <SignInTwitch />
      </MainLayout>
    </>
  )
}

export default Home
