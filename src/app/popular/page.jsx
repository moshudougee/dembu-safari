'use client'
import { Gem } from 'lucide-react'
import React from 'react'
import DestinationCard from '@/components/DestinationCard'
import AdsHorizontal from '@/components/AdsHorizontal'
import CardImage from '../../images/image9.jpg'
import Pagination from '@/components/Pagination'
import { useRouter } from 'next/navigation'
import BreadCrumb from '@/components/Breadlinks'

  

const Popular = () => {
    const crumbPage = "Popular"
    const tempCards = [1, 2, 3, 4, 5, 6]
    const router = useRouter()
    
  return (
    <div className=' min-h-screen'>
      <div className='flex w-full m-2 ps-4'>
        <BreadCrumb 
          crumbPage={crumbPage}
        />

      </div>
      <hr className="hr"/>
      <div className="flex flex-col h-auto w-full">
        <div className="flex gap-2 w-full m-5 text-safari-1">
          <Gem />
          <span className="font-normal text-[18px]">Popular Destinations</span>
        </div>
      </div>
      <hr className="hr"/>
      <div className='grid grid-cols-3 h-auto w-full ps-2 my-4'>
        {tempCards.map((card) => {
            const viewDestination = () => {
                return router.push(`/popular/${card}`)
            }
            return (
            <div key={card} className='flex w-[380px] h-[500px] mb-2' onClick={viewDestination}>
                <DestinationCard 
                    title='Maasai Mara National Reserve'
                    description="Situated to the west of Nairobi, on Tanzania's northern border.Situated to the west of Nairobi, on Tanzania's northern border."
                    image={CardImage}
                    location="Narok County"
                />
            </div>
            )
        })}
      </div>
      <hr className="hr"/>
        <AdsHorizontal />
      <hr className="hr"/>
        <Pagination />
      <hr className="hr"/>
    </div>
  )
}

export default Popular