'use client'
import { countCounties } from '@/lib/server/countyActions'
import useSWR from 'swr'

const useCountCounties = () => {
    const fetcher = async () => {
        const total = await countCounties()
        if (!total) throw new Error('Failed to fetch counties')
        return total
    }
    const { data, error, isLoading, mutate } = useSWR('Counties', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useCountCounties