'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import EditCategory from '@/components/admin/EditCategory'
import { useGlobalContext } from '@/context/GlobalProvider'
import useCategory from '@/hooks/useCategory'
import { FilePenLine } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const AdminEditCategory = () => {
    const  params  = useSearchParams()
    const id = params.get('id')
    const fileId = params.get('fileId')
    const { user, loggedIn, loading } = useGlobalContext()
    const { data, error, isLoading } = useCategory(id)
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}, {name: 'Categories', href: '/admin/categories'}
    ]
    const categoryName = data?.name || 'Category Name'

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
                    crumbPage={categoryName}
                    crumbLinks={crumbLinks}
                    icon={<FilePenLine />}
                    title={categoryName}
                    subtitle='Edit category details'
                />
                <div className='flex w-full my-4'>
                    {isLoading ? (
                        <CustomLoading />
                    ) : error ? (
                        <div className='text-safari-2'>{error}</div>
                    ) : (
                        <EditCategory data={data} fileId={fileId} />
                    )}
                </div>
            </div>
        )
    } else {
        return router.push('/')
    }
}

export default AdminEditCategory