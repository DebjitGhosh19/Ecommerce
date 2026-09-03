import Order from "../Models/OrderModel.js";
import User from "../Models/UserModel.js";

//Placeing orders using Cash on Delivery
export const PlaceOrderCOD = async (req, res) => {
  try {
      const {userId,amount,items,address}=req.body;
    const orderData={
        userId,
        items,
        amount,
        address,
        paymentMethod:'COD',
        payment:false,
        date:Date.now()

    }
    const newOrder=new Order(orderData)
    await newOrder.save();
    await User.findByIdAndUpdate(userId,{cardData:{}})
    res.json({success:true,messsage:"Order Placed"})
  } catch (error) {
    console.log(error);
        res.json({success:false,messsage:error.messsage})
  }
}

//Placeing orders using Razorpay
export  const PlaceOrderRazorpay = async (req, res) => {}


//Placeing orders using Stripe
export const PlaceOrderStripe = async (req, res) => {}

//All orders data for admin
export const GetAllOrders = async (req, res) => {}
//user orders data for frontend
export  const GetUserOrders = async (req, res) => {
    try {
        const {userId}=req.body;
        console.log(userId);
        
        const orders=await Order.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, messsage:error.messsage})
    }
}

//update order status from admin
export const UpdateOrderStatus = async (req, res) => {}