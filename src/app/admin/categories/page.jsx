'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import CategoriesTable from '@/components/admin/CategoriesTable'
import { useGlobalContext } from '@/context/GlobalProvider'
import useCategories from '@/hooks/useCategories'
import { ArrowBigLeftDash, ArrowBigRightDash, Layers3 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Categories = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const { data, error, isLoading } = useCategories()
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}
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
                crumbPage='Categories'
                crumbLinks={crumbLinks}
                icon={<Layers3 />}
                title='Destination Categories'
                subtitle='View Categories List'
            />
            <div className='flex flex-col justify-center items-center w-full max-w-[1000px] px-6 mx-10 my-10'>
                {isLoading ? (
                    <CustomLoading />
                ) : error ? (
                    <div className='text-safari-2'>{error}</div>
                ) : (
                    <CategoriesTable 
                        data={data}
                    />
                )}
            </div>
            
        </div>
    )
    } else {
        return router.push('/')
    }
}

export default Categories