import React, { useState } from 'react'
import { Form } from '@/components/ui/form'
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE, addDestinationSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CustomInput from '../CustomInput'
import { Button } from '../ui/button'
import { Loader, Loader2, Trash2 } from 'lucide-react'
import CustomTextArea from '../CustomTextArea'
import toast from 'react-hot-toast'
import axios from 'axios'
import CustomSelect from '../CustomSelect'
import CustomRadio from '../CustomRadio'
import { updateDestination } from '@/lib/server/destinationActions'
import { checkImage } from '@/lib/server/userActions'

const EditDestination = ({ data, counties, categories, popular }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [images, setImages] = useState(data?.images || [])
    const [delImages, setDelImages] = useState([])
    const formSchema = addDestinationSchema()
    const router = useRouter()
    const id = data?.$id
    const extractFileId = (url) => {
        const match = url.match(/\/files\/([^/]+)/);
        return match ? match[1] : null;
    }
    //define form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name,
            intro: data?.intro,
            details: data?.details,
            conclusion: data?.conclusion,
            countyId: data?.countyId.$id,
            categoryId: data?.categoryId.$id,
            location: data?.location,
            popular: data?.popular,
        },
    })
    //define a submit handler
    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            //TO DO --ADD CATEGORY TO APPWRITE DATABASE
            const destinationData = {
                name: data.name,
                intro: data.intro,
                details: data.details,
                conclusion: data.conclusion,
                location: data.location,
                countyId: data.countyId,
                categoryId: data.categoryId,
                popular: data.popular,
                images: images
            }
            //console.log(destinationData)
            const res = await updateDestination(id, destinationData)
            if (res) {
                if (delImages.length > 0) {
                    let count = 0
                    for(let i = 0; i < delImages.length; i++) {
                        const imageId = delImages[i]
                        const hasImage = await checkImage(imageId)
                        if(hasImage) {
                            const del = await axios.delete('/api/upload?fileId='+imageId)
                            if(del) {
                                count++
                            }
                        }
                    }
                    if(count === delImages.length) {
                        toast.success('Destination updated successfully')
                        router.push('/admin/destinations')
                    } else {
                        toast.success('Destination updated successfully')
                        router.push('/admin/destinations')
                    }
                } else {
                    toast.success('Destination updated successfully')
                    router.push('/admin/destinations')
                }
             }
        } catch (error) {
           console.log(error)
           toast.error('Internal Server error, updating destination') 
        } finally {
            setIsLoading(false)
        }
    }
    //upload image
    const uploadImage = async (e) => {
        setImageUploading(true)
        const file = e.target.files[0]
        //TO DO -- UPLOAD IMAGE TO APPWRITE
        if (!file) {
            toast.error('Please select an image')
            return
        }
        if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
            toast.error('File must be a PNG, JPG, JPEG, GIF or WEBP Image type')
            return
        }
        if (file.size > MAX_UPLOAD_SIZE) {
            toast.error('File size must be less than 2MB')
            return
        }
        const data = new FormData()
        data.append('file', file)
        try {
            const res = await axios.post('/api/upload', data)
            if (res) {
                let imageUrl = res.data.url
                setImages((prev) => {
                    return [...prev, imageUrl]
                })
                toast.success('Image uploaded successfully')
            }
        } catch (error) {
            console.log(error)
            toast.error('Internal Server error, Uploading Image')
        } finally {
            setImageUploading(false)
        }
    }
  return (
    <div className='flex flex-col items-center w-full my-4'>
        <div className='wide-form'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 xl:min-w-[400px] my-10'>
                    <CustomInput control={form.control} name='name' label="Destination Name" placeholder='Enter destination name' id='name' />
                    <div className='flex flex-col'>
                        <label className="upload-image">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <div>
                            Add image
                            </div>
                            <input type="file" onChange={uploadImage} className="hidden"/>
                        </label>
                        <div className='flex gap-2'>
                            {images.length > 0 && images.map((image,i) => {
                                const handleDeleteImage = () => {
                                     setImageUploading(true)
                                     const fileId = extractFileId(image)
                                     setDelImages((prev) => {
                                         return [...prev, fileId]
                                     })
                                     const updatedImages = images.filter((item) => item !== image)
                                     setImages(updatedImages)
                                     toast.success('Image deleted successfully')
                                     setImageUploading(false)
                                  }
                                return(
                                    <div key={i} className='flex w-[102px] h-[102px] rounded shadow-sm mt-2'>
                                        <img src={image} alt='Category' className='rounded-lg' />
                                        <div 
                                            className='group absolute p-0.5 m-1 bg-black/50 rounded text-red-700 cursor-pointer'
                                            onClick={handleDeleteImage}
                                        >
                                            <Trash2 />
                                            <span className='hover-text bg-success-1/85'>Delete</span>
                                        </div>
                                    </div>  
                                )
                            })
                            }
                            {imageUploading &&
                                <div className='text-success-1 text-lg my-8 flex gap-1'>
                                    <Loader className='animate-spin' />
                                    <span className='font-normal'>Image uploading....</span>
                                </div>
                            }
                        </div>
                    </div>
                    <CustomTextArea control={form.control} name='intro' label="Destination Introduction" placeholder='Enter destination introduction' id='intro' />
                    <CustomTextArea control={form.control} name='details' label="Destination Details" placeholder='Enter destination details' id='details' />
                    <CustomTextArea control={form.control} name='conclusion' label="Destination conclusion" placeholder='Enter destination conclusion' id='conclusion' />
                    <CustomTextArea control={form.control} name='location' label="Location" placeholder='Enter location details' id='location' />
                    <CustomSelect control={form.control} name='countyId' label="County" placeholder='Select County' id='countyId' data={counties} />
                    <CustomSelect control={form.control} name='categoryId' label="Destination Category" placeholder='Select Category' id='categoryId' data={categories} />
                    <CustomRadio control={form.control} name='popular' label="Popular..?" id='popular' data={popular} />
                    <div className='flex flex-col gap-4'>
                        <Button type='submit' disabled={isLoading} className='form-btn'>
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin' /> &nbsp;
                                    Loading...
                                </>
                            ) : 'Update Destination'
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default EditDestination