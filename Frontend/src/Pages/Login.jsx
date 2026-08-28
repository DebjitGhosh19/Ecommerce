import { useState } from 'react';
import { Link } from 'react-router-dom'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  // onSubmitHandelar
  const onSubmitHandelar = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log(userName, password);
  }


  return (
    <div>
      <div className='mt-10 flex items-center justify-center gap-2 sm:gap-4'>
        <p className='text-2xl font-semibold'>Login</p>
        <hr className='h-0.5 w-8 bg-black sm:w-11' />
      </div>
      <div className='mt-10 flex items-center justify-center'>
        <form className='flex flex-col gap-4 sm:gap-6'>
          <input
            type='text'
            placeholder='Username'
            className='w-75 border p-2 sm:w-100 sm:p-3' required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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