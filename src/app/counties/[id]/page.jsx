'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContentHeader from '@/components/ContentHeader'
import CountyCard from '@/components/CountyCard'
import CustomLoading from '@/components/CustomLoading'
import useCounty from '@/hooks/useCounty'
import { countCountyDestinations } from '@/lib/server/destinationActions'
import { Telescope } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const DestinationCounty = ({ params }) => {
    const { id } = params
    const { data, error, isLoading: countyLoading } = useCounty(id)
    const [destinations, setDestinations] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    let code = ''
    if (data?.code <= 9) {
        code = '00'+data?.code
    } else {
        code = '0'+data?.code
    }
    const countyName = `${data?.name} ${code}` || 'County Name'
    const imageurl = data?.flag || ''
    useEffect(() => {
        const fetchTotaldestinations = async () => {
          try {
              setIsLoading(true)
              const res = await countCountyDestinations(id)
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
            crumbPage={countyName}
            imageurl={imageurl}
            icon={<Telescope />}
            title={countyName}
            subtitle='County details'
        />
        <div className='card-container'>
            {isLoading || countyLoading ? (
                <CustomLoading />
            ) : error? (
                <div className='text-safari-2'>{error}</div>
            ) : (
                <CountyCard 
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

export default DestinationCounty