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
import { Telescope } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { defaultAvatar } from '@/lib/utils'

const DestinationsTable = ({ data }) => {
  return (
    <Table>
        <TableCaption>A list of all counties.</TableCaption>
        <TableHeader>
            <TableRow className='bg-safari-4'>
            <TableHead className=" w-1/12">Image</TableHead>
            <TableHead className=" w-3/12">Destination Name</TableHead>
            <TableHead className=" w-6/12">Destination Introduction</TableHead>
            <TableHead className=" w-2/12">View</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data?.map((destination) => {
                
                return (
                    <TableRow key={destination.$id} className='text-safari-2'>
                        <TableCell className="font-medium">
                            <div className='relative rounded w-[60px] h-[34px]'>
                                {destination.images.length > 0 ? (
                                    <Image src={destination.images[0]} fill sizes='100' alt='Profile' className='rounded object-cover' />
                                ) : (
                                    <Image src={defaultAvatar} fill sizes='100' alt='Profile' className='rounded object-cover' />
                                )}
                            </div>
                        </TableCell>
                        <TableCell>{destination.name}</TableCell>
                        <TableCell>{destination.intro}</TableCell>
                        <TableCell>
                            <Link 
                                href={`/admin/destinations/${destination.$id}`}
                                className='flex gap-2 justify-center items-center rounded hover:bg-success-1 cursor-pointer p-2'
                            >
                                <Telescope />
                                <span>Details...</span>
                            </Link>
                        </TableCell>
                    </TableRow>
                )
            })}
                                
        </TableBody>
    </Table>
  )
}

export default DestinationsTable