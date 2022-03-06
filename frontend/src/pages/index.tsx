import type { NextPage } from 'next'

import { Head } from '@/components/Head'
import { SignInTwitch } from '@/features/twitch-auth'

const Home: NextPage = () => {
  return (
    <>
      <Head />
      <div>
        <main>
          <div>Hello world</div>
          <SignInTwitch />
        </main>
        <footer></footer>
      </div>
    </>
  )
}

export default Home
