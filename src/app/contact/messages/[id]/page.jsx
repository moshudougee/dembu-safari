'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContactMessage from '@/components/ContactMessage'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import { useGlobalContext } from '@/context/GlobalProvider'
import useMessage from '@/hooks/useMessage'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaEnvelopeOpenText } from 'react-icons/fa'

const SingleMessage = ({ params }) => {
    const { user, loggedIn, loading } = useGlobalContext()
    const router = useRouter()
    const { id } = params
    const { data, error, isLoading } = useMessage(id)
    const userId = data?.userId
    const crumbPage = `Message ${id}`
    const crumbLinks = [{name: 'Contact', href: '/contact'}, { name: 'Messages', href: `/contact/messages?userId=${userId}` }]
    if (loading) {
        return <CustomLoading />
    }
    if (!loggedIn) {
        return router.push('/login')
    }
  return (
    <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={crumbPage}
            crumbLinks={crumbLinks}
            icon={<FaEnvelopeOpenText size={20} />}
            title={crumbPage}
            subtitle='Message details'
        />
        <div className='card-container'>
            {isLoading ? (
                <CustomLoading />
            ) : error ? (
                <CustomError />
            ) : (
                <ContactMessage 
                    data={data}
                    user={user}
                />
            )}
        </div>
        <hr className="hr"/>
            <AdsHorizontal />
        <hr className="hr"/>
    </div>
  )
}

export default SingleMessage