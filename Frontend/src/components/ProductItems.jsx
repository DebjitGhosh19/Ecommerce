import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
const ProductItems = ({price,id,images,name}) => {
  const {currency,delivery_fee} = useContext(ShopContext)
  return (
    <div>
      <Link to={`/product/${id}` }key={id} className="text-gray-700 cursor-pointer  " >
           <div className=' overflow-hidden'>
             <img src={images} alt="productimages" className=" hover:scale-110 " />
           </div>
            <p className="text-sm pt-3 pb-1 ">{name}</p>
            <p className='text-sm font-medium'>{currency} {price}</p>
          </Link>
         
    </div>
  )
}

export default ProductItems
