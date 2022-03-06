import { useQuery } from 'react-query'

// import { StreamerIcon } from "@/components/Elements";
import { getSleepStreamer } from '../api/getSleepStreamer'

export type SleepStreamerProps = {}

export const SleepStreamer = () => {
  const { isLoading } = useQuery('useGetSleepStreamerQuery', getSleepStreamer)
  if (isLoading) {
    return <div>loading</div>
  }

  return <div>from sleep stremaer</div>
}
