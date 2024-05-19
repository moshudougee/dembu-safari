'use client'
import Image from "next/image";
import CardImage from '../images/image9.jpg'
import Link from "next/link";
import Hero from "@/components/Hero";
import { slides } from '@/constants/slides';
import { Gem } from "lucide-react";

import DestinationCard from "@/components/DestinationCard";
import Pagination from "@/components/Pagination";
import AdsHorizontal from "@/components/AdsHorizontal";
import { useRouter } from "next/navigation";



export default function Home() {
  const tempCards = [1, 2, 3, 4, 5, 6]
  const router = useRouter()
  return (
    <div>
      
      {/***
       * 
       * <div className="flex flex-col min-h-screen w-full xl:hidden">
        <div className="relative flex justify-center items-center border border-safari-2  rounded w-[1150px] m-1 mt-1 h-[646px]">
          <Image src={WildBanner} alt="Banner" className="w-[1150px] h-[646px] rounded" />
        </div>
        <div className="flex flex-col absolute rounded w-[1000px] h-[400px] bg-safari-3 ml-[80px] mt-20">
          <div className="flex justify-center items-center mt-5 text-success-1">
            <span className="font-lobster text-6xl gradiant-text">Wildlife Safari Destinations</span>
          </div>
          <div className="flex mt-10 pl-6">
            <span className="flex font-pinyon text-5xl font-semibold">
              Embark on an unforgettable journey to explore Kenya's Premier Wildlife Safari Destinations.
            </span>
          </div>
          <div className="flex justify-center items-center mt-10 pl-6">
            <Link href='/' className="bg-safari-2 text-banner hover:bg-banner hover:text-safari-2 rounded p-1">
              <span className="font-semibold text-2xl">Explore more...</span>
            </Link>
          </div>
        </div>
      </div>
      */}
      
      <div className="flex flex-col h-auto w-full">
        <Hero autoSlide={true}>
          {slides.map((slide) => (
            <div key={slide.id} className="flex">
            <div className="relative flex justify-center items-center border-safari-2  rounded w-[1150px] h-[646px] m-1 mt-1">
              <Image src={slide.banner} alt="Banner" className="rounded" priority />
            </div>
            <div className="flex flex-col absolute rounded w-[1000px] h-[400px] bg-safari-6 ml-[80px] mt-20">
              <div className="flex justify-center items-center mt-5 text-safari-2">
                <span className="font-lobster font-light text-4xl gradiant-text">{slide.title}</span>
              </div>
              <div className="flex mt-10 pl-6">
                <span className="flex font-pinyon text-3xl font-semibold text-success-1">
                  {`.... ${slide.subtitle}`}
                </span>
              </div>
              <div className="flex justify-center items-center mt-10 pl-6">
                <Link href={slide.href} className="bg-safari-2 text-banner hover:bg-banner hover:text-safari-2 rounded p-1">
                  <span className="font-semibold text-2xl">Explore more...</span>
                </Link>
              </div>
            </div>
            </div>
          ))}
        </Hero>
      </div>
      <div className="flex flex-col h-auto w-full">
        <div className="flex gap-2 w-full m-5 text-safari-1">
          <Gem />
          <span className="font-normal text-[18px]">Popular Destinations</span>
        </div>
      </div>
      <hr className="hr"/>
      <div className="grid grid-cols-3 h-auto w-full ps-2 my-4">
        {tempCards.map((card) => {
          const viewDestination = () => {
              return router.push(`/popular/${card}`)
          }
          return (
            <div key={card} className="flex w-[380px] h-[500px] mb-2" onClick={viewDestination}>
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
