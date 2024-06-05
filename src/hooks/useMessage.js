'use client'
import { getSingleMessage } from '@/lib/server/messageActions'
import useSWR from 'swr'

const useMessage = (id) => {
    const fetcher = async () => {
        const message = await getSingleMessage(id)
        if (!message) throw new Error('Failed to fetch message')
        return message
    }
    const { data, error, isLoading, mutate } = useSWR('Message', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useMessage