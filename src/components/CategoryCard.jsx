'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FilePenLine, Hotel, Luggage, Palmtree, Trash2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { withSwal } from 'react-sweetalert2'
import { deleteCategory } from '@/lib/server/categoryActions'
import toast from 'react-hot-toast'
import { checkImage } from '@/lib/server/userActions'
import axios from 'axios'
import CustomLoading from './CustomLoading'
import { defaultAvatar } from '@/lib/utils'
import Link from 'next/link'
import AdsHorizontal from './AdsHorizontal'

const CategoryCard = ({ data, destinations=0, role="CLIENT", swal }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const defaultUrl = defaultAvatar
    //extract fileId
    const extractFileId = (url) => {
        const match = url.match(/\/files\/([^/]+)/);
        return match ? match[1] : null;
    }
    const fileId = extractFileId(data.image)
    const defaultId = extractFileId(defaultUrl)
    const handleEdit = () => {
        router.push(`/admin/categories/edit?id=${data.$id}&fileId=${fileId}`)
    }
    const handleDelete = () => {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${data.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if(result.isConfirmed) {
                setIsLoading(true)
                const res = await deleteCategory(data.$id)
                if(res) {
                    const hasFile = await checkImage(fileId)
                    if(hasFile && defaultId !== fileId) {
                        const del = await axios.delete('/api/upload?fileId='+fileId)
                        if(del) {
                            toast.success('Category deleted successfully')
                            setIsLoading(false)
                            router.push('/admin/categories')
                        }else {
                            toast.success('Category deleted successfully')
                            setIsLoading(false)
                            router.push('/admin/categories')
                        }
                    }else {
                        toast.success('Category deleted successfully')
                        setIsLoading(false)
                        router.push('/admin/categories')
                    }
                }
            }
        })
    }
    if (isLoading) {
        return <CustomLoading />
    }
  return (
    <div className='category-card'>
        <div className='category-card-main'>
            <div className='category-card-image'>
                <Image src={data.image} alt='Category' fill sizes='100' className='rounded-md' />
            </div>
            <div className='flex flex-col w-full mt-10'>
                <Link
                    href={!destinations || destinations === 0 ? '#' : `/destinations?name=${data.name}&categoryId=${data.$id}`} 
                    className='category-card-side'
                >
                    <Palmtree />
                    <span className='font-normal'>Destinations</span>
                    <span className='text-xl'>
                        {destinations || 0}
                    </span>
                </Link>
                <div className='category-card-side'>
                    <Hotel />
                    <span className='font-normal'>Accommodation</span>
                    <span className='text-xl'>0</span>
                </div>
                <div className='category-card-side'>
                    <Luggage />
                    <span className='font-normal'>Tours & Safari</span>
                    <span className='text-xl'>0</span>
                </div>
                {role === 'ADMIN' && 
                    <div className='flex gap-4 justify-center items-center mt-10'>
                        <div className='relative group'>
                            <Button onClick={handleEdit} className='bg-transparent hover:bg-transparent shadow-md'>
                            <FilePenLine className='text-safari-2 cursor-pointer' />
                            </Button>
                            <span className='hover-text bg-banner'>Edit</span>
                        </div>
                        <div className='relative group'>
                            <Button disabled onClick={handleDelete} className='bg-transparent hover:bg-transparent shadow-md'>
                                <Trash2 className=' text-red-700 cursor-pointer'/>
                            </Button>
                            <span className='hover-text bg-red-700 bg-opacity-75'>Delete</span>
                        </div>
                    </div>
                }
            </div>
        </div>
        <hr className="hr"/>
        <div className='flex justify-center items-center m-1'>
            <Tabs defaultValue="details" className="flex flex-col w-[1000px] min-h-[600px] rounded-md shadow-md p-4 mx-10">
                <TabsList className="text-success-1">
                    <TabsTrigger 
                    value="details" 
                    className="hover:text-safari-2 hover:bg-banner data-[state=active]:bg-banner data-[state=active]:text-safari-2"
                    >
                    Details
                    </TabsTrigger>
                    <TabsTrigger 
                    value="accommodation" 
                    className="hover:text-safari-2 hover:bg-banner data-[state=active]:bg-banner data-[state=active]:text-safari-2"
                    >
                    Accommodation
                    </TabsTrigger>
                    <TabsTrigger 
                    value="tours"
                    className="hover:text-safari-2 hover:bg-banner data-[state=active]:bg-banner data-[state=active]:text-safari-2"
                    >
                    Tours & Safari
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <p className='indent-12'>
                        {data.intro}
                    </p>
                    <p className='indent-12'>
                        {data.details}
                    </p>
                    <p className='indent-12'>
                        {data.conclusion}
                    </p>
                </TabsContent>
                <TabsContent value="accommodation">
                    <div className='flex flex-col justify-center items-center'>
                        <p className='indent-12'>
                            {role === 'ADMIN' ? (
                                <>
                                Accommodation services relating <em>{data.name}</em> as advertised with us.
                                </>
                            ) : (
                                <>
                                If you offer Accommodation services relating to <em>{data.name}</em> kindly advertise with us here.
                                </>
                            )}
                        </p>
                        <hr className="hr-ad-horizontal"/>
                        <div className='ad-horizontal'>
                            <AdsHorizontal />
                        </div>
                        <hr className="hr-ad-horizontal"/>
                        <div className='ad-horizontal'>
                            <AdsHorizontal />
                        </div>
                        <hr className="hr-ad-horizontal"/>
                        <div className='ad-horizontal'>
                            <AdsHorizontal />
                        </div>
                        <hr className="hr-ad-horizontal"/>
                    </div>
                    
                </TabsContent>
                <TabsContent value="tours">
                    <div className='flex flex-col justify-center items-center'>
                    <p className='indent-12'>
                        {role === 'ADMIN' ? (
                            <>
                            Tours & Safari services relating <em>{data.name}</em> as advertised with us.
                            </>
                        ) : (
                            <>
                            If you offer Tours & Safari services relating to <em>{data.name}</em> kindly advertise with us here.
                            </>
                        )}
                    </p>
                    </div>
                    
                </TabsContent>
            </Tabs>
        </div>
    </div>
  )
}

export default withSwal(({swal, data, destinations, role}, ref) => (
    <CategoryCard data={data} destinations={destinations} role={role} swal={swal} />
))