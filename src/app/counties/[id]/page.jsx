import CountyComponent from '@/components/CountyComponent'
import { getCounty } from '@/lib/server/countyActions'
import React from 'react'

export const generateMetadata = async ({ params }) => {
    const { id } = params
    const county = await getCounty(id)
    if(!county) {
        return
    }
    return {
        title: county.name,
        description: `The county capital is ${county.capital}`,
        openGraph: {
            title: county.name,
            description: `The county capital is ${county.capital}`,
            type: "article",
            locale: "en_US",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/counties/${county.$id}`,
            siteName: "Dembu Safari",
            images: [
              {
                url: county.image,
                with: 595,
                height: 334,
              }
              
            ],
        },
    }
}

const DestinationCounty = ({ params }) => {
    const { id } = params
    
  return (
    <div className='min-h-screen'>
        <CountyComponent 
            id={id}
        />
    </div>
  )
}

export default DestinationCounty