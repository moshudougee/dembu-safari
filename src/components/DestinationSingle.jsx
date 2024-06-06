'use Client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FilePenLine, Hotel, Layers, Locate, Luggage, MapPin, Trash2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { withSwal } from 'react-sweetalert2'
import { deleteDestination } from '@/lib/server/destinationActions'
import toast from 'react-hot-toast'
import { checkImage } from '@/lib/server/userActions'
import axios from 'axios'
import CustomLoading from './CustomLoading'
import { defaultAvatar } from '@/lib/utils'
import Link from 'next/link'
import AdsHorizontal from './AdsHorizontal'

const DestinationSingle = ({ data, role="CLIENT", swal }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [activeImage, setActiveImage] = useState(data?.images[0])
    const router = useRouter()
    const defaultUrl = defaultAvatar
    const images = [...data.images]
    useEffect(() => {
       setActiveImage(data?.images[0])
    }, [data?.$id])
    
    //extract fileId
    const extractFileId = (url) => {
        const match = url.match(/\/files\/([^/]+)/);
        return match ? match[1] : null;
    }
    const handleEdit = () => {
        router.push(`/admin/destinations/edit?id=${data.$id}`)
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
                const res = await deleteDestination(data.$id)
                if(res) {
                    if (images.length > 0) {
                        let count = 0
                        for(let i = 0; i < images.length; i++) {
                            const imageId = extractFileId(images[i])
                            const hasImage = await checkImage(imageId)
                            if(hasImage) {
                                const del = await axios.delete('/api/upload?fileId='+imageId)
                                if(del) {
                                    count++
                                }
                            }
                        }
                        if(count === images.length) {
                            toast.success('Destination deleted successfully')
                            setIsLoading(false)
                            router.push('/admin/destinations')
                        } else {
                            toast.success('Destination deleted successfully')
                            setIsLoading(false)
                            router.push('/admin/destinations')
                        }
                    } else {
                        toast.success('Destination deleted successfully')
                        setIsLoading(false)
                        router.push('/admin/destinations')
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
        <div className='destination-card-main'>
            <div className='flex flex-col xl:flex-row xl:gap-3 justify-center'>
                <div className='destination-card-image'>
                    {data.images.length > 0 ? (
                        <Image src={activeImage} alt='Destination' fill sizes='100' className='rounded-md object-cover' priority />
                    ) : (
                        <Image src={defaultUrl} alt='Destination' fill sizes='100' className='rounded-md object-cover' priority />
                    )}
                    
                </div>
                <div className='flex flex-col w-full xl:w-[350px] mt-8'>
                    <Link href={`/counties/${data?.countyId.$id}`} className='county-card-side'>
                        <Locate />
                        <span className='font-normal'>{data?.countyId.name}</span>
                        <span className='font-normal'>county</span>
                    </Link>
                    <Link href={`/categories/${data?.categoryId.$id}`} className='county-card-side'>
                        <Layers />
                        <span className='font-normal'>{data?.categoryId.name}</span>
                    </Link>
                    <div className='county-card-side'>
                        <Hotel />
                        <span className='font-normal'>Accommodation</span>
                        <span className='text-xl'>0</span>
                    </div>
                    <div className='county-card-side'>
                        <Luggage />
                        <span className='font-normal'>Tours & Safari</span>
                        <span className='text-xl'>0</span>
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
            <div className='flex justify-center items-center w-auto gap-1 shadow rounded my-2 p-2'>
                {data.images.length > 0 && 
                    data.images.map((image, i) => {
                        return(
                            <div key={i} className='relative rounded w-[150px] h-[150px]'>
                                <Image 
                                    src={image} alt='Destination' 
                                    fill 
                                    sizes='100' 
                                    className='rounded object-cover cursor-pointer'
                                    onClick={() => setActiveImage(image)}
                                />
                            </div>
                        )
                    })
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
                    <TabsTrigger 
                    value="feedback"
                    className="hover:text-safari-2 hover:bg-banner data-[state=active]:bg-banner data-[state=active]:text-safari-2"
                    >
                    Feedback
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
                    <p className='flex gap-1'>
                        <MapPin className=' text-red-700' size={50} />
                        <span>{data.location}</span>
                    </p>
                </TabsContent>
                <TabsContent value="accommodation">
                    <div className='flex flex-col justify-center items-center'>
                        <p className='indent-12'>
                            {role === 'ADMIN' ? (
                                <>
                                Accommodation services located around <em>{data.name}</em> as advertised with us.
                                </>
                            ) : (
                                <>
                                If you offer Accommodation services located around <em>{data.name}</em> kindly advertise with us here.
                                </>
                            )}
                        </p>
                        <hr className="hr-ad-horizontal"/>
                        <div className='ad-horizontal'>
                            <AdsHorizontal slot='4745134915' />
                        </div>
                        <hr className="hr-ad-horizontal"/>
                        <div className='ad-horizontal'>
                            <AdsHorizontal slot='7975053044' />
                        </div>
                        <hr className="hr-ad-horizontal"/>
                        <div className='ad-horizontal'>
                            <AdsHorizontal slot='2722726368' />
                        </div>
                        <hr className="hr-ad-horizontal"/>
                    </div>
                    
                </TabsContent>
                <TabsContent value="tours">
                    <div className='flex flex-col justify-center items-center'>
                    <p className='indent-12'>
                        {role === 'ADMIN' ? (
                            <>
                            Tours & Safari services located around <em>{data.name}</em> as advertised with us.
                            </>
                        ) : (
                            <>
                            If you offer Tours & Safari services located around <em>{data.name}</em> kindly advertise with us here.
                            </>
                        )}
                    </p>
                    </div>
                    
                </TabsContent>
                <TabsContent value="feedback">
                    <div className='flex flex-col justify-center items-center'>
                    <p className='indent-12'>
                        {role === 'ADMIN' ? (
                            <>
                            Feedback about <em>{data.name}</em> from our users.
                            </>
                        ) : (
                            <>
                            Kindly leave a feedback about your experience or opinion about <em>{data.name}</em>.
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
    <DestinationSingle data={data} role={role} swal={swal} />
))