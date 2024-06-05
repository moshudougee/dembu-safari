'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomError from '@/components/CustomError'
import CustomLoading from '@/components/CustomLoading'
import CountiesTable from '@/components/admin/CountiesTable'
import { Button } from '@/components/ui/button'
import { useGlobalContext } from '@/context/GlobalProvider'
import { countCounties, getPageCounties } from '@/lib/server/countyActions'
import { ArrowBigLeftDash, ArrowBigRightDash, Telescope } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AdminCounties = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(null)
    const [totalLoading, setTotalLoading] = useState(false)
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}
    ]
    useEffect(() => {
        const fetchTotal = async () => {
            setTotalLoading(true)
            try {
                const res = await countCounties()
                if(res) {
                    setTotal(res)
                }
            } catch (error) {
                setError('Error fetching Total is '+error)
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
                const res = await getPageCounties(offset)
                if(res) {
                    setData(res)
                }
            } catch (error) {
                setError('Error fetching counties is '+error)
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
                    crumbPage='Counties'
                    crumbLinks={crumbLinks}
                    icon={<Telescope />}
                    title='Counties'
                    subtitle='View Counties List'
                />
                <div className='card-container'>
                    {isLoading || totalLoading ? (
                        <CustomLoading />
                    ) : error ? (
                        <CustomError />
                    ) : (
                        <CountiesTable 
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
    }else {
        return router.push('/')
    }
}

export default AdminCounties