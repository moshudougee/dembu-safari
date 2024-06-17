'use client'
import useCounty from '@/hooks/useCounty'
import React from 'react'
import CustomLoading from './CustomLoading'
import CustomError from './CustomError'
import ContentHeader from './ContentHeader'
import { BsLuggageFill } from 'react-icons/bs'
import CountyTours from './CountyTours'

const ToursCountyComp = ({ id }) => {
    const { data, error, isLoading } = useCounty(id)
    const crumbPage = `${data?.name} county Tours & Safari`
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
            <CountyTours 
                data={data}
            />
        </div>
    </div>
  )
}

export default ToursCountyComp