import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Verify = () => {
     const  {cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        BACKEND_URL,
        token,
        setToken,products } = useContext(ShopContext)
        const [searchParams, setsearchParams] = useSearchParams()
        const success=searchParams.get('success')
         const orderId=searchParams.get('orderId')
        const verifyPayment = async () => {
    try {
        if (!token) return;

        const response = await axios.post(
            `${BACKEND_URL}/api/orders/verifyStripe`,
            { success, orderId },
            { headers: { token } }
        );

        if (response.data.success) {
            setCartItems({});
            navigate('/orders');
        } else {
            navigate('/cart');
        }
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message || 'Payment verification failed');
        navigate('/cart');
    }
};

useEffect(() => {
    verifyPayment();
}, [token, success, orderId]);
        
  return (
    <div>
      
    </div>
  )
}

export default Verify
