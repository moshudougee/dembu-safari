'use client'
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import Link from 'next/link'

const Breadlinks = ({ crumbLinks=[], crumbPage }) => {
    //console.log('crumbLinks are :'+ crumbLinks)
  return (
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink asChild>
                <Link href='/'>Home</Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {crumbLinks && crumbLinks.length > 0 ? (
                crumbLinks.map((link, i) => {
                return (
                    <div key={i} className='flex gap-2 justify-center items-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={link.href}>{link.name}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </div>
                )
            })
            ) : (
                null
            )}
            <BreadcrumbItem>
            <BreadcrumbPage>{crumbPage}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadlinks