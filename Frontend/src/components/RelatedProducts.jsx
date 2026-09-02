import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import {Link} from 'react-router-dom'
import ProductItems from './ProductItems';
const RelatedProducts = ({category,subCategory}) => {
    // console.log(category,subCategory);
   const { products,currency} =useContext(ShopContext)
   const [related,setRelated] = useState([])


   const relatedProducts=async()=>{
     let  productsCopy= products;
     let filterProducts=  productsCopy.filter((p)=>p.category.includes(category)&&p.subCategory.includes(subCategory))
     let pc=filterProducts.slice(1,6)  
      setRelated(pc)  
   }
   useEffect(() => {
       relatedProducts()
   }, [category,subCategory])
   
  return (
    <div>
        <div className="mt-20 ">
        <div className="flex items-center justify-center gap-4">
          <h1 className=" text-xl sm:text-3xl my-3 uppercase  ">
            RELATED<span className="text-gray-500 ml-2 sm:ml-4">PRODUCTS</span>
          </h1>
          <hr className=" w-8 sm:w-15  h-2 sm:h-4 justify-center items-center  mt-3 sm:mt-7"></hr>
        </div>

{related &&<div className=' grid  gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 my-6 '>
  {
    related.map((item,index)=>(
       <ProductItems key={index} price={item.price} id={item._id} images={item.images[0]} name={item.name}/>
    ))
  }
</div>}

      </div>
    </div>
  )
}

export default RelatedProducts
