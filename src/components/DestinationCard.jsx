import React from 'react'
import { MapPin } from 'lucide-react'
import Image from 'next/image'

const DestinationCard = ({ title, description, image, location }) => {
    let formatedDesc = ''
    if(description.length > 90) {
        formatedDesc = description.substring(0, 90) + '...'
    } else {
        formatedDesc = description
    }
  return (
        <div className="flex flex-col rounded-lg border shadow-sm w-full m-0 hover:text-success-1 cursor-pointer">
            <div className='flex flex-col space-y-1.5 p-4'>
               <span className='text-xl xl:text-2xl  font-semibold leading-none tracking-tight'>{title}</span>
              <span className='text-sm text-muted-foreground'>{formatedDesc} </span>
            </div>
            <div className='flex justify-center p-1 xl:p-6 pt-0'>
              <div className="destination-card">
                <Image src={image} fill sizes='100' alt="Popular" className="rounded object-cover" />
              </div>
            </div>
            <div className='flex items-center p-4 pt-0'>
              <div className="flex gap-2 justify-center items-center">
                <MapPin />
                <span className="font-light italic text-sm">{location}</span>
              </div>
            </div>
        </div>
  )
}

export default DestinationCard