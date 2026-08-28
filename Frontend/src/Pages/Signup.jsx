import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    // State variables for form inputs
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

// onSubmitHandelar
  const onSubmitHandelar = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(userName, email, password);
  }



  return (
    <div>
      <div className='flex justify-center items-center gap-2 sm:gap-4 mt-10'>
        <p className=' text-2xl font-semibold ' >Signup</p>
        <hr className='bg-black w-8 sm:w-11 h-0.5  '/>
      </div>
      <div className='flex justify-center items-center mt-10'>
        <form className='flex flex-col gap-4 sm:gap-6'>
          <input type="text" placeholder='Username' className='border p-2 sm:p-3 w-[300px] sm:w-[400px]' required value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="email" placeholder='Email' className='border p-2 sm:p-3 w-[300px] sm:w-[400px]' required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' className='border p-2 sm:p-3 w-[300px] sm:w-[400px]' required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='bg-black text-white p-2 sm:p-3' onClick={onSubmitHandelar}>
            Signup
          </button>
          <div className='flex justify-center items-center gap-2 sm:gap-4'>
            <p className='text-sm font-semibold'>Already have an account?</p>
            <Link to='/login' className='text-sm font-semibold text-blue-500 underline'>
                Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
