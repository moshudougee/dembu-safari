'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContentHeader from '@/components/ContentHeader'
import CountyCard from '@/components/CountyCard'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import { getCounty } from '@/lib/server/countyActions'
import { countCountyDestinations } from '@/lib/server/destinationActions'
import { Telescope } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CountyComponent = ({id}) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const [destinations, setDestinations] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [countyLoading, setCountyLoading] = useState(false)
    
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
              setError(true)
          } finally {
              setIsLoading(false)
          }
        }
        fetchTotaldestinations()
      }, [id])
      useEffect(() => {
        const fetchCounty = async () => {
            setCountyLoading(true)
            try {
               const res = await getCounty(id)
               if(res) {
                setData(res)
               } 
            } catch (error) {
                console.log(error)
                setError(true)
            } finally {
                setCountyLoading(false)
            }
        }
        fetchCounty()
      }, [id])
      
      let code = ''
      if (data?.code <= 9) {
        code = '00'+data?.code
      } else {
        code = '0'+data?.code
      }
      const countyName = `${data?.name} ${code}` || 'County Name'
      const imageurl = data?.flag || ''
      if(isLoading || countyLoading) {
        return <CustomLoading />
      }
      if (error) {
        return <CustomError />
      }
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
                <CustomError />
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

export default CountyComponent