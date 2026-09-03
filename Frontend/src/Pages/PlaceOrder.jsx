import CartTotal from '../components/CartTotal'
import { assets} from '../assets/frontend_assets/assets'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD")
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    address: '',
  })
  const  { delivery_fee,cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    BACKEND_URL,
    token,
    setToken,products } = useContext(ShopContext)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDeliveryInfo((currentInfo) => ({ ...currentInfo, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let orderItems=[];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id==items))
          if(itemInfo){
            itemInfo.size=item;
            itemInfo.quantity=cartItems[items][item]
            orderItems.push(itemInfo)
          }
          }
        }
      }
      
      let orderData={
        address:deliveryInfo,
        items:orderItems,
        amount:getCartAmount()+delivery_fee
      }

      switch (method) {
        case 'COD':
          const response=await axios.post(BACKEND_URL+'/api/orders/place',orderData,{headers:{token}})
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break;
          // case 'razorpay':
          //  const response=await axios.post(BACKEND_URL+'/api/orders/razorpay',orderData,)
          // break;
          //  case 'stripe':
          //  const response=await axios.post(BACKEND_URL+'/api/orders/stripe')
          // break;
        default:
          break;
      }
      
      
    } catch (error) {
      
    }
    
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-gray-50 px-4 pb-16 sm:px-6 lg:px-8">
      <div className="flex items-end gap-3 py-10 sm:gap-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">Almost there</p>
          <h1 className="text-2xl font-semibold uppercase tracking-wide text-gray-400 sm:text-3xl">
          Delivery <span className="text-black">Info</span>
          </h1>
        </div>
        <hr className="mb-1 w-10 border-gray-300 sm:w-14" />
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <form id="delivery-form" onChange={handleInputChange} onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7 flex items-center justify-between border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Shipping details</h2>
              <p className="mt-1 text-sm text-gray-500">Where should we send your order?</p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">1 of 2</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">First name</label>
              <input id="firstName" name="firstName" type="text" required placeholder="Enter your first name" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">Last name</label>
              <input id="lastName" name="lastName" type="text" required placeholder="Enter your last name" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">Email address</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">Phone number</label>
              <input id="phone" name="phone" type="tel" required placeholder="Enter your phone number" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-700">City</label>
              <input id="city" name="city" type="text" required placeholder="Enter your city" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-700">State</label>
              <input id="state" name="state" type="text" required placeholder="Enter your state" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label htmlFor="pincode" className="mb-2 block text-sm font-medium text-gray-700">Pincode</label>
              <input id="pincode" name="pincode" type="text" required placeholder="Enter pincode" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label htmlFor="country" className="mb-2 block text-sm font-medium text-gray-700">Country</label>
              <input id="country" name="country" type="text" required placeholder="Enter your country" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">Address</label>
              <textarea id="address" name="address" required rows="3" placeholder="Enter your full address" className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black" />
            </div>
          </div>
        </form>

        <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
          <CartTotal />
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900">Payment method</h2>
            <p className="mt-1 text-sm text-gray-500">Choose how you would like to pay.</p>
          </div>
          <div className="mt-4 space-y-3">
            <button type="button" onClick={() => setMethod('stripe')} className={`flex w-full items-center justify-between rounded-xl border p-3 transition hover:border-black hover:bg-gray-50 ${method === 'stripe' ? 'border-2 border-green-500 bg-green-50' : 'border-gray-300'}`}>
              <img src={assets.stripe_logo} alt="Stripe" className="h-6 w-auto" />
              <span className={`h-4 w-4 rounded-full border-4 ${method === 'stripe' ? 'border-green-500 bg-green-500' : 'border-gray-400'}`} aria-label={method === 'stripe' ? 'Selected' : 'Not selected'} />
            </button>
            <button type="button" onClick={() => setMethod('razorpay')} className={`flex w-full items-center justify-between rounded-xl border p-3 transition hover:border-black hover:bg-gray-50 ${method === 'razorpay' ? 'border-2 border-green-500 bg-green-50' : 'border-gray-300'}`}>
              <img src={assets.razorpay_logo} alt="Razorpay" className="h-6 w-auto" />
              <span className={`h-4 w-4 rounded-full border-4 ${method === 'razorpay' ? 'border-green-500 bg-green-500' : 'border-gray-400'}`} aria-label={method === 'razorpay' ? 'Selected' : 'Not selected'} />
            </button>
            <button type="button" onClick={() => setMethod('COD')} className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-sm font-medium uppercase tracking-wide text-gray-700 transition hover:border-black hover:bg-gray-50 ${method === 'COD' ? 'border-2 border-green-500 bg-green-50' : 'border-gray-300'}`}>
              Cash on delivery
              <span className={`h-4 w-4 rounded-full border-4 ${method === 'COD' ? 'border-green-500 bg-green-500' : 'border-gray-400'}`} aria-label={method === 'COD' ? 'Selected' : 'Not selected'} />
            </button>
            <button form="delivery-form" type="submit" className="mt-5 w-full rounded-xl bg-black px-5 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800">
              Place order
            </button>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default PlaceOrder