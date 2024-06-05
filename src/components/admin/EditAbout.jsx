import React, { useState } from 'react'
import { Form } from '@/components/ui/form'
import { addAboutSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import CustomInput from '../CustomInput'
import { Button } from '../ui/button'
import { Loader2, PlusSquare, Trash2 } from 'lucide-react'
import CustomTextArea from '../CustomTextArea'
import toast from 'react-hot-toast'
import { updateAbout } from '@/lib/server/aboutActions'

const EditAbout = ({ data }) => {
    const id = data?.$id
    const [isLoading, setIsLoading] = useState(false)
    const offerTitle = []
    const offerDetails = []
    const chooseTitle = []
    const chooseDetails = []
    const formSchema = addAboutSchema()
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
    //define form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            intro: data?.intro || '',
            mission: data?.mission || '',
            offer: offer || [{ title: '', details: '' }],
            choose: choose || [{ title: '', details: '' }],
            conclusion: data?.conclusion || '',
        }
    })
    const { fields: offerFields, append: offerAppend, remove: offerRemove } = useFieldArray({
        control: form.control,
        name: 'offer',
    })
    const { fields: chooseFields, append: chooseAppend, remove: chooseRemove } = useFieldArray({
        control: form.control,
        name: 'choose',
    })
    const onSubmit = async (data) => {
        //console.log('Form Data:', data);
        setIsLoading(true)
        try {
            for (let i = 0; i < data.offer.length; i++) {
                offerTitle.push(data.offer[i].title)
                offerDetails.push(data.offer[i].details)
            }
            for (let i = 0; i < data.choose.length; i++) {
                chooseTitle.push(data.choose[i].title)
                chooseDetails.push(data.choose[i].details)
            }
            const aboutData = {
                intro: data.intro,
                mission: data.mission,
                offerTitle: offerTitle,
                offerDetails: offerDetails,
                chooseTitle: chooseTitle,
                chooseDetails: chooseDetails,
                conclusion: data.conclusion
            }
            //TO DO --ADD ABOUT TO APPWRITE DATABASE
            const res = await updateAbout(id, aboutData)
            if (res) {
                toast.success('About updated successfully')
                router.push('/admin/about')
            }
        } catch (error) {
            console.log(error)
            toast.error('Internal Server error, updating about')
        } finally {
            setIsLoading(false)
        }
      }
  return (
    <div className='flex flex-col items-center w-full my-4'>
        <div className='wide-form'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 xl:min-w-[400px] my-10'>
                    <CustomTextArea control={form.control} name='intro' label="Introduction" placeholder='Enter About us introduction' id='intro' />
                    <CustomTextArea control={form.control} name='mission' label="Mission" placeholder='Enter About us mission' id='intro' />
                    <div className='flex flex-col gap-4'>
                        <p>What we offer (provide details)</p>
                        {offerFields.map((field, index) => (
                            <div key={index} className='flex flex-col gap-4'>
                                <CustomInput control={form.control} name={`offer[${index}].title`} label="Title" placeholder='Enter offer title' id='title' />
                                <CustomTextArea control={form.control} name={`offer[${index}].details`} label="Details" placeholder='Enter offer details' id='details' />
                                <Button 
                                    type='button' 
                                    onClick={() => offerRemove(index)} 
                                    className='w-16 bg-transparent shadow text-red-700'
                                >
                                    <Trash2 size={20} />
                                </Button>
                            </div>
                        ))}
                        <Button 
                            type='button' 
                            onClick={() => offerAppend({title: '', details: ''})} 
                            className='flex gap-2 w-[130px] bg-transparent shadow text-success-1 hover:text-safari-2'
                        >
                            <PlusSquare />
                            <span>Add More..</span>
                        </Button>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p>Why choose us (provide details)</p>
                        {chooseFields.map((field, index) => (
                            <div key={index} className='flex flex-col gap-4'>
                                <CustomInput control={form.control} name={`choose[${index}].title`} label="Title" placeholder='Enter choose title' id='title' />
                                <CustomTextArea control={form.control} name={`choose[${index}].details`} label="Details" placeholder='Enter choose details' id='details' />
                                <Button 
                                    type='button' 
                                    onClick={() => chooseRemove(index)}
                                    className='w-16 bg-transparent shadow text-red-700'
                                >
                                    <Trash2 size={20} />
                                </Button>
                            </div>
                        ))}
                        <Button 
                            type='button' 
                            onClick={() => chooseAppend({title: '', details: ''})}
                            className='flex gap-2 w-[130px] bg-transparent shadow text-success-1 hover:text-safari-2'
                        >
                            <PlusSquare />
                            <span>Add More..</span>
                        </Button>
                    </div>
                    <CustomTextArea control={form.control} name='conclusion' label='Conclusion' placeholder='Enter About us conclusion' id='conclusion' />
                    <div className='flex flex-col gap-4'>
                        <Button type='submit' disabled={isLoading} className='form-btn'>
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin' /> &nbsp;
                                    Loading...
                                </>
                            ) : 'Update'
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default EditAbout