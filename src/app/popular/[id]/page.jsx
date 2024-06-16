import React from 'react'
import PopularDestComponent from '@/components/PopularDestComponent';
import { getDestination } from '@/lib/server/destinationActions';

export const generateMetadata = async ({ params }) => {
  const { id } = params
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
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/popular/${destination.$id}`,
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

const PopularDestination = ({ params }) => {
    const {id }= params
    
    return (
      <div className=' min-h-screen'>
        <PopularDestComponent 
          id={id}
        />
      </div>
    )
}

export default PopularDestination