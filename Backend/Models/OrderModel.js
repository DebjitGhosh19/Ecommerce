import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		userId: {
			// type: mongoose.Schema.Types.ObjectId,
            type: String,
			// ref: 'User',
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			// enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
			// default: 'pending',
            required:true,
            default:'Order Placed'
		},
		items: {
			type: Array,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			// min: 0,
		},
		address: {
			type: Object,
			required: true,
		},
        payment:{
            type:Boolean,
            default:false,
            required:true
        },
        date: {
           type:Number,
           required:true,
        },
	},
	
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
