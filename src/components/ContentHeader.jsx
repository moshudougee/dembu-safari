import React from 'react'
import Breadlinks from './Breadlinks'

const ContentHeader = ({crumbPage, crumbLinks=[], icon, title, subtitle=''}) => {
  return (
    <>
        <div className='breadcrumb'>
            <Breadlinks 
                crumbPage={crumbPage}
                crumbLinks={crumbLinks}
            />
        </div>
        <hr className="hr"/>
        <div className='flex flex-col h-auto w-full'>
            <div className='flex gap-2 w-full m-5 text-safari-1 justify-start items-center'>
                {icon}
                <span className='font-normal text-[18px]'>{title}</span>
                {subtitle !== '' && 
                <span className='font-normal text-[14px] ms-8'>{subtitle}</span>
                }
            </div>
        </div>
        <hr className="hr"/>
    </>
  )
}

export default ContentHeader