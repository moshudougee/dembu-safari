'use client'
import React from 'react'
import AdsHorizontal from '@/components/AdsHorizontal';
import ContentHeader from '@/components/ContentHeader';
import useDestination from '@/hooks/useDestination';
import CustomLoading from '@/components/CustomLoading';
import CustomError from '@/components/CustomError';
import DestinationSingle from '@/components/DestinationSingle';
import { GiElephant } from "react-icons/gi";

const PopularDestComponent = ({ id }) => {
    const { data, error, isLoading } = useDestination(id)
    const crumbLinks = [
      { name: 'Popular Destinations', href: '/popular' }
    ]
    const destinationName = data?.name || 'Destination Name'
  return (
    <div className='min-h-screen'>
        <ContentHeader 
          crumbLinks={crumbLinks}
          crumbPage={destinationName}
          icon={<GiElephant size={24} />}
          title={destinationName}
          subtitle='Destination details'
        />
        <div className='card-container'>
          {isLoading ? (
            <CustomLoading />
          ) : error ? (
            <CustomError />
          ) : (
            <DestinationSingle 
              data={data}
            />
          )}
        </div>
        <hr className="hr"/>
        <AdsHorizontal />
        <hr className="hr"/>
    </div>
  )
}

export default PopularDestComponent