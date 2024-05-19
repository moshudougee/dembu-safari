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

const Breadlinks = ({ crumbLinks=[], crumbPage }) => {
    //console.log('crumbLinks are :'+ crumbLinks)
  return (
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {crumbLinks && crumbLinks.length > 0 ? (
                crumbLinks.map((link) => {
                return (
                    <div key={link.name} className='flex gap-2 justify-center items-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={link.href}>{link.name}</BreadcrumbLink>
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