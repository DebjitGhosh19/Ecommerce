import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const LatestCollection = () => {
    const {products} = useContext(ShopContext)
    const [productsData, setProductsData] = useState(products)

    useEffect(() => {
      console.log(products);
      
    }, [])
    
  return (
    <div>
      <h1 className='text-center text-3xl sm:text-5xl my-10'> Latest Collection</h1>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-5'>
        {
            productsData.map((p)=>(
                <div key={p._id} className='border p-4  shadow rounded-2xl '>
                    <img src={p.image[0]} alt="productImage"  className=' '/>
                    <p className='text-sm text-center '>{p.name}</p>
                </div>
            ))
        }
    </div>
    </div>
  )
}

export default LatestCollection
