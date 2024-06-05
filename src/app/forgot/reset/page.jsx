'use client'
import AdsHorizontal from '@/components/AdsHorizontal'
import ContentHeader from '@/components/ContentHeader'
import CustomInput from '@/components/CustomInput'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { resetPassword } from '@/lib/server/userActions'
import { resetSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaUserCog } from 'react-icons/fa'

const ResetPassword = () => {
    const params = useSearchParams()
    const userId = params.get('userId')
    const secret = params.get('secret')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const formSchema = resetSchema()
    const crumbPage = 'Forgot Password'
    const crumbLinks = [ {name: 'Forgot Password', href: '/forgot'} ]
    //define form
    const form = useForm({
        resolver: zodResolver(formSchema),
    })
    const onSubmit = async (data) => {
        //console.log(data)
        setIsLoading(true)
        const { password, confirmPassword } = data
        try {
            //TODO
            const res = await resetPassword(userId, secret, password, confirmPassword)
            if (res) {
                toast.success('Password reset successful')
                router.push('/login')
            } else {
                toast.error('Password reset failed')
                //router.push('/forgot')
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
            crumbLinks={crumbLinks}
            icon={<FaUserCog />}
            title={crumbPage}
            subtitle='Enter new password'
        />
        <div className='flex flex-col items-center w-full my-4'>
            <div className='wide-form'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 xl:min-w-[400px] my-10'>
                        <CustomInput control={form.control} name='password' label="New Password" placeholder='Enter new password' id='password' />
                        <CustomInput control={form.control} name='passwordConfirm' label="Confirm Password" placeholder='Confirm password' id='passwordConfirm' />
                        <div className='flex justify-center'>
                            <Button type='submit' disabled={isLoading} className='form-btn'>
                                {isLoading? (
                                    <>
                                        <Loader2 size={20} className='animate-spin' /> &nbsp;
                                        Loading...
                                    </> 
                                ): 'Reset Password'}
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

export default ResetPassword