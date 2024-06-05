'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import CategoryCard from '@/components/CategoryCard'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import useCategory from '@/hooks/useCategory'
import { countCategoryDestinations } from '@/lib/server/destinationActions'
import { LayoutList } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const DestinationCategory = ({ params }) => {
    const { id } = params
    const { data, error, isLoading: categoryLoading } = useCategory(id)
    const [destinations, setDestinations] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const categoryName = data?.name || 'Destination Category'
    useEffect(() => {
        const fetchTotaldestinations = async () => {
          try {
              setIsLoading(true)
              const res = await countCategoryDestinations(id)
              if(res) {
                  setDestinations(res)
              }
          } catch (error) {
              console.log(error)
          } finally {
              setIsLoading(false)
          }
        }
        fetchTotaldestinations()
      }, [id])
  return (
    <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={categoryName}
            icon={<LayoutList />}
            title={categoryName}
            subtitle='Category details'
        />
        <div className='card-container'>
            {isLoading || categoryLoading ? (
                <CustomLoading />
            ) : error ? (
                <div className='text-safari-2'>{error}</div>
            ) : (
                <CategoryCard 
                    data={data}
                    destinations={destinations}
                />
            )}
        </div>
        <hr className="hr"/>
            <AdsHorizontal />
        <hr className="hr"/>
    </div>
  )
}

export default DestinationCategory