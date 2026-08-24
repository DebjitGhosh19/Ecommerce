import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setproductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState([]);

  console.log(size);

  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setproductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  const filterProduct = async () => {};
  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2  pt-5 transition-opacity ease-in duration-500  opacity-100 ">
      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                className="w-[24%] sm:w-full sm:mb-3  cursor-pointer "
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* Product description */}
        <div className="flex flex-1 flex-col gap-5">
          <p className="font-semibold  text-2xl"> {productData.name}</p>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
          </div>
          <p className="text-3xl  font-medium  ">
            {currency} {productData.price}
          </p>
          <p className="text-gray-500 mt-5 mb-10 md:w-1/2">
            {productData.description}
          </p>
          <div className="flex gap-4 items-center">
            <p>Select Size </p>
            <div className="flex gap-2">
              {productData.sizes.map((i, index) => (
                <button
                  key={index}
                  onClick={() => setSize(i)}
                  className={`bg-gray-200 border cursor-pointer px-4 py-2 ${size == i ? "border-orange-600 " : ""} `}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-sm active:bg-gray-700 w-40 mt-6  text-white   p-4 cursor-pointer">
            ADD TO CART
          </button>
          <hr className="mt-8  text-gray-200 sm:w-4/5" />
          <div className="flex flex-col  text-gray-500 text:sm  gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description && Reviews Section */}
      <div className="mt-20">
        <div className="">
          <button className="border px-5 py-2 border-gray-400 font-bold ">
            DesCription
          </button>
          <button className="border px-5 py-2 border-gray-400 ">
            Reviews(122)
          </button>
        </div>
        <div className="flex flex-col gap-4 border p-6 border-gray-400 text-gray-400 ">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      {/* RELATED PRODUCTS */}
    <RelatedProducts subCategory={productData.subCategory} category={productData.category} />
    </div>
  ) : (
    <div className="opacity-0 "></div>
  );
};

export default Product;
