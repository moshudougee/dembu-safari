'use client'
import useDestination from '@/hooks/useDestination'
import React from 'react'
import CustomLoading from './CustomLoading'
import CustomError from './CustomError'
import ContentHeader from './ContentHeader'
import { BsLuggageFill } from 'react-icons/bs'
import DestinationTours from './DestinationTours'

const ToursDestinationComp = ({ id }) => {
    const { data, error, isLoading } = useDestination(id)
    const crumbPage = `${data?.name} Tours & Safari`
    const crumbLinks = [ { name: 'Tours & Safari', href: '/tours' } ]
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
            <DestinationTours 
                data={data}
            />
        </div>
    </div>
  )
}

export default ToursDestinationComp