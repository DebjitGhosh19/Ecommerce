import React from 'react'
import {assets} from '../assets/frontend_assets/assets.js'
const Policy = () => {
  return (
    <div className='my-10 '>
      <div className='flex flex-col sm:flex-row  gap-12 sm:gap-8 justify-center items-center'>
    <div className='flex flex-col gap-2 items-center justify-center'>
        <img src={assets.exchange_icon} className='w-10' alt="" />
        <p className='font-bold'>Easy Exchange Policy</p>
        <p className=' text-center text-gray-400'>We offer hassie free exchange policy</p>
    </div>
     <div className='flex flex-col gap-2 items-center justify-center'>
        <img src={assets.quality_icon} className='w-10' alt="" />
        <p className='font-bold'>7 Days Return Policy</p>
        <p className=' text-center text-gray-400'>We provide 7 Days free return policy</p>
    </div>
     <div className='flex flex-col gap-2 items-center justify-center'>
        <img src={assets.support_img} className='w-10' alt="" />
        <p className='font-bold'>Best customer support</p>
        <p className='text-gray-400 text-center'>We provide 24/7 customer support</p>
    </div>
      </div>
    </div>
  )
}

export default Policy
