'use client'
import AboutUs from '@/components/AboutUs'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getAbout } from '@/lib/server/aboutActions'
import { ScrollText, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AdminAbout = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}
    ]
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
    

    if (loading) {
        return <CustomLoading />
    }
    if (!loggedIn || user === null) {
        return router.push('/')
    }
    if (loggedIn && user.role === 'ADMIN') {
        return (
            <div className='min-h-screen'>
                <ContentHeader 
                    crumbPage={crumbPage}
                    crumbLinks={crumbLinks}
                    icon={<ScrollText />}
                    title={crumbPage}
                    subtitle='About Dembu Safari'
                />
                <div className='flex flex-col justify-center items-center w-full mx-10 my-10 max-w-[1150px]'>
                    {isLoading ? (
                        <CustomLoading />
                    ) : error ? (
                        <CustomError />
                    ) : (
                        <AboutUs 
                            data={data}
                            role={user?.role}
                        />
                    )}
                </div>
            </div>
        )
    } else {
        return router.push('/')
    } 
}

export default AdminAbout