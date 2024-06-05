'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import DestinationCard from '@/components/DestinationCard'
import { countCategoryDestinations, countCountyDestinations, getCategoryDestinations, getCountyDestinations } from '@/lib/server/destinationActions'
import { defaultSquareAvatar } from '@/lib/utils'
import { Palmtree } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Destinations = () => {
  const params = useSearchParams()
  const name = params.get('name')
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(null)
  const [totalLoading, setTotalLoading] = useState(false)
  const router = useRouter()
  const defaultUrl = defaultSquareAvatar
  let countyId, categoryId, crumbPage = ''
  let crumbLinks = null
  if (params.get('countyId')) {
    countyId = params.get('countyId')
  }
  if (params.get('categoryId')) {
    categoryId = params.get('categoryId')
  }
  if (countyId !== undefined && countyId !== '') {
    crumbPage = `${name} Destinations` || 'County Destinations'
    crumbLinks = [ {name: name, href: `/counties/${countyId}`} ]
  } else if (categoryId !== undefined && categoryId !== '') {
    crumbPage = `${name} Destinations` || 'Category Destinations'
    crumbLinks = [ {name: name, href: `/categories/${categoryId}`} ]
  } 

  console.log(countyId)
  console.log(categoryId)
  useEffect(() => {
    const fetchCountyTotal = async () => {
      setTotalLoading(true)
      try {
        const res = await countCountyDestinations(countyId)
        if (res) {
          setTotal(res)
        }
      } catch (error) {
        setError('Error fetching Total is '+error)
      } finally {
        setTotalLoading(false)
      }
    }
    const fetchCategoryTotal = async () => {
      setTotalLoading(true)
      try {
        const res = await countCategoryDestinations(categoryId)
        if (res) {
          setTotal(res)
        }
      } catch (error) {
        setError('Error fetching Total is '+error)
      } finally {
        setTotalLoading(false)
      }
    }
    if (countyId && countyId !== '') {
      fetchCountyTotal()
    } else if (categoryId && categoryId !== '') {
      fetchCategoryTotal()
    }
  }, [])
  const limit = 6
  let totalPages = 0
  if(total && total > limit) {
    totalPages = Math.ceil(total / limit)
  }
  useEffect(() => {
    const offset = page * limit
    const fetchCountyDestinations = async () => {
      setIsLoading(true)
      try {
        const res = await getCountyDestinations(countyId, offset)
        if(res) {
          setData(res)
        }
      } catch (error) {
        setError('Error fetching counties is '+error)
      } finally {
        setIsLoading(false)
      }
    }
    const fetchCategoryDestinations = async () => {
      setIsLoading(true)
      try {
        const res = await getCategoryDestinations(categoryId, offset)
        if(res) {
          setData(res)
        }
      } catch (error) {
        setError('Error fetching counties is '+error)
      } finally {
        setIsLoading(false)
      }
    }
    if (countyId && countyId !== '') {
      fetchCountyDestinations()
    } else if (categoryId && categoryId !== '') {
      fetchCategoryDestinations()
    }
  }, [page])
  
  
  return (
    <div className='min-h-screen'>
      <ContentHeader 
        crumbPage={crumbPage}
        crumbLinks={crumbLinks}
        icon={<Palmtree />}
        title={crumbPage}
      />
      <div className='grid grid-cols-3 h-auto w-full ps-2 my-4'>
        {isLoading || totalLoading ? (
          <CustomLoading />
        ) : error ? (
          <CustomError />
        ) : (
          data?.map((destination) => {
            const viewDestination = () => {
                let pathName = '#'
                if(countyId!== undefined && countyId!== '') {
                  pathName = `/destinations/${destination.$id}?name='county'`
                } else if(categoryId!== undefined && categoryId!== '') {
                  pathName = `/destinations/${destination.$id}?name='category'`
                }
                return router.push(pathName)
            }
            let image = ''
            if(destination.images.length > 0) {
              image = destination.images[0]
            } else {
              image = defaultUrl
            }
            return (
            <div key={destination.$id} className='flex w-[380px] h-[500px] mb-2' onClick={viewDestination}>
                <DestinationCard 
                    title={destination.name}
                    description={destination.intro}
                    image={image}
                    location={destination.countyId.name}
                />
            </div>
            )
          })
        )}
      </div>
      <hr className="hr"/>
        <AdsHorizontal />
      <hr className="hr"/>
    </div>
  )
}

export default Destinations