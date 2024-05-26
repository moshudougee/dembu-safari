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

const CountiesTable = ({ data }) => {
  return (
    <Table>
        <TableCaption>A list of all counties.</TableCaption>
        <TableHeader>
            <TableRow className='bg-safari-4'>
            <TableHead className=" w-1/12">Code</TableHead>
            <TableHead className=" w-1/12">Image</TableHead>
            <TableHead className=" w-2/12">County Name</TableHead>
            <TableHead className=" w-6/12">County Details</TableHead>
            <TableHead className=" w-2/12">View</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data?.map((county) => {
                let code = ''
                if (county?.code <= 9) {
                    code = '00'+county?.code
                } else {
                    code = '0'+county?.code
                }
                return (
                    <TableRow key={county.$id} className='text-safari-2'>
                        <TableCell>{code}</TableCell>
                        <TableCell className="font-medium">
                            <div className='relative rounded w-[40px] h-[26px]'>
                                <Image src={county.flag} fill sizes='100' alt='Profile' className='rounded object-cover' />
                            </div>
                        </TableCell>
                        <TableCell>{county.name}</TableCell>
                        <TableCell>{county.details}</TableCell>
                        <TableCell>
                            <Link 
                                href={`/admin/counties/${county.$id}`}
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

export default CountiesTable