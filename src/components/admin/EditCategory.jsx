import React, { useState } from 'react'
import { Form } from '@/components/ui/form'
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE, addCategorySchema, defaultAvatar } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CustomInput from '../CustomInput'
import { Button } from '../ui/button'
import { Loader, Loader2 } from 'lucide-react'
import CustomTextArea from '../CustomTextArea'
import toast from 'react-hot-toast'
import axios from 'axios'
import { updateCategory } from '@/lib/server/categoryActions'
import { checkImage } from '@/lib/server/userActions'

const EditCategory = ({ data, fileId }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(data?.image || null)
    const formSchema = addCategorySchema()
    const router = useRouter()
    const defaultUrl = defaultAvatar
    const id = data?.$id
    //console.log(fileId)
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
            conclusion: data?.conclusion
        },
    })
    //define a submit handler
    const onSubmit = async (data) => {
        //console.log(data)
        setIsLoading(true)
        try {
            //TO DO --EDIT CATEGORY IN APPWRITE DATABASE
            const categoryData = {
                name: data.name,
                intro: data.intro,
                details: data.details,
                conclusion: data.conclusion,
                image: imageUrl || defaultUrl
            }
            const res = await updateCategory(id, categoryData)
            if (res) {
                const currId = extractFileId(imageUrl)
                const defaultId = extractFileId(defaultUrl)
                const hasImage = await checkImage(fileId)
                if(hasImage && currId !== fileId && defaultId !== fileId) {
                    const result = await axios.delete('/api/upload?fileId='+fileId)
                    if (result) {
                        toast.success('Category updated successfully')
                        router.push(`/admin/categories/${id}`)
                    }else {
                        toast.success('Category updated successfully, Image not deleted')
                        router.push(`/admin/categories/${id}`)
                    }
                }else{
                    toast.success('Category updated successfully, Image not deleted')
                    router.push(`/admin/categories/${id}`)
                } 
            }
        } catch (error) {
           console.log(error)
           toast.error('Internal Server error, updating category') 
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
            toast.error('File must be a PNG, JPG, JPEG or WEBP Image type')
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
                setImageUrl(res.data.url)
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
                    <CustomInput control={form.control} name='name' label="Category Name" placeholder='Enter destination category name' id='name' />
                    <div className='flex gap-2'>
                        {imageUrl && 
                            <div className='w-[102px] h-[102px] rounded shadow-sm'>
                                <img src={imageUrl} alt='Category' className='rounded-lg' />
                            </div>
                        }
                        {imageUploading &&
                            <div className='text-success-1 text-lg my-8 flex gap-1'>
                                <Loader className='animate-spin' />
                                <span className='font-normal'>Image uploading....</span>
                            </div>
                        }
                        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <div>
                            Add image
                            </div>
                            <input type="file" onChange={uploadImage} className="hidden"/>
                        </label>
                    </div>
                    <CustomTextArea control={form.control} name='intro' label='Destination Introduction' placeholder='Enter destination introduction' id='intro' />
                    <CustomTextArea control={form.control} name='details' label='Destination Details' placeholder='Enter destination details' id='details' />
                    <CustomTextArea control={form.control} name='conclusion' label='Destination Conclusion' placeholder='Enter destination conclusion' id='details' />
                    <div className='flex flex-col gap-4'>
                        <Button type='submit' disabled={isLoading} className='form-btn'>
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin' /> &nbsp;
                                    Loading...
                                </>
                            ) : 'Update Category'
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default EditCategory