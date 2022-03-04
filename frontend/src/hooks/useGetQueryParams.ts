import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'

export const useGetQueryParams = () => {
  const [params, setParams] = useState<ParsedUrlQuery>()
  const router = useRouter()
  const query = router.query

  useEffect(() => {
    if (router.isReady && query) {
      setParams(query)
      console.log(query)
    }
  }, [router, query])

  return {
    params
  }
}
