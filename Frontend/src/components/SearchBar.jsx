import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import {useLocation} from 'react-router-dom'
const SearchBar = () => {
    const { search,showSearch,setSearch,setShowSearch} =useContext(ShopContext)
 const [visiable, setVisiable] = useState(false)
 const location=useLocation()
 useEffect(() => {
   if (location.pathname.includes("collection")) {
    setVisiable(true)
   }
   else{
    setVisiable(false)
   }
   
 }, [location])
 
    return visiable&&showSearch? (
  <div className='flex justify-center mb-4'>
     <div className=' cursor-pointer flex gap-2 sm:gap-4  justify-center px-4 py-3 items-center w-full bg-gray-200 p-2'>
      <div className='flex w-full sm:w-1/2 justify-between items-center gap-4 border border-gray-500 p-2 rounded-full'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className=' px-4 text-gray-400 rounded-full outline-0   text-sm w-full' type="text" name="" id="" placeholder='Search' />
        <img className='h-5 sm:h-6' src={assets.search_icon} alt="" />
      </div>
      <img onClick={()=>setShowSearch(false)} className='h-5 sm:h-6' src={assets.cross_icon} alt="" />
    </div> 
   </div>
  ):null
}

export default SearchBar
