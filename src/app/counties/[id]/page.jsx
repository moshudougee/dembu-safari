'use client'
import ContentHeader from '@/components/ContentHeader'
import CountyCard from '@/components/CountyCard'
import CustomLoading from '@/components/CustomLoading'
import useCounty from '@/hooks/useCounty'
import { Telescope } from 'lucide-react'
import React from 'react'

const DestinationCounty = ({ params }) => {
    const { id } = params
    const { data, error, isLoading } = useCounty(id)
    let code = ''
    if (data?.code <= 9) {
        code = '00'+data?.code
    } else {
        code = '0'+data?.code
    }
    const countyName = `${data?.name} ${code}` || 'County Name'
    const imageurl = data?.flag || ''
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
            {isLoading? (
                <CustomLoading />
            ) : error? (
                <div className='text-safari-2'>{error}</div>
            ) : (
                <CountyCard 
                    data={data}
                />
            )}
        </div>
    </div>
  )
}

export default DestinationCounty