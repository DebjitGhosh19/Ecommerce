import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setproductData] = useState(false);
  const [image, setImage] = useState("");

  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setproductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2  pt-10 transition-opacity ease-in duration-500  opacity-100 ">
      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {productData.image.map((item, index) => (
              <div>
                <img
                  onClick={() => setImage(item)}
                  key={index}
                  src={item}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer "
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
          {/* Product description */}
          <div>
            <p className="font-semibold  text-2xl"> {productData.name}</p>
            <p></p>
            <p>
           
              {currency} {productData.price}
            </p>
            <p>{productData.description}</p>
            <div>
              <p>Select Size </p>
              {productData.sizes.map((i, index) => (
                <p>{i}</p>
              ))}
            </div>
            <button>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0 "></div>
  );
};

export default Product;
