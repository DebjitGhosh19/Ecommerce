import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
// import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity,navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  // console.log(cartItems);

  useEffect(() => {
    const temp = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          temp.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(temp);
    // console.log(cartData);
  }, [cartItems]);

  return (
    <div>
      <div>
        <div className="flex gap-2 items-center sm:gap-4  my-10">
          <h1 className="text-gray-400 text-sm sm:text-2xl ">
            YOUR <span className="text-black">CART</span>
          </h1>
          <hr className="w-8 sm:w-11 " />
        </div>
<hr className="border-gray-300" />
        { cartData.map((item, index) => {
          const productData = products.find(
            (product) =>( product._id == item._id)
          );
          
          return (
            <div key={index} className="grid grid-cols-[1fr_4fr_1fr_1fr]  gap-4 border-b p-2 items-center sm:justify-between ">
              <div>
                <img
                  className="w-20"
                src={productData.image[0]}
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] sm:text-2xl font-semibold ">
                 {productData.name}
                </p>
                <div className="flex gap-4">
                  <p className="text-sm sm:text-2xl">{currency}{productData.price}</p>
                  <p className="bg-gray-300 py-1 px-2 text-[10px] sm:text-sm">
                    {item.size}
                  </p>
                </div>
              </div>
              <div>
                <input
                  type="number"
                  name=""
                  id=""
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) => updateQuantity(item._id, item.size, parseInt(e.target.value))}
                  className="w-10 sm:w-15 text-sm  border p-1 border-gray-400"
                />
              </div>
              <div>
                <img onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  alt=""
                  className="w-5 sm:w-6 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
    <div className="my-10 flex justify-end px-2 sm:px-0">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm sm:p-6">
        <CartTotal />
        <button
          onClick={() => navigate("/place-order")}
          className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 sm:text-base"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
    </div>
  );
};

export default Cart;
