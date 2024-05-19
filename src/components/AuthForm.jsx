'use client'
import React, { useState } from 'react'
import Breadlinks from './Breadlinks'
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, UserPlus } from 'lucide-react'
import { authFormSchema } from '@/lib/utils'
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


const AuthForm = ({ type }) => {
    let crumbpage = ''
    type === 'Login' ? crumbpage = 'Login' : crumbpage = 'Register'
    const [isLoading, setIsLoading] = useState(false)
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
                password:  data.password
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
                            <div className='flex gap-4'>
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
                <footer className="flex justify-center gap-1">
                    <p className="text-14 font-normal text-gray-600">
                        {type === 'Login'
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </p>
                    <Link href={type === 'Login' ? '/register' : '/login'} className="form-link">
                        {type === 'Login' ? 'Register' : 'Login'}
                    </Link>
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