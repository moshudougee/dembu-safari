'use client'
import { contactSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from './ui/form'
import CustomInput from './CustomInput'
import CustomTextArea from './CustomTextArea'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { createMessage } from '@/lib/server/messageActions'
import toast from 'react-hot-toast'

const ContactForm = ({ user=null }) => {
    const [isLoading, setIsLoading] = useState(false)
    const formSchema = contactSchema()
    const router = useRouter()
    //define form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            subject: '',
            message: ''
         }
     })
     //define a submit handler
     const onSubmit = async (data) => {
        //console.log(data)
        setIsLoading(true)
        try {
            //TODO
            const messageData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                subject: data.subject,
                message: data.message,
                userId: user?.$id || null
            }
            const res = await createMessage(messageData)
            if (res) {
                toast.success('Message sent successfully')
                form.reset()
                router.push('/contact')
            }
        } catch (error) {
            console.log(error)
            toast.error('Internal Server error, creating message')
        } finally {
            setIsLoading(false)
        }
     }
  return (
    <div className='flex flex-col items-center w-full my-4'>
        <p className='font-normal text-safari-2 py-2 px-5'>
            We welcome your feedback and inquiries. Please send us a message with your concerns, and we will respond promptly.
        </p>
        <div className='wide-form'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 xl:min-w-[400px] my-10'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' id='fname' />
                        <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your last name' id='lname' />
                    </div>
                    <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' id='email' />
                    <CustomInput control={form.control} name='subject' label="Subject" placeholder='Enter your subject' id='subject' />
                    <CustomTextArea control={form.control} name='message' label="Message" placeholder='Enter your message' id='message' />
                    <div className='flex flex-col gap-4'>
                        <Button type='submit' disabled={isLoading} className='form-btn'>
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin' /> &nbsp;
                                    Loading...
                                </>
                            ) : 'Send Message'
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default ContactForm