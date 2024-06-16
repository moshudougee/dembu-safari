'use client'
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DestinationCard from '@/components/DestinationCard'
import AdsHorizontal from '@/components/AdsHorizontal'
import { useRouter } from 'next/navigation'
import ContentHeader from '@/components/ContentHeader'
import { countPopularDestinations, getPopularDestinations } from '@/lib/server/destinationActions'
import CustomLoading from '@/components/CustomLoading'
import CustomError from '@/components/CustomError'
import { defaultSquareAvatar } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GiElephant } from "react-icons/gi"

const PopularComponent = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(null)
    const [totalLoading, setTotalLoading] = useState(false)
    const crumbPage = "Popular Destinations"
    const router = useRouter()
    const defaultUrl = defaultSquareAvatar
    useEffect(() => {
      const fetchTotal = async () => {
          setTotalLoading(true)
          try {
              const res = await countPopularDestinations()
              if(res) {
                  setTotal(res)
              }
          } catch (error) {
              setError('Error fetching Total is '+error)
          } finally {
              setTotalLoading(false)
          }
      }
      fetchTotal()
    }, [])
    const limit = 6
    let totalPages = 0
    if(total && total > limit) {
        totalPages = Math.ceil(total / limit)
    }
    useEffect(() => {
        const offset = page * limit
        const fetchDestinations = async () => {
            setIsLoading(true)
            try {
                const res = await getPopularDestinations(offset)
                if(res) {
                    setData(res)
                }
            } catch (error) {
                setError('Error fetching counties is '+error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchDestinations()
    }, [page])
  return (
    <div className='min-h-screen'>
      <ContentHeader
        crumbPage={crumbPage}
        icon={<GiElephant size={24} />}
        title={crumbPage}
      />
      <div className='card'>
        {isLoading || totalLoading ? (
          <CustomLoading />
        ) : error ? (
          <CustomError />
        ) : (
          data?.map((destination) => {
            const viewDestination = () => {
                return router.push(`/popular/${destination.$id}`)
            }
            let image = ''
            if(destination.images.length > 0) {
              image = destination.images[0]
            } else {
              image = defaultUrl
            }
            return (
            <div key={destination.$id} className='card-item' onClick={viewDestination}>
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
      {total > limit && 
        <div className='pagination'>
            <div className='pagination-item'>
                <Button 
                    className='pagination-button'
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                >
                    <ArrowBigLeftDash />
                    <span className='font-normal'>Previous</span>
                </Button>
                <div className='flex text-safari-2'>
                    <span className='font-normal'>{page + 1} of {totalPages}</span>
                </div>
                <Button 
                    className='pagination-button'
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={page >= totalPages - 1}
                >
                    <span className='font-normal'>Next</span>
                    <ArrowBigRightDash />
                </Button>
            </div>
        </div>
      }
      <hr className="hr"/>
        <AdsHorizontal />
      <hr className="hr"/>
    </div>
  )
}

export default PopularComponent