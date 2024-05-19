'use client'
import ContentHeader from '@/components/ContentHeader'
import { useGlobalContext } from '@/context/GlobalProvider'
import { FilePenLine, Trash2, UserCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Image from 'next/image'
import CustomLoading from '@/components/CustomLoading'
import prof from '@/images/prof1small.jpg'
import useUsers from '@/hooks/useUsers'
import UsersTable from '@/components/admin/UsersTable'
  

const AdminUsers = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    const { data, error, isLoading } = useUsers()
    const router = useRouter()
    const crumbLinks = [
        {
            name: 'Dashboard',
            href: '/admin'
        }
    ]
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
                    crumbPage='Users'
                    crumbLinks={crumbLinks}
                    icon={<UserCog />}
                    title='All Users'
                    subtitle='View users'
                />
                <div className='flex flex-col justify-center items-center w-full max-w-[1000px] px-6 mx-10 my-10'>
                    {isLoading ? (
                        <CustomLoading />
                    ) : error ? (
                        <div className='text-safari-2'>{error}</div>
                    ) : data.length === 0 ? (
                        <div className='text-safari-2'>No users found</div>
                    ) : (
                        <UsersTable 
                            data={data}
                        />
                    )}
                
                </div>
            </div>
        )
    } else {
        return router.push('/')
    }
    
}

export default AdminUsers