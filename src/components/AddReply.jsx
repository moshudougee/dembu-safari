import { createMessageReply } from '@/lib/server/repliesActions'
import { messageReplySchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Form } from './ui/form'
import CustomTextArea from './CustomTextArea'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

const AddReply = ({ messageId, user }) => {
    const [isLoading, setIsLoading] = useState(false)
    const formSchema = messageReplySchema()
    const router = useRouter()
    let sender, pathName = ''
    if (user?.role === 'ADMIN') {
        sender = 'ADMIN'
        pathName = '/admin/contact'
    } else {
        sender = 'CLIENT'
        pathName = `/contact/messages?userId=${user?.$id}`
    }
    //define form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: ''
        }
    })
    const onSubmit = async (data) => {
        //console.log(data)
        setIsLoading(true)
        try {
            //TODO
            const replyData = {
                messageId: messageId,
                userId: user?.$id,
                sender: sender,
                message: data.message
            }
            const res = await createMessageReply(replyData)
            if (res) {
                toast.success('Message Added Successfully')
                router.push(pathName)
            }
        } catch (error) {
            console.log(error)
            toast.error('Internal Server error, Adding message')
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className='flex flex-col items-center w-full my-2'>
        <p className='font-normal text-safari-2 py-1 px-5'>
            Feel free to provide additional information about the message.
        </p>
        <div className='wide-form'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 xl:min-w-[400px] my-10'>
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

export default AddReply