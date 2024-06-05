'use client'
import { format, formatDistanceToNowStrict } from 'date-fns'
import React, { useEffect, useMemo, useState } from 'react'
import { FaCalendarCheck, FaTrash } from "react-icons/fa"
import { Button } from './ui/button'
import { FaFilePen } from 'react-icons/fa6'
import { deleteMessageReply, getMessageReplies } from '@/lib/server/repliesActions'
import CustomLoading from './CustomLoading'
import AddReply from './AddReply'
import { withSwal } from 'react-sweetalert2'
import { deleteMessage } from '@/lib/server/messageActions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const ContactMessage = ({ data, user, swal }) => {
    const id = data?.$id
    const [edit, setEdit] = useState(false)
    const [replies, setReplies] = useState(null)
    const replyIds = []
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const createdAt = useMemo(() => {
        return formatDistanceToNowStrict(new Date(data?.$createdAt))
    }, [data?.$createdAt])
    const handleEdit = () => {
        setEdit(true)
    }
    useEffect(() => {
      const fetchReplies = async () => {
        setIsLoading(true)
        try {
          const res = await getMessageReplies(id)
          if (res) {
            setReplies(res)
          }
        } catch (error) {
          console.log(error)
        } finally {
            setIsLoading(false)
        }
      }
      fetchReplies()
    }, [id])
    //console.log(data?.$id)
    if(replies) {
        for(let i = 0; i < replies.length; i++) {
            replyIds.push(replies[i]?.$id)
        }
    }
    //console.log(replyIds)
    const handleDelete = () => {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete message ${id}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if(result.isConfirmed) {
                setIsLoading(true)
                const res = await deleteMessage(id)
                if(res) {
                    if (replyIds.length > 0) {
                        let count = 0
                        for(let i = 0; i < replyIds.length; i++) {
                            const replyId = replyIds[i]
                            const res = await deleteMessageReply(replyId)
                            if(res) {
                                count++
                            }
                        }
                        if(count === replyIds.length) {
                            toast.success("Message deleted successfully")
                            setIsLoading(false)
                            router.push(`/contact/messages?userId=${user?.$id}`)
                        } else {
                            toast.success("Message deleted successfully")
                            setIsLoading(false)
                            router.push(`/contact/messages?userId=${user?.$id}`)
                        }
                    } else {
                        toast.success("Message deleted successfully")
                        setIsLoading(false)
                        router.push(`/contact/messages?userId=${user?.$id}`)
                    }
                }
            }
        })
    }

    if (isLoading) {
        <CustomLoading />
    }
  return (
    <div className='message'>
        <div className='message-header'>
            <FaCalendarCheck size={20} />
            <span className='font-normal'>{createdAt}</span>
            <Button className='btn-edit' onClick={handleEdit}>
                <FaFilePen size={20} />
                <span className='font-normal'>Edit</span>
            </Button>
            <Button className='btn-delete' onClick={handleDelete}>
                <FaTrash size={20} />
                <span className='font-normal'>Delete</span>
            </Button>
        </div>
        <div className='message-item'>
            <span className='message-item-title'>Subject</span>
            <span className='message-item-body'>{data?.subject}</span>
        </div>
        <div className='message-item'>
            <span className='message-item-title'>Message</span>
            <span className='message-item-body'>{data?.message}</span>
        </div>
        {replies &&
            <>
            <div className='message-reply'>
                {
                    replies.map((reply) => {
                        const createdAt = format(reply.$createdAt, 'MM/dd/yyyy')
                        let sender = ''
                        if (reply?.sender === 'CLIENT') {
                            sender = 'You'
                        } else {
                            sender = 'Admin'
                        }
                        return(
                            <div key={reply.$id} className='message-item'>
                                <span className='message-reply-item'>{`${sender} ${createdAt}`}</span>
                                <span className='message-item-body'>{reply.message}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className='message-header'>
                <Button className='btn-edit' onClick={handleEdit}>
                    <FaFilePen size={20} />
                    <span className='font-normal'>Edit</span>
                </Button>
            </div>
            </>
        
        }
        {edit &&
            <div className='flex flex-col w-full my-4'>
                <AddReply 
                    messageId={data?.$id}
                    user={user}
                />
            </div>
        }
    </div>
  )
}

export default withSwal(({swal, data, user}, ref) => (
    <ContactMessage data={data} user={user} swal={swal} />
))