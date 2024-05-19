import Breadlinks from '@/components/Breadlinks'
import { PawPrint } from 'lucide-react'
import React from 'react'

const About = () => {
    const crumbPage = 'About'
  return (
    <div className='min-h-screen'>
        <div className='flex w-full m-2 ps-4'>
            <Breadlinks 
                crumbPage={crumbPage}
            />
        </div>
        <hr className="hr"/>
        <div className='flex flex-col h-auto w-full'>
            <div className='flex gap-2 w-full m-5 text-safari-1'>
                <PawPrint />
                <span className='font-normal text-[18px]'>About</span>
            </div>
        </div>
        <hr className="hr"/>
    </div>
  )
}

export default About