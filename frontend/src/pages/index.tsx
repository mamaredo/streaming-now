import type { NextPage } from 'next'

import { Heading } from '@/components/Elements'
import { Head } from '@/components/Head'
import { MainLayout } from '@/components/Layout'
import { SignInTwitch } from '@/features/twitch-auth'

const Home: NextPage = () => {
  return (
    <>
      <Head />
      <MainLayout>
        <Heading as="h1" fontSize="2xl" color="text-primary">
          Streaming Now?
        </Heading>
        <SignInTwitch />
      </MainLayout>
    </>
  )
}

export default Home
