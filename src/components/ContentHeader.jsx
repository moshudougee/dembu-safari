import React from 'react'
import Breadlinks from './Breadlinks'

const ContentHeader = ({crumbPage, crumbLinks=[], icon, imageurl='', title, subtitle=''}) => {
  return (
    <div className='flex flex-col justify-center items-center md:justify-start w-full'>
        <div className='breadcrumb'>
            <Breadlinks 
                crumbPage={crumbPage}
                crumbLinks={crumbLinks}
            />
        </div>
        <hr className="hr"/>
        <div className='flex flex-col h-auto w-full'>
            <div className='flex gap-2 w-full m-5 text-safari-1 justify-center md:justify-start items-center'>
                {icon}
                {imageurl !== '' &&
                    <img src={imageurl} alt='flag' className='rounded w-5 h-auto' />
                }
                <span className='font-light lg:font-normal text-[14px] lg:text-[18px]'>{title}</span>
                {subtitle !== '' &&
                <div className='hidden md:flex'> 
                <span className='font-light lg:font-normal text-[12px] lg:text-[14px] ms-8'>{subtitle}</span>
                </div>
                }
            </div>
        </div>
        <hr className="hr"/>
    </div>
  )
}

export default ContentHeader