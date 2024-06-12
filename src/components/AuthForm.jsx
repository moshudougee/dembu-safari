'use client'
import React, { useState } from 'react'
import Breadlinks from './Breadlinks'
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Loader2, UserPlus } from 'lucide-react'
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE, authFormSchema } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { Form } from './ui/form'
import CustomInput from './CustomInput'
import { Button } from './ui/button'
import Link from 'next/link'
import AdsHorizontal from './AdsHorizontal'
import { useRouter } from 'next/navigation'
import { login, register } from '@/lib/server/userActions'
import { useGlobalContext } from '@/context/GlobalProvider'
import CustomLoading from './CustomLoading'
import prof from '@/images/profile.jpeg'
import axios from 'axios'
import Image from 'next/image'
import toast from 'react-hot-toast'


const AuthForm = ({ type }) => {
    let crumbpage = ''
    type === 'Login' ? crumbpage = 'Login' : crumbpage = 'Register'
    const [isLoading, setIsLoading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const {setUser, loggedIn, setLoggedIn, loading, path} = useGlobalContext()
    const formSchema = authFormSchema(type)
    const router = useRouter()
    //define form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ''
        },
    })
    //define a submit handler
    const onSubmit = async (data) => {
        //console.log(data)
        setIsLoading(true)
        try {
           if (type === 'Register') {
            const userData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password:  data.password,
                imageUrl: imageUrl
            }
            const res = await register(userData)
            if (res) {
                setUser(res)
                setLoggedIn(true)
            }
           }
           if (type === 'Login') {
            const response = await login({
                email: data.email,
                password:  data.password
            })
            if (response) {
                setUser(response)
                setLoggedIn(true)
            }
           }
        } catch (error) {
           console.log(error) 
        } finally {
            setIsLoading(false)
            //if (!loading && loggedIn) router.push(path)
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
    if (loading) {
        return (
            <CustomLoading />
        )
    }
    if (!loading && loggedIn) router.push(path)
    
  return (
    <div className='min-h-screen'>
        <div className='breadcrumb'>
            <Breadlinks 
                crumbPage={crumbpage}
            />
        </div>
        <hr className="hr"/>
        <div className="flex flex-col h-auto w-full">
            <div className="flex gap-2 w-full m-5 text-safari-1 justify-start items-center">
                <UserPlus />
                <span className="font-normal text-[18px]">
                    {type === 'Login' ? 'Login' : 'Register'}
                </span>
                <span className='font-normal text-[16px] ms-2'>Enter your details</span>
            </div>
        </div>
        <hr className="hr"/>
        <div className='flex flex-col justify-center items-center w-full my-4'>
            <div className='auth-form'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 xl:min-w-[400px] my-10'>
                    {type === 'Register' && (
                        <>
                            <div className='flex gap-2 max-md:justify-center items-center'>
                                
                                    <div className='relative w-[102px] h-[102px] rounded-full border-2 border-success-1'>
                                        <Image fill sizes='100' src={imageUrl || prof} alt='Profile' className='rounded-full w-[100px] h-[100px]' priority />
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
                            <div className='flex flex-col md:flex-row gap-4'>
                                <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' id='fname' />
                                <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your last name' id='lname' />
                            </div>
                        </>
                    )}
                    <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' id='email' />
                    <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' id='password' type='password' />
                    <div className='flex flex-col gap-4'>
                        <Button type='submit' disabled={isLoading} className='form-btn'>
                            {isLoading ? (
                                    <>
                                        <Loader2 size={20} className='animate-spin' /> &nbsp;
                                        Loading...
                                    </>
                                ) : (
                                    type ==='Register' 
                                        ? 'Register'
                                        : 'Login'
                            )}
                        </Button>
                    </div>
                </form>
                <footer className="flex flex-col justify-center gap-1">
                    <div className='flex justify-center gap-1'>
                        <p className="text-14 font-normal text-gray-600">
                            {type === 'Login'
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link href={type === 'Login' ? '/register' : '/login'} className="form-link">
                            {type === 'Login' ? 'Register' : 'Login'}
                        </Link>
                    </div>
                    {type === 'Login' && 
                        <div className='flex justify-center gap-1'>
                            <p className="text-14 font-normal text-gray-600">
                                Forgot password?
                            </p>
                            <Link href='/forgot' className="form-link">
                                Reset
                            </Link>
                        </div>
                    }
                    
                </footer>
            </Form>
            </div>
        </div>
        <hr className="hr"/>
        <AdsHorizontal />
        <hr className="hr"/>
    </div>
  )
}

export default AuthForm