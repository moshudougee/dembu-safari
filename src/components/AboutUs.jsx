import { deleteAbout } from '@/lib/server/aboutActions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { withSwal } from 'react-sweetalert2'
import { Button } from './ui/button'
import { FilePenLine, Trash2 } from 'lucide-react'
import CustomLoading from './CustomLoading'

const AboutUs = ({ data, role='CLIENT', swal }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const offer = []
    const choose = []
    let item1, item2
    for(let i = 0; i < data?.offerTitle.length; i++) {
        item1 = {title: data.offerTitle[i], details: data.offerDetails[i]}
        offer.push(item1)
    }
    for(let i = 0; i < data?.chooseTitle.length; i++) {
        item2 = {title: data.chooseTitle[i], details: data.chooseDetails[i]}
        choose.push(item2)
    }
    const handleEdit = () => {
        router.push(`/admin/about/edit?id=${data?.$id}`)
    }
    const handleDelete = async () => {
        swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete About Us!!!..?',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if(result.isConfirmed) {
                setIsLoading(true)
                const res = await deleteAbout(data?.$id)
                if(res) {
                    toast.success("About Us deleted successfully")
                    setIsLoading(false)
                    router.push('/admin/about')
                }
            }
        })
    }
    if(isLoading) {
        return <CustomLoading />
    }
  return (
    <div className='flex flex-col w-full items-center'>
        <div className='about'>
            <div className='about-item'>
                <span className='about-item-details'>{data?.intro}</span>
            </div>
            <div className='about-item'>
                <span className='about-item-title'>Our Mission</span>
                <span className='about-item-details'>{data?.mission}</span>
            </div>
            <div className='about-item'>
                <span className='about-item-title'>What we offer</span>
                {offer.length > 0 && 
                    offer.map((offerItem, index) => {
                        return(
                            <div key={index} className='flex flex-col'>
                                <span className='about-item-subtitle'>{offerItem.title}</span>
                                <span className='about-item-details'>{offerItem.details}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className='about-item'>
                <span className='about-item-title'>Why choose us?</span>
                {choose.length > 0 && 
                    choose.map((chooseItem, index) => {
                        return(
                            <div key={index} className='flex flex-col'>
                                <span className='about-item-subtitle'>{chooseItem.title}</span>
                                <span className='about-item-details'>{chooseItem.details}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className='about-item'>
                <span className='about-item-title'>Join Us on This Journey</span>
                <span className='about-item-details'>{data?.conclusion}</span>
            </div>
            {role === 'ADMIN' && 
                <div className='flex gap-3 justify-center items-center'>
                    <div className='relative group'>
                        <Button onClick={handleEdit} className='bg-transparent hover:bg-transparent shadow-md'>
                            <FilePenLine className='text-safari-2 cursor-pointer' />
                        </Button>
                        <span className='hover-text bg-banner'>Edit</span>
                    </div>
                    <div className='relative group'>
                        <Button disabled onClick={handleDelete} className='bg-transparent hover:bg-transparent shadow-md'>
                            <Trash2 className=' text-red-700 cursor-pointer'/>
                        </Button>
                        <span className='hover-text bg-red-700 bg-opacity-75'>Delete</span>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default withSwal(({swal, data, role}, ref) => (
    <AboutUs data={data} role={role} swal={swal} />
))