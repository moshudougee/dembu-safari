import AboutComponent from '@/components/AboutComponent'
import React from 'react'

export const metadata = {
  title: 'About',
  description: 'About Dembu Safari',
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
}

const About = () => {
   
  return (
    <div className='min-h-screen'>
       <AboutComponent />
    </div>
  )
}

export default About