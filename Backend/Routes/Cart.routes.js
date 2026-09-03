import express from "express";
import { addCart, getCart, updateCart } from "../Controllers/Cart.controller.js";
import UserAuth from "../MiddleWare/Auth.js";
// import { addToCart, getCartItems, removeFromCart } from "../Controllers/Cart.controller.js";

const Cartrouter = express.Router();

Cartrouter.post("/add", UserAuth, addCart);
Cartrouter.post("/get", UserAuth, getCart);
Cartrouter.put("/update", UserAuth, updateCart);
export default Cartrouter;
