'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import ProfileCard from '@/components/ProfileCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import React from 'react'
import { FaUserTie } from 'react-icons/fa'

const UserProfile = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const firstName = user?.firstName || ''
    const lastName = user?.lastName || ''
    const crumbPage = `${firstName} ${lastName}`
  return (
    <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={crumbPage}
            icon={<FaUserTie size={20} />}
            title={crumbPage}
            subtitle='Profile details'
        />
        <div className='card-container'>
            {loading ? (
                <CustomLoading />
            ) : loggedIn && user ? (
                <ProfileCard 
                    user={user}
                />
            ) : (
                <span>Not logged in</span>
            )}
        </div>
        <hr className="hr"/>
            <AdsHorizontal />
        <hr className="hr"/>
    </div>
  )
}

export default UserProfile