'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import AddCategory from '@/components/admin/AddCategory'
import { useGlobalContext } from '@/context/GlobalProvider'
import { CopyPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminAddCategory = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}, {name: 'Categories', href: '/admin/categories'}
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
                    crumbPage='Add Category'
                    crumbLinks={crumbLinks}
                    icon={<CopyPlus />}
                    title='Add Destination Category'
                    subtitle='Enter category details'
                />
                <div className='flex w-full my-4'>
                    <AddCategory />
                </div>
            </div>
            
        )
    } else {
        return router.push('/')
    }
  
}

export default AdminAddCategory