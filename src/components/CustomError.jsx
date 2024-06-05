import { ServerCrash } from 'lucide-react'
import React from 'react'

const CustomError = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className='flex gap-2 justify-center items-center text-red-700'>
            <ServerCrash className='animate-bounce'/>
            <span className='text-xl font-semibold'>OOOps!!!!</span>
            <span>Internal Server error..Kindly Contact support</span>
        </div>
    </div>
  )
}

export default CustomError