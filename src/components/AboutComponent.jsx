'use client'
import AboutUs from '@/components/AboutUs'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import { getAbout } from '@/lib/server/aboutActions'
import { PawPrint } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const AboutComponent = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const crumbPage = 'About Us'
    useEffect(() => {
        const fetchAbout = async () => {
          setIsLoading(true)
          try {
            const res = await getAbout()
            if (res) {
              setData(res)
            }
          } catch (error) {
            console.log(error)
            setError(true)
          } finally {
            setIsLoading(false)
          }
        }
        fetchAbout()
    }, [])
  return (
    <div className='min-h-screen'>
         <ContentHeader 
            crumbPage={crumbPage}
            icon={<PawPrint />}
            title={crumbPage}
            subtitle='About Dembu Safari'
        />
        <div className='flex flex-col justify-center items-center w-full mx-10 my-10 max-w-[1150px]'>
            {isLoading ? (
                <CustomLoading />
            ) : error? (
                <CustomError />
            ) : (
                <AboutUs 
                    data={data}
                />
            )}
        </div>
        <hr className="hr"/>
        <AdsHorizontal />
        <hr className="hr"/>
    </div>
  )
}

export default AboutComponent