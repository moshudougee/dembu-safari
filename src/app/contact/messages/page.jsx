'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContactMessages from '@/components/ContactMessages'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import { Button } from '@/components/ui/button'
import { useGlobalContext } from '@/context/GlobalProvider'
import { countUserMessages, getUserMessages } from '@/lib/server/messageActions'
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEnvelopeOpenText } from 'react-icons/fa'

function UserMessages() {
    const { loggedIn, loading } = useGlobalContext()
    const params = useSearchParams()
    const userId = params.get('userId')
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(null)
    const [totalLoading, setTotalLoading] = useState(false)
    const router = useRouter()
    const crumbPage = 'Messages'
    const crumbLinks = [ {name: 'Contact', href: '/contact'} ]
    useEffect(() => {
      const fetchTotal = async () => {
        setTotalLoading(true)
        try {
          const res = await countUserMessages(userId)
          if (res) {
            setTotal(res)
          }
        } catch (error) {
          console.log(error)
        } finally {
            setTotalLoading(false)
        }
      }
      fetchTotal()
    }, [])
    const limit = 10
    let totalPages = 0
    if(total && total > limit) {
        totalPages = Math.ceil(total / limit)
    }
    useEffect(() => {
      const offset = page * limit
      const fetchMessages = async () => {
        setIsLoading(true)
        try {
          const res = await getUserMessages(userId, offset)
          if (res) {
            setData(res)
          }
        } catch (error) {
          console.log(error)
        } finally {
            setIsLoading(false)
        }
      }
      fetchMessages()
    }, [page])
    if(loading) {
        return <CustomLoading />
    }
    if(!loggedIn) {
        return router.push('/login')
    }
  return (
    <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={crumbPage}
            crumbLinks={crumbLinks}
            icon={<FaEnvelopeOpenText size={20} />}
            title={crumbPage}
            subtitle='Your messages list'
        />
        <div className='card-container'>
            {isLoading || totalLoading ? (
                <CustomLoading />
            ) : (
                <ContactMessages
                    data={data}
                />
            )}
        </div>
        <hr className="hr"/>
            <AdsHorizontal />
        <hr className="hr"/>
        {total > limit && 
        <div className='pagination'>
            <div className='pagination-item'>
                <Button 
                    className='pagination-button'
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                >
                    <ArrowBigLeftDash />
                    <span className='font-normal'>Previous</span>
                </Button>
                <div className='flex text-safari-2'>
                    <span className='font-normal'>{page + 1} of {totalPages}</span>
                </div>
                <Button 
                    className='pagination-button'
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={page >= totalPages - 1}
                >
                    <span className='font-normal'>Next</span>
                    <ArrowBigRightDash />
                </Button>
            </div>
        </div>
      }
      <hr className="hr"/>
    </div>
  )
}

export default UserMessages