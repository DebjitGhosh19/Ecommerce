import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login';
import Orders from './Pages/Orders';
import List from './Pages/List';
import Add from './Pages/Add';
import toast, { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
 export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') || false);
  


  return (
    <>
    <Toaster/>
   { isLoggedIn ? (<div className="w-full h-full">
      
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <hr />
      <div className="flex flex-row gap-2 " >
     <div className='w-1/10'>   <Sidebar /></div>
    <div className="w-9/10" >
        <Routes >
          <Route path="/orders" element={<Orders token={isLoggedIn} />} />
          <Route path="/list" element={<List/>}/>
          <Route path="/add" element={<Add/>}/>
        </Routes>
    </div>
      </div>
    </div>)
    : (<Login setIsLoggedIn={setIsLoggedIn}/>)
   }
     </>
  
  )
}

export default App
