import { useQuery } from 'react-query'

import { getActiveStreamer } from '../api/getActiveStreamer'

export type StreamerProps = {}

export const ActiveStreamer = () => {
  const { data, isLoading } = useQuery('useGetStreamerQuery', getActiveStreamer)
  console.log(data)
  if (isLoading) {
    return <div>loading</div>
  }

  if (!data) {
    return <div>response error</div>
  }

  return <div>Streamer</div>
}
