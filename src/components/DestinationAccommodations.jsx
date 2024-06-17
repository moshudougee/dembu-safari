import React from 'react'
import AdsHorizontal from './AdsHorizontal'

const DestinationAccommodations = ({ data }) => {
    const name = data?.name
    return (
      <div className='flex flex-col items-center w-full'>
          <div className='flex justify-center items-center w-full shadow rounded text-safari-2 my-5 mx-10 p-4'>
              <p className='font-normal text-center'>
                Are you offering accommodations services for tourists near or within <em>{name}</em> in Kenya? Promote your business with us today!
              </p>
          </div>
          <hr className="hr"/>
          <AdsHorizontal />
          <hr className="hr"/>
          <AdsHorizontal />
          <hr className="hr"/>
          <AdsHorizontal />
          <hr className="hr"/>
      </div>
    )
}

export default DestinationAccommodations