import React, { useState } from 'react'
import { BACKEND_URL } from '../App';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Login = ({ setIsLoggedIn  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try{
          const response = await axios.post(`${BACKEND_URL}/api/users/adminlogin`, { email, password });
            if(response.data.success){
                localStorage.setItem('token', response.data.token);
                toast.success(response.data.message || "Login successful");
                setIsLoggedIn(response.data.token);
            navigate('/orders');
            }
            else{
                toast.error(response.data.message || "Login failed");
            }
        }
        catch(err){
            toast.error(err.response.data.message || "Login failed");
        }
    }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8 sm:px-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your store
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
           value={email}
              onChange={(e) => setEmail(e.target.value)}
           />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
