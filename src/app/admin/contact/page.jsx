'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import UserMessages from '@/components/admin/UserMessages'
import { useGlobalContext } from '@/context/GlobalProvider'
import { countMessages, getMessages } from '@/lib/server/messageActions'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEnvelopeOpenText } from 'react-icons/fa'

const AdminMessages = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(null)
    const [totalLoading, setTotalLoading] = useState(false)
    const router = useRouter()
    const crumbPage = 'User Messages'
    const crumbLinks = [{name: 'Dashboard', href: '/admin'}]
    useEffect(() => {
        const fetchTotal = async () => {
            setTotalLoading(true)
            try {
                const res = await countMessages()
                if(res) {
                    setTotal(res)
                }
            } catch (error) {
                console.log(error)
                setError(true)
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
        const fetchCounties = async () => {
            setIsLoading(true)
            try {
                const res = await getMessages(offset)
                if(res) {
                    setData(res)
                }
            } catch (error) {
                console.log(error)
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCounties()
    }, [page])

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
                icon={<FaEnvelopeOpenText size={20} />}
                title={crumbPage}
                subtitle='View all messages'
            />
            <div className='card-container'>
                {isLoading || totalLoading? (
                    <CustomLoading />
                ) : error? (
                    <CustomError />
                ) : (
                    <UserMessages 
                        data={data}
                    />
                )}
            </div>
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
        </div>
    )
    } else {
        return router.push('/')
    }
}

export default AdminMessages