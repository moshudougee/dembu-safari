'use client'
import ContentHeader from '@/components/ContentHeader'
import CountyCard from '@/components/CountyCard'
import CustomLoading from '@/components/CustomLoading'
import { useGlobalContext } from '@/context/GlobalProvider'
import useCounty from '@/hooks/useCounty'
import { Telescope } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SingleCounty = ({ params }) => {
    const { id } = params
    const { user, loggedIn, loading } = useGlobalContext()
    const { data, error, isLoading } = useCounty(id)
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}, {name: 'Counties', href: '/admin/counties'}
    ]
    let code = ''
    if (data?.code <= 9) {
        code = '00'+data?.code
    } else {
        code = '0'+data?.code
    }
    const countyName = `${data?.name} ${code}` || 'County Name'
    const imageurl = data?.flag || '' 

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
                    crumbPage={countyName}
                    crumbLinks={crumbLinks}
                    imageurl={imageurl}
                    icon={<Telescope />}
                    title={countyName}
                    subtitle='View county details'
                />
                <div className='card-container'>
                    {isLoading ? (
                        <CustomLoading />
                    ) : error ? (
                        <div className='text-safari-2'>{error}</div>
                    ) : (
                        <CountyCard 
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

export default SingleCounty