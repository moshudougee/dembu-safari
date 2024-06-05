'use client'
import { getDestination } from '@/lib/server/destinationActions'
import useSWR from 'swr'

const useDestination = (id) => {
    const fetcher = async () => {
        const destination = await getDestination(id)
        if (!destination) throw new Error('Failed to fetch destinations')
        return destination
    }
    const { data, error, isLoading, mutate } = useSWR('Destination', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useDestination