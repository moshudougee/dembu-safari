'use client'
import React from 'react'
import { WalletCards } from 'lucide-react'
import AdminRightbar from './sidebars/AdminRightbar'
import { useGlobalContext } from '@/context/GlobalProvider'
import CustomLoading from './CustomLoading'
import AdSquare from './AdSquare'

const Adbar = () => {
  const { loggedIn, user, loading } = useGlobalContext()

  if (loading) {
    return <CustomLoading />
  }
  if (loggedIn && user.role === 'ADMIN') {
    return (
    <AdminRightbar />
    )
  }
  else {
    return (
      <div className='min-h-screen'>
        <div className='sidebar-header rounded-t-md'>
          <div className='sidebar-header-menu'>
              <WalletCards />
              <span className='sidebar-menu-text'>Ads</span>
          </div>
        </div>
        <div className='flex flex-col mt-1'>
          <div className='ad-square'>
            <AdSquare />
          </div>
        </div>
      </div>
    )
  }
}

export default Adbar