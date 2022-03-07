import { axios } from '@/lib/axios'

import { Endpoint, SleepStreamer } from '../types'

type Response = {
  data: SleepStreamer[]
}

const endpoint: Endpoint['sleepStreamer'] = '/api/twitch/sleep-streamer'

export const getSleepStreamer = async () => {
  const { data }: Response = await axios.get(endpoint)

  return data
}
