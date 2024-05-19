import { Loader2 } from 'lucide-react'
import React from 'react'

const CustomLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className='flex gap-2 justify-center items-center text-safari-2'>
            <Loader2 className='animate-spin'/>
            <span>Loading please wait...</span>
        </div>
    </div>
  )
}

export default CustomLoading