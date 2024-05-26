import React from 'react'
import { Button } from './ui/button'
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react'

const Pagination = () => {
  return (
    <div className='pagination'>
        <div className='pagination-item'>
            <Button className='pagination-button'>
                <ArrowBigLeftDash />
                <span className='font-normal'>Previous</span>
            </Button>
            <div className='flex text-safari-2'>
                <span className='font-normal'>1 of 5</span>
            </div>
            <Button className='pagination-button'>
                <span className='font-normal'>Next</span>
                <ArrowBigRightDash />
            </Button>
        </div>
    </div>
  )
}

export default Pagination