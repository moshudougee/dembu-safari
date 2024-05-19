'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import { useGlobalContext } from '@/context/GlobalProvider'
import { Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminHome = () => {
  const { user, loggedIn, loading } = useGlobalContext()
  const router = useRouter()
  if (loading) {
    return <CustomLoading />
  }
  if (!loggedIn || user === null) {
    return router.push('/')
  }
  if (loggedIn && user.role !== 'ADMIN') {
    return router.push('/')
  } else {
    return (
      <div className='min-h-screen'>
        <ContentHeader 
          crumbPage='Admin Panel'
          icon={<Settings />}
          title='Admin Panel'
          subtitle='Welcome to the Admin Panel'
        />
        <div></div>
      </div>
    )
  }
 }

export default AdminHome