'use client'
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE, profileSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Form } from './ui/form'
import Image from 'next/image'
import { Loader, Loader2 } from 'lucide-react'
import CustomInput from './CustomInput'
import { Button } from './ui/button'
import toast from 'react-hot-toast'
import axios from 'axios'
import { checkImage, getLoggedInUser, updateUser } from '@/lib/server/userActions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGlobalContext } from '@/context/GlobalProvider'

const ProfileEdit = ({ user, fileId }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(user?.avatar)
    const { setUser } = useGlobalContext()
    const router = useRouter()
    const formSchema = profileSchema()
    const extractFileId = (url) => {
        const match = url.match(/\/files\/([^/]+)/);
        return match ? match[1] : null;
    }
    
    //define form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: user?.firstName || '',
          lastName: user?.lastName ||  ''
        },
    })
    const onSubmit = async (data) => {
        //console.log(data)
        setIsLoading(true)
        try {
            //TODO
            const userData = {
                firstName: data.firstName,
                lastName: data.lastName,
                imageUrl: imageUrl
            }
            const res = await updateUser(user?.$id, userData)
            if (res) {
                const updatedUser = await getLoggedInUser()
                if (updatedUser) {
                    setUser(updatedUser)
                }
                if(fileId !== 'default') {
                    const hasImage = await checkImage(fileId)
                    const currId = extractFileId(imageUrl)
                    if(hasImage && currId !== fileId) {
                        const result = await axios.delete('/api/upload?fileId='+fileId)
                        if (result) {
                            toast.success('Profile updated successfully')
                            router.push('/profile')
                        } else {
                            toast.success('Profile updated successfully')
                            router.push('/profile')
                        }
                    } else {
                        toast.success('Profile updated successfully')
                        router.push('/profile')
                    }
                    
                } else {
                    toast.success('Profile updated successfully')
                    router.push('/profile')
                }
            }
        } catch (error) {
            console.log(error)
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
  return (
    <div className='flex flex-col justify-center items-center w-full my-4'>
        <div className='wide-form'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 xl:min-w-[400px] my-10'>
                    <div className='flex gap-2 items-center'>
                        <div className='relative w-[102px] h-[102px] rounded-full border-2 border-success-1'>
                            <Image fill sizes='100' src={imageUrl} alt='Profile' className='rounded-full w-[100px] h-[100px]' priority />
                        </div>
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
                    <div className='flex gap-4'>
                        <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' id='fname' />
                        <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your last name' id='lname' />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Button type='submit' disabled={isLoading} className='form-btn'>
                            {isLoading ? (
                                    <>
                                        <Loader2 size={20} className='animate-spin' /> &nbsp;
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                    Update Profile
                                    </>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default ProfileEdit