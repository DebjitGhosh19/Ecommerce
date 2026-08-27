import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
    const { cartItems, products, currency, delivery_fee, getCartAmount, navigate } = useContext(ShopContext);
  return (
    <div className='flex flex-col gap-2 sm:gap-4'>
        <div className='text-lg sm:text-2xl font-bold'>Cart Totals</div>
       < hr className='border-gray-300' />
        <div className='flex justify-between'>
            <p className='text-sm sm:text-2xl'>Subtotal</p>
            <p className='text-sm sm:text-2xl'>{currency}{getCartAmount()}</p>
        </div>
        <hr className='border-gray-300' />
        <div className='flex justify-between'>
            <p className='text-sm sm:text-2xl'>Delivery Fee</p>
            <p className='text-sm sm:text-2xl'>{currency}{delivery_fee}</p>
        </div>
        <hr className='border-gray-300' />
        <div className='flex justify-between'>
            <p className='text-sm sm:text-2xl font-bold'>Total</p>
            <p className='text-sm sm:text-2xl font-bold'>{currency}{getCartAmount() + delivery_fee}</p>
        </div>

    </div>
  )
}

export default CartTotal
