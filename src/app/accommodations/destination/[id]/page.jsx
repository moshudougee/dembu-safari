import AccommodationDestinationComp from '@/components/AccommodationDestinationComp'
import { getDestination } from '@/lib/server/destinationActions'
import React from 'react'

export const generateMetadata = async ({params}) => {
    const { id } = params
    const destination = await getDestination(id)
    if(!destination) {
      return
    }
    return {
      title: `${destination.name} Accommodations`,
      description: `Accommodations services for tourists visiting ${destination.name} in Kenya`,
      openGraph: {
        title: `${destination.name} Accommodations`,
        description: `Accommodations services for tourists visiting ${destination.name} in Kenya`,
        type: "article",
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/accommodations/destination/${destination.$id}`,
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

const DestinationAccommodationPage = ({ params }) => {
    const { id } = params
  return (
    <div className='min-h-screen'>
        <AccommodationDestinationComp 
            id={id}
        />
    </div>
  )
}

export default DestinationAccommodationPage