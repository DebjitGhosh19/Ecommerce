import express from 'express';
import AdminAuth from '../MiddleWare/AdminAuth.js';
import { GetAllOrders, GetUserOrders, PlaceOrderCOD, PlaceOrderRazorpay, PlaceOrderStripe, UpdateOrderStatus, verifyRazorpay, verifyStripe } from '../Controllers/Orders.controllers.js';
import UserAuth from '../MiddleWare/Auth.js';

const OrderRouter = express.Router();

//Admin Features
OrderRouter.post("/list",GetAllOrders)
OrderRouter.post("/status",AdminAuth,UpdateOrderStatus)


//Payment Features

OrderRouter.post("/place",UserAuth,PlaceOrderCOD)
OrderRouter.post("/stripe",UserAuth,PlaceOrderStripe)
OrderRouter.post("/razorpay",UserAuth,PlaceOrderRazorpay)


//User Feature
OrderRouter.post("/userorders",UserAuth,GetUserOrders)


//Verify  payment 
OrderRouter.post("/verifyStripe",UserAuth,verifyStripe)
OrderRouter.post("/verifyRazorpay",UserAuth,verifyRazorpay)
export default OrderRouter;