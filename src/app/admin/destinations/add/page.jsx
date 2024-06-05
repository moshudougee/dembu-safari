'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import AddDestination from '@/components/admin/AddDestination'
import { useGlobalContext } from '@/context/GlobalProvider'
import useCategories from '@/hooks/useCategories'
import useCounties from '@/hooks/useCounties'
import { CopyPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminAddDestination = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const { data: counties, error: countiesError, isloading: countiesLoading } = useCounties()
    const { data: categories, error: categoriesError, isloading: categoriesLoading } = useCategories()
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}, {name: 'Destinations', href: '/admin/destinations'}
    ]
    const popular = [
        {value: 'YES', name: 'Yes'}, {value: 'NO', name: 'No'}
    ]

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
                    crumbPage='Add Destination'
                    crumbLinks={crumbLinks}
                    icon={<CopyPlus />}
                    title='Add Destination'
                    subtitle='Enter destination details'
                />
                <div className='flex w-full my-4'>
                    {countiesLoading || categoriesLoading ? (
                        <CustomLoading />
                    ) : countiesError || categoriesError ? (
                        <div className='text-safari-2'>{countiesError || categoriesError}</div>
                    ) : (
                        <AddDestination 
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

export default AdminAddDestination