'use client'
import React from 'react'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import DestinationSingle from '@/components/DestinationSingle'
import useDestination from '@/hooks/useDestination'
import { Telescope } from 'lucide-react'


const DestinationSingleComp = ({ id, name }) => {
    const { data, error, isLoading } = useDestination(id)
    let crumbLinks = null
    if (name === 'county') {
        crumbLinks = [ {name: data?.countyId.name, href: `/counties/${data?.countyId.$id}`} ]
    }else {
        crumbLinks = [ {name: data?.categoryId.name, href: `/categories/${data?.categoryId.$id}`} ]
    }
    const destinationName = data?.name || 'Destination Name'
  
  return (
    <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={destinationName}
            crumbLinks={crumbLinks}
            icon={<Telescope />}
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

export default DestinationSingleComp