import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
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
        <Card className="w-full m-0 hover:text-success-1 cursor-pointer">
            <CardHeader>
               <CardTitle>{title}</CardTitle>
              <CardDescription>{formatedDesc} </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[320px] w-[350px] rounded border border-safari-1">
                <Image src={image} alt="Popular" className="rounded" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 justify-center items-center">
                <MapPin />
                <span className=" font-light italic text-sm">{location}</span>
              </div>
            </CardFooter>
        </Card>
  )
}

export default DestinationCard