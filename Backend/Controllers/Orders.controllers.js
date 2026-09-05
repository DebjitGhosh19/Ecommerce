import Order from "../Models/OrderModel.js";
import User from "../Models/UserModel.js";
import Razorpay from "razorpay";
import Stripe from "stripe";

//global variables
const currency = "inr"; // Set the currency to Indian Rupees (INR)
const deliveryCharges = 50; // Set the delivery charges to 50





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

// //Placeing orders using Razorpay
export const PlaceOrderRazorpay = async (req, res) => {
  const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


  try {
    const { userId, amount, items, address } = req.body;

    if (!userId || !amount || !items || !address) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    const razorpayOrder = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
      notes: {
        userId,
        orderId: newOrder._id.toString(),
      },
    });

    return res.json({
      success: true,
      message: "Razorpay order created",
      razorpayOrder
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
 };


export const verifyRazorpay= async (req, res) => {
  try {
    const { razorpay_order_id ,userId} = req.body;

    if (!razorpay_order_id) {
      return res.json({ success: false, message: "Razorpay order ID is required" });
    }

    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);

// console.log(orderinfo);
if (orderinfo.status==='paid') {
  await Order.findByIdAndUpdate(orderinfo.receipt,{payment:true})
  await User.findByIdAndUpdate(userId,{cardData:{}})
  res.json({success:true,message:"Payment Successful"})
}
else{
    res.json({success:false,message:"Payment Failed"})
}
    

 
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Placeing orders using Stripe
export const PlaceOrderStripe = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { userId, amount, items, address } = req.body;
const {origin}=req.headers
    if (!origin) {
      return res.json({ success: false, message: "Origin header is missing" });
    }
    if (!userId || !amount || !items || !address) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    

    const newOrder = new Order(orderData);
    await newOrder.save();
    const line_items=items.map((item)=>({    
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: Number(item.price) * 100,
        },
        quantity: item.quantity,
    }))
line_items.push({
  price_data: {
    currency: currency  ,
    product_data: {
      name: "Delivery Charges",
    },
    unit_amount: deliveryCharges * 100, // Using the global variable for delivery charges
  },
  quantity: 1,
   
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
      mode: "payment",
    });
    return res.json({
      success: true,
      message: "Stripe checkout session created",
      session_url:session.url,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
//Verify Stripe
export const verifyStripe=async (req,res) => {
  const {orderId,success,userId}=req.body

  try {
    if (success=="true") {
      await Order.findByIdAndUpdate(orderId,{payment:true})
      await User.findByIdAndUpdate(userId,{cardData:{}})
      res.json({success:true})
    }
    else{
      await Order.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
  }
}

//All orders data for admin
export const GetAllOrders = async (req, res) => {
    try{
const orders=await Order.find({})
res.json({success:true,orders})
    }
    catch(error){
        console.log(error);
        res.json({success:false, messsage:error.messsage})
    }
}
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
export const UpdateOrderStatus = async (req, res) => {
    try {
        const {orderId,status}=req.body;
        await Order.findByIdAndUpdate(orderId,{status}) 
        res.json({success:true,message:"Order status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}