import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../Controllers/Products.controller.js';
import upload from '../MiddleWare/multer.js';



const ProductRouter = express.Router();

ProductRouter.post('/addProduct',upload.fields([{ name: 'image1', maxCount: 1 },{ name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }]), addProduct);
ProductRouter.get('/getAllProducts', getAllProducts);
ProductRouter.get('/getProductById/:id', getProductById);
ProductRouter.put('/updateProduct/:id', updateProduct);
ProductRouter.delete('/deleteProduct/:id', deleteProduct);

export default ProductRouter;
