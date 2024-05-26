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

const CategoriesTable = ({ data }) => {
  return (
    <Table>
        <TableCaption>A list of all destination categories.</TableCaption>
        <TableHeader>
            <TableRow className='bg-safari-4'>
            <TableHead className=" w-1/12">Image</TableHead>
            <TableHead className=" w-3/12">Category Name</TableHead>
            <TableHead className=" w-6/12">Category Introduction</TableHead>
            <TableHead className=" w-2/12">View</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data?.map((category) => {
                return (
                    <TableRow key={category.$id} className='text-safari-2'>
                        <TableCell className="font-medium">
                            <div className='relative rounded w-[107px] h-[60px]'>
                                <Image src={category.image} fill sizes='100' alt='Profile' className='rounded object-cover' />
                            </div>
                        </TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.intro}</TableCell>
                        <TableCell>
                            <Link 
                                href={`/admin/categories/${category.$id}`}
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

export default CategoriesTable