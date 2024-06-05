'use client'
import { getSingleAbout } from '@/lib/server/aboutActions'
import useSWR from 'swr'

const useAbout = (id) => {
    const fetcher = async () => {
        const about = await getSingleAbout(id)
        if (!about) throw new Error('Failed to fetch about')
        return about
    }
    const { data, error, isLoading, mutate } = useSWR('About', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useAbout