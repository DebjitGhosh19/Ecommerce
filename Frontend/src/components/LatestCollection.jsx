import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
  setLatestProduct(  products.slice(0,10))
  }, []);

  return (
    <div className="my-10">
 
        <div className="flex items-center justify-center gap-2">
          <h1 className=" text-xl sm:text-5xl my-3 uppercase ">
            Latest <span className="text-gray-500">Collection</span>
          </h1>
          <hr className=" w-8 sm:w-15  h-2 sm:h-4 justify-center items-center  mt-3 sm:mt-7"></hr>
        </div>
        <p className="m-auto text-center text-xm sm:text-sm lg:text-base text-gray-500 w-3/4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo cumque
          voluptas provident culpa ad ducimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, sunt!
        </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 pt-10">
        {
          
          latestProduct.map((item,index)=>(
            <ProductItems key={index} price={item.price} id={item._id} image={item.image[0]} name={item.name}/>
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
