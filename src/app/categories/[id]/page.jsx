'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import CategoryCard from '@/components/CategoryCard'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import { getCategory } from '@/lib/server/categoryActions'
import { countCategoryDestinations } from '@/lib/server/destinationActions'
import { LayoutList } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const DestinationCategory = ({ params }) => {
    const { id } = params
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const [destinations, setDestinations] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [categoryLoading, setCategoryLoading] = useState(false)
    
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
              setError(true)
          } finally {
              setIsLoading(false)
          }
        }
        fetchTotaldestinations()
    }, [id])
    useEffect(() => {
      const fetchCategory = async () => {
        try {
          setCategoryLoading(true)
          const res = await getCategory(id)
          if (res) {
            setData(res)
          }
        } catch (error) {
          console.log(error)
          setError(true)
        } finally {
          setCategoryLoading(false)
        }
      }
      fetchCategory()
    }, [id])
    const categoryName = data?.name || 'Destination Category'
    if(isLoading || categoryLoading) {
        return <CustomLoading />
    }
    if (error) {
        return <CustomError />
    }
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
                <CustomError />
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