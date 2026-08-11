import React from 'react'

const NewLetterBox = () => {
    const handelSubmit=(event)=>{
event.preventDefault();
    }
  return (
    <div className='py-10 flex items-center justify-center flex-col gap-6 '>
      <p className='font-bold text-2xl text-center'>Subscribe now & get 20% off</p>
   <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, illo.</p>

        <form onSubmit={handelSubmit} className='border w-full mx-3 sm:w-1/2 flex justify-between items-center '>
        <input type="text" placeholder='Enter your email'  className= ' w-full text-gray-400  p-4' required/>
        <button className='bg-black text-white p-4 ' type="submit">SUBSCRIBE</button>
    </form>

    </div>
  )
}

export default NewLetterBox
