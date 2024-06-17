import ToursCountyComp from '@/components/ToursCountyComp'
import { getCounty } from '@/lib/server/countyActions'
import React from 'react'

export const generateMetadata = async ({params}) => {
    const { id } = params
    const county = await getCounty(id)
    if(!county) {
      return
    }
    return {
      title: `${county.name} Tours & Safari`,
      description: `Tours & Safari services for tourists visiting ${county.name} county in Kenya`,
      openGraph: {
        title: `${county.name} Tours & Safari`,
        description: `Tours & Safari services for tourists visiting ${county.name} county in Kenya`,
        type: "article",
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/tours/county/${county.$id}`,
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

const CountyToursPage = ({ params }) => {
    const { id } = params
  return (
    <div className='min-h-screen'>
        <ToursCountyComp 
            id={id}
        />
    </div>
  )
}

export default CountyToursPage