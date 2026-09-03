import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets.js";
import axios from "axios";
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
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const addToCart = async (itemId, size) => {
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
    if(token){
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/carts/add`,{itemId,size},
          {
            headers: {token: token},
          }
        );
        console.log("Added to cart:", response.data);
      }
      catch (error) {
        console.error("Error adding to cart:", error);
        toast.error(error.message || "Failed to add to cart");
      }
    }

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

  const updateQuantity = async (itemId, size, quantity) => {
    const newCartItems = structuredClone(cartItems);
    if (newCartItems[itemId] && newCartItems[itemId][size]) {
      newCartItems[itemId][size] = quantity;
      setCartItems(newCartItems);
    }
    if(token){
      try {
        const response = await axios.put(
          `${BACKEND_URL}/api/carts/update`,
          { itemId, size, quantity },
          {
            headers: { token: token },
          }
        );
        console.log("Cart updated:", response.data);
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error(error.message || "Failed to update cart");
      }
    }
  };
  const getCartAmount = () => {
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
  const getCartFromBackend = async () => {
    if (token) {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/carts/get`, null, {
          headers: { token: token },
        });
        const data = response.data.cartData;
        console.log("Fetched cart from backend:", data);
        setCartItems(data);
      }
      catch (error) {
        console.error("Error fetching cart from backend:", error);
        toast.error(error.message || "Failed to fetch cart");
      }
    }
  }


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/products/getAllProducts`,
        );
        const data = response.data.products;
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    getCartFromBackend();
  }, []);

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
    navigate,
    BACKEND_URL,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
