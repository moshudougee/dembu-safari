'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContentHeader from '@/components/ContentHeader'
import CustomInput from '@/components/CustomInput'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { forgotPassword } from '@/lib/server/userActions'
import { forgotSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaUserCog } from "react-icons/fa"

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const formSchema = forgotSchema()
    const crumbPage = 'Forgot Password'
    //define form
    const form = useForm({
        resolver: zodResolver(formSchema),
    })
    const onSubmit = async (data) => {
        //console.log(data)
        const email = data.email
        //TODO
        try {
            setIsLoading(true)
            const res = await forgotPassword(email)
            if (res) {
                toast.success('Link to reset password sent to your email')
            } else {
                toast.error('Sorry an Error occurred make sure you provide the registerd email or create new account')
                router.push('/login')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className='min-h-screen'>
        <ContentHeader 
            crumbPage={crumbPage}
            icon={<FaUserCog />}
            title={crumbPage}
            subtitle='Enter your email to reset your password'
        />
        <div className='flex flex-col items-center w-full my-4'>
            <div className='wide-form'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 xl:min-w-[400px] my-10'>
                        <CustomInput control={form.control} name='email' label="Recovery Email" placeholder='Enter your email' id='email' />
                        <div className='flex justify-center'>
                            <Button type='submit' disabled={isLoading} className='form-btn'>
                                {isLoading? (
                                    <>
                                        <Loader2 size={20} className='animate-spin' /> &nbsp;
                                        Loading...
                                    </> 
                                ): 'Send Recovery Link'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
        <hr className="hr"/>
            <AdsHorizontal />
        <hr className="hr"/>
    </div>
  )
}

export default ForgotPassword