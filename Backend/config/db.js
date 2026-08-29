import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // 127.0.0.1 is preferred over 'localhost' in Node.js 18+ to avoid IPv6 resolution issues
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
}; 
export default connectDB