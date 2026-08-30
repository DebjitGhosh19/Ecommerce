import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cloudinaryConfig from './config/CLOUDINARY.js';
import UserRouter from './Routes/User.routes.js';
import ProductRouter from './Routes/Product.routes.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
// connectDb
connectDB()
// cloudinary config
cloudinaryConfig()

// Built-in middleware to parse incoming JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//User routes
app.use('/api/users', UserRouter);
//Product routes
app.use('/api/products', ProductRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
