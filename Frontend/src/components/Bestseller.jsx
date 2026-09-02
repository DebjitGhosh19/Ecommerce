import React, { useContext, useEffect, useState } from 'react'
import ProductItems from './ProductItems'
import { ShopContext } from '../context/ShopContext'

const Bestseller = () => {
   const [bestSeller, setBestSeller] = useState([])
   const {products} = useContext(ShopContext)
   useEffect(() => {
   const productCopy=products.filter((p)=>p.bestseller===true)
   setBestSeller(productCopy.slice(0,5))
   console.log("Best Seller Products:", productCopy);
   
   }, [products])
   
  return (
    <div className='my-10'>
      <div className="flex items-center justify-center gap-2">
          <h1 className=" text-xl sm:text-5xl my-3 uppercase ">
          Best <span className="text-gray-500">Seller</span>
          </h1>
          <hr className=" w-8 sm:w-15  h-2 sm:h-4 justify-center items-center  mt-3 sm:mt-7"></hr>
        </div>
         <p className="m-auto text-center text-xm sm:text-sm lg:text-base text-gray-500 w-3/4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo cumque
          voluptas provident culpa ad ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, sunt!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 pt-10">
            {
                      bestSeller.length>0? bestSeller.map((item,index)=>(
            <ProductItems key={index} price={item.price} id={item._id} images={item.images[0]} name={item.name}/>
          )): <p className="text-center text-gray-500">No bestseller products available.</p>
            }
        </div>
    </div>
  )
}

export default Bestseller
