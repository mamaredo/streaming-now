import { useQuery } from 'react-query'

import { getStreamer } from '../api/getStreamer'

export type StreamerProps = {}

export const Streamer = () => {
  const { data, isLoading } = useQuery('useGetStreamerQuery', getStreamer)

  if (isLoading) {
    return <div>loading</div>
  }

  if (!data) {
    return <div>response error</div>
  }

  return <div>Streamer</div>
}
