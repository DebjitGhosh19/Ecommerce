import axios from 'axios'
import { BACKEND_URL } from '../App'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { assets } from '../assets/admin_assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
const fetchOrders = async () => {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/orders/list`,
          {},
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        )

        if (response.data.success) setOrders(response.data.orders)
      } catch (error) {
        console.log(error)
        toast.error('Failed to fetch orders. Please try again later.')
      }
    }

    const statusHandelar = async (orderId, status) => {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/orders/status`,
          { orderId, status },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        )

        if (response.data.success) {
          toast.success('Order status updated successfully.')
          fetchOrders() // Refresh the orders list
        }
      } catch (error) {
        console.log(error)
        toast.error('Failed to update order status. Please try again later.')
      }
    }

  useEffect(() => {
    fetchOrders()
  }, [token])

  return (
    <div className='min-h-screen bg-slate-100 p-6 sm:pl-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium uppercase tracking-[0.2em] text-slate-500'>Management</p>
            <h3 className='mt-1 text-3xl font-bold text-slate-800'>Order Page</h3>
          </div>
          <div className='rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200'>
            {orders.length} orders
          </div>
        </div>

        <div className='space-y-5'>
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md'
            >
              <div className='flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between'>
                <div className='flex items-start gap-4 flex-col lg:flex-row lg:items-center'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100'>
                    <img src={assets.parcel_icon} alt='parcel icon' className='h-8 w-8 object-contain' />
                  </div>

                  <div className='flex-1'>
                    <div className='mb-2 flex items-center gap-2'>
                      <span className='rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700'>
                        {order.payment ? 'Paid' : 'Pending'}
                      </span>
                      <span className='text-sm text-slate-500'>Order #{index + 1}</span>
                    </div>

                    <div className='space-y-1 text-sm text-slate-600'>
                      {order.items.map((item, itemIndex) => (
                        <p key={`${order._id || index}-${itemIndex}`}>
                          {item.name} x {item.quantity}
                          {item.size ? <span className='ml-1 text-slate-400'>({item.size})</span> : ''}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='w-full max-w-md rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200'>
                  <p className='text-lg font-semibold text-slate-800'>
                    {order.address?.firstName || ''} {order.address?.lastName || ''}
                  </p>
                  <p className='mt-2 text-sm text-slate-600'>{order.address?.address}</p>
                  <p className='text-sm text-slate-600'>
                    {order.address?.city}, {order.address?.state}, {order.address?.country} - {order.address?.pincode}
                  </p>
                  <p className='mt-1 text-sm text-slate-600'>{order.address?.phone}</p>
                </div>

                <div className='flex min-w-[220px] flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4'>
                  <p className='text-sm text-slate-500'>Items: <span className='font-semibold text-slate-800'>{order.items.length}</span></p>
                  <p className='text-sm text-slate-500'>Method: <span className='font-semibold text-slate-800'>{order.paymentMethod}</span></p>
                  <p className='text-sm text-slate-500'>Date: <span className='font-semibold text-slate-800'>{new Date(order.date).toLocaleDateString()}</span></p>
                  <select
                    defaultValue={order.status}
                    className='mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-0 transition focus:border-indigo-400'
                  
                  onChange={(e) => statusHandelar(order._id, e.target.value)} >
                    <option value='Order Placed'>Order Placed</option>
                    <option value='Packing'>Packing</option>
                    <option value='Shipped'>Shipped</option>
                    <option value='Out for delivery'>Out for delivery</option>
                    <option value='Delivered'>Delivered</option>
                  </select>
                </div>

                <div className='flex flex-col items-end justify-between'>
                  <p className='text-2xl font-bold text-slate-800'>₹{order.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders
