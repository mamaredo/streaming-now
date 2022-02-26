import { DefaultOptions, QueryClient } from 'react-query'

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 300000
  }
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
