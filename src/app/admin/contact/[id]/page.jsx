'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import SingleMessage from '@/components/admin/SingleMessage'
import { useGlobalContext } from '@/context/GlobalProvider'
import useMessage from '@/hooks/useMessage'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaEnvelopeOpenText } from 'react-icons/fa'

const AdminSingleMessage = ({ params }) => {
    const { id } = params
    const { user, loggedIn, loading } = useGlobalContext()
    const { data, error, isLoading } = useMessage(id)
    const router = useRouter()
    const crumbPage = `Message ${id}`
    const crumbLinks = [{name: 'Dashboard', href: '/admin'}, {name: 'Contact', href: '/admin/contact'}]

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
                icon={<FaEnvelopeOpenText size={20} /> }
                title={crumbPage}
                subtitle='Message details'
            />
            <div className='card-container'>
                {isLoading? (
                    <CustomLoading />
                ) : error? (
                    <CustomError />
                ) : (
                    <SingleMessage
                        data={data}
                        user={user}
                    />
                )}
            </div>
        </div>
    )
    } else {
        return router.push('/')
    }
}

export default AdminSingleMessage