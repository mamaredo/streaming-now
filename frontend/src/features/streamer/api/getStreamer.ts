import { axios } from '@/lib/axios'

import { Endpoint } from '../types'

const endpoint: Endpoint['streamer'] = '/api/twitch/streamer'

export const getStreamer = async () => {
  await axios.get(endpoint)
}
