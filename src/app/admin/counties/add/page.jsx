'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import AddCounty from '@/components/admin/AddCounty'
import { useGlobalContext } from '@/context/GlobalProvider'
import { CopyPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminAddCounty = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}, {name: 'Counties', href: '/admin/counties'}
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
                    crumbPage='Add County'
                    crumbLinks={crumbLinks}
                    icon={<CopyPlus />}
                    title='Add County'
                    subtitle='Enter county details'
                />
                <div className='flex w-full my-4'>
                    <AddCounty />
                </div>
            </div>
        )
    }else {
        return router.push('/')
    }
}

export default AdminAddCounty