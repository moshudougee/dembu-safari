'use client'
import { getCategories } from '@/lib/server/categoryActions'
import useSWR from 'swr'

const useCategories = () => {
    const fetcher = async () => {
        const categories = await getCategories()
        if (!categories) throw new Error('Failed to fetch categories')
        return categories
    }
    const { data, error, isLoading, mutate } = useSWR('Categories', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useCategories