import { Grid, GridItem, Heading, Link } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { StreamerIcon } from '@/components/Elements'

import { getSleepStreamer } from '../api/getSleepStreamer'

export type SleepStreamerProps = {}

export const SleepStreamer = () => {
  const { data, isLoading } = useQuery(
    'useGetSleepStreamerQuery',
    getSleepStreamer
  )

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
            <StreamerIcon
              src={data.profile_img}
              name={data.user_name}
              isActive={false}
            />
          </Link>
          <Heading
            sx={{ paddingTop: '4px', width: '96px' }}
            as="h3"
            size="base"
            textAlign="center"
            color="text-secondary"
            fontFamily="'Noto Sans JP', sans-serif, 'Righteous';"
            isTruncated
          >
            {data.user_name}
          </Heading>
        </GridItem>
      ))}
    </Grid>
  )
}
