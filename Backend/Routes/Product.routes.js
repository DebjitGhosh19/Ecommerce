import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getProductById,  } from '../Controllers/Products.controller.js';
import upload from '../MiddleWare/multer.js';
import AdminAuth from '../MiddleWare/AdminAuth.js';



const ProductRouter = express.Router();

ProductRouter.post('/addProduct', AdminAuth, upload.fields([{ name: 'image1', maxCount: 1 },{ name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }]), addProduct);
ProductRouter.get('/getAllProducts', getAllProducts);
ProductRouter.get('/getProductById/:id',  getProductById);
ProductRouter.delete('/deleteProduct/:id', AdminAuth, deleteProduct);

export default ProductRouter;
