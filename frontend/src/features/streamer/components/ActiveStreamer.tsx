import { Grid, GridItem, Heading, Link } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { StreamerIcon } from '@/components/Elements'

import { getActiveStreamer } from '../api/getActiveStreamer'

export type StreamerProps = {}

export const ActiveStreamer = () => {
  const { data, isLoading } = useQuery('useGetStreamerQuery', getActiveStreamer)
  if (isLoading) {
    return <div>loading</div>
  }

  if (!data) {
    return <div>response error</div>
  }

  return (
    <Grid
      templateColumns={{ base: 'repeat(6, 1fr)', xl: 'repeat(8, 1fr)' }}
      gap={8}
    >
      {data.map(data => (
        <GridItem key={data.user_name}>
          <Link href={data.stream_link}>
            <StreamerIcon src={data.profile_img} name={data.user_name} />
          </Link>
          <Heading
            sx={{ paddingTop: '4px', width: { base: '72px', xl: '96px' } }}
            as="h3"
            size="base"
            textAlign="center"
            color="text-secondary"
            isTruncated
          >
            {data.user_name}
          </Heading>
        </GridItem>
      ))}
    </Grid>
  )
}
