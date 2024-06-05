'use client'
import { getDestinations } from '@/lib/server/destinationActions'
import useSWR from 'swr'

const useDestinations = () => {
    const fetcher = async () => {
        const destinations = await getDestinations()
        if (!destinations) throw new Error('Failed to fetch destinations')
        return destinations
    }
    const { data, error, isLoading, mutate } = useSWR('Destinations', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useDestinations