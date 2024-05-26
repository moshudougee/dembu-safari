'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FilePenLine, Hotel, LandPlot, Luggage, MapPin, Palmtree, Trash2, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { withSwal } from 'react-sweetalert2'
import { deleteCounty } from '@/lib/server/countyActions'
import toast from 'react-hot-toast'
import { checkImage } from '@/lib/server/userActions'
import axios from 'axios'
import CustomLoading from './CustomLoading'
import { defaultAvatar } from '@/lib/utils'

const CountyCard = ({ data, role="CLIENT", swal }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const defaultUrl = defaultAvatar
    //extract fileId
    const extractFileId = (url) => {
        const match = url.match(/\/files\/([^/]+)/);
        return match ? match[1] : null;
    }
    const imageId = extractFileId(data.image)
    const flagId = extractFileId(data.flag)
    const defaultId = extractFileId(defaultUrl)
    const area = data?.area.toLocaleString()
    const population = data?.population.toLocaleString()
    const handleEdit = () => {
        router.push(`/admin/counties/edit?id=${data.$id}&imageId=${imageId}&flagId=${flagId}`)
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
                const res = await deleteCounty(data.$id)
                if(res) {
                    const hasImage = await checkImage(imageId)
                    const hasFlag = await checkImage(flagId)
                    let delImage = false
                    let delFlag = false
                    if(hasImage && defaultId !== imageId) {
                        delImage = await axios.delete('/api/upload?fileId='+imageId)
                    }
                    if(hasFlag && defaultId !== flagId) {
                        delFlag = await axios.delete('/api/upload?fileId='+flagId)
                    }
                    if(delImage && delFlag) {
                        toast.success('County deleted successfully')
                        setIsLoading(false)
                        router.push('/admin/counties')
                    }else {
                        toast.success('County deleted successfully')
                        setIsLoading(false)
                        router.push('/admin/counties')
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
                <Image src={data.image} alt='Category' fill sizes='100' className='rounded-md' priority />
            </div>
            <div className='flex flex-col w-full mt-8'>
                <div className='county-card-side'>
                    <Palmtree />
                    <span className='font-normal'>Destinations</span>
                    <span className='text-xl'>20</span>
                </div>
                <div className='county-card-side'>
                    <MapPin />
                    <span className='font-normal'>Capital</span>
                    <span className='text-sm'>{data.capital}</span>
                </div>
                <div className='county-card-side'>
                    <LandPlot />
                    <span className='font-normal'>Area (km)&sup2;</span>
                    <span className='text-sm'>{area}</span>
                </div>
                <div className='county-card-side'>
                    <Users />
                    <span className='font-normal'>Population</span>
                    <span className='text-sm'>{population}</span>
                </div>
                <div className='county-card-side'>
                    <Hotel />
                    <span className='font-normal'>Accomodation</span>
                    <span className='text-xl'>20</span>
                </div>
                <div className='county-card-side'>
                    <Luggage />
                    <span className='font-normal'>Tours & Safari</span>
                    <span className='text-xl'>20</span>
                </div>
                {role === 'ADMIN' && 
                    <div className='flex gap-4 justify-center items-center mt-8'>
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
                    value="accomodation" 
                    className="hover:text-safari-2 hover:bg-banner data-[state=active]:bg-banner data-[state=active]:text-safari-2"
                    >
                    Accomodation
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
                        {data.details}
                    </p>
                </TabsContent>
                <TabsContent value="accomodation">
                    <div className='flex flex-col justify-center items-center'>
                    <p className='indent-12'>
                        {role === 'ADMIN' ? (
                            <>
                            Accomodation services located in <em>{data.name}</em> as advertised with us.
                            </>
                        ) : (
                            <>
                            If you offer Accomodation services located in <em>{data.name}</em> kindly advertise with us here.
                            </>
                        )}
                    </p>
                    </div>
                    
                </TabsContent>
                <TabsContent value="tours">
                    <div className='flex flex-col justify-center items-center'>
                    <p className='indent-12'>
                        {role === 'ADMIN' ? (
                            <>
                            Tours & Safari services located in <em>{data.name}</em> as advertised with us.
                            </>
                        ) : (
                            <>
                            If you offer Tours & Safari services located in <em>{data.name}</em> kindly advertise with us here.
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

export default withSwal(({swal, data, role}, ref) => (
    <CountyCard data={data} role={role} swal={swal} />
))