'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import { useGlobalContext } from '@/context/GlobalProvider'
import { useRouter } from 'next/navigation'
import { Telescope } from 'lucide-react'
import React from 'react'
import useCategory from '@/hooks/useCategory'
import CategoryCard from '@/components/CategoryCard'

const SingleCategory = ({ params }) => {
    const { id } = params
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
                    icon={<Telescope />}
                    title={categoryName}
                    subtitle='View category details'
                />
                <div className='card-container'>
                    {isLoading ? (
                        <CustomLoading />
                    ) : error ? (
                        <div className='text-safari-2'>{error}</div>
                    ) : (
                        <CategoryCard 
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

export default SingleCategory