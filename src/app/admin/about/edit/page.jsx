'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import EditAbout from '@/components/admin/EditAbout'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAbout from '@/hooks/useAbout'
import { FilePenLine } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const AdminEditAbout = () => {
    const params = useSearchParams()
    const id  = params.get('id')
    const { user, loggedIn, loading } = useGlobalContext()
    const { data, error, isLoading } = useAbout(id)
    const router = useRouter()
    const crumbPage = 'Edit About Us'
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
                    icon={<FilePenLine />}
                    title={crumbPage}
                    subtitle='Edit about us details'
                />
                <div className='flex w-full my-4'>
                    {isLoading ? (
                        <CustomLoading />
                    ) : error ? (
                        <CustomError />
                    ) : (
                        <EditAbout 
                            data={data}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default AdminEditAbout