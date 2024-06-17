import ToursComponent from '@/components/ToursComponent'
import React from 'react'

export const metadata = {
    title: 'Tours & Safari',
    description: "Tours & Safari services for tourists in Kenya",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tours`
}

const ToursPage = () => {
  return (
    <div className='min-h-screen'>
        <ToursComponent />
    </div>
  )
}

export default ToursPage