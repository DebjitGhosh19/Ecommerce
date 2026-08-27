import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();
// import {toast} from "react-hot-toast";
const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

   const navigate = useNavigate();
  const addToCart =async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    setCartItems((prev) => {
      const cartData = structuredClone(prev);

      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }

      return cartData;
    });

    toast.success("Added to Cart");
  };
  // useEffect(() => {
  //   console.log(cartItems);
    
  // }, [cartItems]);
  const getCartCount = () => {
  let totalCount = 0;

  for (const itemId in cartItems) {
    const sizes = cartItems[itemId];

    for (const size in sizes) {
      totalCount += sizes[size];
    }
  }

  return totalCount;
};

const updateQuantity=async (itemId,size,quantity) => {
  
  const newCartItems = structuredClone(cartItems);
  if (newCartItems[itemId] && newCartItems[itemId][size]) {
    newCartItems[itemId][size] = quantity;
    setCartItems(newCartItems);
  }

}
const getCartAmount =  () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
    const itemInfo = products.find((product) => product._id === itemId);

    if (!itemInfo) continue;

    for (const size in cartItems[itemId]) {
      if (cartItems[itemId][size] > 0) {
        totalAmount += cartItems[itemId][size] * itemInfo.price;
      }
    }
  }

  return totalAmount;
};

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    setSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
