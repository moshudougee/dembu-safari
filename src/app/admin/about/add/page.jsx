'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import AddAbout from '@/components/admin/AddAbout'
import { useGlobalContext } from '@/context/GlobalProvider'
import { CopyPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminAddAbout = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const router = useRouter()
    const crumbPage = 'Add About Us'
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}, {name: 'About Us', href: '/admin/about'}
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
                    crumbPage={crumbPage}
                    crumbLinks={crumbLinks}
                    icon={<CopyPlus />}
                    title={crumbPage}
                    subtitle='Enter about us details'
                />
                <div className='flex w-full my-4'>
                    <AddAbout />
                </div>
            </div>
        )
    } else {
        return router.push('/')
    } 
}

export default AdminAddAbout