import React from "react";
import { Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Collection from './Pages/Collection'
import Login from './Pages/Login'
import PlaceOrder from './Pages/PlaceOrder'
import Product from './Pages/Product'
import Orders from './Pages/Orders'
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px[7vw] lg:px[9vw]">
      <NavBar/>
     <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/about" element={<About/>} />
     <Route path="/contact" element={<Contact/>} />
     <Route path="/login" element={<Login/>} />
     <Route path="/orders" element={<Orders/>} />
     <Route path="/place-order" element={<PlaceOrder/>} />
     <Route path="/product/:productId" element={<Product/>} />
     <Route path="/cart" element={<Cart/>} />
     <Route path="/collection" element={<Collection/>} />

     </Routes>
    </div>
  );
};

export default App;
