import DestinationsComponent from '@/components/DestinationsComponent'
import { getCategory } from '@/lib/server/categoryActions';
import { getCounty } from '@/lib/server/countyActions';
import React from 'react'

export const generateMetadata = async ({ searchParams }) => {
  const name = searchParams.name
  let countyId, categoryId, pathDetails = ''
  let county, category = null
  if (searchParams.countyId) {
    countyId = searchParams.countyId
    county = await getCounty(countyId)
    pathDetails = `name=${name}&countyId=${countyId}`
  }
  if (searchParams.categoryId) {
    categoryId = searchParams.categoryId
    category = await getCategory(categoryId)
    pathDetails = `name=${name}&categoryId=${categoryId}`
  }
  let image = ''
  if(county !== null) {
    image = county?.image
  } else if(category !== null) {
    image = category?.image
  }
    return {
      title: `${name} Tourist Destinations`,
      description: `${name} tourist attractions and destinations`,
      openGraph: {
        title: `${name} Tourist Destinations`,
        description: `${name} tourist attractions and destinations`,
        type: "article",
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/destinations?${pathDetails}`,
        siteName: "Dembu Safari",
        images: [
          {
            url: image,
            with: 595,
            height: 334,
          }
        ],
    },
    }
}

const Destinations = ({ searchParams }) => {
  //console.log('Params are '+searchParams.name)
  const name = searchParams.name
  let countyId, categoryId = ''
  if (searchParams.countyId) {
    countyId = searchParams.countyId
   }
  if (searchParams.categoryId) {
    categoryId = searchParams.categoryId
  }
  

  return (
    <div className='min-h-screen'>
      <DestinationsComponent 
        name={name}
        countyId={countyId}
        categoryId={categoryId}
      />
    </div>
  )
}

export default Destinations