'use client'
import { getCounty } from '@/lib/server/countyActions'
import useSWR from 'swr'

const useCounty = (id) => {
    const fetcher = async () => {
        const county = await getCounty(id)
        if (!county) throw new Error('Failed to fetch county')
        return county
    }
    const { data, error, isLoading, mutate } = useSWR('County', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useCounty