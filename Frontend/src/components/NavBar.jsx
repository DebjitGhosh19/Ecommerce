import React from 'react'
import {NavLink} from 'react-router-dom'
import  {assets} from '../assets/frontend_assets/assets.js'
const NavBar = () => {
  return (
    <div className=' flex justify-between items-center py-5 font-medium'>
      <img src={assets.logo} alt="logo"  className='w-36'/>
      <div className='hidden sm:flex  justify-center'>
            <ul className='flex gap-2'>
               <NavLink className='flex flex-col items-center justify-center  '>
                <p>Home</p>
                <hr  className='w-2/4'/>
               </NavLink>
               <NavLink>
                <p>Home</p>
                <hr  className='w-2/4'/>
               </NavLink>
               <NavLink>
                <p>Home</p>
                <hr  className='w-2/4'/>
               </NavLink>
               
               <NavLink>
                <p>Home</p>
                <hr  className='w-2/4'/>
               </NavLink>

            </ul>
      </div>
    </div>
  )
}

export default NavBar
