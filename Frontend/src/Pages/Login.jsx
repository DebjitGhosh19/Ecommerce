import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import toast from 'react-hot-toast';
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setToken,BACKEND_URL,navigate ,token, setCartItems} = useContext(ShopContext);
  // onSubmitHandelar
  const onSubmitHandelar = (e) => {
    e.preventDefault();
    const loginUser = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/users/login`, { email, password });
        if (response.data.success) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          setToken(token);
          toast.success('Login successful');
        } else {
          toast.error('Login failed: ' + response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message || 'An error occurred while logging in.');
      }
    };

    loginUser();
  };
useEffect(() => {
    if (token) {
      // Redirect to the home page or any other page after successful login
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div>
      <div className='mt-10 flex items-center justify-center gap-2 sm:gap-4'>
        <p className='text-2xl font-semibold'>Login</p>
        <hr className='h-0.5 w-8 bg-black sm:w-11' />
      </div>
      <div className='mt-10 flex items-center justify-center'>
        <form className='flex flex-col gap-4 sm:gap-6'>
          <input
            type='email'
            placeholder='Email'
            className='w-75 border p-2 sm:w-100 sm:p-3' required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            className='w-75 border p-2 sm:w-100 sm:p-3' required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-black p-2 text-white sm:p-3' onClick={onSubmitHandelar}>
            Login
          </button>
          <div className='flex items-center justify-around gap-2 sm:gap-4'>
            <Link to='/forgot-password' className='text-sm font-semibold text-blue-500 underline'>
              Forgot Password?
            </Link>
            <Link to='/signup' className='text-sm font-semibold  text-blue-500 underline'>
             Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login