import { axios } from '@/lib/axios'

import { Endpoint } from '../types'

const endpoint: Endpoint['sleepStreamer'] = '/api/twitch/sleep-streamer'

export const getSleepStreamer = async () => {
  await axios.get(endpoint)
}
