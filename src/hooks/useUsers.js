'use client'
import { getUsers } from '@/lib/server/userActions'
import useSWR from 'swr'

const useUsers = () => {
    const fetcher = async () => {
        const users = await getUsers()
        if (!users) throw new Error('Failed to fetch users')
        return users
    }
    const { data, error, isLoading, mutate } = useSWR('Users', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useUsers