import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils";
import Product from "../models/productModel";

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler( async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/:id', expressAsyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
}));

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const product = new Product({
        name: 'Sample product',
        description: 'Sample desc',
        category: 'Sample category',
        brand: 'Sample brand',
        image: '/images/product-1.jpg',
    });
    const createdProduct = await product.save();
    if(createdProduct){
        res.status(201).send({ message: 'Product Created', product: createdProduct });
    } else {
        res.status(500).send({ message: 'Error in creating product' });
    }
}));

export default productRouter;