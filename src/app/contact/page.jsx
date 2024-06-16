import React from 'react'
import ContactComponent from '@/components/ContactComponent'

export const metadata = {
  title: 'Contact',
  description: 'Contact Dembu Safari Help Center',
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
}

const Contact = () => {
   
  return (
    <div className='min-h-screen'>
        <ContactComponent />
    </div>
  )
}

export default Contact