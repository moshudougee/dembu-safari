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
import Link from 'next/link'
import { format } from 'date-fns'

const ContactMessages = ({ data }) => {
  return (
    <Table>
        <TableCaption>A list of all messages.</TableCaption>
        <TableHeader>
            <TableRow className='bg-safari-4'>
            <TableHead className=" w-1/12">Date</TableHead>
            <TableHead className=" w-3/12">Subject</TableHead>
            <TableHead className=" w-6/12">Message</TableHead>
            <TableHead className=" w-2/12">View</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data?.map((message) => {
                const createdAt = format(message.$createdAt, 'MM/dd/yyyy')
                let formatedMessage = ''
                if(message.message.length > 150) {
                    formatedMessage = message.message.substring(0, 150) + '...'
                } else {
                    formatedMessage = message.message
                }
                return (
                    <TableRow key={message.$id} className='text-safari-2'>
                        <TableCell className="font-medium">
                            {createdAt}
                        </TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>{formatedMessage}</TableCell>
                        <TableCell>
                            <Link 
                                href={`/contact/messages/${message.$id}`}
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

export default ContactMessages