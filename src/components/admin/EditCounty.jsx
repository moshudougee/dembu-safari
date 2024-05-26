import React, { useState } from 'react'
import { Form } from '@/components/ui/form'
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE, addCountySchema, defaultAvatar } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CustomInput from '../CustomInput'
import { Button } from '../ui/button'
import { Loader, Loader2 } from 'lucide-react'
import CustomTextArea from '../CustomTextArea'
import toast from 'react-hot-toast'
import axios from 'axios'
import { updateCounty } from '@/lib/server/countyActions'
import { checkImage } from '@/lib/server/userActions'

const EditCounty = ({ data, imageId, flagId }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [flagUploading, setFlagUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(data?.image || null)
    const [flagUrl, setFlagUrl] = useState(data?.flag || null)
    const formSchema = addCountySchema()
    const router = useRouter()
    const defaultUrl = defaultAvatar
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
            code: data?.code,
            capital: data?.capital,
            area: data?.area,
            population: data?.population,
            details: data?.details,
            flag: data?.flagUrl,
            image: data?.imageUrl
        }
    })
    //define a submit handler
    const onSubmit = async (data) => {
        //console.log(data)
        setIsLoading(true)
        try {
            //TO DO --ADD CATEGORY TO APPWRITE DATABASE
            const countyData = {
                name: data.name,
                code: data.code,
                capital: data.capital,
                area: data.area,
                population: data.population,
                details: data.details,
                flag: flagUrl || defaultUrl,
                image: imageUrl || defaultUrl
            }
            const res = await updateCounty(id, countyData)
            if (res) {
                const hasImage = await checkImage(imageId)
                const hasFlag = await checkImage(flagId)
                const currImage = extractFileId(imageUrl)
                const currFlag = extractFileId(flagUrl)
                const defaultId = extractFileId(defaultUrl)
                let delImage = false
                let delFlag = false
                if (hasImage && currImage !== imageId && defaultId !== imageId) {
                    delImage = await axios.delete('/api/upload?fileId='+imageId)
                }
                if (hasFlag && currFlag !== flagId && defaultId !== flagId) {
                    delFlag = await axios.delete('/api/upload?fileId='+flagId)
                }
                if (delImage && delFlag) {
                    toast.success('County updated successfully')
                    router.push(`/admin/counties/${id}`)
                } else {
                    toast.success('County updated successfully')
                    router.push(`/admin/counties/${id}`)
                }
            }
            
        } catch (error) {
           console.log(error)
           toast.error('Internal Server error, updating county') 
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
    //upload flag
    const uploadFlag = async (e) => {
        setFlagUploading(true)
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
                setFlagUrl(res.data.url)
                toast.success('Flag uploaded successfully')
            }
        } catch (error) {
            console.log(error)
            toast.error('Internal Server error, Uploading Flag')
        } finally {
            setFlagUploading(false)
        }
    }
  return (
    <div className='flex flex-col items-center w-full my-4'>
        <div className='wide-form'>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 xl:min-w-[400px] my-10'>
                    <CustomInput control={form.control} name='name' label="County Name" placeholder='Enter county name' id='name' />
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
                        <label className="upload-image">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <div>
                            Add image
                            </div>
                            <input type="file" onChange={uploadImage} className="hidden"/>
                        </label>
                    </div>
                    <div className='flex gap-2'>
                        {flagUrl && 
                            <div className='w-[102px] h-[102px] rounded shadow-sm'>
                                <img src={flagUrl} alt='Category' className='rounded-lg' />
                            </div>
                        }
                        {flagUploading &&
                            <div className='text-success-1 text-lg my-8 flex gap-1'>
                                <Loader className='animate-spin' />
                                <span className='font-normal'>Flag uploading....</span>
                            </div>
                        }
                        <label className="upload-image">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <div>
                            Add flag
                            </div>
                            <input type="file" onChange={uploadFlag} className="hidden"/>
                        </label>
                    </div>
                    <CustomInput control={form.control} name='code' label="County Code" placeholder='Enter county code' id='code' />
                    <CustomInput control={form.control} name='capital' label="County Capital" placeholder='Enter county capital' id='capital' />
                    <CustomInput control={form.control} name='area' label="County Area (km)&sup2;" placeholder='Enter county area' id='area' />
                    <CustomInput control={form.control} name='population' label="County Population" placeholder='Enter county population' id='population' />
                    <CustomTextArea control={form.control} name='details' label="County Details" placeholder='Enter county details' id='details' />
                    <div className='flex flex-col gap-4'>
                        <Button type='submit' disabled={isLoading} className='form-btn'>
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin' /> &nbsp;
                                    Loading...
                                </>
                            ) : 'Update County'
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default EditCounty
