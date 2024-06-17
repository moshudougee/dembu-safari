'use client'
import useCategory from '@/hooks/useCategory'
import React from 'react'
import CustomLoading from './CustomLoading'
import CustomError from './CustomError'
import ContentHeader from './ContentHeader'
import { FaHotel } from 'react-icons/fa6'
import CategoryAccommodations from './CategoryAccommodations'

const AccommodationsCategoryComp = ({ id }) => {
    const { data, error, isLoading } = useCategory(id)
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
            icon={<FaHotel size={24} />}
            title={crumbPage}
        />
        <div className='card-container'>
            <CategoryAccommodations 
                data={data}
            />
        </div>
    </div>
  )
}

export default AccommodationsCategoryComp