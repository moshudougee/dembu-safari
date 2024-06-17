'use client'
import useDestination from '@/hooks/useDestination'
import React from 'react'
import CustomLoading from './CustomLoading'
import CustomError from './CustomError'
import ContentHeader from './ContentHeader'
import { BsLuggageFill } from 'react-icons/bs'
import DestinationAccommodations from './DestinationAccommodations'

const AccommodationDestinationComp = ({ id }) => {
    const { data, error, isLoading } = useDestination(id)
    const crumbPage = `${data?.name} Accommodations`
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
            icon={<BsLuggageFill size={24} />}
            title={crumbPage}
            subtitle='Services'
        />
        <div className='card-container'>
            <DestinationAccommodations 
                data={data}
            />
        </div>
    </div>
  )
}

export default AccommodationDestinationComp