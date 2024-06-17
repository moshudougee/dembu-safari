'use client'
import React from 'react'
import CustomLoading from './CustomLoading'
import CustomError from './CustomError'
import ContentHeader from './ContentHeader'
import { FaHotel } from 'react-icons/fa6'
import useCounty from '@/hooks/useCounty'
import CountyAccommodations from './CountyAccommodations'

const AccommodationsCountyComp = ({ id }) => {
    const { data, error, isLoading } = useCounty(id)
    const crumbPage = `${data?.name} county Accommodations`
    const crumbLinks = [ { name: 'Accommodations', href: '/accommodations' } ]
    if (isLoading) {
        return <CustomLoading />
    }
    if (error) {
        return <CustomError />
    }
  return (
    <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={crumbPage}
            crumbLinks={crumbLinks}
            icon={<FaHotel size={24} />}
            title={crumbPage}
        />
        <div className='card-container'>
            <CountyAccommodations
                data={data}
            />
        </div>
    </div>
  )
}

export default AccommodationsCountyComp