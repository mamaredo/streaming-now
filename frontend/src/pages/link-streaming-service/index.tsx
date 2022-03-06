import type { NextPage } from 'next'

import { Logo } from '@/components/App/Logo'
import { MainLayout } from '@/components/Layout'

const LinkStreamingService: NextPage = () => {
  return (
    <MainLayout>
      <Logo color="text-primary" />
    </MainLayout>
  )
}

export default LinkStreamingService
