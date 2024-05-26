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
import { FilePenLine, Trash2 } from 'lucide-react'
import Image from 'next/image'


const UsersTable = ({ data }) => {
  return (
    <Table>
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
            <TableRow className='bg-safari-4'>
            <TableHead className=" w-1/12">Image</TableHead>
            <TableHead className=" w-2/12">First Name</TableHead>
            <TableHead className=" w-2/12">Last Name</TableHead>
            <TableHead className=" w-4/12">Email</TableHead>
            <TableHead className=" w-1/12">Role</TableHead>
            <TableHead className=" w-1/12">Advertiser</TableHead>
            <TableHead className=" w-1/12">Edit</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data?.map((user) => {
                return (
                    <TableRow key={user.$id} className='text-safari-2'>
                        <TableCell className="font-medium">
                            <div className='rounded-full w-[60px] h-[60px]'>
                                <Image src={user.avatar} width={60} height={60} alt='Profile' className='rounded-full' />
                            </div>
                        </TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell className="">{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.advertiser}</TableCell>
                        <TableCell>
                            <div className='flex gap-2'>
                                <div className='relative group'>
                                    <FilePenLine className='text-safari-2 cursor-pointer' />
                                    <span className='hover-text bg-banner'>Edit Role</span>
                                </div>
                                <div className='relative group'>
                                    <button disabled>
                                        <Trash2 className=' text-red-700 cursor-pointer'/>
                                    </button>
                                    <span className='hover-text bg-red-700 bg-opacity-75'>Delete</span>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                )
            })}
                                
        </TableBody>
    </Table>
  )
}

export default UsersTable