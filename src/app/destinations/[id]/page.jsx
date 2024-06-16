import DestinationSingleComp from '@/components/DestinationSingleComp'
import { getDestination } from '@/lib/server/destinationActions'
import React from 'react'

export const generateMetadata = async ({ params, searchParams }) => {
  const { id } = params
  const name = searchParams.name
  const destination = await getDestination(id)
  if(!destination) {
    return
  }
  return {
        title: destination.name,
        description: destination.intro,
        openGraph: {
            title: destination.name,
            description: destination.intro,
            type: "article",
            locale: "en_US",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/destinations/${id}?name=${name}`,
            siteName: "Dembu Safari",
            images: [
              {
                url: destination.images[0],
                with: 600,
                height: 600,
              }
              
            ],
        },
  }
}

const SingleDestination = ({ params, searchParams }) => {
    const { id } = params
    const name = searchParams.name
    
  return (
    <div className='min-h-screen'>
        <DestinationSingleComp 
          id={id}
          name={name}
        />
    </div>
  )
}

export default SingleDestination