import AccommodationsComponent from '@/components/AccommodationsComponent'
import React from 'react'

export const metadata = {
    title: 'Accommodations',
    description: "Accommodation services for tourists in Kenya",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/accommodations`
}

const AccommodationsPage = () => {
  return (
    <div className='min-h-screen'>
        <AccommodationsComponent />
    </div>
  )
}

export default AccommodationsPage