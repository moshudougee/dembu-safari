'use client'
import Image from "next/image";
import Hero from "@/components/Hero";
import { ArrowBigLeftDash, ArrowBigRightDash, Telescope } from "lucide-react";
import DestinationCard from "@/components/DestinationCard";
import AdsHorizontal from "@/components/AdsHorizontal";
import { useRouter } from "next/navigation";
import useCategories from "@/hooks/useCategories";
import CustomLoading from "@/components/CustomLoading";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { defaultSquareAvatar } from "@/lib/utils";
import { countPopularDestinations, getPopularDestinations } from "@/lib/server/destinationActions";
import CustomError from "@/components/CustomError";
import { GiElephant } from "react-icons/gi";



export default function Home() {
  const { data: slides, error: categoryError, isLoading: categoriesLoading } = useCategories()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(null)
  const [totalLoading, setTotalLoading] = useState(false)
  const defaultUrl = defaultSquareAvatar
  const router = useRouter()
  useEffect(() => {
    const fetchTotal = async () => {
        setTotalLoading(true)
        try {
            const res = await countPopularDestinations()
            if(res) {
                setTotal(res)
            }
        } catch (error) {
            console.log(error)
            setError('Error occured while fetching Total.')
        } finally {
            setTotalLoading(false)
        }
    }
    fetchTotal()
  }, [])
  const limit = 6
  let totalPages = 0
  if(total && total > limit) {
    totalPages = Math.ceil(total / limit)
  }
  useEffect(() => {
    const offset = page * limit
    const fetchDestinations = async () => {
        setIsLoading(true)
        try {
            const res = await getPopularDestinations(offset)
            if(res) {
                setData(res)
            }
        } catch (error) {
            console.log(error)
            setError('Error occured while fetching destinations')
        } finally {
            setIsLoading(false)
        }
    }
    fetchDestinations()
  }, [page])
  return (
    <div className="min-h-screen">
      <div className="flex flex-col h-auto w-full max-lg:hidden">
        {categoriesLoading ? (
          <CustomLoading />
        ) : categoryError ? (
          <CustomError />
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
          <GiElephant size={24} />
          <span className="font-normal text-[18px]">Popular Destinations</span>
        </div>
      </div>
      <hr className="hr"/>
      <div className='grid grid-cols-3 h-auto w-full ps-2 my-4'>
        {isLoading || totalLoading ? (
          <CustomLoading />
        ) : error ? (
          <CustomError />
        ) : (
          data?.map((destination) => {
            const viewDestination = () => {
                return router.push(`/popular/${destination.$id}`)
            }
            let image = ''
            if(destination.images.length > 0) {
              image = destination.images[0]
            } else {
              image = defaultUrl
            }
            return (
            <div key={destination.$id} className='flex w-[380px] h-[500px] mb-2' onClick={viewDestination}>
                <DestinationCard 
                    title={destination.name}
                    description={destination.intro}
                    image={image}
                    location={destination.countyId.name}
                />
            </div>
            )
          })
        )}
      </div>
      <hr className="hr"/>
      <div className="ad-horizontal">
        <AdsHorizontal />
      </div>
      <hr className="hr"/>
      {total > limit && 
        <div className='pagination'>
            <div className='pagination-item'>
                <Button 
                    className='pagination-button'
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                >
                    <ArrowBigLeftDash />
                    <span className='font-normal'>Previous</span>
                </Button>
                <div className='flex text-safari-2'>
                    <span className='font-normal'>{page + 1} of {totalPages}</span>
                </div>
                <Button 
                    className='pagination-button'
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={page >= totalPages - 1}
                >
                    <span className='font-normal'>Next</span>
                    <ArrowBigRightDash />
                </Button>
            </div>
        </div>
      }
      <hr className="hr"/>
      <div className="ad-horizontal">
        <AdsHorizontal slot="9538296590" />
      </div>
      <hr className="hr"/>
    </div>
  )
}
