'use client'
import CategoryCard from '@/components/CategoryCard'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import useCategory from '@/hooks/useCategory'
import { LayoutList } from 'lucide-react'
import React from 'react'

const DestinationCategory = ({ params }) => {
    const { id } = params
    const { data, error, isLoading } = useCategory(id)
    const categoryName = data?.name || 'Destination Category'
  return (
    <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={categoryName}
            icon={<LayoutList />}
            title={categoryName}
            subtitle='Category details'
        />
        <div className='card-container'>
            {isLoading ? (
                <CustomLoading />
            ) : error ? (
                <div className='text-safari-2'>{error}</div>
            ) : (
                <CategoryCard 
                    data={data}
                />
            )}
        </div>
    </div>
  )
}

export default DestinationCategory