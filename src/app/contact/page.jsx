'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContactForm from '@/components/ContactForm'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import { useGlobalContext } from '@/context/GlobalProvider'
import { countUserMessages } from '@/lib/server/messageActions'
import { FaEnvelopeOpenText } from "react-icons/fa"
import { ContactIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Contact = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const [history, setHistory] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const crumbPage = 'Contact'
    useEffect(() => {
      const fetchTotal = async () => {
        setIsLoading(true)
        try {
          const res = await countUserMessages(user?.$id)
          if (res && res > 0) {
            setHistory(true)
          } else {
            setHistory(false)
          }
        } catch (error) {
          console.log(error)
        } finally {
            setIsLoading(false)
        }
      }
      if(user && loggedIn && !loading) {
        fetchTotal()
      }
    }, [])
    if (loading || isLoading) {
        return <CustomLoading />
    }
  return (
    <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={crumbPage}
            icon={<ContactIcon />}
            title={crumbPage}
            subtitle='Dembu Safari Help Center'
        />
        <div className='flex flex-col w-full my-4'>
              <div className='flex justify-center items-center w-[200px] mx-5'>
                <Link 
                    href={history ? '#' : `/contact/messages?userId=${user?.$id}`} 
                    className='flex gap-2 shadow rounded-md mx-5 p-2 w-32 text-safari-2 hover:text-success-1'
                >
                    <FaEnvelopeOpenText size={20} />
                    <span className='font-normal'>Messages</span>
                </Link>
              </div>
            <ContactForm 
                user={user}
            />
        </div>
        <hr className="hr"/>
            <AdsHorizontal />
        <hr className="hr"/>
    </div>
  )
}

export default Contact