'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import DestinationSingle from '@/components/DestinationSingle'
import { useGlobalContext } from '@/context/GlobalProvider'
import useDestination from '@/hooks/useDestination'
import { Telescope } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SingleDestination = ({ params }) => {
    const { id } = params
    const { user, loggedIn, loading } = useGlobalContext()
    const { data, error, isLoading } = useDestination(id)
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}, {name: 'Destinations', href: '/admin/destinations'}
    ]
    const destinationName = data?.name || 'Destination Name'

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
                    crumbPage={destinationName}
                    crumbLinks={crumbLinks}
                    icon={<Telescope />}
                    title={destinationName}
                    subtitle='Destination details'
                />
                <div className='card-container'>
                    {isLoading? (
                        <CustomLoading />
                    ) : error? (
                        <CustomError />
                    ) : (
                        <DestinationSingle
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

export default SingleDestination