import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../App'

const List = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products/getAllProducts`)
        const data = response.data

        if (data.success) {
          setProducts(data.products || [])
        } else {
          setError(data.message || 'Failed to fetch products')
        }
      } catch (err) {
        setError('Something went wrong while fetching products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/products/deleteProduct/${productId}`, {
        headers: {
          token: ` ${localStorage.getItem('token')}`,
        }
      })
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId))
    } catch (err) {
      setError('Failed to delete product.')
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 ">
     
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl text-center ">Product List</h1>
     

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white text-gray-500">
          Loading products...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      ) : (
   
      <div className="flex flex-col gap-3">
        <div className="hidden border border-gray-200 bg-gray-100 p-3 font-semibold text-gray-700 shadow-sm sm:grid sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] sm:gap-3">
          <div className="text-center">Image</div>
          <div>Name</div>
          <div>Price</div>
          <div>Category</div>
          <button onClick={() => {handleDelete(p._id)}} className="rounded-md px-3 py-2 font-medium ">
            Action
          </button>
        </div>

        {products.map((p) => (
          <div
            key={p._id}
            className="grid items-center gap-3 border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:grid-cols-[1fr_3fr_1fr_1fr_1fr]"
          >
            <img
              src={p.images?.[0] || 'https://via.placeholder.com/80x80?text=No+Image'}
              alt={p.name}
              className="mx-auto h-20 w-20 rounded-lg object-cover"
            />
            <div className="font-medium text-gray-800">{p.name}</div>
            <div className="text-gray-700">₹{p.price}</div>
            <div className="capitalize text-gray-700">{p.category}</div>
            <button
              onClick={() => handleDelete(p._id)}
              className="rounded-md bg-red-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      )}
    </div>
  ) 
}

export default List
