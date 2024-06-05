import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaUserCog } from 'react-icons/fa'

const ProfileCard = ({ user }) => {
    const firstName = user?.firstName
    const lastName = user?.lastName
    const fullName = `${firstName} ${lastName}`
    //extract fieldId
    const extractFileId = (url) => {
        const match = url.match(/\/files\/([^/]+)/);
        return match ? match[1] : null;
    }
    let fileId
    if (user?.avatar === '/images/profile.jpeg') {
        fileId = 'default'
    }else {
        fileId = extractFileId(user?.avatar)
    }
  return (
    <div className='profile'>
        <div className='profile-image'>
            <Image src={user?.avatar} alt='Profile' fill sizes='100' className='rounded-full w-[190px] h-[190px] object-cover' priority />
        </div>
        <div className='flex w-full mt-5 border-b border-success-1/70'>
            <span className='profile-item-title'>Name</span>
            <span className='profile-item-details'>{fullName}</span>
        </div>
        <div className='flex w-full mb-5'>
            <span className='profile-item-title'>Email</span>
            <span className='profile-item-details'>{user?.email}</span>
        </div>
        <Link href={`/profile/edit?fileId=${fileId}`} className='flex gap-2 p-2 w-32 rounded shadow hover:text-success-1'>
            <FaUserCog size={20} />
            <span className='font-normal'>Edit Profile</span>
        </Link>
    </div>
  )
}

export default ProfileCard