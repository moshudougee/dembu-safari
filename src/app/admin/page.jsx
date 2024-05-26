'use client'
import ContentHeader from '@/components/ContentHeader'
import CustomLoading from '@/components/CustomLoading'
import { useGlobalContext } from '@/context/GlobalProvider'
import { checkImage } from '@/lib/server/userActions'
import axios from 'axios'
import { Loader, Settings } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const AdminHome = () => {
  const { user, loggedIn, loading } = useGlobalContext()
  const [imageUrl, setImageUrl] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)
  const router = useRouter()
  const newUrl = 'https://cloud.appwrite.io/v1/storage/buckets/664a27f3002eca35b6ba/files/664a7bb1000c784f60de/view?project=664735b9002945431fdf'
  const extractFileId = (url) => {
    const match = url.match(/\/files\/([^/]+)/);
    return match ? match[1] : null;
  }
  const fileId = extractFileId(newUrl)
  const hasFile = async () => {
    const res = await checkImage(fileId)
    if (res) {
      toast.success('Image present')
      return true
    } else {
      toast.error('Image not found')
      return false
    }
  }
  const handleChange = async (e) => {
  const file = e.target.files[0]
    if(!file) {
      toast.error('Please select a file')
      return
    }
      const data = new FormData()
      data.append('file', file)
        try {
          setImageUploading(true)
          const res = await axios.post('/api/upload', data)
          if (res) {
            setImageUrl(res.data.url)
            toast.success('Image uploaded seccessfully')
          }
        } catch (error) {
          console.log('Error while uploading is '+error)
        } finally {
          setImageUploading(false)
        }
  }
  const handleDelete = async () => {
    try {
      setImageUploading(true)
      const res = await axios.delete('/api/upload?fileId='+fileId)
      if (res) {
        toast.success('Image deleted successfuly')
      }
    } catch (error) {
      console.log('Error while deleting is '+error)
      toast.error('Error deleting image')
    } finally {
      setImageUploading(false)
    }
  }
  
  if (loading) {
    return <CustomLoading />
  }
  if (!loggedIn || user === null) {
    return router.push('/')
  }
  if (loggedIn && user.role !== 'ADMIN') {
    return router.push('/')
  } else {
    return (
      <div className='min-h-screen'>
        <ContentHeader 
          crumbPage='Admin Panel'
          icon={<Settings />}
          title='Admin Panel'
          subtitle='Welcome to the Admin Panel'
        />
        <div className='flex justify-center items-center w-full my-10'>
          <div className='flex flex-col gap-1 justify-center items-center w-[900px] h-[400px] border rounded-md'>
            <p className='text-safari-2 text-xl my-8'>Select file to upload</p>
            <input name='myFile' type='file' onChange={handleChange} />
            {imageUploading && 
              <p className='text-success-1 text-lg my-8 flex gap-1'>
                <span className=' animate-spin'><Loader /></span>
                Image uploading....
              </p>}
            {newUrl && 
            <div className='flex relative w-24 h-24 rounded-md border p-2'>
              <Image src={newUrl} alt='Upload' width={50} height={50} className='w-[80px] h-80px' />
            </div>
            }
            <button className='rounded p-4 bg-green-600' onClick={hasFile}>Check</button>
            <button className='rounded p-4 bg-red-600' onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
 }

export default AdminHome