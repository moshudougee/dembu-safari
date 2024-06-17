'use client'
import React from 'react'
import ContentHeader from './ContentHeader'
import { FaHotel } from "react-icons/fa6"
import Accommodations from './Accommodations'

const AccommodationsComponent = () => {
    const crumbPage = 'Accommodations'
  return (
    <div className='min-h-screen'>
        <ContentHeader 
         crumbPage={crumbPage}
         icon={<FaHotel size={24} />}
         title={crumbPage}
         subtitle='Accommodation services'
        />
        <div className='card-container'>
            <Accommodations />
        </div>
    </div>
  )
}

export default AccommodationsComponent