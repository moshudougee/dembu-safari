'use client'
import { getCounties } from '@/lib/server/countyActions'
import useSWR from 'swr'

const useCounties = () => {
    const fetcher = async () => {
        const counties = await getCounties()
        if (!counties) throw new Error('Failed to fetch counties')
        return counties
    }
    const { data, error, isLoading, mutate } = useSWR('Counties', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useCounties