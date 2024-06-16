import React from 'react'
import PopularComponent from '@/components/PopularComponent'

export const metadata = {
  title: 'Popular Destinations',
  description: "Kenya's most popular tourist attractions, wonders and destinations",
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/popular`
}

const Popular = () => {
    
  return (
    <div className='min-h-screen'>
      <PopularComponent />
    </div>
  )
}

export default Popular