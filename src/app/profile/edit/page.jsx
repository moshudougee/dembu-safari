'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import ProfileEdit from '@/components/ProfileEdit'
import { useGlobalContext } from '@/context/GlobalProvider'
import { useSearchParams } from 'next/navigation'
 import React from 'react'
import { FaUserEdit } from 'react-icons/fa'
 
 const EditProfile = () => {
    const params = useSearchParams()
    const fileId = params.get('fileId')
    const { user, loggedIn, loading } = useGlobalContext()
    const firstName = user?.firstName || ''
    const lastName = user?.lastName || ''
    const crumbPage = `${firstName} ${lastName}`
    const crumbLinks = [ {name: 'Profile', href: '/profile'} ]
    
   return (
     <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={crumbPage}
            crumbLinks={crumbLinks}
            icon={<FaUserEdit />}
            title={crumbPage}
            subtitle='Edit your profile'
        />
        <div className='flex w-full my-4'>
            {loading ? (
                <CustomLoading />
            ) : loggedIn && user ? (
                <ProfileEdit 
                    user={user}
                    fileId={fileId}
                />
            ) : (
                <span>Not Logged in</span>
            )}
        </div>
        <hr className="hr"/>
            <AdsHorizontal />
        <hr className="hr"/>
     </div>
   )
 }
 
 export default EditProfile