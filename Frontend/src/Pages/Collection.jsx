import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "../components/ProductItems";
import { assets } from "../assets/frontend_assets/assets.js";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState([]);
  const [priceFilter, setPriceFilter] = useState("Relevant");

  //categories
  const categoriesHandelar = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories((prev) => prev.filter((item) => item !== value));
    } else {
      setCategories((prev) => [...prev, e.target.value]);
    }
  };
  // typeHandelar
  const typeHandelar = (e) => {
    if (type.includes(e.target.value)) {
      setType((prev) => prev.filter((i) => i !== e.target.value));
    } else {
      setType((prev) => [...prev, e.target.value]);
    }
  };
  //Flter by price
  const priceHandelar = () => {
    let productCopy = products.slice();

    if ("Relevant" === priceFilter) {
      filterProducts();
    } else if ("High" === priceFilter) {
      setFilter(productCopy.sort((a, b) => b.price - a.price));
    } else if ("Low" === priceFilter) {
      // setFilter(productCopy)
      setFilter(productCopy.sort((a, b) => a.price - b.price));
    }
  };


useEffect(() => {
  let productCopy = [...products];

  // Category Filter
  if (categories.length > 0) {
    productCopy = productCopy.filter((item) =>
      categories.includes(item.category)
    );
  }

  // Type Filter
  if (type.length > 0) {
    productCopy = productCopy.filter((item) =>
      type.includes(item.subCategory)
    );
  }

  // Price Sort
  if (priceFilter === "High") {
    productCopy.sort((a, b) => b.price - a.price);
  } else if (priceFilter === "Low") {
    productCopy.sort((a, b) => a.price - b.price);
  }

  setFilter(productCopy);
}, [products, categories, type, priceFilter]);
  return (
    <div>
      <hr className="text-gray-400 " />
      <div className="flex  flex-col sm:flex-row gap-1 sm:gap-10 pt-10  ">
        <div className="flex gap-4 flex-col w-full sm:w-[21%]">
          <div
            className="flex items-center gap-4 cursor-pointer "
            onClick={() => setShowFilter(!showFilter)}
          >
            <h3 className="uppercase py-4 text-2xl">Filters</h3>
            <img
              src={assets.dropdown_icon}
              className={`h-5 sm:hidden  ${showFilter ? "rotate-90" : ""} `}
              alt=""
            />
          </div>
          <div
            className={` ${showFilter ? "" : "hidden"}  sm:flex sm:flex-col gap-2.5`}
          >
            <div className="border p-2  pl-5  text-gray-600">
              <h3 className="uppercase mb-2">categories</h3>
              <div className="flex flex-col gap-2 ">
                <div className="flex gap-2">
                  <input
                    id="men"
                    className=" cursor-pointer "
                    type="checkbox"
                    value="Men"
                    onChange={categoriesHandelar}
                  />
                  <label htmlFor="men" className="cursor-pointer">
                    Men
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    className=" cursor-pointer "
                    id="women"
                    type="checkbox"
                    value="Women"
                    onChange={categoriesHandelar}
                  />
                  <label htmlFor="women" className="cursor-pointer">
                    Women
                  </label>
                </div>

                <div className="flex gap-2">
                  <input
                    className=" cursor-pointer "
                    id="kids"
                    type="checkbox"
                    value="Kids"
                    onChange={categoriesHandelar}
                  />
                  <label htmlFor="kids" className="cursor-pointer">
                    Kids
                  </label>
                </div>
              </div>
            </div>

            <div className={`border p-2 mt-4 pl-5 text-gray-600`}>
              <h3 className="uppercase  mb-2">Type</h3>
              <div className="flex flex-col gap-2">
                <label className="flex gap-2 cursor-pointer">
                  <input
                    className=" cursor-pointer "
                    type="checkbox"
                    value="Topwear"
                    onChange={typeHandelar}
                  />
                  Topwear
                </label>

                <label className="flex gap-2 cursor-pointer">
                  <input
                    className=" cursor-pointer "
                    type="checkbox"
                    value="Bottomwear"
                    onChange={typeHandelar}
                  />
                  Bottomwear
                </label>

                <label className="flex gap-2 cursor-pointer">
                  <input
                    className=" cursor-pointer "
                    type="checkbox"
                    value="Winterwear"
                    onChange={typeHandelar}
                  />
                  Winterwear
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-[79%] ">
          <div className="flex justify-between py-2 flex-col sm:flex-row gap-4">
            <div className="flex items-center justify-center gap-2 ">
              <h3 className="uppercase  text-2xl">All Collections </h3>
              <hr className="w-8 sm:w-12 " />
            </div>
            <select
              name=""
              id=""
              className="border p-2"
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="Relevant">Sort by: Relevant</option>
              <option value="High">Sort by: High to Low</option>
              <option value="Low">Sort by: Low to High</option>
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
