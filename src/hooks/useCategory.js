'use client'
import { getCategory } from '@/lib/server/categoryActions'
import useSWR from 'swr'

const useCategory = (id) => {
    const fetcher = async () => {
        const category = await getCategory(id)
        if (!category) throw new Error('Failed to fetch category')
        return category
    }
    const { data, error, isLoading, mutate } = useSWR('Category', fetcher)
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export default useCategory