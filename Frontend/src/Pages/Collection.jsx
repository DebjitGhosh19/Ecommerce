import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "../components/ProductItems";
import { assets } from "../assets/frontend_assets/assets.js";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false)
  const [filter, setFilter] = useState([]);
  const [categories, setCategories] = useState([])
  const [type, setType] = useState([])


//categories
const categoriesHandelar=(e)=>{
e.preventDefault()
if (categories.find((i)=>i===e.target.value)) {
  const value=categories.filter((i)=>i!==e.target.value)
  setCategories(value)
} else { 
  setCategories([...categories,e.target.value])

}
}
// typeHandelar
const typeHandelar=(e)=>{
e.preventDefault()
if (type.find((i)=>i===e.target.value)) {
  const value=type.filter((i)=>i!==e.target.value)
  setType(value)
} else { 
  setType([...type,e.target.value])

}
}

useEffect(() => {
      console.log(categories);
    console.log(type);
 
}, [categoriesHandelar,typeHandelar])

  
  useEffect(() => {
    setFilter(products);

    
  }, []);

  return (
    <div >
      <hr className="text-gray-400" />
      <div className="flex  flex-col sm:flex-row gap-1 sm:gap-10 pt-10  ">
        <div className="flex gap-4 flex-col w-full sm:w-[20%]">
          <div className="flex items-center gap-4 cursor-pointer "  onClick={()=>setShowFilter(!showFilter)
          } >
              <h3 className="uppercase py-4">Filters</h3>
              <img
                src={assets.dropdown_icon}
                className={`h-5 sm:hidden  ${showFilter? 'rotate-90':""} `}
                alt=""
               
               />
            </div>
          <div className={` ${showFilter?'':'hidden'}  sm:flex sm:flex-col gap-2.5` }>
            
            <div className="border p-2  pl-5  text-gray-600">
              <h3 className="uppercase mb-2">categories</h3>
             <div className="flex flex-col gap-2 ">
               <div className="flex gap-2">
                <input onChange={(e)=>categoriesHandelar(e)} type="checkbox" name="Men" value={'Men'} /> Men
              </div>
              <div className="flex gap-2">
                <input onChange={(e)=>categoriesHandelar(e)} type="checkbox" name="Women" value={'Women'} /> Women
              </div>
              <div className="flex gap-2">
                <input className="w-3" onChange={(e)=>categoriesHandelar(e)} type="checkbox" name="Kids" value={'Kids'} /> Kids
              </div>
             </div>
            </div>

             <div className={`border p-2 mt-4 pl-5 text-gray-600`} >
            <h3 className="uppercase  mb-2">Type</h3>
            <div className="flex flex-col gap-2">
              <div >
              <input type="checkbox" name="Topwear" value={'Topwear'} onChange={(e)=>typeHandelar(e)}/> Topwear
            </div>
            <div>
              <input type="checkbox" name="Bottomwear" value={'Bottomwear'}onChange={(e)=>typeHandelar(e)} /> Bottomwear
            </div>
            <div>
              <input type="checkbox" name="Winterwear" value={'Winterwear'} onChange={(e)=>typeHandelar(e)}/> Winterwear
            </div>
            </div>
          </div>

          </div>

         
        </div>

        <div className="w-full sm:w-[80%] ">
          <div className="flex justify-between py-2 flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 ">
              <h3 className="uppercase  ">All Collections </h3>
              <hr className="w-8 sm:w-12 " />
            </div>
            <select name="" id="" className="border p-2">
              <option value="Relavent">Sort by: Relavent</option>
              <option value="Heaigh">Sort by: Heigh</option>
              <option value="Low">Sort by: Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 gap-y-6 mt-5">
            {filter.map((item, index) => (
              <ProductItems
                key={index}
                price={item.price}
                id={item._id}
                image={item.image[0]}
                name={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
