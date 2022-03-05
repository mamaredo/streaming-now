import { axios } from '@/lib/axios'

import { ActiveStreamer, Endpoint } from '../types'

type Response = {
  data: ActiveStreamer[]
}
const endpoint: Endpoint['streamer'] = '/api/twitch/active-streamer'

export const getActiveStreamer = async () => {
  const { data }: Response = await axios.get(endpoint)

  return data
}
