import AccommodationsCountyComp from '@/components/AccommodationsCountyComp'
import { getCounty } from '@/lib/server/countyActions'
import React from 'react'

export const generateMetadata = async ({params}) => {
    const { id } = params
    const county = await getCounty(id)
    if(!county) {
      return
    }
    return {
      title: `${county.name} Accommodations`,
      description: `Accommodation services for tourists visiting ${county.name} county in Kenya`,
      openGraph: {
        title: `${county.name} Accommodations`,
        description: `Accommodation services for tourists visiting ${county.name} county in Kenya`,
        type: "article",
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/accommodations/county/${county.$id}`,
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

const AccommodationCountyPage = ({ params }) => {
    const { id } = params
  return (
    <div className='min-h-screen'>
        <AccommodationsCountyComp 
            id={id}
        />
    </div>
  )
}

export default AccommodationCountyPage