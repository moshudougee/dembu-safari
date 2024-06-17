'use client'
import React from 'react'
import ContentHeader from './ContentHeader'
import { BsLuggageFill } from 'react-icons/bs'
import Tours from './Tours'

const ToursComponent = () => {
    const crumbPage = 'Tours & Safari'
  return (
    <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={crumbPage}
            icon={<BsLuggageFill size={24} />}
            title={crumbPage}
            subtitle='Services'
        />
        <div className='card-container'>
            <Tours />
        </div>
    </div>
  )
}

export default ToursComponent