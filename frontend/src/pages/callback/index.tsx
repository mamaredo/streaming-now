import { Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useQuery } from 'react-query'

import { CallbackTwitch } from '@/features/twitch-auth'
import { axios } from '@/lib/axios'

function Test() {
  const { data, isLoading } = useQuery<any>('testQuery', async () => {
    const data = await axios.get('/api/test')
    return data
  })

  if (isLoading) {
    return <p>...Loading</p>
  }

  if (!data) {
    return <p>Error</p>
  }

  return (
    <>
      <div>{data.id}</div>
      <div>{data.title}</div>
    </>
  )
}

const Callback: NextPage = () => {
  return (
    <div>
      <Text>FROM CALLBACK PAGE</Text>
      <Test />
      <CallbackTwitch />
    </div>
  )
}

export default Callback
