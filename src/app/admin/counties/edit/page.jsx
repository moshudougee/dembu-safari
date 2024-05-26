'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import EditCounty from '@/components/admin/EditCounty'
import { useGlobalContext } from '@/context/GlobalProvider'
import useCounty from '@/hooks/useCounty'
import { FilePenLine } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const AdminEditCounty = () => {
    const  params  = useSearchParams()
    const id = params.get('id')
    const imageId = params.get('imageId')
    const flagId = params.get('flagId')
    const { user, loggedIn, loading } = useGlobalContext()
    const { data, error, isLoading } = useCounty(id)
    const router = useRouter()
    const crumbLinks = [
        {name: 'Dashboard', href: '/admin'}, {name: 'Counties', href: '/admin/counties'}
    ]
    let code = ''
    if (data?.code <= 9) {
        code = '00'+data?.code
    } else {
        code = '0'+data?.code
    }
    const countyName = `${data?.name} ${code}` || 'County Name'
    const imageurl = data?.flag || ''

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
                    crumbPage={countyName}
                    crumbLinks={crumbLinks}
                    imageurl={imageurl}
                    icon={<FilePenLine />}
                    title={countyName}
                    subtitle='Edit county details'
                />
                <div className='flex w-full my-4'>
                    {isLoading? (
                        <CustomLoading />
                    ) : error? (
                        <div className='text-safari-2'>{error}</div>
                    ) : (
                        <EditCounty data={data} imageId={imageId} flagId={flagId} />
                    )}
                </div>
            </div>
        )
    } else {
        return router.push('/')
    }
}

export default AdminEditCounty