'use client'
import Image from "next/image";
import CardImage from '../images/image9.jpg'
import Link from "next/link";
import Hero from "@/components/Hero";
import { Gem, Telescope } from "lucide-react";
import DestinationCard from "@/components/DestinationCard";
import Pagination from "@/components/Pagination";
import AdsHorizontal from "@/components/AdsHorizontal";
import { useRouter } from "next/navigation";
import useCategories from "@/hooks/useCategories";
import CustomLoading from "@/components/CustomLoading";
import { Button } from "@/components/ui/button";



export default function Home() {
  const { data: slides, error, isLoading } = useCategories()
  const tempCards = [1, 2, 3, 4, 5, 6]
  const router = useRouter()
  return (
    <div className="max-h-screen">
      <div className="flex flex-col h-auto w-full max-lg:hidden">
        {isLoading ? (
          <CustomLoading />
        ) : error ? (
          <div className=" text-safari-2 text-center">{error}</div>
        ) : (
          <Hero autoSlide={true}>
          {slides.map((slide) => {
            const handleExplore = () => {
              router.push(`/categories/${slide.$id}`)
            }
            return (
              <div key={slide.$id} className="flex">
              <div className="hero-image">
                <Image src={slide.image} fill sizes="100" alt="Banner" className="rounded object-cover" priority />
              </div>
              <div className="hero-content">
                <div className="hero-content-title">
                  <span className="font-lobster font-light text-4xl gradiant-text">{slide.name}</span>
                </div>
                <div className="flex mt-8 pl-6">
                  <span className="flex font-pinyon text-3xl font-semibold text-success-1 indent-1">
                    {`.... ${slide.intro}`}
                  </span>
                </div>
                <div className="flex justify-center items-center mt-10 pl-6">
                  <Button onClick={handleExplore} className="hero-content-explore">
                    <Telescope />
                    <span className="font-semibold text-2xl">Explore more...</span>
                  </Button>
                </div>
              </div>
              </div>
          )
          })}
          </Hero>
        )}
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
