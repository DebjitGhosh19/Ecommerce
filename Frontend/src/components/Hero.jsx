import React from 'react'
import {assets} from '../assets/frontend_assets/assets.js'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-2 items-center justify-center border m-3'>
        <div className='w-full sm:w-1/2 p-3 sm:p-0 flex flex-col py-10 sm:py-0 items-center justify-center gap-3 sm:gap-5'>
            
                <div className='flex items-center  gap-2  '>
                    <hr className='w-8 lg:w-11' />
                    <p >OUR BESTSELLERS</p>
                </div>
             
                    <h1  className='flex text-3xl lg:5xl items-center ' >Latest Arrivals</h1>
               
                <div className='flex items-center  gap-2'>
                    <p >SHOP NOW</p>
                    <hr className='w-8 lg:w-11'/>
                </div>
           
        </div>
      <img src={assets.hero_img} alt="heroImg"  className='w-full sm:w-1/2' />
    </div>
  )
}

export default Hero
