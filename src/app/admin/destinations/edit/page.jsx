'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import EditDestination from '@/components/admin/EditDestination'
import { useGlobalContext } from '@/context/GlobalProvider'
import useCategories from '@/hooks/useCategories'
import useCounties from '@/hooks/useCounties'
import useDestination from '@/hooks/useDestination'
import { FilePenLine } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const AdminEditDestination = () => {
    const  params  = useSearchParams()
    const id = params.get('id')
    const { user, loggedIn, loading } = useGlobalContext()
    const { data, error, isLoading } = useDestination(id)
    const { data: counties, error: countiesError, isloading: countiesLoading } = useCounties()
    const { data: categories, error: categoriesError, isloading: categoriesLoading } = useCategories()
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}, {name: 'Destinations', href: '/admin/destinations'}
    ]
    const popular = [
        {value: 'YES', name: 'Yes'}, {value: 'NO', name: 'No'}
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
                    icon={<FilePenLine />}
                    title={destinationName}
                    subtitle='Edit destination details'
                />
                <div className='flex w-full my-4'>
                    {isLoading || countiesLoading || categoriesLoading ? (
                        <CustomLoading />
                    ) : error || countiesError || categoriesError? (
                        <div className='text-safari-2'>{error || countiesError || categoriesError}</div>
                    ) : (
                        <EditDestination
                            data={data}
                            counties={counties}
                            categories={categories}
                            popular={popular}
                        />
                    )}
                </div>
            </div>
        )
    } else {
        return router.push('/')
    }
}

export default AdminEditDestination